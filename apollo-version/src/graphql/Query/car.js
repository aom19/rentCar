import { gql, useQuery } from "@apollo/client";

export const LOAD_CARS = gql`
  query {
    events {
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
