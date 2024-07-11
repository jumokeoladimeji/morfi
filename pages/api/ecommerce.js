
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { searchTerm } = req.query;
        try {
            const result = await searchProductsApi(searchTerm);
            res.status(200).json({ message: 'Data retrieved successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving data' });
        }
    }
    
}

const fetchProducts = async (searchTerm) => {
    const url = `${process.env.WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?search=${encodeURIComponent(searchTerm)}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')
      }
    });
  
    if (!response.ok) {
      console.error('Error fetching products:', response.statusText);
      return [];
    }
  
    const data = await response.json();
    return data;
};

const fetchAuthorDetails = async (authorId) => {
    console.log('authorId::', authorId)
    const authorUrl = `${process.env.WOOCOMMERCE_BASE_URL}/wp-json/wp/v2/created-artist/${authorId}`;
    const auth = btoa(`${process.env.WORDPRESS_USER}:${process.env.WORDPRESS_PASSWORD}`);
    const response = await fetch(authorUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`
        }
      });
    return response.json();
};

export const searchProductsApi = async (searchTerm) => {
  const products = await fetchProducts(searchTerm);
  const productsWithAuthorDetails = await Promise.all(products.map(async (product) => {
    const artistMeta = product.meta_data.find(meta => meta.key === 'select_artist')
    if (artistMeta) {
        const author = await fetchAuthorDetails(artistMeta.value);
        return {
            ...product,
            author
        };
    } else {
        return product
    }
    
  }));
  return productsWithAuthorDetails;
};
