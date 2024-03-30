import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const labelsRouter = createTRPCRouter({
    getLabels: privateProcedure
        .query(async ({ ctx, input }) => {
            const tags = await ctx.db.tag.findMany({
                where: {
                    userId: ctx.userId
                }
            })

            return tags
        }),
    getNotesLabels: privateProcedure
        .input(z.object({
            noteId: z.number().optional(),
        })).query(async ({ ctx, input }) => {
            const tags = await ctx.db.tag.findMany({
                where: {
                    userId: ctx.userId
                }
            })

            const tagsNote = await ctx.db.tagOnNote.findMany({
                where: {
                    noteId: input.noteId
                },
                select: {
                    tagId: true
                }
            })
            // Map to rename tagId to id
            const tagIds = tagsNote.map(tn => ({ id: tn.tagId }));

            // Filter the tags whose ids are in tagIds
            const filteredTags = tags.filter(tag => tagIds.some(tn => tn.id === tag.id));

            return filteredTags;
        }),
    createLabel: privateProcedure
        .input(z.object({
            name: z.string(),
            noteId: z.number().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { name, noteId } = input;
            const { userId } = ctx;


            const tag = await ctx.db.tag.create({
                data: {
                    name,
                    userId
                }
            })

            if (noteId) {
                const tagOnNote = await ctx.db.tagOnNote.create({
                    data: {
                        noteId,
                        tagId: tag.id,

                    }
                })
            }

            return tag
        }),
    updateLabel: privateProcedure
        .input(z.object({
            name: z.string(),
            tagId: z.number().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { name, tagId } = input;


            const tag = await ctx.db.tag.update({
                where: {
                    id: tagId
                },
                data: {
                    name
                }
            })



            return tag
        }),
    deleteLabel: privateProcedure
        .input(z.object({
            tagId: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { tagId } = input;
            const tag = await ctx.db.tag.delete({
                where: {
                    id: tagId
                }
            })
            return tag
        }),
    linkTagsToNote: privateProcedure
        .input(z.object({
            tagId: z.number(),
            noteId: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            const { tagId, noteId } = input;
            const notetag = await ctx.db.tagOnNote.create({
                data:{
                    noteId,
                    tagId
                }
            })
            return notetag
        }),
    unlinkTagsToNote: privateProcedure
        .input(z.object({
            tagId: z.number(),
            noteId: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            const { tagId, noteId } = input;
            const notetag = await ctx.db.tagOnNote.deleteMany({
                where:{
                    noteId,
                    tagId
                }
            })
            return notetag
        }),
    getNotesForTag: privateProcedure
        .input(z.object({
            tagName:z.string()
        })).query(async({ctx, input})=>{
            const {tagName} = input;
            const tag = await ctx.db.tag.findFirst( {
                where:{
                    name: tagName
                }
            })

            
            const noteIds = await ctx.db.tagOnNote.findMany({
                where:{
                    tagId: tag?.id
                },
                select:{
                    noteId: true
                }
            })

            const ids = noteIds.map((x)=>x.noteId)

            const notes = await ctx.db.note.findMany({
                where:{
                    id: {
                        in: ids // This uses the 'in' operator to find notes with ids in the noteIds array
                    }
                }
            })

            return {notes, tag}
        })
})