import { gql } from 'apollo-boost';
export const POSTS = gql`
  query MyQuery {
    posts {
      nodes {
        slug
        date
        databaseId
        content
        title
        status
        featuredImage {
          title
          sourceUrl
        }
        categories {
          nodes {
            id
            slug
          }
        }
        dateGmt
      }
    }
  }  
`;
