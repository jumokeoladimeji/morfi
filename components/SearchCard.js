import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaTwitch,
  } from "react-icons/fa";
  import QRCode from 'qrcode';
  



const SearchCard = ({ artwork }) => {
    const [qrImageUrl, setQRImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [cloudinaryUrl, setcloudinaryUrl] = useState(false)
    const parsedDescription = artwork?.description?.toString().replace(/(<([^>]+)>)/ig, '');

    const artworkDetails = {
        artworkName: artwork?.name,
        artistName: artwork?.author?.title?.rendered ?? (artwork?.author?.first_name && artwork?.author?.last_name ?
            `${artwork?.author?.first_name} ${artwork?.author?.last_name}` : null),
        artWorkURL: artwork?.permalink,
        description: parsedDescription,
        // medium: artwork?.name
    }
    const rarity = artwork?.categories[artwork.categories.length - 1]?.name;

    useEffect(() => {
        const handleGenerateQR = async ({
            artWorkURL
        }) => {
            const qrData = artWorkURL;
            try {
                const imageUrl = await QRCode.toDataURL(qrData);
                setQRImageUrl(imageUrl);
                return imageUrl
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        };
        handleGenerateQR(artworkDetails);
    }, [artworkDetails])
  
  const router = useRouter();

  return (
    <div>
    <div className='w-full grid md:grid-cols-2 sm:grid-cols-1 gap-1'>
        {/* {data.map((artwork, i) => ( */}
            <div className='mb-4'>
                <div className="items-center text-left bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-400"
                >   
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <div className="flex mt-5">
                            <div className='ml-2'>
                                <h4 className="flex-none text-2xl font-bold tracking-tight text-gray-900 capitalize underline underline-offset-8 underline-gray-800">
                                    {artwork?.name} {artworkDetails.artistName && <span>by {artworkDetails.artistName}</span>}
                                </h4>
                                <p className='mt-6'>
                                    {(artwork?.dimensions?.length && artwork?.dimensions?.width) && <span className="font-normal text-gray-800">{artwork?.dimensions?.width} cm x {artwork?.dimensions?.length} cm</span>}
                                </p>
                                {/* {artwork?.medium && <p className="mt-6 font-normal text-gray-800 capitalize">{artwork?.medium}</p>} */}
                                {rarity && <div>
                                    {(rarity === 'Rare' || rarity === 'Original')
                                        ? <div>
                                            <p className="mt-6 font-normal text-gray-800">{rarity}: 1 of 1</p>
                                        </div>
                                    : rarity === 'Limited Edition' 
                                        ? (
                                        <div>
                                            <p className="mt-6 font-normal text-gray-800">{rarity}: {artwork?.stock_quantity} in stock</p>
                                        </div>
                                        ) 
                                        : (
                                        <div>
                                            <p className="mt-6 font-normal text-gray-800">{rarity}</p>
                                        </div>
                                        )
                                    }
                                </div>}
                            </div>

                            <div className="flex-grow"></div>
                            <div>
                                {qrImageUrl && (
                                <img className="flex-none h-auto max-w-40 min-w-20 rounded-t-lg md:rounded-none md:rounded-s-lg" src={qrImageUrl} alt="" />
                                )}
                                <p>
                                {artwork?.price && <b className="ml-2 font-normal text-gray-800 text-3xl text-end">£{artwork?.price}</b>}
                                </p>
                            </div>
                        </div>
                        {/* <div className='m-2'>
                            <div className='flex flex-row-reverse'>
                                <p>
                                {artwork?.price && <b className="ml-80 font-normal text-gray-800 text-3xl text-end">£{artwork?.price}</b>}
                                </p>
                            </div>
                        </div> */}
                        <div className='m-2'>
                            
                            
                        </div>
                        <div className='m-2'>
                            <div className='overflow-auto h-40'>
                                    <p className="font-normal mt-6 text-gray-800">{parsedDescription}</p>
                            </div>
                        </div>
                        <div className='mt-6 border-t-4 border-gray-800 flex flex-row'>
                            <div className="mt-5">
                                <p className="flex"><FaInstagram className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p className="flex"><FaTwitter className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p className="flex"><FaTwitch className="z-20 mr-2 mt-2" size={15} />@artafricatv</p>
                                <p className="flex"><FaFacebook className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p className="font-normal mt-5 text-gray-800">www.art.africa</p>
                            </div>
                            <div className="ml-12 mt-5">
                                <b>Enquiries</b>
                                <p>info@art.africa</p>
                                <p>+44(0) 7745 245 934</p>
                            </div>
                            <div className='ml-12 mt-5 stroke-black'>
                                <Image
                                    className='stroke-black'
                                    src={'https://art.africa/wp-content/uploads/Group-3879.svg'}
                                    width={80}
                                    height={120}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/* ))} */}
    </div>
    </div>
  );
};

export default SearchCard;
