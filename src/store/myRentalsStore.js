import React, { useState, createContext } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
const defaultRentals = [
  {
    id: 1,
    carId: 1,
    from: "18.03.2022",
    to: "20.03.2022",
  },
  {
    id: 2,
    carId: 3,
    from: "25.03.2022",
    to: "27.03.2022",
  },
  {
    id: 3,
    carId: 5,
    from: "27.03.2022",
    to: "27.03.2022",
  },
];

export const MyRentalsContext = createContext({});

const MyRentalsStore = ({ children }) => {
  const [rentals, setRentals] = useState(defaultRentals);

  const removeRental = (rental) => {
    setRentals((prevRentals) =>
      prevRentals.filter(({ id }) => id !== rental.id)
    );
    axios.post(`/payment/cancel?id=${rental.id}`);
  };

  const insertRental = (rental, user, ammount) => {
    setRentals((prevRentals) => [...prevRentals, { id: uuid(), ...rental }]);

    axios.post("/payment/add", {
      type: "rental",
      customer: user.email,
      ammount: ammount,
    });
  };

  return (
    <MyRentalsContext.Provider value={{ rentals, removeRental, insertRental }}>
      {children}
    </MyRentalsContext.Provider>
  );
};

export default MyRentalsStore;
