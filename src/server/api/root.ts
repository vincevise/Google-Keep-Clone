import { createTRPCRouter } from "@/server/api/trpc";
import { noteRouter } from "./routers/notes";
import { labelsRouter } from "./routers/labels";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  note: noteRouter,
  label: labelsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
