import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { CANCEL_BOOK } from "../../../graphql/Mutations/booking";
import {
  LOAD_BOOKINGS,
  LOAD_USER_BOOKINGS,
} from "../../../graphql/Query/booking";

const BookingItem = (props) => {
  // const [selectedBooking, setSelectedBooking] = useState();
  const [
    cancelBooking,
    { error: errorCreateBooking, loading: loadingCancelBoooking },
  ] = useMutation(CANCEL_BOOK);

  // const selectedBooking = props.result;
  const selectedBooking = props.admin
    ? props.result?.filter((booking) => booking?.event?._id == props.id)
    : props?.result?.filter((booking) => booking?.event?._id == props.id);

  const history = useHistory();

  const handleDelete = (id) => {
    cancelBooking({
      variables: {
        bookingId: selectedBooking[0]._id,
      },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: "Booking" });
        cache.evict({ id: normalizedId });
        cache.gc();
        console.log(cache.data);
      },
    });
  };

  const handleSubmit = () => {
    console.log(props);
    history.push({
      pathname: `/bookings/${selectedBooking[0]._id}`,
      state: {
        data: props,
        book: selectedBooking,
      },
    });
  };

  return (
    <div class="car-wrap rounded ">
      <div
        class="img rounded d-flex align-items-end"
        style={{ backgroundImage: `url(${props.urlImage})` }}
      ></div>
      <div class="text">
        <h2 class="mb-0">{props.make}</h2>
        <div class="d-flex mb-1">
          <span class="cat">{props.model}</span>
          <p class="price ml-auto">
            {props.price} <span>/day</span>
          </p>
        </div>
        {props.admin && (
          <div class="d-flex mb-1">
            <span class="cat">Booked:</span>
            <p class="price ml-auto">{selectedBooking[0]?.user?.email}</p>
          </div>
        )}
        <p class="d-flex mb-0 d-block">
          <a
            class="btn btn-danger py-2 mr-1 text-white"
            onClick={() => handleDelete(selectedBooking[0]._id)}
          >
            Cancel
          </a>
          <a class="btn btn-primary py-2 ml-1" onClick={handleSubmit}>
            Details
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookingItem;
