import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const noteRouter = createTRPCRouter({
    createNote: privateProcedure
        .input(z.object({
            title: z.string().min(1).max(280), 
            description:z.string(),
            archived:z.boolean().optional(),
            pinned:z.boolean().optional(),
            backgroundColor:z.string().optional()
        }))
        .mutation(async({ctx, input})=>{
            const userId = ctx.userId;

            const note = await ctx.db.note.create({
                data:{
                    ...input,
                    userId
                }
            })

            return note
    }),
    getNotes: privateProcedure
        .query(async({ctx})=>{
            const {userId} = ctx;
            const todos = await ctx.db.note.findMany({
                where:{
                    userId
                }
            })

            

            return todos;
        }),
    changeNoteColor: privateProcedure
        .input(z.object({
            backgroundColor: z.string(),
            id:z.number()
        }))
        .mutation(async({ctx, input})=>{
            
            const note = await ctx.db.note.update({
                where: {
                    id: input.id
                },
                data: {
                    backgroundColor: input.backgroundColor
                }
            })

            return note;
        }),
    pinningNote: privateProcedure
        .input(z.object({
        pinned: z.boolean(),
        id:z.number()
        })).mutation(async({ctx, input})=>{
            
            const note = await ctx.db.note.update({
                where: {
                    id: input.id
                },
                data: {
                    pinned: input.pinned
                }
            })

            return note;
        }),
    updateNote: privateProcedure
        .input(
            z.object({
                note: z.object({
                    id: z.number(),
                    title: z.string(),
                    description: z.string().optional(),
                    pinned: z.boolean(),
                    archived: z.boolean(),
                    userId: z.string()
                })
            })
        )
        .mutation(async({ctx, input})=>{

            const {archived, description, pinned, title} = input.note

            const note = await ctx.db.note.update({
                where: {
                    id: input.note.id
                },
                data: {
                    title,
                    archived,
                    description,
                    pinned
                }
            })

            return note;
        }),
    archiveNote: privateProcedure
        .input(z.object({
            id:z.number(),
            archived: z.boolean()
        }))
        .mutation(async({ctx, input})=>{


            
            const note = await ctx.db.note.update({
                where:{
                    id:input.id
                },
                data:{
                    archived:input.archived
                }
            })

            return note;
            
        }),
    deleteNote: privateProcedure
        .input(z.object({
            noteid:z.number()
        }))
        .mutation(async({ctx,input})=>{
            const notetag = await ctx.db.tagOnNote.deleteMany({
                where:{
                    noteId:input.noteid
                }
            })
            const note = await ctx.db.note.delete({
                where:{
                    id: input.noteid
                }
            }) 

            return note;
        })
    
     
})