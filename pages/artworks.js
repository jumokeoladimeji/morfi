import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import ResumeCard from '../components/ResumeCard';

export default function ArtworkList({ artworks }) {
    // const [selectedArtworks, setSelectedArtworks] = useState([]);
    
    const [selectedRows, setSelectedRows] = useState([]);
    const handleSelectRow = (index) => {
        setSelectedRows((prev) =>
          prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
    };
    
    const selectedData = selectedRows.map((index) => artworks[index]);
    console.log('selectedRows', selectedRows)
    console.log('selectedData', selectedData)

    const { toPDF, targetRef } = usePDF({
    	filename: 'muliple-qrcodes.pdf',
    });

    if (artworks) {
        return (
            <div className="mx-6 my-6 dark:text-white bg-white">
                <div className="border-slate-200 rounded-lg p-6 border-2">
                    <div className="justify-between items-center text-center mb-3">
                        <h1
                            style={{ fontFamily: 'Lobster Two' }}
                            className="text-2xl text-gray-800"
                        >
                            TAGS
                        </h1>
                    </div>
                    <button
                        // onClick={() => exportSelectedRowsToPDF('selected-rows-to-pdf')}
                        onClick={() => toPDF()}
                        className="mt-4 mb-4 px-4 py-2 bg-[#000] hover:bg-[#7b7c7c] text-white rounded"
                    >
                        Export To PDF
                    </button>
                    <div>
                        <div id="table-to-pdf" ref={targetRef}>
                            <ResumeCard data={artworks} />
                        </div>
                    </div>

                </div>
            </div>
    );
    } else {
        return <div>loading...</div>
    }
}

export async function getServerSideProps(ctx) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artwork-details`);

        if (!response.ok) {
            console.error(`Error fetching artworks: ${response.statusText} (${response.status})`);
            return {
                props: {
                    artworks: [],
                    ok: false,
                    reason: `Failed to fetch artworks: ${response.statusText}`
                }
            };
        }

        const artworks = await response.json();
        return { props: { artworks: artworks.data, ok: true } };
    } catch (error) {
        console.error('Network or server error:', error.message);
        console.error('Full error details:', error);
        return {
            props: {
                artworks: [],
                ok: false,
                reason: 'An error occurred while fetching artworks.'
            }
        };
    }
}
