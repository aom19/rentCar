import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import Modal from "../components/Modal/Modal";
// import Backdrop from "../components/Backdrop/Backdrop";
// import AuthContext from "../context/auth-context";
// import "./Events.css";
import "../components/Car/CarItem/CarItem.css";
import CarList from "../components/Car/CarList/CarList";
// import Spinner from "../components/Spiner/Spinner";

import image1 from "../assets/img1.jpeg";

import * as carsActions from "../features/actions/cars";
import * as bookingActions from "../features/actions/booking";

import Section from "../components/Section/Section";

const EventPage = () => {
  const dispatch = useDispatch();

  // const [creating, setCreating] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState();
  // const newbooks = [];
  // const [events, setEvents] = useState([]);
  // const [bookings, setBookings] = useState([]);
  // const [newBookings, setNewBookings] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [values, setValues] = useState({
  //   numarInmatriculare: "",
  //   numarKilometri: "",
  //   date: "",
  //   marca: "",
  //   detaliiMarca: "",
  //   clasa: "",
  //   price: "",
  //   urlImage: "",
  //   description: "",
  // });
  // const context = useContext(AuthContext);

  useEffect(async () => {
    await dispatch(carsActions.fetchCars());
    await dispatch(bookingActions.fetchBookings());
  }, []);

  // useEffect(() => {
  //   bookedCarHandler();
  // }, [bookings]);

  // const bookedCarHandler = () => {
  //   bookings.map((book) => {
  //     newbooks.push(book.event);
  //   });

  //   const results = events.filter(
  //     ({ _id: value1 }) =>
  //       !newbooks.some(({ _id: value2 }) => value1 === value2)
  //   );
  //   setNewBookings(results);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  // const createHandler = () => {
  //   setCreating(true);
  // };

  return (
    <div
      style={{
        // backgroundColor: "blue",
        width: "100%",
        height: "86vh",
      }}
    >
      <Section image={image1} name={" Choose Your Car"} page={"Cars"} />
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
                  Cars <i class="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 class="mb-3 bread">Choose Your Car</h1>
            </div>
          </div>
        </div>
      </section> */}
      <section className="ftco-section">
        <CarList />
      </section>
    </div>
    // <React.Fragment>
    //   {(creating || selectedEvent) && <Backdrop />}
    //   {creating && (
    //     <Modal
    //       buttonTitle="Confirm"
    //       title="Add Car"
    //       canCancel
    //       canConfirm
    //       onCancel={modalCancelHandler}
    //       onConfirm={modalConfirmHandler}
    //     >
    //       <form>
    //         <div className="form-control">
    //           <label htmlFor="numarInmatriculare">Numar Inmatriculare</label>
    //           <input
    //             type="text"
    //             id="numarInmatriculare"
    //             name="numarInmatriculare"
    //             value={values.numarInmatriculare}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="numarKilometri">Numar kilometri</label>
    //           <input
    //             type="number"
    //             id="numarKilometri"
    //             name="numarKilometri"
    //             value={values.numarKilometri}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="date">Data Fabricatie</label>
    //           <input
    //             type="datetime-local"
    //             id="date"
    //             name="date"
    //             value={values.date}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="marca">Marca</label>
    //           <input
    //             type="text"
    //             id="marca"
    //             name="marca"
    //             value={values.marca}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="detaliiMarca">Detalii Marca</label>
    //           <input
    //             type="text"
    //             id="detaliiMarca"
    //             name="detaliiMarca"
    //             value={values.detaliiMarca}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="clasa">Clasa</label>
    //           <input
    //             type="text"
    //             id="clasa"
    //             name="clasa"
    //             value={values.clasa}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="form-control">
    //           <label htmlFor="price">Pret/ora</label>
    //           <input
    //             type="number"
    //             id="price"
    //             name="price"
    //             value={values.price}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="urlImage">Url-Image</label>
    //           <input
    //             type="text"
    //             id="urlImage"
    //             name="urlImage"
    //             value={values.urlImage}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="form-control">
    //           <label htmlFor="description">Description</label>
    //           <textarea
    //             type="text"
    //             id="description"
    //             rows="4"
    //             name="description"
    //             value={values.description}
    //             onChange={handleChange}
    //           />
    //         </div>
    //       </form>
    //     </Modal>
    //   )}
    //   {selectedEvent && (
    //     <Modal
    //       buttonTitle={context.token ? "Book" : "Confirm"}
    //       title={selectedEvent.marca}
    //       canCancel
    //       canConfirm
    //       onCancel={modalCancelHandler}
    //       onConfirm={bookEventHandler}
    //     >
    //       {/* <h1>{selectedEvent.clasa}</h1>
    //       <h2>${selectedEvent.price}</h2>
    //       <h2>{new Date(selectedEvent.date).toDateString()}</h2>
    //       <p>{selectedEvent.description}</p> */}
    //       <div>
    //         <h1>Marca :{selectedEvent.marca}</h1>

    //         <h2>Clasa : {selectedEvent.clasa}</h2>

    //         <h2>Numar Inmatriculare : {selectedEvent.numarInmatriculare}</h2>
    //         <h2>Detalii Marca : {selectedEvent.detaliiMarca}</h2>

    //         <h2>Numar Kilometri : {selectedEvent.numarKilometri} km</h2>
    //         <h2>
    //           Data fabricatie:
    //           <i>{new Date(selectedEvent.date).toDateString()}</i>{" "}
    //         </h2>
    //         <h2>
    //           {/* Price/hour: ${props.price} - {new Date(props.date).toDateString()} */}
    //           Price/hour: ${selectedEvent.price} /h
    //         </h2>
    //         <h2>description : {selectedEvent.description}</h2>
    //       </div>
    //     </Modal>
    //   )}

    //   {context.isAdmin === "true" && context.token ? (
    //     <div className="events-controls">
    //       <p>Share new cars!!</p>
    //       <button className="btn" onClick={createHandler}>
    //         Add a new car
    //       </button>
    //     </div>
    //   ) : (
    //     <div></div>
    //   )}
    //   {isLoading ? (
    //     <Spinner />
    //   ) : (
    //     <>
    //       <h2>

    //         {context.token === null
    //           ? "Please login , some cars can be booked !"
    //           : ""}
    //       </h2>
    //       <EventList
    //         // {
    //         //   context.token === null
    //         // }

    //         events={context.token === null ? events : newBookings}
    //         authUserId={context.userId}
    //         onViewDetail={showDetailHandler}
    //         onDelete={deleteHandler}
    //         isAdmin={context.isAdmin}
    //       />
    //     </>
    //   )}
    // </React.Fragment>
  );
};

export default EventPage;
