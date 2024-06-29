import { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState("mohali");

  const setLocationData = (newLocation) => {
    setLocation(newLocation || "");
  };

  return (
    <LocationContext.Provider value={{ location, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};
