import { usePDF } from 'react-to-pdf';
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

export default function Artwork() {
    const router = useRouter()
    const { id } = router.query
	const [artwork, setArtwork] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchartwork = async () => {
			try {
				setLoading(true);
				if (id) {
					const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artworks/${id}`);
                    if (response.ok) {
                        const data = await response.json()
                        console.log('data', data)
                        setArtwork(data.data);
                        setLoading(false);
                    }
				} else {
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
			}
		};

		fetchartwork();
	}, [id]);

    const { toPDF, targetRef } = usePDF({
    	filename: `artwork-${artwork.artworkName}-by-${artwork.artistName}.pdf`,
    });

    return (
        <div className="overflow-y-auto mx-auto mx-6 my-6">
            <div className="flex flex-col mt-2" ref={targetRef}>
                <article className="flex m-t-6 items-center bg-gray-100">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                        src={artwork?.cloudinaryUrl} alt="" 
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900"> {artwork?.artworkName}</h5>
                        by <span>{artwork?.artistName}</span>
                        <p className="mb-3 font-normal text-gray-700">{artwork?.description}</p>
                        {/* <p><a href={artwork?.artWorkURL}>Click to View on the website</a></p> */}
                    </div>
                </article>
            </div>
            <button
                onClick={() => toPDF()}
                className="bg-[#000] hover:bg-[#7b7c7c] text-white px-4 py-3 rounded-md"
            >
                Download (PDF)
		    </button>
        </div>
    );
}