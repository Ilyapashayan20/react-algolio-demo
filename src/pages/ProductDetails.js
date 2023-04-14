import { Link, useParams } from 'react-router-dom';
import algoliasearch from 'algoliasearch';
import { useEffect , useState } from 'react';

const searchClient = algoliasearch(
  'AIWCS83VN4',
  '5e3936efe97626d6fd2a642c39acec0b',
  'ukpt_proddefault_products'
);

function ProductDetails() {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const getProduct = async () => {
      const index = searchClient.initIndex('ukpt_proddefault_products');
      const result = await index.getObject(id);
      setProduct(result);
    };
    getProduct();
  }, [id]);

  if (!product) {
    return <div className=''>Loading...</div>;
  }

  return (
    <div>
    <div className="product-details">
    <h1>{product.name}</h1>
    <img src={product.image_url} alt={product.name} />
    <p>{product.description}</p>
    <p>{product.price?.GBP.default_formated}</p>
  </div>
  <Link className='router_link' to={'/'} >Home page</Link>
  </div>

  
  );
}

export default ProductDetails;
