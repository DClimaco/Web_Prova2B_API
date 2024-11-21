import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import VerifyComment from "../utils/VerifyComment";

const prisma = new PrismaClient();

class CommentController{
    constructor(){

    }
    async listComments(req: Request, res: Response){
        try{
            const comments = await prisma.comment.findMany()
            res.json(comments)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async postComment(req: Request, res: Response){
        try{
            const commentData = req.body

            if(!commentData.content){
                return res.status(400).json({
                    status: 400,
                    message: "O comentario deve possuir um conteudo",
                })
            }

            const response = await VerifyComment(commentData.content)
            console.log(response)
            if(response === "true"){
                return res.status(400).json({
                    status: 400,
                    message: "Comentario ofensivo",
                })
            }
            const newComment = await prisma.comment.create({
                data: commentData,
                });
                
            res.json({
                status: 200,
                newuser: newComment,
                }); 
            return res.status(200)
            
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async deleteComment(req: Request, res: Response){ 
        try{
            const commentId = req.params.id
            await prisma.comment.delete({
                where: {
                    id: parseInt(commentId)
                }
            })
            return res.status(204)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async editComment(req: Request, res: Response){ 
        try{
            const commentData = req.body
            const commentId = req.params.id
            
            if(!commentData.content){
                return res.status(400).json({
                    status: 400,
                    message: "O comentario deve possuir um conteudo",
                })
            }

            await prisma.comment.update({
                where: {
                    id: parseInt(commentId)
                },
                data: commentData
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
}

export default new CommentController()