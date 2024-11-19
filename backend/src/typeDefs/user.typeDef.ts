
export const userTypeDef = `#graphql
enum Gender {
  MALE
  FEMALE
}

  type User {
    id: ID!
    name: String!
    password: String!
    isStudent: Boolean
    userType: String!
    validEmail: Boolean
    email: String!
    gender: Gender   # Use lowercase here for consistency
    createdAt: String  # Using DateTime instead of Date
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
    verifyUser(verifyToken: String!) : User  
  }

  # Input for SignUp
  input SignUpInput {
    email: String!
     userType: String!
    password: String!
    confirmPassword: String!
    gender: Gender!  # Using Gender Enum for gender field
  }

  # Input for Login
  input LoginInput {
    email: String!
    password: String!
    userType: String!
  }

  # Logout Response
  type LogoutResponse {
    message: String!
  }
`