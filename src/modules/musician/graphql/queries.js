import gql from 'graphql-tag';

export const myProfilesQuery = gql`
  {
    myProfile{
      id
      name
      genres
      country
      region
      currency
    }
  }
`;

export const myProfileWithThemeQuery = gql`
  {
    myProfile{
      id
      name
      genres
      country
      region
      currency
      events {
        id
        title
        address
        date
        price
      }
      products {
        id
        title
        price
        url
      }
      theme {
        style
        fonts
        sections {
          id
          name
          type
          content
          style
          widgets {
            id
            link
            sectionId
          }
        }
      }
    }
  }
`;

export const getCurrencyQuery = gql`
  {
    myProfile{
      currency
    }
  }
`;

export const hasProfileQuery = gql`
  {
    me{
      hasProfile
    }
  }
`;

export const allProfilesQuery = gql`
  {
    allProfiles{
      id
      name
      genres
      theme {
        name
      }
    }
  }
`;

export const fetchProfileQuery = gql`
  query fetchProfile($profileId: Int!){
    fetchProfile(profileId: $profileId) {
      id
      name
      genres
      country
      region
      currency
      products {
        id
        title
        price
        url
      }
      events {
        id
        title
        address
        date
        price
      }
      theme {
        style
        fonts
        sections {
          id
          name
          type
          content
          style
          widgets {
            id
            link
            sectionId
          }
        }
      }
    }
  }
`;

export const myProfileWithSectionsQuery = gql`
  {
    myProfile{
      id
      name
      genres
      country
      region
      currency
      theme {
        sections {
          id
          name
          type
          content
          style
          widgets {
            id
            link
            sectionId
          }
        }
      }
    }
  }
`;
