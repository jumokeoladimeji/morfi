import React, { useState } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
// import toast from 'react-hot-toast';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

const ArtworkForm = () => {
    const [artistName, setArtistName] = useState('');
    const [artworkName, setArtworkName] = useState('');
    const [description, setDescription] = useState('');
    const [artWorkURL, setArtWorkURL] = useState('');
    const [qrImageUrl, setQRImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [cloudinaryUrl, setcloudinaryUrl] = useState(false)

    const handleGenerateQR = async () => {
        const qrData = `Artist: ${artistName}\nArtwork: ${artworkName}\nURL: ${artWorkURL}\nDescription: ${description}`;
        try {
            const imageUrl = await QRCode.toDataURL(qrData);
            console.log(imageUrl)
            setQRImageUrl(imageUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleSaveQR = () => {
        saveAs(qrImageUrl, 'qrcode.png');
    };

    const downloadQRCode = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/uploadQRCode`, {
                method: 'POST',
                body: qrImageUrl,
            });
            if (res.ok) {
                const imageUrl = await res.json();
                setcloudinaryUrl(imageUrl.url);
                const dataObj = JSON.stringify({
                    artistName,
                    artWorkURL,
                    artworkName,
                    description,
                    cloudinaryUrl
                })
                console.log('dataObj', dataObj)
                let response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artwork-details`, {
                    method: 'POST',
                    body: dataObj
                });
                response = await response.json();
                saveAs(qrImageUrl, `${artworkName}-qrcode.png`);
            }
        } catch (error) {
            // Handle error if necessary
            console.error(error)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    };

    return (
        <article className="w-full max-w-xld rounded-bl-4xl">
            <div className="selection:bg-yellow-600 selection:text-white rounded-bl-4xl">
                <div className="min-h-screen bg-yellow-100 flex justify-center items-center">
                    <div className="p-8 flex-1">
                        <div className="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
                            <div className="relative h-24 bg-fff rounded-bl-4xl">
                            </div>
                            <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
                                <h1 className="text-2xl text-center font-semibold text-slate-900">Artwork Details</h1>
                                <div className="mt-12">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            value={artistName}
                                            onChange={(e) => setArtistName(e.target.value)}
                                            placeholder="John Doe"
                                        />
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Artist Name</label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            value={artworkName}
                                            onChange={(e) => setArtworkName(e.target.value)}
                                            placeholder="Sands of Time"
                                        />
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Title of the Artwork</label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            value={artWorkURL}
                                            onChange={(e) => setArtWorkURL(e.target.value)}
                                            placeholder="www.google.com"
                                        />
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Link To Artwork</label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <textarea
                                            className="peer h-48 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Sands of Time"
                                        ></textarea>
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Artwork Description</label>
                                    </div>
                                    <div  className="items-center py-2">
                                        <button
                                            className="bg-yellow-800 hover:bg-yellow-600 text-white font-bold py-2 px-4 w-full rounded"
                                            onClick={handleGenerateQR}
                                        >
                                            Generate QR Code
                                        </button>
                                        <button
                                            className="mt-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                                            onClick={downloadQRCode}
                                            disabled={!qrImageUrl || isLoading}
                                        >
                                            {isLoading ? 'Loading...' : 'Save And Download PNG'}
                                            
                                        </button>
                                        {qrImageUrl && <img src={qrImageUrl} alt="QR Code" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArtworkForm;
