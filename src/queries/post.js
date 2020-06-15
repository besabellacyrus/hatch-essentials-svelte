import { gql } from 'apollo-boost';
export const PAGE = gql`
	query MyQuery($slug: String!) {
  	post(id: $slug, idType: SLUG) {
	    categories {
	      nodes {
	        uri
	        slug
	      }
	    }
	    date
	    slug
	    status
	    title
	    content
	  }
	}
`;
