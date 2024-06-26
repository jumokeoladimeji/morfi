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
    // console.log('testdata', testdata)
    const testdata = [
        { 
            id:'664a611d5c5484f3c9cc2b7c',
            artistName: "Femi Odunlami",
            artWorkURL: "https://staging.art.africa/oluwashogo-ajayi-2/artwork/omobolanle-iv-a-…",
            artworkName: "Test Art",
            description:
            "This artwork is a poignant portrait rendered primarily in monochromatic tones, with strategic uses of color to highlight and contrast elements of the image. It depicts a young girl with her finger gently placed to her lips, a universal gesture that suggests silence or contemplation. Her expression is serene yet intense, with eyes that seem to gaze directly at the viewer, creating an immediate emotional connection. The background and the girl's clothing are washed in a sepia-like tone, reminiscent of aged photographs, which adds a timeless quality to the piece. The use of black and white for the girl's features sharply contrasts with the muted background, emphasizing her expression and the details of her face and headscarf. Splashes of purple and strokes of darker colors drape her shoulders and upper body, suggesting a garment or a shadow. The artwork's simplicity in its color palette belies the complexity of its emotional and visual impact. A solitary bird, drawn in a minimalistic style, soars above her head, adding a layer of symbolism perhaps indicative of freedom or aspiration. The drip marks and the uneven edges of the colors contribute to a raw, organic feel, enhancing the overall emotiveness of the piece. This painting could be interpreted in various ways but fundamentally speaks to themes of innocence, introspection, and perhaps the quiet strength found in stillness. It is a powerful example of how visual art can evoke storytelling and profound emotional responses from its audience.",
            cloudinaryUrl:
            "https://res.cloudinary.com/dpulrbzww/image/upload/v1716989409/me9jryacjaic6a1yjpjv.png",
            labelTag:
            "",
            length:
            "15",
            price:
            "80",
            rarity:
            "Rare",
            width:
            "23",
            medium: "acrylic"
        },
        { 
            id:'664a1d5c5484f3c9cc2b7c',
            artistName: "Art.Africa Studio",
            artWorkURL: "https://staging.art.africa/oluwashogo-ajayi-2/artwork/omobolanle-iv-a-…",
            artworkName: "The First Sanctuary",
            description:
            "This artwork is a poignant portrait rendered primarily in monochromati…",
            cloudinaryUrl:
            "https://res.cloudinary.com/dpulrbzww/image/upload/v1716989409/me9jryacjaic6a1yjpjv.png",
            labelTag:
            "",
            length:
            "15",
            price:
            "80",
            rarity:
            "Rare",
            width:
            "23",
            medium: "Acrylic /oil painting on Canvas"
        },
        { 
            id:'664a611d5c5484cc2b7c',
            artistName: "Debabrata Artist",
            artWorkURL: "https://staging.art.africa/oluwashogo-ajayi-2/artwork/omobolanle-iv-a-…",
            artworkName: "Debu’s Art Work",
            description:
            "A very successful, wealthy lawyer, Edward Lewis (Richard Gere), hires a beautiful and unlikely prostitute, Vivian Ward (Julia Roberts), from Sunset Blvd to bring along to various business events. An attraction develops between the two, and Edward finds it harder and harder to let the infectious, kind-heart Vivian go.",
            cloudinaryUrl:
            "https://res.cloudinary.com/dpulrbzww/image/upload/v1716989409/me9jryacjaic6a1yjpjv.png",
            labelTag:
            "",
            length:
            "15",
            price:
            "80",
            rarity:
            "Rare",
            width:
            "23",
            medium: "35mm film|-|Acrylic|-|Adire"
        }
    ]
	// try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artwork-details`);
    // if (response.ok) {
    //     const artworks = await response.json();
    //     return { props: { artworks: artworks.data }}
    // }
    return { props: { artworks: testdata }}
}
