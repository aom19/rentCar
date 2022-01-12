import { gql } from "@apollo/client";

export const BOOK_EVENT = gql`
  mutation BookEvent($eventId: ID!, $bookingInput: BookingInput) {
    bookEvent(eventId: $eventId, bookingInput: $bookingInput) {
      _id
    }
  }
`;

export const CANCEL_BOOK = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
    }
  }
`;
