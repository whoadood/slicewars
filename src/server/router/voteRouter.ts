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
          voteForId: {
            connectOrCreate: {
              create: {
                id: input.votedFor,
              },
              where: {
                id: input.votedFor,
              },
            },
          },
          voteAgainstId: {
            connectOrCreate: {
              create: {
                id: input.votedAgainst,
              },
              where: {
                id: input.votedAgainst,
              },
            },
          },
        },
        include: {
          voteForId: true,
          voteAgainstId: true,
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
      const votes = await ctx.prisma.restaurant.findMany({
        where: {
          id: {
            in: input.restaurants,
          },
        },
        include: {
          _count: {
            select: {
              votesFor: true,
              votesAgainst: true,
            },
          },
        },
      });
      const countedVotes = votes.reduce((acc: Record<string, number>, cur) => {
        acc[cur.id] = Math.round(
          (cur._count.votesFor /
            (cur._count.votesFor + cur._count.votesAgainst)) *
            100
        );
        return acc;
      }, {});

      return {
        message: "successfully found votes",
        countedVotes,
      };
    },
  });
