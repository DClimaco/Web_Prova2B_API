import { Router } from "express";  
import CommentController from "../controllers/CommentController";

const CommentRouter = Router()

CommentRouter.get("/comments", CommentController.listComments)
CommentRouter.post("/comments/create", CommentController.postComment)
CommentRouter.put("/comments/edit/:id", CommentController.editComment)
CommentRouter.delete("/comments/delete/:id", CommentController.deleteComment)

export default CommentRouter