import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { promisify } from 'util';
import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai';

const PROJECT_ID = "nofoodwaste-448015";
const location = 'us-central1';
const VISION_MODEL = "gemini-1.0-pro-vision-001";

const vertexAI = new VertexAI({ project: PROJECT_ID, location: location });

const generativeVisionModel = vertexAI.getGenerativeModel({
  model: VISION_MODEL,
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.4,
    topP: 0.4,
    topK: 32,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

const prompt = `
  Analyze this image to find the names of the foods in the image. 
  Write the food item and your estimate for the expiry date for that item when stored appropriately, in an array of objects format.
  Use this example as context: [{"name": "bread", "expiry": 10}, {"name": "apple", "expiry": 8}, {"name": "coffee", "expiry": 16}]
  There are two properties: the name of the item with no adjectives in lowercase, 
  and the number of days before it will go bad when stored appropriately as an integer.
  If no food items are found, return -1.
`;

const readFile = promisify(fs.readFile);

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle file uploads
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const imageData = await file.arrayBuffer();
    const base64Image = Buffer.from(imageData).toString('base64');

    const request = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              fileData: {
                content: base64Image, // Ensure you're sending base64-encoded image
                mimeType: file.type,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await generativeVisionModel.generateContent(request);

    const fullTextResponse =
      response.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!fullTextResponse) {
      return NextResponse.json({ error: 'No response from the model' }, { status: 500 });
    }

    return NextResponse.json({ fullTextResponse }, { status: 200 });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ error: 'Error processing the request' }, { status: 500 });
  }
}
