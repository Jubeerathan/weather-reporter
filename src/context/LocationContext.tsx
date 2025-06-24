// src/context/LocationContext.tsx
import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Location } from "../services/responseTypes";
import { SnackbarContext } from "./SnackbarContext";
import { fetchGeoCode } from "../services/geoLocationApi";

type LocationContextProps = {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
};

const defaultLocation: Location = {
    name : "Colombo",
    region : "Western",
    country : "Sri Lanka",
    lat : 6.9319,
    lon : 79.8478,
    tz_id: "Asia/Colombo",
    localtime_epoch: Math.floor(Date.now() / 1000),
    localtime: new Date().toISOString(),
};

export const LocationContext = createContext<LocationContextProps>({
  location: defaultLocation,
  setLocation: () => {},
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location>(defaultLocation);
  const { showMessage } = React.useContext(SnackbarContext);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchGeoCode(position.coords.latitude.toString(), position.coords.longitude.toString())
            .then((geoData) => {
              setLocation({
                name: geoData.address.city || "Colombo",
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                region: geoData.address.state || "Western",
                country: geoData.address.country || "Asia/Colombo",
                tz_id: "",
                localtime_epoch: Math.floor(Date.now() / 1000),
                localtime: new Date().toISOString(),
              });
            })
            .catch((error) => {
              console.error("Error fetching geolocation data:", error);
              showMessage("Failed to fetch geolocation data, using default location.", "warning");
            });
          console.log("Geolocation position:", position);
        },
        (error) => {
          console.warn("Geolocation failed, using default:", error.message);
        }
      );
    }else{
      console.warn("Geolocation is not supported by this browser, using default location.");
      showMessage("Geolocation is not supported by this browser, using default location.", "warning");
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
