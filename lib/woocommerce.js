export const searchProducts = async (searchTerm) => {
    const url = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?search=${encodeURIComponent(searchTerm)}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')
      }
    });
  
    if (!response.ok) {
      console.error('Error fetching products:', response.statusText);
      return [];
    }
  
    const data = await response.json();
    return data;
  };
  