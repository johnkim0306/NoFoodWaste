import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
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
    bodyParser: false,
  },
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the file' });
      return;
    }

    try {
      const file = files.file as any;
      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const imageData = await readFile(file.filepath);
      const base64Image = imageData.toString('base64');

      // For images, the SDK supports both Google Cloud Storage URI and base64 strings
      const filePart = {
        fileData: {
          inlineData: base64Image,
          mimeType: 'image/jpeg',
        },
      };

      const textPart = { text: prompt };
      const request = {
        contents: [{ role: 'user', parts: [filePart, textPart] }],
      };
      console.log(request.contents[0].parts[1].text);

      // Use `generateContent` for a non-streaming response
      const response = await generativeVisionModel.generateContent(request);

      const fullTextResponse =
        response.response.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!fullTextResponse) {
        res.status(500).json({ error: 'No response from the model' });
        return;
      }

      res.status(200).json({ fullTextResponse });
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'Error processing the request' });
    }
  });
};
