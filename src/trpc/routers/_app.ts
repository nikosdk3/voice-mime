import { baseProcedure, createTRPCRouter } from "@/trpc/init";
export const appRouter = createTRPCRouter({
  health: baseProcedure.query(async () => {
    return { status: "ok" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
