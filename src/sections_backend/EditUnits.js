import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import EditTable from '../components/EditTable';

const EditUnits = () => (
  <Query
    query={gql`
      {
        table: allFactions {
          nodes {
            fid
            name
            side
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      console.log(data);
      return <EditTable data={data} />;
    }}
  </Query>
);

export default EditUnits;
