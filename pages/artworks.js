import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import ResumeCard from '../components/ResumeCard';
import Tag from '../components/Tag';

export default function ArtworkList({ artworks }) {
    
    const [selectedRows, setSelectedRows] = useState([]);
    const handleSelectRow = (index) => {
        setSelectedRows((prev) =>
          prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };
    
    const selectedData = selectedRows.map((index) => artworks[index]);

    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const { toPDF, targetRef } = usePDF({
      filename: `multiple-tags-${currentDate}.pdf`,
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
                        onClick={() => toPDF()}
                        className="mt-4 mb-4 px-4 py-2 bg-[#000] hover:bg-[#7b7c7c] text-white rounded"
                    >
                        Export Selected To PDF
                    </button>
                    <div>
                        <div>
                            <ResumeCard 
                                data={artworks}
                                selectable={true}
                                selectedIndices={selectedRows}
                                onSelect={handleSelectRow}
                            />
                        </div>
                        {/* Hidden PDF-only Render */}
                        <p className='text-xl font-bold'>SELECTED TAGS</p>
                        <div id="table-to-pdf" ref={targetRef}>
                            <div ref={targetRef}>
                                <Tag data={selectedData} />
                            </div>
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
