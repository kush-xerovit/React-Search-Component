import React from "react";

import { SearchBox,InstantSearch,Hits } from "react-instantsearch-dom";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
function Hit({ hit }) {
  return (
    <div>
      <h2>{hit.title}</h2>
      <p>{hit.description}</p>
    </div>
  );
}
export default function Search(props) {
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({

  server: {
    apiKey: "abcd", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "localhost",
        port: "3000",
        path: "", // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "name,description,categories",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

return (
<InstantSearch indexName="products" searchClient={searchClient}>
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);
}
