export async function searchWordPress(query) {
    const searchRes = await fetch(`https://art.africa/wp-json/wp/v2/search?subtype=product&search=${query}`);
    if (!searchRes.ok) {
      throw new Error('Failed to fetch search results');
    }
    const searchData = await searchRes.json();
    console.log('searchData', searchData)
  
    // Fetch author details for each result
    const resultsWithAuthor = await Promise.all(
        searchData.map(async (result) => {
            if (result.type === 'post') {
                console.log('result',result)
                const postRes = await fetch(`https://art.africa/wp-json/wp/v2/product/${result.id}`);
                if (!postRes.ok) {
                    throw new Error('Failed to fetch post details');
                }
                const postData = await postRes.json();
                const authorRes = await fetch(`https://art.africa/wp-json/wp/v2/users/${postData.author}`,{
                        mode: 'no-cors',
                        method: "get",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }
                )
                if (!authorRes.ok) {
                    throw new Error('Failed to fetch author details');
                }
                const authorData = await authorRes.json();
                return { ...result, author: authorData.name };
            }
            return result;
        })
    );
  
    return resultsWithAuthor;
  }
  