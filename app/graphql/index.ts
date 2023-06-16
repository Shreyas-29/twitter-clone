import { gql, request } from 'graphql-request';

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!;

export const getUpdates = async () => {
    const query = gql`
        query Trendings{
            trendingsConnection {
                edges {
                    cursor
                    node {
                        id
                        title
                        slug
                        about
                        tweet
                    }
                }
            }
        }
    `;
    const result: any = await request(graphqlAPI, query);
    return result.trendingsConnection?.edges;
}
