import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { CreateHashPassword } from "../utils/HashPassword";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class UserController {
    constructor(){

    }

    async listUser(req: Request, res: Response){
        try {
            const users = await prisma.user.findMany();
            res.json(users)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }

    async createUser(req: Request, res: Response){
        try {
            const userdata = req.body;
        
            if (!userdata.email) {
              return res.status(400).json({
                status: 400,
                message: "Você precisa passar o email no corpo da requisição",
              });
            }
            
            userdata.password = await CreateHashPassword(userdata.password);
            
            const newuser = await prisma.user.create({
              data: userdata,
            });
        
            console.log(newuser);
        
            res.json({
              status: 200,
              newuser: newuser,
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async updateUser(req: Request, res: Response){
        try {
            const id = req.params.id;
            const body = req.body;
        
            const updatedUser = await prisma.user.update({
              where: {
                id: parseInt(id),
              },
              data: body,
            });
        
            if (updatedUser) {
              return res.json({
                status: 200,
                updatedUser: updatedUser,
              });
            }
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async deleteUser(req: Request, res: Response){
        try {
            const id = req.params.id;
        
            await prisma.user.delete({
              where: {
                id: parseInt(id),
              },
            });
        
            res.status(200).json({
              status: 200,
              message: "Usuário deletado com sucesso",
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              message: "Fala ao deletar o registro",
            });
          }
    }

    async loginUser(req: Request, res: Response) {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return res.status(400).json({
            message: "Por favor, informe o email e a senha",
          });
        }
  
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
          where: { email },
        });
  
        if (!user) {
          return res.status(400).json({
            message: "Usuário não encontrado",
          });
        }
  
        // Compara a senha informada com a senha criptografada no banco
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({
            message: "Senha incorreta",
          });
        }
  
        // Se a autenticação for bem-sucedida
        return res.status(200).json({
          message: "Login bem-sucedido",
          user: {
            id: user.id,
            email: user.email,
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Erro interno do servidor",
        });
      }
    }
  
}

export default new UserController();