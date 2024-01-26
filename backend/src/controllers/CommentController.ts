import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";
import Comment from "../models/Comment";
import CommentsLikes from "../models/CommentsLikes";
import CommentsUrls from "../models/CommentUrls";
import CommentAttributes from "../interfaces/CommentAttributes";

async function createComment(req: Request, res: Response) {
  const { comment, urls, likes } = req.body;
  if (comment) {
    const { text_comment, user_id, user_img, product_id, rating, recommend } =
      comment;
    if (!user_id) {
      return res
        .status(400)
        .json({ msg: "Necessario ter o identificador do usuario!" });
    }
    if (!user_img) {
      return res
        .status(400)
        .json({ msg: "Necessario ter a imagemn de perfil do usuario!" });
    }
    if (!product_id) {
      return res
        .status(400)
        .json({ msg: "Necessario ter o identificador do produto!" });
    }
    if (!rating) {
      return res
        .status(400)
        .json({ msg: "Necessario ter o rating do produto!" });
    }

    if (!recommend) {
      return res
        .status(400)
        .json({ msg: "Necessario ter a recomendação do produto!" });
    }

    const existingProduct = await Product.findOne({
      where: { id: product_id },
    });

    if (!existingProduct) {
      throw new Error("Produto não encontrado.");
    }
    const existingUser = await User.findOne({
      where: { user_id: user_id },
    });

    if (!existingUser) {
      throw new Error("Usuario não encontrado.");
    }
    try {
      const comment = (await Comment.create({
        text_comment,
        user_id,
        user_img,
        product_id,
        rating,
        recommend,
      })) as unknown as CommentAttributes;
      if (!comment) {
        return res
          .status(500)
          .json({ msg: "ocorreu algum erro na criação do comentario" });
      }

      if (urls) {
        for (const url of urls) {
          await CommentsUrls.create({
            comment_id: comment.comment_id,
            url: url.url,
          });
        }
      }
      res.status(201);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao criar comentario", details: error });
    }
  }
}
export default {
  createComment,
};
