import cloudinary from '../../utils/cloudinary';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { base64Data } = req.body;

            if (!base64Data) {
                return res.status(400).json({ error: 'No file data provided' });
            }

            const uploadResponse = await cloudinary.uploader.upload(base64Data, {
                folder: 'nextjs',
            });
            res.status(200).json({ result: uploadResponse });
        } catch (error) {
            console.error('Error uploading QR code to Cloudinary:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
