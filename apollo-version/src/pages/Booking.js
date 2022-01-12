import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";

import Spinner from "../components/Spiner/Spinner";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import BookingList from "../components/Bookings/BookingList/BookingList";

import image1 from "../assets/bg_7.jpeg";

import Section from "../components/Section/Section";

import { gql, useQuery } from "@apollo/client";
import { LOAD_CARS } from "../graphql/Query/car";
import { LOAD_BOOKINGS, LOAD_USER_BOOKINGS } from "../graphql/Query/booking";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState();
  const [badUser, setBadUser] = useState();

  const context = useContext(AuthContext);

  const {
    loading,
    error,
    data: dataCars,
  } = useQuery(LOAD_CARS, {
    fetchPolicy: "cache-and-network",
  });
  const {
    loading: loadingBookings,
    error: errorFetchingBookings,
    data: dataBookings,
  } = useQuery(LOAD_BOOKINGS, {
    fetchPolicy: "cache-and-network",
  });
  const {
    loading: loadingUserBookings,
    error: errorFetchingUserBookings,
    data: dataUserBookings,
  } = useQuery(LOAD_USER_BOOKINGS, {
    fetchPolicy: "cache-and-network",
  });
  console.log(dataUserBookings);

  // console.log(context.isAdmin ? dataBookings : dataUserBookings);
  return (
    <React.Fragment>
      <div
        style={{
          // backgroundColor: "blue",
          width: "100%",
          height: "72vh",
        }}
      >
        <Section image={image1} name={"Bookings"} />
        {(loadingBookings || loadingUserBookings) && <Spinner />}
        <section className="ftco-section ">
          <BookingList
            cars={dataCars}
            bookings={context.isAdmin ? dataBookings : dataUserBookings}
          />
        </section>

        {/* <section
          class="hero-wrap hero-wrap-2 js-fullheight ftco-degree-bg"
          style={{
            backgroundImage: `url(${image1})`,
            // backgroundSize: "cover",
            backgroundPosition: "center",
            // overflow: "hidden",
            zIndex: -999,
          }}
          data-stellar-background-ratio="0.5"
        >
          <div class="overlay"></div>
          <div class="container">
            <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
              <div class="col-md-9  pb-5">
                <p class="breadcrumbs">
                  <span>
                    About us <i class="ion-ios-arrow-forward"></i>
                  </span>
                </p>
                <h1 class="mb-3 bread">About Us</h1>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </React.Fragment>
  );
};

export default BookingPage;
