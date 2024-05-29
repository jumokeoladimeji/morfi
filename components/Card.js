import React from 'react';
import { useRouter } from 'next/router';
import { rarity } from '../data/rarity';

const Card = ({ data }) => {
  const router = useRouter();

  return (
    <div>
    <div className='w-full grid md:grid-cols-2 sm:grid-cols-1 gap-1'>
    {/* {data.map((artwork, i) => (
        <div className="md:flex">
            <div className="md:flex-shrink-0">
                <img className="rounded-lg md:w-56" src={artwork?.cloudinaryUrl} width="100" height="100" alt="Woman paying for a purchase" />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{artwork.artworkName} by <i>{artwork.artistName}</i></div>
                <a href="#" className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Finding customers for your new business</a>
            </div>
        </div>))} */}
        {data.map((artwork, i) => (
            <div key={i} className='mb-4'>
                {/* <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"> */}
                <div className="items-center text-left bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    // onClick={() =>
                    //     router.push(
                    //         `/artworks/${artwork?._id}`,
                    //     )
                    // }
                >   
                    <div className="md:flex">
                        <div className="mt-4 md:mt-0">
                            <h4 className="mb-2 mt-10 ml-10 mr-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{artwork.artworkName} by <i>{artwork.artistName}</i></h4>
                            {/* <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{artwork.artworkName} by <i>{artwork.artistName}</i></div> */}
                            {/* <a href="#" className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Finding customers for your new business</a> */}
                        </div>
                        <div className="md:flex-shrink-0">
                            <img className="object-cover w-full rounded-t-lg h-30 md:h-auto md:w-20 md:rounded-none md:rounded-s-lg" src={artwork?.cloudinaryUrl} alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        {/* <div className=''>
                            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{artwork.artworkName} by <i>{artwork.artistName}</i></h4>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                        </div> */}
                        <div className='m-2'>
                            {artwork.medium && <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{artwork.medium}</p>}
                        </div>
                        <div className='m-2'>
                            {(artwork.length && artwork.width) && <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{artwork.width} x {artwork.length}cm</p>}
                        </div>
                        <div className='m-2'>
                            {artwork.price && <h4 className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-2xl"><b>£{artwork.price}</b></h4>}
                        </div>
                        <div className='m-2'>
                        {(artwork.rarity === 'Rare' || artwork.rarity === 'Original')
                            ? <div>
                                <p>{artwork.rarity}</p>
                                <p>Label: 1 of 1</p>
                              </div>
                            : artwork.rarity === 'Limited' 
                            ? (
                              <div>
                                <p>{artwork.rarity}</p>
                                <p>Label: {artwork.labelTag} of {artwork.totalTags}</p>
                                </div>
                            ) 
                            : (
                            <div>
                            <p>{artwork.rarity}</p>
                            </div>
                            )
                        }
                        </div>
                        <div className='m-2'>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{artwork.description}</p>
                        </div>
                        <div className='m-2'>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">www.art.africa</p>
                        </div>
                    </div>
                    {/* <button
                  onClick={() =>
                      router.push(
                          `/artworks/${artwork?._id}`,
                      )
                  }
                  className="bg-[#000] hover:bg-[#7b7c7c] text-white py-1 px-2 rounded mr-2"
                >
                  View
                </button> */}
                </div>
            </div>
        ))}
    </div>
    </div>
  );
};

export default Card;
