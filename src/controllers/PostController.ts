import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostController{
    constructor(){

    }
    async listPosts(req: Request, res: Response){
        try{
            const posts = await prisma.post.findMany();
  
            res.json(posts)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async createPost(req: Request, res: Response){
        try{
            const postData = req.body
            if(!postData.title){
                return res.status(400).json({
                    status: 400,
                    message: "Você precisa inserir um titulo",
                });
            }
            if(!postData.content){
                return res.status(400).json({
                    status: 400,
                    message: "O post deve possuir um conteudo",
                });
            }
            const newPost = await prisma.post.create({
                data: postData,
            });
            
            res.json({
            status: 200,
            newuser: newPost,
            });  
        }catch(error){
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
        }
    }
    async deletePost(req: Request, res: Response){
        try{
            const postId = req.params.id

            await prisma.post.delete({
                where: {
                    id: parseInt(postId)
                },
            })

            res.status(400).json({
                status: 200,
                message: "Post deletado com sucesso"
            })
        }catch(error){
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
        }
    }
    async editPost(req: Request, res:Response){
        try{
            const postId = req.params.id
            const postData = req.body
            if(!postData.title){
                return res.status(400).json({
                    status: 400,
                    message: "Você precisa inserir um titulo",
                });
            }
            if(!postData.content){
                return res.status(400).json({
                    status: 400,
                    message: "O post deve possuir um conteudo",
                });
            }
            await prisma.post.update({
                where:{
                    id: parseInt(postId)
                },
                data: postData
            })

        }catch(error){
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
        }
    }
}

export default new PostController();