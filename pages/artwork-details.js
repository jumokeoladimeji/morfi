export async function getServerSideProps(context) {
    let res = await fetch(`${NEXT_PUBLIC_URL}/api/artwork-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let allArtworkDetails = await res.json();
  
    return {
      props: { allArtworkDetails },
    };
}
