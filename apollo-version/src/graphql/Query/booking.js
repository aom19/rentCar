import { gql } from "@apollo/client";

export const LOAD_BOOKINGS = gql`
  query {
    allBookings {
      _id
      pickUpLocation
      dropOffLocation
      pickUpDate
      dropOffDate

      user {
        _id
        firstName
        email
      }
      event {
        _id
      }
    }
  }
`;
export const LOAD_USER_BOOKINGS = gql`
  query {
    bookings {
      _id
      pickUpLocation
      dropOffLocation
      pickUpDate
      dropOffDate

      user {
        _id
        email
        firstName
      }
      event {
        _id
      }
    }
  }
`;
