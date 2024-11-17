export const outpassTypeDef = `#graphql
enum Block {
  A
  B
  C
  D
}

enum HostelInput {
  AZAD_HOSTEL 
  PARMAR_HOSTEL
  SHASHTRI_HOSTEL
  GEETA_BHAWAN
}

  type Outpass {
    id: ID!
    name: String!
    dateFrom: String!
    dateTo: String!
    hostelNumber: String!
    contactNumber: String!
    reason: String!
    block: Block!
    user: User   # A reference to the User model (Ensure User type is defined elsewhere)
  }

  # Input Type for Creating or Updating an Outpass
  input OutpassInput {
    name: String!
    dateFrom: String!
    dateTo: String!
    hostelNumber: String!
    contactNumber: String!
    reason: String!
    block: Block!
    userId: String!  # Optional, to link to an existing user
    hostelName: HostelInput!
  }

  # Query to Fetch an Outpass or All Outpasses
  type Query {
    getAllOutpasses(hostelName: HostelInput): [Outpass!]!
    getOutpass(id: ID!): Outpass
  }
input UpdateOutpassInput {
  name: String
  dateFrom: String
  dateTo: String
  hostelNumber: String
  contactNumber: String
  reason: String
  block: Block
  userId: String
}

  # Mutations to Create, Update, or Delete an Outpass
  type Mutation {
    createOutpass(input: OutpassInput!): Outpass
    updateOutpass(id: ID!, input: UpdateOutpassInput!): Outpass
    deleteOutpass(id: ID!): Outpass
  }
`