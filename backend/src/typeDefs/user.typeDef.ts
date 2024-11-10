
export const userTypeDef = `#graphql
enum Gender {
  MALE
  FEMALE
}

  type User {
    id: ID!
    name: String!
    password: String!
    isWarden: Boolean
    validEmail: Boolean
    email: String!
    gender: Gender   # Use lowercase here for consistency
    createdAt: DateTime  # Using DateTime instead of Date
  }

  # Query Definitions
  type Query {
    authUser: User
    user(userId: ID!): User
  }

  # Mutation Definitions
  type Mutation {
    signup(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
  }

  # Input for SignUp
  input SignUpInput {
    email: String!
    password: String!
    gender: Gender!  # Using Gender Enum for gender field
  }

  # Input for Login
  input LoginInput {
    email: String!
    password: String!
  }

  # Logout Response
  type LogoutResponse {
    message: String!
  }
`