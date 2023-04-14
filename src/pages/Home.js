import algoliasearch from 'algoliasearch';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  NumericMenu,
  Pagination,
  RefinementList,
  SearchBox,
  SortBy,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'AIWCS83VN4',
  '7b4db665057be4713aa278a4c829233a',
);

function Home() {
  // const [index, setIndex] = useState(null);

  // useEffect(() => {
  //   const initIndex = async () => {
  //     try {
  //       const algoliaIndex = searchClient.initIndex('ukpt_proddefault_products');
  //       setIndex(algoliaIndex);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   initIndex();
  // }, []);

  // useEffect(() => {
  //   if (index) {
  //     index.setSettings({
  //       searchableAttributes: [
  //         'categories',
  //         'price',
  //         'manufacture',
  //         'drill_type',
  //         'barcode',
  //         'type',
  //       ],
  //     })
  //       .then(() => {
  //         console.log('Setting searchable attributes');
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }, [index]);

  // console.log(index)

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <InstantSearch searchClient={searchClient} indexName="ukpt_proddefault_products">
          <div className="main">

            <div>
              Search
              <SearchBox />
              <SortBy
                defaultRefinement="ukpt_proddefault_products"
                items={[
                  { value: 'ukpt_proddefault_products', label: 'Featured' },

                ]}
              />
              <NumericMenu
                attribute="price"
                items={[{ label: 'All' }]}
              />
              <div>
                <h3>categories</h3>
              
              <RefinementList attribute="categories.level0" />
              </div>
              <div>
                <h3>Drill Type</h3>
              <RefinementList attribute="drill_type" />
              </div>
              <div>
                <h3>Manufacture</h3>
              <RefinementList attribute="manufacturer" />
              </div>
              <div>
              <h3>Barcode</h3>
              <RefinementList attribute="barcode" />
              </div>
              <div>
                <hr />
              <h3>Type</h3>
              <RefinementList attribute="type" />
              </div>
            </div>

            <div>
              <Configure hitsPerPage={8} />
              <div className="Products">
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
    <div className="product">
      <Link to={`/product/${hit.objectID}`}>
        <Highlight attribute="name" hit={hit} />
        <img src={hit.image_url} align="left" alt={hit.name} />
        <p>{hit.price?.GBP.default_formated}</p>
      </Link>
    </div>
  );
}

export default Home;
