import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import gql from "graphql-tag";
import fetch from "cross-fetch";

const getNftByTokenIds = async (tokenIds: string[]) => {
  try {
    const cache = new InMemoryCache();

    const clientApollo = new ApolloClient({
      cache: cache,
      link: new HttpLink({
        uri: process.env.GRAPH_URL,
        fetch: fetch,
      }),
    });

    const QUERY_APOLLO = gql`
      query MyQuery($tokenIds: [String]) {
        series(where: { id_in: $tokenIds, is_mintable: true }) {
          id
          is_mintable
          extra
          description
          creator_id
          reference
          title
          price
          price_near
          media
        }
      }
    `;

    const res = await clientApollo.query({
      query: QUERY_APOLLO,
      variables: { tokenIds },
    });

    const data = res.data.series;

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error ApolloQuery");
  }
};

const getNftsByWallet = async (wallet: string) => {
  try {
    const cache = new InMemoryCache();

    const clientApollo = new ApolloClient({
      cache: cache,
      link: new HttpLink({
        uri: process.env.GRAPH_URL,
        fetch: fetch,
      }),
    });

    const QUERY_APOLLO = gql`
      query MyQuery($wallet: String) {
        nfts(where: {owner_id: $wallet}) {
          typetoken_id
          title
          serie_id
          owner_id
          id
          fecha
          metadata {
            media
            creator_id
            reference
            title
            description
            extra
          }
        }
      }
    `;

    const res = await clientApollo.query({
      query: QUERY_APOLLO,
      variables: { wallet },
    });

    const data = res.data.nfts;

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error ApolloQuery");
  }
};

export default { getNftByTokenIds, getNftsByWallet };
