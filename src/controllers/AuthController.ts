import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CheckUserPassword } from "../utils/HashPassword";
import { CreateHashPassword } from "../utils/HashPassword";
import { generateJWToken } from "../utils/JWT";

const prisma = new PrismaClient();

class AuthController{
    constructor(){

    }
    async signIn(req: Request, res: Response){
        try{
            const { email, password } = req.body;

            if(!email || !password){
                return res.json({
                    status: 400,
                    message: "Email ou senha não informados."
                })
            }

            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })

            if(!user){
                return res.json({
                    status: 404,
                    message: "Um usuario com este email não existe."
                })
            }
            
            const passwordChecks = await CheckUserPassword(password, user.password)

            if(!passwordChecks){
                return res.json({
                    status: 401,
                    message: "Senha incorreta."
                })
            }

            const token = generateJWToken(user)
            return res.json({
                status: 200,
                user:{
                    token
                }, 
                message: "Autenticação bem sucedida."
            })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
        
        
    }
    async signUp(req: Request, res: Response){
        try{
        const userData = req.body
        const email = userData.email

        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!email || !userData.password){
            return res.json({
                status: 400,
                message: "Email ou senha não informados."
            })
        }
        
        if(userExists){
            return res.json({
                status: 400,
                message: "Este email já está em uso."
            })
        }
        
        userData.password = await CreateHashPassword(userData.password)

        await prisma.user.create({
            data: userData
        })

        return res.json({
            status: 201,
            message: "Usuário criado com sucesso."
        })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async signOut(){

    }
}

export default new AuthController()
