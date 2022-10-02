import { createRouter } from "./context";
import { z } from "zod";
import { YelpResponse } from "../../types/yelp";
import { TRPCError } from "@trpc/server";
import { Vote } from "@prisma/client";

export const voteRouter = createRouter()
  .query("getAllRestaurants", {
    input: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    async resolve({ input, ctx }) {
      // console.log("server input", input);

      const getRestaurants = async (): Promise<YelpResponse> => {
        const data = await fetch(
          `https://api.yelp.com/v3/businesses/search?latitude=${input.latitude}&longitude=${input.longitude}&radius=40000&categories=pizza&limit=50`,
          {
            method: "GET",
            credentials: "include",
            headers: [["Authorization", process.env.YELP_KEY as string]],
          }
        );
        return data.json();
      };
      const restaurants = getRestaurants();
      return restaurants;
    },
  })
  .mutation("createVote", {
    input: z.object({
      votedFor: z.string(),
      votedAgainst: z.string(),
    }),
    async resolve({ input, ctx }) {
      console.log("serverside input", input);
      const newVote = await ctx.prisma.vote.create({
        data: {
          votedFor: input.votedFor,
          votedAgainst: input.votedAgainst,
        },
      });
      if (!newVote) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { message: "create vote success", newVote };
    },
  })
  .query("getAllVotes", {
    input: z.object({
      restaurants: z.array(z.string()),
    }),
    async resolve({ input, ctx }) {
      const allVotes: Vote[] = await ctx.prisma.vote.findMany({
        where: {
          votedFor: {
            in: input.restaurants,
          },
          votedAgainst: {
            in: input.restaurants,
          },
        },
      });

      if (!allVotes) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // count votes for restaurantId and return an object
      /* {
        [restaurant_id]: {
          votedFor: number,
          votedAgainst: number
        },
      } */
      // need to look into this ts, seems sus.
      const formatVotes = allVotes.reduce((acc, cur) => {
        if (!acc[cur.votedFor]) {
          acc[cur.votedFor] = { votedFor: 1, votedAgainst: 0 };
        }
        if (!acc[cur.votedAgainst]) {
          acc[cur.votedAgainst] = { votedFor: 0, votedAgainst: 1 };
        }
        if (acc[cur.votedFor]) {
          //@ts-ignore
          acc[cur.votedFor].votedFor += 1;
        }
        if (acc[cur.votedAgainst]) {
          //@ts-ignore
          acc[cur.votedAgainst].votedAgainst += 1;
        }

        return acc;
      }, {} as Record<string, { votedFor: number; votedAgainst: number }>);

      return {
        message: "successfully found votes",
        formatVotes: formatVotes,
      };
    },
  });
