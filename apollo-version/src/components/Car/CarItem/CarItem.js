import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";

import AuthContext from "../../../context/auth-context";

import "./CarItem.css";
import { deleteCar } from "../../../features/actions/cars";
import { DELETE_CAR } from "../../../graphql/Mutations/car";
import { LOAD_CARS } from "../../../graphql/Query/car";

const CarItem = (props) => {
  const [deleteEvent, { error, loading }] = useMutation(
    DELETE_CAR
    // {refetchQueries: [LOAD_CARS, "events"],}

    // {
    //   update: (cache, { data }) => {
    //     const deletedCar = data?.deleteEvent;
    //     console.log(deletedCar);

    //     const existingCars = cache.readQuery({
    //       query: LOAD_CARS,
    //     });
    //     const filteredCars = existingCars?.events?.filter(
    //       (x) => x._id !== deletedCar._id
    //     );
    //     console.log(filteredCars);

    //     cache.writeQuery({
    //       query: LOAD_CARS,
    //       data: {
    //         events: [filteredCars],
    //       },
    //     });
    //   },
    // }
  );

  const context = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/car/${props.id}`, { params: props });
  };

  const handleDelete = (id) => {
    deleteEvent({
      variables: {
        eventId: id,
      },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: "Event" });
        cache.evict({ id: normalizedId });
        cache.gc();
        console.log(cache.data);
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
        <h2 class="mb-0">
          <a >{props.make}</a>
        </h2>
        <div class="d-flex mb-3">
          <span class="cat">{props.model}</span>
          <p class="price ml-auto">
            {props.price} $ <span>/day</span>
          </p>
        </div>
        <p class="d-flex mb-0 d-block">
          {context?.token && !context?.isAdmin ? (
            <button onClick={handleSubmit} class="btn btn-primary py-2 mr-1">
              Book now
            </button>
          ) : context?.token && context?.isAdmin ? (
            <button
              class="btn btn-danger py-2 mr-1 text-white"
              onClick={() => handleDelete(props.id)}
            >
              Delete
            </button>
          ) : (
            <></>
          )}

          <button class="btn btn-secondary py-2 ml-1" onClick={handleSubmit}>
            Details
          </button>
        </p>
      </div>
    </div>
  );
};

export default CarItem;
