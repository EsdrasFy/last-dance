import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";
import Comment from "../models/Comment";
import CommentsUrls from "../models/CommentUrls";
import CommentAttributes from "../interfaces/CommentAttributes";

async function createComment(req: Request, res: Response) {
  const { comment, urls, likes } = req.body;
  if (comment) {
    const { text_comment, user_id, user_img, product_id, rating, recommend, username} =
      comment;
    if (!user_id) {
      return res
        .status(400)
        .json({ msg: "Necessario ter o identificador do usuario!" });
    }
    if (!username) {
      return res
        .status(400)
        .json({ msg: "Necessario ter o username do usuario!" });
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
    } else {
      parseFloat(rating);
    }

    if (recommend === undefined || recommend === null) {
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
        username,
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
      res
        .status(201)
        .json({ msg: "Comentario criado com sucesso", status: 201 });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao criar comentario", details: error });
      console.log(error);
    }
  }
}
async function comments(req: Request, res: Response) {
  const id = req.params.id;

  const existingProduct = await Product.findOne({
    where: {
      id: id,
    },
  });

  if (!existingProduct) {
    res.status(401).json({ msg: "necessario id valido" });
    return;
  }

  try {
    const comments = await Comment.findAll({
      where: {
        product_id: id,
      },
      order: [
        ['timespost', 'DESC'],  
      ],
      include: [
        {
          model: CommentsUrls,
          as: "urls",
          attributes: ["url"],
        },
      ],
      attributes: [
        "comment_id",
        "text_comment",
        "user_id",
        "user_img",
        "product_id",
        "username",
        "rating",
        "recommend",
        "timespost",
      ],
    });

    res.json({ comments, status: 200 }).status(200);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error });
  }
}

export default {
  createComment,
  comments,
};
