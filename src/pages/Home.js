import algoliasearch from 'algoliasearch';
import { Link } from 'react-router-dom';
import React from 'react';

// import {  useLocation } from 'react-router-dom';
import { Configure, NumericMenu, SortBy, RefinementList, Highlight, Hits, InstantSearch, Pagination, SearchBox, } from 'react-instantsearch-dom';
import { useEffect, useState } from 'react';

const searchClient = algoliasearch(
  'AIWCS83VN4',
  '5e3936efe97626d6fd2a642c39acec0b',
  'ukpt_proddefault_products'
);

function Home() {

  const [index, setIndex] = useState(null);


  useEffect(() => {
    const initIndex = async () => {
      const algoliaIndex = searchClient.initIndex('ukpt_proddefault_products');
      setIndex(algoliaIndex);
    };
    initIndex();
  }, [searchClient]);

  useEffect(() => {
    if (index) {
      index.setSettings({
        searchableAttributes: ['categories', 'price', 'drill_type', 'barcode', 'type'],
      });
    }
  }, [index]);

  console.log(index)

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <InstantSearch searchClient={searchClient} indexName="ukpt_proddefault_products" >


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
              <NumericMenu
                attribute="price"
                items={[
                  { label: 'All' },

                ]}
              />
              <RefinementList attribute="categories.level0" />
              <hr></hr>
              <RefinementList attribute="drill_type" />
              <hr></hr>
              <RefinementList attribute="barcode" />
              <hr></hr>
              <RefinementList attribute="type" />

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
