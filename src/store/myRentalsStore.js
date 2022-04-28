import React, { useState, createContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
const defaultRentals = [
  {
    id: 1,
    carId: 1,
    from: new Date("18.03.2022"),
    to: new Date("20.03.2022"),
  },
  {
    id: 2,
    carId: 3,
    from: new Date("25.03.2022"),
    to: new Date("27.03.2022"),
  },
  {
    id: 3,
    carId: 5,
    from: new Date("27.03.2022"),
    to: new Date("27.03.2022"),
  },
];

export const MyRentalsContext = createContext({});

const MyRentalsStore = ({ children }) => {
  const rentalsLocal = localStorage.getItem("rentals");
  const [rentals, setRentals] = useState(
    rentalsLocal
      ? JSON.parse(rentalsLocal).map((rental) => ({
          ...rental,
          from: new Date(rental.from),
          to: new Date(rental.to),
        }))
      : defaultRentals
  );

  useEffect(() => {
    localStorage.setItem("rentals", JSON.stringify(rentals));
  }, [rentals]);

  const removeRental = (rental) => {
    setRentals((prevRentals) =>
      prevRentals.filter(({ id }) => id !== rental.id)
    );
    axios
      .post(`/payment/cancel?id=${rental.id}`)
      .catch((err) => console.log(err));
  };

  const insertRental = (rental, user, ammount) => {
    setRentals((prevRentals) => [...prevRentals, { id: uuid(), ...rental }]);

    axios
      .post("/payment/add", {
        type: "rental",
        customer: user.email,
        ammount: ammount,
      })
      .catch((err) => console.log(err));
  };

  return (
    <MyRentalsContext.Provider value={{ rentals, removeRental, insertRental }}>
      {children}
    </MyRentalsContext.Provider>
  );
};

export default MyRentalsStore;
