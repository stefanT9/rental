import React, { useState, createContext } from "react";

const defaultCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    pricePerDay: 100,
    photoUrl:
      "https://images.toyota-europe.com/eu/product-token/c87a62ad-ed39-4d04-8e1c-48453ef73f9c/width/1200/exterior-3.jpg",
  },
  {
    id: 2,
    brand: "mazda",
    model: "miata",
    pricePerDay: 300,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg",
  },
  {
    id: 3,
    brand: "Dacia",
    model: "Logan",
    pricePerDay: 500,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Dacia_Logan_Facelift_front_-_PSM_2009.jpg/1200px-Dacia_Logan_Facelift_front_-_PSM_2009.jpg",
  },
  {
    id: 4,
    brand: "Porche",
    model: "Cayene",
    pricePerDay: 400,
    photoUrl:
      "https://media.promotor.ro/eybFCRuTQvu_uvfqlDW6AtAILiw=/1200x675/smart/filters:contrast(5):format(webp):quality(80)/https://www.promotor.ro/wp-content/uploads/2020/06/porsche-cayenne-coupe-gts-leak-3-1024x674.jpg",
  },
  {
    id: 5,
    brand: "Toyota",
    model: "Aygo",
    pricePerDay: 100,
    photoUrl:
      "https://static.automarket.ro/v5/img/auto_resized/db/model/005/323/714482-1000x637-b-9402aa9c.jpg",
  },
];

export const CarsContext = createContext({});

const CarsStore = ({ children }) => {
  const [cars, setCars] = useState(defaultCars);

  return (
    <CarsContext.Provider value={{ cars }}>{children}</CarsContext.Provider>
  );
};

export default CarsStore;
