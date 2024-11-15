// Enums
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

// Types
export interface User {
  id: string;
  name: string;
  password: string;
  isStudent?: boolean;
  validEmail: boolean;
  email: string;
  gender: Gender;
  createdAt: string; // Consider using Date type if working with dates
}

// Input Types
export interface SignUpInput {
  email: string;
  password: string;
  gender: Gender;
  userType: string
}

export interface LoginInput {
  email: string;
  password: string;
  userType : string
}

// Mutation Response Types
export interface LogoutResponse {
  message: string;
}

// Enums
export enum Block {
  A = "A",
  B = "B",
  C = "C",
  D = "D"
}

// Types
export interface User {
  id: string;
  name: string;
  password: string;
  isStudent?: boolean;
  validEmail: boolean;
  email: string;
  gender: Gender;
  createdAt: string; // Consider using Date type if working with dates
}

export interface Outpass {
  id: string;
  name: string;
  dateFrom: string; // You can use Date type if it's always a date
  dateTo: string;   // Same as above
  hostelNumber: string;
  contactNumber: string;
  reason: string;
  block: Block;
  user: User; // Reference to the User model
}

// Input Types
export interface OutpassInput {
  name: string;
  dateFrom: string; // Same as above, consider Date type if working with actual dates
  dateTo: string;   // Same as above
  hostelNumber: string;
  contactNumber: string;
  reason: string;
  block: Block;
  userId?: string;  // Optional field to link to an existing user
}


