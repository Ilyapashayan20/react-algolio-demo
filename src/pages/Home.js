import algoliasearch from 'algoliasearch';
import { Link } from 'react-router-dom';
// import {  useLocation } from 'react-router-dom';
import { Configure, SortBy, RefinementList, Highlight, Hits, InstantSearch, Pagination, SearchBox, } from 'react-instantsearch-dom';
// import { useEffect , useState} from 'react';

const searchClient = algoliasearch(
  'AIWCS83VN4',
  '5e3936efe97626d6fd2a642c39acec0b',
  'ukpt_proddefault_products'
);

function Home() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <InstantSearch searchClient={searchClient} >
          

          <div className='main' >
            <div>Search
              <SearchBox />
              <SortBy
                defaultRefinement="ukpt_proddefault_products"
                items={[
                  { value: 'ukpt_proddefault_products', label: 'Featured' },
                  { value: 'ukpt_proddefault_products_price_asc', label: 'Price asc.' },
                  { value: 'ukpt_proddefault_products_price_desc', label: 'Price desc.' },
                ]}
              />
              <RefinementList attribute="manufacturer" />
            </div>

            <div>
              <Configure hitsPerPage={8} />
              <div className='Products'>
                <Hits hitComponent={Product} />
              </div>
              <Pagination showFirst={false} showLast={false} />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

function Product({ hit }) {

  console.log(hit)

  return (

    <div className='product'>
      <Link to={`/product/${hit.objectID}`}>
        <Highlight attribute="name" hit={hit} />
        <img src={hit.image_url} align="left" alt={hit.name} />
        <p>{hit.price?.GBP.default_formated}</p>
      </Link>
    </div>

  );
}

export default Home;
