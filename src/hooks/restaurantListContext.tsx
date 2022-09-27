import React, { createContext, useContext } from "react";
import { YelpResponse } from "../types/yelp";
import { trpc } from "../utils/trpc";
import { useLocationContext } from "./locationContext";

export const restaurantListContext = createContext<
  | {
      restaurantList: YelpResponse;
      restIsLoading: boolean;
    }
  | undefined
>(undefined);

export const useRestaurantListContext = () => useContext(restaurantListContext);

export default function RestaurantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocationContext();
  const { data: restaurantList, isLoading: restIsLoading } = trpc.useQuery(
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

  console.log("restaurant context", restaurantList);

  return (
    <restaurantListContext.Provider
      value={{ restaurantList: restaurantList as YelpResponse, restIsLoading }}
    >
      {children}
    </restaurantListContext.Provider>
  );
}
