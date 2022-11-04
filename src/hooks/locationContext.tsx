import React, { useEffect, useState, createContext, useContext } from "react";

export const LocationContext = createContext<
  { latitude: number; longitude: number } | undefined
>(undefined);

export const useLocationContext = () => useContext(LocationContext);

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}
