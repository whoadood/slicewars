import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useRestaurantListContext } from "../hooks/restaurantListContext";
import Image from "next/image";

export default function ResultsPage() {
  const restaurantContext = useRestaurantListContext();
  const [restaurantsWithVotes, setRestaurantsWithVotes] = useState<
    {
      rating: number;
      price: string;
      phone: string;
      id: string;
      alias: string;
      is_closed: boolean;
      categories: [
        {
          alias: string;
          title: string;
        }
      ];
      review_count: number;
      name: string;
      url: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
      image_url: string;
      location: {
        city: string;
        country: string;
        address2: string;
        address3: string;
        state: string;
        address1: string;
        zip_code: string;
      };
      distance: number;
      transactions: string[];
      votes: { for: number; against: number };
    }[]
  >([]);
  const allVotes = trpc.useQuery(
    [
      "vote.getAllVotes",
      {
        restaurants: restaurantContext?.restaurantList?.businesses.map(
          (biz) => biz.id
        ) as string[],
      },
    ],
    {
      enabled: !!restaurantContext?.restaurantList,
    }
  );

  useEffect(() => {
    if (allVotes.data?.formatVotes) {
      // map over restaurants and attach vote object
      /* {votes: { for: number, against: number }} */
      const updateRestaurants =
        restaurantContext?.restaurantList.businesses.map((business) => {
          return {
            ...business,
            votes: {
              for: allVotes.data?.formatVotes[business.id]?.votedFor || 0,
              against:
                allVotes.data?.formatVotes[business.id]?.votedAgainst || 0,
            },
          };
        });
      const sortedVotes = updateRestaurants?.sort(
        (a, b) =>
          (Math.round((b.votes.for / (b.votes.for + b.votes.against)) * 100) ||
            0) -
          (Math.round((a.votes.for / (a.votes.for + a.votes.against)) * 100) ||
            0)
      );

      setRestaurantsWithVotes(updateRestaurants as typeof restaurantsWithVotes);
    }
  }, [allVotes.data?.formatVotes, restaurantContext?.restaurantList]);

  console.log("restaurants with votes", restaurantsWithVotes);

  return (
    <div className="flex items-center relative flex-col justify-center  mt-4">
      <ul className="flex relative gap-4 max-h-[80vh] overflow-scroll flex-col">
        {restaurantsWithVotes &&
          restaurantsWithVotes.map((business) => (
            <li
              className="bg-slate-900  relative rounded p-2 flex"
              key={business.id}
            >
              <div className="h-[100px] max-w-[125px] relative flex mr-2 overflow-hidden">
                <Image
                  src={business.image_url}
                  alt={"business image"}
                  height={100}
                  width={125}
                  className="min-w-full h-auto"
                />
              </div>
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
                <div className="absolute text-4xl bottom-2 right-2 bg-gradient-to-b text-transparent bg-clip-text outline-4 from-white via-yellow-400 to-red-600 drop-shadow-lg">
                  {business.votes.for + business.votes.against !== 0
                    ? Math.round(
                        (business.votes.for /
                          (business.votes.for + business.votes.against)) *
                          100
                      )
                    : 0}
                  %
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
