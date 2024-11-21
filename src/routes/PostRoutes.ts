import { Router } from "express"; 
import PostController from "../controllers/PostController";

const PostRouter = Router();

PostRouter.get("/posts", PostController.listPosts)
PostRouter.post("/posts/create", PostController.createPost)
PostRouter.delete("/posts/delete/:id", PostController.deletePost)
PostRouter.put("/posts/edit/:id", PostController.editPost) 

export default PostRouter