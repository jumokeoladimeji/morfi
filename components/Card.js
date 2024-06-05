import React from 'react';
import { useRouter } from 'next/router';
import { rarity } from '../data/rarity';

const Card = ({ data }) => {
  const router = useRouter();

  return (
    <div>
    <div className='w-full grid md:grid-cols-2 sm:grid-cols-1 gap-1'>
        {data.map((artwork, i) => (
            <div key={i} className='mb-4'>
                <div className="items-center text-left bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-400"
                >   
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <div className="flex">
                            <div>
                                <h4 className="flex-none ml-2 mr-5 text-2xl font-bold tracking-tight text-gray-900">{artwork.artworkName} by <i>{artwork.artistName}</i></h4>
                            </div>
                            <div className="flex-grow"></div>
                            <div>
                                <img className="flex-none h-auto max-w-80 min-w-40 rounded-t-lg md:rounded-none md:rounded-s-lg" src={artwork?.cloudinaryUrl} alt="" />
                            </div>
                        </div>
                        <div className='m-2'>
                            {artwork.medium && <p className="mb-3 font-normal text-gray-800">{artwork.medium}</p>}
                            <div className='flex'>
                                <div>
                                <p>
                                {(artwork.length && artwork.width) && <span className="mr-5 font-normal text-gray-800">{artwork.width}cm x {artwork.length}cm</span>}
                                </p>
                                </div>
                                <p>
                                {artwork.price && <b className="ml-80 font-normal text-gray-800 text-3xl text-end">£{artwork.price}</b>}
                                </p>
                            </div>
                        </div>
                        <div className='m-2'>
                            
                            
                        </div>
                        <div className='m-2'>
                        {(artwork.rarity === 'Rare' || artwork.rarity === 'Original')
                            ? <div>
                                <p className="mb-3 font-normal text-gray-800">{artwork.rarity}: Label: 1 of 1</p>
                              </div>
                            : artwork.rarity === 'Limited' 
                            ? (
                              <div>
                                <p className="mb-3 font-normal text-gray-800">{artwork.rarity}: Label: {artwork.labelTag} of {artwork.totalTags}</p>
                                </div>
                            ) 
                            : (
                            <div>
                                <p className="mb-3 font-normal text-gray-800">{artwork.rarity}</p>
                            </div>
                            )
                        }
                        </div>
                        <div className='m-2'>
                            <div className='overflow-auto h-40'>
                                    <p className="mb-3 font-normal text-gray-800">{artwork.description}</p>
                            </div>
                        </div>
                        <div className='m-2'>
                            <p className="mb-3 font-normal text-gray-800">www.art.africa</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    </div>
  );
};

export default Card;
