import React, { useCallback, useEffect, useState } from "react";
import { useRestaurantListContext } from "./restaurantListContext";
import { YelpResponse } from "../types/yelp";
export default function UsePickem() {
  const restaurantContext = useRestaurantListContext();
  const [restaurants, setRestaurants] =
    useState<
      [YelpResponse["businesses"][number], YelpResponse["businesses"][number]]
    >();

  const pickem = useCallback(
    (
      restaurants: YelpResponse["businesses"],
      notThis?: YelpResponse["businesses"][number]
    ): YelpResponse["businesses"][number] | undefined => {
      if (restaurants) {
        const random =
          restaurants[Math.floor(Math.random() * restaurants.length)];
        if (notThis && random) {
          if (random.id === notThis.id) {
            return pickem(restaurants, notThis);
          }
        }
        return random as YelpResponse["businesses"][number];
      }
    },
    []
  );

  const rePickem = useCallback(() => {
    const restaurants = restaurantContext?.restaurantList.businesses;
    if (restaurants) {
      const r1: YelpResponse["businesses"][number] | undefined =
        pickem(restaurants);
      const r2: YelpResponse["businesses"][number] | undefined = pickem(
        restaurants,
        r1
      );
      if (r1 && r2) {
        setRestaurants([
          r1 as YelpResponse["businesses"][number],
          r2 as YelpResponse["businesses"][number],
        ]);
      }
    }
  }, [restaurantContext?.restaurantList, pickem]);

  useEffect(() => {
    if (restaurantContext?.restaurantList?.businesses) {
      rePickem();
    }
  }, [restaurantContext?.restaurantList?.businesses, rePickem]);

  return { restaurants, rePickem };
}
