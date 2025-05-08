// import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaTwitch,
  } from "react-icons/fa";

const ResumeCard = ({ data, onSelect, selectedIndices = [], selectable = false }) => {
  const router = useRouter();
 console.log('selectedIndices', selectedIndices)
  return (
    <div>
    <div className='w-full grid md:grid-cols-2 sm:grid-cols-1 gap-1'>
        {data.map((artwork, index) => (
            // <div key={i} className='mb-4'>
            <div
            key={index}
            className={`relative mb-4 border-2 rounded-lg ${
              selectedIndices.includes(index) ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => selectable && onSelect(index)}
          >
            {selectable && (
               <input
               type="checkbox"
               checked={selectedIndices.includes(index)}
               onChange={(e) => {
                 e.stopPropagation();
                 onSelect(index);
               }}
               className="absolute top-2 right-2 z-10 bg-red-100"
             />
            )}
                <div className="items-center text-left bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-400"
                >   
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <div className="flex mt-5">
                            <div className=''>
                            <div className='mt-6'>
                            <h4 className="flex-none text-xl font-bold font-sans tracking-wide text-black uppercase">{artwork.artworkName} by {artwork.artistName}</h4>

                                <p className='text-left mt-6'>
                                    {(artwork.length && artwork.width) && <span className="font-normal text-gray-800 uppercase">{artwork.width} cm x {artwork.length} cm</span>}
                                </p>
                                {artwork.medium && <p className="mt-1 font-normal text-gray-800 text-left uppercase">{artwork.medium}</p>}
                                <div>
                                    {(artwork.rarity === 'Rare' || artwork.rarity === 'Original')
                                        ? <div>
                                            <p className="mt-1 font-normal text-gray-800 text-left uppercase">{artwork.rarity}: 1 of 1</p>
                                        </div>
                                        : artwork.rarity === 'Limited' 
                                        ? (
                                        <div>
                                            <p className="mt-1 font-normal text-gray-800 text-left uppercase">{artwork.rarity}: {artwork.labelTag} of {artwork.totalTags}</p>
                                            </div>
                                        ) 
                                        : (
                                        <div>
                                            <p className="mt-1 font-normal text-gray-800 text-left uppercase">{artwork.rarity}</p>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                            </div>
                            {/* <div className='m-2'>
                                
                            </div> */}
                            <div className="flex-grow"></div>
                            <div className='mt-6'>
                                <img className="flex-none h-auto max-w-40 min-w-20 rounded-t-lg md:rounded-none md:rounded-s-lg" src={artwork?.cloudinaryUrl} alt="" />
                                <p className="text-sm">SCAN QR CODE FOR MORE INFO</p>
                                <p>
                                {artwork.price && <b className="font-normal text-gray-800 text-3xl text-end">£{artwork.price}</b>}
                                </p>
                            </div>
                               
                        </div>
                        <div className='m-2'>
                            
                            
                        </div>
                        <div className='mr-2 mt-2'>
                            <div className='overflow-auto h-40'>
                                <p className="font-normal mt-6 text-gray-800 text-justify">{artwork.description.substr(0, 200)}...</p>
                            </div>
                        </div>
                        <div className='mt-6 border-t-4 border-gray-800 flex flex-row'>
                            <div className="mt-5">
                                
                                <p className="flex"><FaTwitter className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p className="flex"><FaTwitch className="z-20 mr-2 mt-2" size={15} />@artafricatv</p>
                                <p className="flex"><FaFacebook className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p className="font-normal mt-5 text-gray-800">www.art.africa</p>
                            </div>
                            <div className="ml-12 mt-5">
                                <b>Enquiries</b>
                                <p>support@art.africa</p>
                                <p>+44 20 3409 7699</p>
                            </div>
                            <div className='ml-12 mt-5'>
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
        ))}
    </div>
    </div>
  );
};

export default ResumeCard;
