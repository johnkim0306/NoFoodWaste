import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { promisify } from 'util';
import vertexai from 'vertexai';
import { GenerativeModel, Part } from 'vertexai.preview.generative_models';

const PROJECT_ID = "gen-ai-2024";
const REGION = "us-central1";

vertexai.init({ project: PROJECT_ID, location: REGION });

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
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the file' });
      return;
    }

    const file = files.file as any;
    const imageData = await readFile(file.filepath);

    const generativeMultimodalModel = new GenerativeModel("gemini-1.0-pro-vision-001");
    const imagePart = new Part({ data: imageData, contentType: "image/jpeg" });

    const response = await generativeMultimodalModel.generateContent([prompt, imagePart]);
    const result = response.candidates[0].content.text;

    res.status(200).json({ result });
  });
}
