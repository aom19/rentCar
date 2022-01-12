import { gql, useQuery } from "@apollo/client";

export const CREATE_CAR = gql`
  mutation CreateCar($eventInput: EventInput) {
    createEvent(eventInput: $eventInput) {
      _id
      make
      model
      description
      mileage
      transmision
      seats
      luggage
      fuel
      airConditions
      GPS
      childSeat
      music
      seatBelts
      sleepingBed
      water
      bluetooth
      onBoardComputer
      audioInput
      carKit
      remoteLocking
      climateControl
      price
      urlImage
      creator {
        _id
        email
      }
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
    }
  }
`;
