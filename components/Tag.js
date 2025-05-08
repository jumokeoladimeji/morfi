// import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
    FaInstagram,
    FaGlobe
  } from "react-icons/fa";

const Tag = ({ data }) => {
    const router = useRouter();
  
    return (
      <div>
      <div className='w-full grid md:grid-cols-2 sm:grid-cols-1 gap-1'>
          {data.map((artwork, i) => (
              <div key={i} className='mb-4'>
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
                              </div>
                                 
                          </div>
                          <div className='m-8'>
                              
                              
                          </div>
                          <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xl text-gray-700 tracking-tight">
                            <p className="flex items-center gap-2 mt-4 sm:mt-0 text-xl">
                                <FaGlobe size={16}/>
                                www.art.africa
                            </p>
                            <p className="flex items-center gap-2 mt-4 sm:mt-0 text-xl">
                                <FaInstagram size={16} />
                                wwwartafrica
                            </p>
                        </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
      </div>
    );
  };

export default Tag;
