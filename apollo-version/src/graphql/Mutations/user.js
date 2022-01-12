import { gql } from "@apollo/client";
import jwtDecode from "jwt-decode";

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $address: String!
  ) {
    createUser(
      userInput: {
        email: $email
        password: $password
        lastName: $lastName
        firstName: $firstName
        phoneNumber: $phoneNumber
        address: $address
      }
    ) {
      _id
      email
    }
  }
`;

export const ADD_TO_BLACK_LIST = gql`
  mutation AddToBlackList($userId: ID!) {
    addToBlackList(userId: $userId) {
      _id
    }
  }
`;

export const LOGOUT = () => {
  localStorage.removeItem("userData");
};

export const AUTH = gql`
  mutation Auth($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      token
      tokenExpiration
    }
  }
`;

// export const signIn = () => {
//   if (localStorage.getItem("jwtToken")) {
//     let tokenGot = localStorage.getItem("jwtToken");
//     let parsedToken = JSON.parse(tokenGot);
//     // console.log(parsedToken?.token);
//     const decodedToken = jwtDecode(tokenGot);

//     // let token1 = JSON.parse(tokenGot);
//     // console.log(token1);
//     // console.log(tokenGot);

//     if (decodedToken.exp * 1000 < Date.now()) {
//       localStorage.removeItem("jwtToken");
//     } else {
//     }
//   }
// };
