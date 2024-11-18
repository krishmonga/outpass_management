import { gql } from "@apollo/client";

// 3. Mutation to sign up a new user
export const SIGNUP_USER = gql`
  mutation SignUpUser($input: SignUpInput!) {
    signup(input: $input) {
      id
      name
      email
      gender
      isStudent
      validEmail
      createdAt
    }
  }
`;

// 4. Mutation to log in a user
export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      id
      name
      email
      gender
      isStudent
      validEmail
      createdAt
    }
  }
`;

// 5. Mutation to log out a user
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout {
      message
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($verifyToken: String!) {
    verifyUser(verifyToken: $verifyToken) {
      id
      validEmail
    }
  }
`;
