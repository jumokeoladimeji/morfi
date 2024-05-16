import React from 'react';
import { useRouter } from 'next/router';

const Table = ({ data, selectedRows, onSelectRow }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Select
            </th>
            <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Artwork Name
            </th>
            <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Artist
            </th>
            <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
            </th>
            <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((artwork, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">
              <input
                  type="checkbox"
                  checked={selectedRows.includes(i)}
                  onChange={() => onSelectRow(i)}
                />
              </td>
              <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                  src={artwork?.cloudinaryUrl && artwork?.cloudinaryUrl} alt="" 
                /></td>
              <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">{artwork.artworkName}</td>
              <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">{artwork.artistName}</td>
              <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">{artwork.description}</td>
              <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() =>
                      router.push(
                          `/artworks/${artwork?._id}`,
                      )
                  }
                  className="bg-[#000] hover:bg-[#7b7c7c] text-white py-1 px-2 rounded mr-2"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
