import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import EditTable from '../components/EditTable';

const EditOptions = () => (
  <Query
    query={gql`
      {
        table: allOptions {
          nodes {
            oid
            name
            uniqueOption
            pointHero
            pointWarrior
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

export default EditOptions;
