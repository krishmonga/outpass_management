// 3. Mutation to create a new outpass
export const CREATE_OUTPASS = gql`
  mutation CreateOutpass($input: OutpassInput!) {
    createOutpass(input: $input) {
      id
      name
      dateFrom
      dateTo
      hostelNumber
      contactNumber
      reason
      block
      user {
        id
        username
      }
    }
  }
`;

// 4. Mutation to update an existing outpass
export const UPDATE_OUTPASS = gql`
  mutation UpdateOutpass($id: ID!, $input: OutpassInput!) {
    updateOutpass(id: $id, input: $input) {
      id
      name
      dateFrom
      dateTo
      hostelNumber
      contactNumber
      reason
      block
      user {
        id
        username
      }
    }
  }
`;

// 5. Mutation to delete an outpass
export const DELETE_OUTPASS = gql`
  mutation DeleteOutpass($id: ID!) {
    deleteOutpass(id: $id) {
      id
      name
    }
  }
`;