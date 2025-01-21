import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { foodItems } = await req.json();
    console.log("Received food items:", foodItems); // Add this line to log the received food items

    // Use the full path to the Python executable
    const pythonPath = '/home/john_kim/nofoodwaste/python_env/myenv/bin/python'; // Update this path as needed

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
