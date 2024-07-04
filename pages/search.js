// pages/search.js
import { useState } from 'react';
import { searchProducts } from '../lib/woocommerce';
import SearchCard from '../components/SearchCard';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearch = async () => {
    const products = await searchProducts(searchTerm);
    console.log('products', products)
    setResults(products);
    setDropdownVisible(true);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setDropdownVisible(false);
  };

  return (
    <div>
      <h1>Search Artworks</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-gray-700 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
      />
      <button onClick={handleSearch} className="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600">
        Search Artwork
      </button>

      <div className="relative mt-4">
        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Artworks</label>
        <div className="relative mt-2">
          <button
            type="button"
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded={dropdownVisible ? 'true' : 'false'}
            aria-labelledby="listbox-label"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            {selectedProduct ? (
              <span className="flex items-center">
                <img src={selectedProduct.images[0]?.src} alt={selectedProduct.name} className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selectedProduct.name}</span>
              </span>
            ) : (
              <span className="ml-3 block truncate">Select a product</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </button>

          {dropdownVisible && (
            <ul
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
            >
              {results.map((product) => (
                <li
                  key={product.id}
                  className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                  id={`listbox-option-${product.id}`}
                  role="option"
                  onClick={() => handleSelectProduct(product)}
                >
                  <div className="flex items-center">
                    <img src={product.images[0]?.src} alt={product.name} className="h-5 w-5 flex-shrink-0 rounded-full" />
                    <span className="ml-3 block truncate font-normal">{product.name}</span>
                  </div>
                  {selectedProduct && selectedProduct.id === product.id && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #000' }}>
          <h2>Selected Artwork</h2>
          <SearchCard artwork={selectedProduct} />
        </div>
      )}
    </div>
  );
};

export default Search;
