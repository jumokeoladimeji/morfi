import { useState} from "react";
import { saveAs } from 'file-saver';

export default function Artworks({ artworks }) {
//   const [artworkData, setArtworks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false)


    const downloadQRCode = (artwork) => {
        // saveAs(artwork.qrImageUrl, `${artwork.artworkName}-by-${artwork.artistName}-qrcode.png`);
        // setIsLoading(true)
    };

  return (
    <div className="overflow-y-auto mx-auto mx-6 my-6">
        {artworks && artworks.map((artwork, i) => (
            <div className="flex flex-col mt-2" key={artwork._id}>
                <article className="flex m-t-6 items-center bg-gray-100">
                {/* <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"> */}
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                        src={artwork?.cloudinaryUrl && artwork?.cloudinaryUrl} alt="" 
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {artwork.artworkName}</h5>
                        by <span>{artwork.artistName}</span>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{artwork.description}</p>
                        <p>View on the website: {artwork.artWorkURL}</p>
                    </div>
                    {/* <button
                        className="flex flex-col mt-10 bg-yellow-800 hover:bg-yellow-600 text-white font-bold py-2 px-4 w-full rounded"
                        onClick={downloadQRCode(artwork)}
                        disabled={!artwork?.cloudinaryUrl}
                    >
                    Download PNG
                        
                    </button> */}
                {/* </a> */}
                </article>
            </div>
        ))}
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