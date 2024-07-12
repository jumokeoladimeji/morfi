export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { searchTerm } = req.query;
        try {
            const result = await searchProductsApi(searchTerm);
            res.status(200).json({ message: 'Data retrieved successfully', data: result });
        } catch (error) {
            console.log('error', error)
            res.status(500).json({ message: 'Error retrieving data' });
        }
    }
    
}

const makeApiCall = async (url, auth) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
        }
    });
   return response
}

const fetchProducts = async (searchTerm) => {
    const url = `${process.env.WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?search=${encodeURIComponent(searchTerm)}`;
    const auth = Buffer.from(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')
    const response = await makeApiCall(url, auth)
  
    if (!response.ok) {
      console.error('Error fetching products:', response.statusText);
      return [];
    }
  
    const data = await response.json();
    return data;
};

const fetchAuthorDetails = async (authorId, name) => {
    const authorUrl = `${process.env.WOOCOMMERCE_BASE_URL}/wp-json/wp/v2/created-artist/${authorId}`;
    const auth = btoa(`${process.env.WORDPRESS_USER}:${process.env.WORDPRESS_PASSWORD}`);

    const response = await makeApiCall(authorUrl, auth)
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error fetching author details: ${response.statusText}`);
    }

    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error('Response is not valid JSON');
    }
    return await response.json();
};

const fetchAuthorDetailsFromUserEndpoint = async (authorId) => {
    const authorUrl = `${process.env.WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/customers/${authorId}`;
    const auth = btoa(`${process.env.WORDPRESS_USER}:${process.env.WORDPRESS_PASSWORD}`);
    

    const response = await makeApiCall(authorUrl, auth)
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
        const text = await response.text();
        return {message: `error retrieving author data: ${response.statusText}`}
    }

    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        return {message: 'error retrieving author data: Response is not valid JSON'}
    }

    return await response.json();
};

export const searchProductsApi = async (searchTerm) => {
    const products = await fetchProducts(searchTerm);
    const productsWithAuthorDetails = await Promise.all(products.map(async (product) => {
    const artistMeta = product.meta_data.find(meta => meta.key === 'select_artist')
    let author
    if (artistMeta && artistMeta.value !== '') {
        author = await fetchAuthorDetails(artistMeta.value, product.name);
    } else {
        const authorMeta = product.meta_data.find(meta => meta.key === 'select_post_author')
        author = await fetchAuthorDetailsFromUserEndpoint(authorMeta.value);
    }

    return {
        ...product,
        author
    };

  }));
  return productsWithAuthorDetails;
};
