import React, { useState, useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import "../components/Car/CarItem/CarItem.css";
import CarList from "../components/Car/CarList/CarList";
import Spinner from "../components/Spiner/Spinner";

import image1 from "../assets/img1.jpeg";

import AuthContext from "../context/auth-context";

import { LOAD_CARS } from "../graphql/Query/car";
import { LOAD_BOOKINGS } from "../graphql/Query/booking";

import Section from "../components/Section/Section";

const EventPage = () => {
  const context = useContext(AuthContext);

  const { data, loading, error } = useQuery(LOAD_CARS, {
    fetchPolicy: "cache-first",
  });

  const {
    loading: loadingBookings,
    error: errorFetchingBookings,
    data: dataBookings,
  } = useQuery(LOAD_BOOKINGS, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <div
      style={{
        // backgroundColor: "blue",
        width: "100%",
        height: "86vh",
      }}
    >
      <Section image={image1} name={" Choose Your Car"} page={"Cars"} />

      <section className="ftco-section">
        <CarList cars={data?.events} bookings={dataBookings?.allBookings} />
      </section>
    </div>
  );
};

export default EventPage;
