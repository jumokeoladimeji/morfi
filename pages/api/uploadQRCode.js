import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const result = await cloudinary.v2.uploader.upload(req.body);
            res.status(200).json({ url: result.secure_url });
        } catch (error) {
            console.error('Error uploading QR code to Cloudinary:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
