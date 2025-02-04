import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import { redis } from "@/lib/redis";


// Rate Limit Configuration
const MAX_REQUESTS = 1;
const WINDOW_SECONDS = 60; 

async function isRateLimited(ip: string): Promise<boolean> {
  const cacheKey = `rate-limit:${ip}`;
  const requests = await redis.incr(cacheKey);

  console.log(`IP ${ip} has made ${requests} requests`);
  if (requests === 1) {
    await redis.expire(cacheKey, WINDOW_SECONDS); // Expire the key after 60 seconds
  }

  return requests > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {

    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";

    if (await isRateLimited(ip)) {
      const ttl = await redis.ttl(`rate-limit:${ip}`); // Get time left in seconds
      return NextResponse.json(
        { 
          message: `You're sending too many requests! Please wait ${ttl} seconds before trying again.`,
          retry_after: ttl 
        }, 
        { status: 429 }
      );
    }

    const { foodItems } = await req.json();
    console.log("Received food items:", foodItems);

    // Use the full path to the Python executable
    const pythonPath = '/home/john_kim/nofoodwaste/python_env/myenv/bin/python';

    // Define the full path to the Python script
    const scriptPath = path.join('/home/john_kim/nofoodwaste/python_env', 'train_model.py');

    // Call the Python script
    const pythonProcess = spawn(pythonPath, [scriptPath, JSON.stringify(foodItems)]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    return new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error('Python script failed'));
        } else {
          resolve(NextResponse.json(JSON.parse(result)));
        }
      });
    });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}
