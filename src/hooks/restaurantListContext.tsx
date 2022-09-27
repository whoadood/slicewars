import React, { createContext, useContext } from "react";
import { YelpResponse } from "../types/yelp";
import { trpc } from "../utils/trpc";
import { useLocationContext } from "./locationContext";

export const restaurantListContext = createContext<YelpResponse | undefined>(
  undefined
);

export const useRestaurantListContext = () => useContext(restaurantListContext);

export default function RestaurantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocationContext();
  const { data: restaurantList } = trpc.useQuery(
    [
      "vote.getAllRestaurants",
      { ...(location as { latitude: number; longitude: number }) },
    ],
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: !!location,
    }
  );

  return (
    <restaurantListContext.Provider value={restaurantList}>
      {children}
    </restaurantListContext.Provider>
  );
}
