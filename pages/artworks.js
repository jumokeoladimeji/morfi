import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import Table from '../components/Table';
import { exportSelectedRowsToPDF } from '../utils/exportToPdf';

const data = [
    { name: 'John Doe', age: 28, address: '123 Main St' },
    { name: 'Jane Smith', age: 34, address: '456 Maple Ave' },
    { name: 'Sam Green', age: 45, address: '789 Oak Dr' },
];
  

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

    return (
        <div className="mx-6 my-6">
            <div className=" border-slate-200 rounded-lg p-6 border-2">
                <div className="justify-between items-center text-center mb-3">
                    <h1
                        style={{ fontFamily: 'Lobster Two' }}
                        className="text-2xl"
                    >
                        QRCODES
                    </h1>
                </div>
                <button
                    // onClick={() => exportSelectedRowsToPDF('selected-rows-to-pdf')}
                    onClick={() => toPDF()}
                    className="mt-4 px-4 py-2 bg-[#000] hover:bg-[#7b7c7c] text-white rounded"
                >
                    Export Selected Rows to PDF
                </button>
                {selectedRows.length > 0 && (
                <div className='text-center'>
                    <h1
                        style={{ fontFamily: 'Lobster Two' }}
                        className="text-xl"
                    >
                        SELECTED ROWS
                    </h1>
                    <div id="selected-rows-to-pdf" ref={targetRef}>
                        <Table data={selectedData} selectedRows={selectedRows} onSelectRow={() => {}} />
                    </div>
                </div>
                )}
                <div>
                <div id="table-to-pdf">
                    <Table data={artworks} selectedRows={selectedRows} onSelectRow={handleSelectRow} />
                </div></div>

            </div>
        </div>
  );
}

export async function getServerSideProps(ctx) {
	// try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artwork-details`);
        if (response.ok) {
            const artworks = await response.json();
            return { props: { artworks: artworks.data }}
        }
    
}