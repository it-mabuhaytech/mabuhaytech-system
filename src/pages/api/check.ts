import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: 'Invalid input. Provide an array of URLs.' });
    }

    try {
      const results = await Promise.all(urls.map(async (url: string) => {
        try {
          const response = await axios.get(url);
          return { url, healthy: response.status === 200, status: response.status };
        } catch (error) {
            if (error instanceof Error)
                return { url, healthy: false, status: error.message ? error.message : 'N/A' };
        }
      }));

      res.status(200).json(results);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: 'Failed to check URLs: ' + error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
