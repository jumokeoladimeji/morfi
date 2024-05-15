import { useState} from "react";
import { useRouter } from 'next/router';
import { usePDF } from 'react-to-pdf';

export default function ArtworkList({ artworks }) {
    const router = useRouter();
    const [selectedArtworks, setSelectedArtworks] = useState([]);

    const handleSelectAllArtwork = () => {
        if (selectedArtworks.length < artworks.length) {
          setSelectedArtworks(artworks.map(({ _id }) => _id));
        } else {
          setSelectedArtworks([]);
        }
    };

    const handleSelectArtwork = (event) => {
        const artworkId = event.target.value;
    
        if (!selectedArtworks.includes(artworkId)) {
          setSelectedArtworks([...selectedArtworks, artworkId]);
        } else {
          setSelectedArtworks(
            selectedArtworks.filter((selectedArtworkId) => {
              return selectedArtworkId !== artworkId;
            })
          );
        }
    };

    const { toPDF, targetRef } = usePDF({
    	filename: `file.pdf`,
    });


  return (
    <div className="mx-6 my-6">
        {/* <button
                onClick={() => toPDF()}
                className="bg-yellow-800 hover:bg-yellow-600 text-white px-4 py-3 rounded-md"
            >
                Download Selected (PDF) Files
		</button> */}
        <div className=" border-slate-200 rounded-lg p-6 border-2">
						<div className="flex flex-row justify-between items-center mb-3">
							<h1
								style={{ fontFamily: 'Lobster Two' }}
								className=" text-2xl"
							>
							</h1>
						</div>
						<div className="overflow-x-auto">
							<table className="min-w-full border-collapse border border-gray-300">
								<thead>
									<tr>
										<th className="border border-gray-300 px-4 py-2">
										<input
											type="checkbox"
											checked={selectedArtworks.length === artworks.length}
											onChange={handleSelectAllArtwork}
										/>
										Select All
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Image
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Artwork Name
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Artist
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Description
										</th>
										<th className="border border-gray-300 px-4 py-2">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{artworks && artworks.map((artwork, i) => (
										<tr key={artwork._id}>
										<td className="border border-gray-300 px-4 py-2">
											<input
												type="checkbox"
												value={artwork._id}
												checked={selectedArtworks.includes(artwork._id)}
												onChange={handleSelectArtwork}
											/>
											</td>
                                            <td className="border border-gray-300 px-4 py-2"><img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                                                src={artwork?.cloudinaryUrl && artwork?.cloudinaryUrl} alt="" 
                                            /></td>
                                            <td className="border border-gray-300 px-4 py-2">{artwork.artworkName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{artwork.artistName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{artwork.description}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/artworks/${artwork?._id}`,
                                                        )
                                                    }
                                                    className="bg-[#000] hover:bg-[#7b7c7c] text-white py-1 px-2 rounded-md mr-2"
                                                >
                                                    View
                                                </button>
                                            </td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
	// try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artwork-details`);
        if (response.ok) {
            const artworks = await response.json();
            // setArtworks(artworks.data)
            // setIsLoading(true)
            return { props: { artworks: artworks.data }}
        }
    
}