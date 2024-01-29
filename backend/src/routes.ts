// src/routes.ts

import express from "express";
import DefaultController from "./controllers/DefaultController";
import UserController from "./controllers/UserController";
import ProductController from "./controllers/ProductController";
import CommentController from "./controllers/CommentController";
require("dotenv").config();
const routes = express.Router();


// Rotas para o usuário
routes.get("/", DefaultController.read);
routes.post("/usuarios/create", UserController.createUser);
routes.put("/usuarios/update", UserController.updateUser);
routes.delete("/usuarios/delete/:id", UserController.deleteUser);
routes.post("/req/login", UserController.login);
routes.get("/auth/:id", UserController.authLogin);
routes.get("/show/:id", UserController.showUser);
routes.post("/forgot-password", UserController.forgotPassword);
routes.get("/reset-password/:id/:code", UserController.resetPassword);
routes.post("/new-password/:id/:code", UserController.newPassword);

// Rotas para produtos
routes.post("/product/new", ProductController.createProduct);
routes.put("/product/update", ProductController.updateProduct);
routes.delete("/product/delete/:id", ProductController.deleteProduct);
routes.get("/product/filter", ProductController.filterProducts);
routes.get("/product/:ids", ProductController.productsById);
routes.get("/scraping/:content", ProductController.scraping);

// Rotas para comentarios

routes.post("/comment/create", CommentController.createComment )
routes.get("/comments/:id", CommentController.comments )
export default routes;

/*arâmetros da query:

    categoria: O nome da categoria do produto (opcional)
    valor_min: O valor mínimo do produto em reais (opcional)
    valor_max: O valor máximo do produto em reais (opcional)
    state: O estado do produto (novo ou usado) (opcional)
    tamanho: O tamanho do produto, separado por vírgulas (opcional)
    avaliacao_min: A avaliação mínima do produto (de 1 a 5) (opcional)
    promocao: Um valor booleano que indica se o produto está em promoção (opcional)
    offset: O número de produtos a serem pulados na busca (opcional, padrão 0)
    order_by: O campo e a direção de ordenação dos produtos, separados por dois pontos (opcional, padrão sem ordenação)
    limit: O número máximo de produtos a serem retornados na busca (opcional, padrão 10)
    search: Pesquisa por palavra em categoria, brand, title(tentar fazer procurar tbm em outras tabelas relacionadas)
 Exemplos de rotas:

    Para buscar todos os produtos: https://example.com/produtos
    Para buscar produtos da categoria “calçados” com preço entre 100 e 200 reais: https://example.com/produtos?categoria=calçados&valor_min=100&valor_max=200
    Para buscar produtos novos com tamanho P ou M, ordenados por preço em ordem crescente: https://example.com/produtos?state=novo&tamanho=P,M&order_by=preco:asc
    Para buscar produtos com avaliação maior ou igual a 4, em promoção, pulando os primeiros 10 resultados e limitando a 5 por busca: https://example.com/produtos?avaliacao_min=4&promocao=true&offset=10&limit=5
*/
