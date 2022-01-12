import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import BookingItem from "../BookingItem/BookingItem";
import authContext from "../../../context/auth-context";

const BookingList = (props) => {
  const context = useContext(authContext);
  const { allBookings, userBookings, cars } = props;

  const [displayBookings, setDisplayBookings] = useState();

  // const selectedBookings = allBookings?.allBookings?.filter(
  //   (booking) => booking?.event?._id == props.id
  // );

  useEffect(() => {
    if (context?.isAdmin) {
      let result = cars?.events.filter((o1) =>
        props?.bookings?.allBookings.some((o2) => o1?._id === o2?.event?._id)
      );
      setDisplayBookings(result);
    } else {
      let result = cars?.events.filter((o1) =>
        props?.bookings?.bookings.some((o2) => o1?._id === o2?.event?._id)
      );
      setDisplayBookings(result);
    }
  }, [props]);

  return (
    <div class="container">
      <div class="row">
        {displayBookings?.map((car) => (
          <li class="col-md-4" style={{ listStyle: "none" }}>
            <BookingItem
              key={car._id}
              id={car._id}
              make={car.make}
              description={car.description}
              GPS={car.GPS}
              airConditions={car.airConditions}
              audioInput={car.audioInput}
              bluetooth={car.bluetooth}
              carKit={car.carKit}
              childSeat={car.childSeat}
              climateControl={car.climateControl}
              luggage={car.luggage}
              mileage={car.mileage}
              model={car.model}
              music={car.music}
              onBoardComputer={car.onBoardComputer}
              price={car.price}
              remoteLocking={car.remoteLocking}
              seatBelts={car.seatBelts}
              seats={car.seats}
              sleepingBed={car.sleepingBed}
              transmision={car.transmision}
              urlImage={car.urlImage}
              water={car.water}
              fuel={car.fuel}
              result={
                context.isAdmin
                  ? props?.bookings?.allBookings
                  : props?.bookings?.bookings
              }
              admin={context.isAdmin}
            />
          </li>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
