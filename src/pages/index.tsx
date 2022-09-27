import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  HandThumbUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { trpc } from "../utils/trpc";
import UsePickem from "../hooks/usePickem";
import { YelpResponse } from "../types/yelp";
import { useRestaurantListContext } from "../hooks/restaurantListContext";
import Image from "next/image";

export default function Tester() {
  const restaurantContext = useRestaurantListContext();
  const { restaurants, rePickem } = UsePickem();
  const voteAPI = trpc.useMutation("vote.createVote", {
    onSuccess: () => {
      rePickem();
    },
  });

  return (
    <div className="flex items-center relative flex-col justify-center sm:translate-y-1/2">
      {restaurants && (
        <div className="flex fixed sm:top-1/2 sm:right-1/2 sm:translate-x-1/2 sm:translate-y-1/2 z-10 top-2 right-2 justify-center items-center">
          <button
            className="bg-red-800 p-2 rounded-full hover:outline hover:outline-white"
            onClick={rePickem}
          >
            <ArrowPathIcon className="w-8" />
          </button>
        </div>
      )}
      <ul className="flex relative gap-4 flex-col sm:flex-row">
        {restaurants && (
          <div className="absolute flex flex-col top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-3/4 ">
            <span className="gochi bg-gradient-to-b text-transparent bg-clip-text inline outline-4 from-white via-yellow-400 to-red-600 drop-shadow-lg text-8xl">
              VS
            </span>
          </div>
        )}
        {restaurants && !restaurantContext?.restIsLoading ? (
          restaurants?.map((business) => (
            <li
              className="bg-slate-900 rounded p-2 flex justify-between flex-col shadow"
              key={business.id}
            >
              <div>
                <h2>
                  <a
                    target={"_blank"}
                    rel="noreferrer noopener"
                    href={business.url}
                    className="flex text-slate-200 hover:text-white"
                  >
                    {business.name}
                    <ArrowTopRightOnSquareIcon className="ml-1 w-4 font-bold" />
                  </a>
                </h2>
                <div className="text-xs text-slate-400">
                  <p>{business.location.address1}</p>
                  <p>{business.location.address2}</p>
                  <p>{business.location.address3}</p>
                  <p>
                    {business.location.city}, {business.location.state}
                  </p>
                </div>
              </div>

              <div className="h-[300px] max-w-[350px] mt-4 relative flex overflow-hidden">
                <Image
                  src={business.image_url}
                  alt={"business image"}
                  className="min-w-full z-0 h-auto"
                  height={300}
                  width={350}
                />
                <div className="hover:bg-black/50 group transition duration-100 ease-in-out absolute h-full w-full flex items-center justify-center">
                  <button
                    disabled={voteAPI.isLoading}
                    onClick={() => {
                      const vote = {
                        votedFor: business.id,
                        votedAgainst: (
                          restaurants.filter(
                            (rest) => rest.id !== business.id
                          )[0] as YelpResponse["businesses"][number]
                        ).id,
                      };
                      console.log("vote click", vote);
                      voteAPI.mutate(vote);
                    }}
                    className="bg-green-800 group-hover:opacity-100 opacity-100 sm:opacity-0 p-3 transition translate-y-8 hover:outline group-hover:translate-y-1 duration-300 ease-in-out rounded-full flex items-center justify-center"
                  >
                    <HandThumbUpIcon className="w-6" />
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : !restaurants && restaurantContext?.restIsLoading ? (
          <div className="flex justify-center items-center min-h-[20vh]">
            <h2 className="text-2xl px-6">Loading local restaurants...</h2>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[20vh]">
            <h2 className="text-2xl px-6">
              This application requires access to your device location in order
              to properly work.
            </h2>
          </div>
        )}
      </ul>
    </div>
  );
}