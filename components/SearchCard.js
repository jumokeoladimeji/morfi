import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaTwitch,
  } from "react-icons/fa";

const SearchCard = ({ artwork }) => {
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
                                <h4 className="flex-none text-2xl font-bold tracking-tight text-gray-900 capitalize underline underline-offset-8 underline-gray-800">{artwork.name}</h4>
                                <p className='mt-6'>
                                    {(artwork.dimensions.length && artwork.dimensions.width) && <span className="font-normal text-gray-800">{artwork.dimensions.width} cm x {artwork.dimensions.length} cm</span>}
                                </p>
                            </div>
                            <div className="flex-grow"></div>
                            <div>
                                <img className="flex-none h-auto max-w-40 min-w-20 rounded-t-lg md:rounded-none md:rounded-s-lg" src={artwork?.cloudinaryUrl} alt="" />
                                <p>
                                {artwork.price && <b className="ml-2 font-normal text-gray-800 text-3xl text-end">£{artwork.price}</b>}
                                </p>
                            </div>
                        </div>
                        {/* <div className='m-2'>
                            <div className='flex flex-row-reverse'>
                                <p>
                                {artwork.price && <b className="ml-80 font-normal text-gray-800 text-3xl text-end">£{artwork.price}</b>}
                                </p>
                            </div>
                        </div> */}
                        <div className='m-2'>
                            
                            
                        </div>
                        <div className='m-2'>
                            <div className='overflow-auto h-40'>
                                    <p className="font-normal mt-6 text-gray-800">{artwork.description}</p>
                            </div>
                        </div>
                        <div className='mt-6 border-t-4 border-gray-800 flex flex-row'>
                            <div class="mt-5">
                                <p class="flex"><FaInstagram className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p class="flex"><FaTwitter className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p class="flex"><FaTwitch className="z-20 mr-2 mt-2" size={15} />@artafricatv</p>
                                <p class="flex"><FaFacebook className="z-20 mr-2 mt-2" size={15} />wwwartafrica</p>
                                <p className="font-normal mt-5 text-gray-800">www.art.africa</p>
                            </div>
                            <div class="ml-12 mt-5">
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
