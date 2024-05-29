import React, { useState } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { media } from '../data/medium';
import { rarity } from '../data/rarity';



const ArtworkForm = () => {
    const [qrImageUrl, setQRImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [cloudinaryUrl, setcloudinaryUrl] = useState(false)
    const [formRarity, setformRarity] = useState('Print')

    const schema = Yup
    .object()
    .shape({
        artistName: Yup.string().required(),
        artWorkURL: Yup.string(),
        artworkName:Yup.string().required(),
        description: Yup.string().required(),
        medium: Yup.string().required(),
        // rarity:  Yup.string().required(),
        length: Yup.number().positive().integer().required(),
        width: Yup.number().positive().integer().required(),
        price: Yup.number().positive().integer().required(),
    }).required();
	const { register, handleSubmit, formState, resetField } =
    useForm({
        resolver: yupResolver(schema)
    });
    const { errors } = formState;

    const [labelTag, setLabelTag] = useState('');
    const [totalTags, setTotalTags] = useState('');


    const handleRarityChange = (e) => {
        setformRarity(e.target.value);
        // Reset labelTag and totalTags when rarity changes
        setLabelTag('');
        setTotalTags('');
    };

    const handleLabelTagChange = (e) => {
        setLabelTag(e.target.value);
    };

    const handleTotalTagsChange = (e) => {
        setTotalTags(e.target.value);
    };


    const handleGenerateQR = async ({
        artistName, artworkName, artWorkURL, description, medium
    }) => {
        const qrData = artWorkURL ?
            artWorkURL :
            `Artist: ${artistName}\nArtwork: ${artworkName}\nURL: ${artWorkURL}\nDescription: ${description}\nMeium: ${medium}`;

        try {
            const imageUrl = await QRCode.toDataURL(qrData);

            setQRImageUrl(imageUrl);
            return imageUrl
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleSaveQR = () => {
        saveAs(qrImageUrl, 'qrcode.png');
    };

    const generateAndDownloadQRCode = async (formData) => {

        setIsLoading(true)
        const base64Url = await handleGenerateQR(formData);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/uploadQRCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ base64Data: base64Url }),
            });

            if (res.ok) {
                const imageUrl = await res.json();
                console.log('imageUrl', imageUrl)
                setcloudinaryUrl(imageUrl.url);
                const dataObj = JSON.stringify({
                    artistName: formData.artistName,
                    artWorkURL: formData.artWorkURL,
                    artworkName: formData.artworkName,
                    description: formData.description,
                    medium: formData.medium,
                    rarity: formRarity,
                    labelTag,
                    totalTags,
                    length: formData.length,
                    width: formData.width,
                    price: formData.price,
                    cloudinaryUrl: imageUrl.url,
                })
                console.log('dataObj', dataObj)
                let response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artwork-details`, {
                    method: 'POST',
                    body: dataObj
                });
                response = await response.json();
                saveAs(qrImageUrl, `${formData.artworkName}-by-${formData.artistName}-qrcode.png`);
                console.log('done')
            }
        } catch (error) {
            // Handle error if necessary
            console.error('error here', error)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    };

    return (
        <article className="w-full max-w-xld rounded-bl-4xl">
            <div className="selection:bg-gray-600 selection:text-white rounded-bl-4xl">
                <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                    <div className="p-8 flex-1">
                        <div className="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
                            <div className="relative h-24 bg-fff rounded-bl-4xl">
                            </div>
                            <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
                                <h1 className="text-2xl text-center font-semibold text-slate-900">Artwork Details</h1>
                                <form className="mt-12"
                                    onSubmit={handleSubmit(generateAndDownloadQRCode)}
                                >
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            placeholder="John Doe"
                                            {...register('artistName', { required: true })}
                                        />
                                        {errors.artistName?.message && <p className='text-red-600'>{errors.artistName.message}</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Artist Name<abbr title="required">*</abbr></label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            placeholder="Sands of Time"
                                            {...register('artworkName' , { required: true })} 
                                        />
                                        {errors.artworkName && <p role="alert" className='text-red-600'>{errors.artworkName?.message}</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Title of the Artwork<abbr title="required">*</abbr></label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            placeholder="www.google.com"
                                            {...register('artWorkURL')} 
                                        />
                                        {errors.artWorkURL && <p role="alert" className='text-red-600'>{errors.artWorkURL?.message}</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Link To Artwork</label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <select
											id="mediumSelect"
											{...register('medium' , { required: true })}
											className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
										>
											<option value="">
												Select
											</option>
											{media.map((item) => (
												<option
													key={item}
													value={item}
												>
													{item}
												</option>
											))}
										</select>
                                        {errors.medium && <p className='text-red-600'>{errors.medium?.message}</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Medium<abbr title="required">*</abbr></label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            placeholder="www.google.com"
                                            {...register('length' , { required: true })} 
                                        />
                                        {errors.length && <p className='text-red-600'>{errors.length?.message}</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Length<abbr title="required">*</abbr></label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            placeholder="www.google.com"
                                            {...register('width' , { required: true })} 
                                        />
                                        {errors.width && <p className='text-red-600'>{errors.width?.message}</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Width<abbr title="required">*</abbr></label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <input
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            placeholder="www.google.com"
                                            {...register('price')} 
                                        />
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Price</label>
                                    </div>
                                    <div className="mt-10 relative">
                                        <select
                                            value={formRarity}
                                            onChange={handleRarityChange}
											id="raritySelect"
											className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
										>
											<option value="">
												Select
											</option>
											{rarity.map((item) => (
												<option
													key={item}
													value={item}
												>
													{item}
												</option>
											))}
										</select>
                                        {errors.rarity && <p className='text-red-600'>Rarity is required.</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Rarity<abbr title="required">*</abbr></label>
                                    </div>
                                    {formRarity === 'Limited' && (
                                        <div className="mt-10 relative">
                                            <label className="left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">
                                                Label Tag:<abbr title="required">*</abbr>
                                                <input type="text"
                                                    value={labelTag}
                                                    onChange={handleLabelTagChange}
                                                    className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                                />
                                            </label>
                                            <br />
                                            <label className="left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">
                                                Total Tags: <abbr title="required">*</abbr>
                                                <input type="text"
                                                    value={totalTags}
                                                    onChange={handleTotalTagsChange}
                                                    className="peer h-10 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                                />
                                            </label>
                                        </div>
                                    )}
                                    <div className="mt-10 relative">
                                        <textarea
                                            className="peer h-48 w-full border-b-2 border-gray-300 text-slate-900 placeholder-transparent focus:outline-none focus:border-rose-950"
                                            placeholder="Sands of Time"
                                            {...register('description' , { required: true, min: 18, max: 99 })} 
                                        ></textarea>
                                        {errors.description && <p className='text-red-600'>Description is required.</p>}
                                        <label className="absolute left-0 -top-3.5 text-slate-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-800 peer-focus:text-sm">Artwork Description<abbr title="required">*</abbr></label>
                                    </div>
                                    <div  className="items-center py-2">
                                        <button
                                            className="mt-4 mb-4 px-4 py-2 bg-[#000] hover:bg-[#7b7c7c] text-white rounded"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                           {isLoading ? 'Loading...' : 'Generate And Download PNG'}
                                        </button>
                                        {qrImageUrl && <img src={qrImageUrl} alt="QR Code" />}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArtworkForm;
