import { gql } from "@apollo/client";

// 1. Query to fetch all outpasses
export const GET_ALL_OUTPASSES = gql`
  query getAllOutpasses($hostelName: HostelInput!) {
    getAllOutpasses(hostelName: $hostelName) {
      name
      dateFrom
      dateTo
      hostelNumber
      contactNumber
      reason
      block
      createdAt
      User {
      id
      email
    }
    
    }
  }
`;

// 2. Query to fetch a single outpass by ID
export const GET_OUTPASS = gql`
  query GetOutpass($id: ID!) {
    getOutpass(id: $id) {
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

