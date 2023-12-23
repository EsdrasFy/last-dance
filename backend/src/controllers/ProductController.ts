import Product from "../models/Product";
import { Op, WhereOptions } from "sequelize";
import Sequelize from "sequelize/types/sequelize";
import * as puppeteer from "puppeteer";
import { Request, Response } from "express";
async function createProduct(req: Request, res: Response) {
  const {
    title,
    summary,
    quantidy,
    sold,
    price,
    state,
    category,
    sizes,
    brand,
    guarantee,
    variation,
    assessment,
    parcelable,
    max_installments,
    interest_rate,
    cor_id,
    promotion,
    classe,
    images,
  } = req.body;

  if (!title || !summary || !quantidy || !price || !category) {
    return res.status(422).json({ msg: "Insira pelo menos os dados básicos!" });
  }

  try {
    const produto = await Product.create({
      title,
      summary,
      quantidy,
      sold,
      price,
      state,
      category,
      sizes,
      brand,
      guarantee,
      variation,
      assessment,
      parcelable,
      max_installments,
      interest_rate,
      cor_id,
      promotion,
      classe,
    });
    res.status(201).json({ product: produto, status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
}

async function updateProduct(req: Request, res: Response) {
  const {
    id,
    title,
    summary,
    quantidy,
    sold,
    price,
    state,
    category,
    sizes,
    brand,
    guarantee,
    variation,
    assessment,
    parcelable,
    max_installments,
    interest_rate,
    cor_id,
    promotion,
  } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "ID do produto não fornecido." });
    }

    const existingProduct = await Product.findOne({
      where: { id: id },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    const [updatedRows] = await Product.update(
      {
        title,
        summary,
        quantidy,
        sold,
        price,
        state,
        category,
        sizes,
        brand,
        guarantee,
        variation,
        assessment,
        parcelable,
        max_installments,
        interest_rate,
        cor_id,
        promotion,
      },
      {
        where: { id: id },
      }
    );

    if (updatedRows > 0) {
      return res
        .status(200)
        .json({ message: "Produto atualizado com sucesso." });
    } else {
      return res.status(500).json({ error: "Falha ao atualizar o produto." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ocorreu um erro no servidor.", details: error });
  }
}

async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).json({ msg: "ID é necessário para exclusão." });
    }

    const existingProduct = await Product.findOne({
      where: {
        id: id,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

    await Product.destroy({
      where: { id: id },
    });

    res.status(200).json({
      msg: `Produto com ID ${id} foi deletado da base de dados.`,
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
}
async function filterProducts(req: Request, res: Response) {
  const {
    categoria,
    valor_min,
    valor_max,
    state,
    tamanho,
    avaliacao_min,
    promocao,
    offset,
    order_by,
    limit,
  } = req.query;
  try {
    let where: any = {};
    ///////////////////////////////////////////////////////////////////////////////////
    if (categoria) {
      where.category = categoria;
    }
    if (state) {
      where.state = state;
    }
    if (avaliacao_min) {
      where.assessment = { [Op.gte]: avaliacao_min };
    }
    if (valor_min && valor_max) {
      where.price = { [Op.between]: [valor_min, valor_max] };
    }
    if (promocao) {
      where.promotion = { [Op.not]: null || false };
    }
    if (typeof tamanho === "string") {
      const tamanhoArray = tamanho.split(",").map((tam) => tam.trim());

      const tamanhoConditions = tamanhoArray.map((tam) => ({
        sizes: { [Op.like]: `%${tam}%` },
      }));

      where[Op.and] = tamanhoConditions;
    }

    let order: Array<[string, string]> = [];
    if (typeof order_by === "string") {
      const [field, direction] = order_by.split(":");
      const trimmedField = field.trim();
      const trimmedDirection = direction
        ? direction.trim().toLowerCase()
        : "asc";
      const validDirections = ["asc", "desc"];

      if (validDirections.includes(trimmedDirection)) {
        order.push([trimmedField, trimmedDirection]);
      } else {
        return res.status(400).json({
          error: "Direção de ordenação inválida. Use 'asc' ou 'desc'.",
        });
      }
    }

    const options: {
      where: WhereOptions<any>;
      offset: number;
      limit: number;
      order: [string, string][];
    } = {
      where,
      offset: typeof offset === "string" ? parseInt(offset, 10) : 0,
      limit: typeof limit === "string" ? parseInt(limit, 10) : 10,
      order: order.length > 0 ? [...order] : [],
    };
    const products = await Product.findAll({
      ...options,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    res.status(500).json({ error: "Erro ao obter produtos" });
  }
}

import * as natural from "natural";
import axios from "axios";
const tokenizer = new natural.WordTokenizer();
const stopWords = new Set([
  "em",
  "que",
  "com",
  "para",
  "uma",
  "do",
  "o",
  "a",
  "confeccionada",
  "barato",
  "loja",
  "roupa",
  "moda",
  "especial",
  "estilo",
  "coleção",
  "novidade",
  "promoção",
  "oferta",
  "preço",
  "desconto",
  "venda",
  "produto",
  "marca",
  "tendência",
  "estação",
  "comprar",
  "look",
  "estiloso",
  "fashion",
  "acessório",
  "tamanho",
  "cores",
  "frete",
  "grátis",
  "novidades",
  "coleções",
  "estilos",
  "promoções",
  "ofertas",
  "preços",
  "vendas",
  "produtos",
  "marcas",
  "tendências",
  "estação",
  "compras",
  "looks",
  "estilosos",
  "fashions",
  "acessórios",
  "tamanhos",
  "colorido",
  "coloridos",
  "frete",
  "gratuito",
  "exclusivo",
  "exclusivos",
  "qualidade",
  "última",
  "últimas",
  "último",
  "últimos",
  "ultima",
  "ultimas",
  "ultimo",
  "ultimos",
  "autêntico",
  "autênticos",
  "autêntica",
  "autênticas",
  "original",
  "originais",
  "autenticidade",
  "coleção",
  "colecoes",
  "estação",
  "estacoes",
  "temporada",
  "temporadas",
  "verão",
  "primavera",
  "outono",
  "inverno",
  "veranil",
  "veranis",
  "primaveril",
  "primaveris",
  "outonal",
  "outonais",
  "invernal",
  "invernais",
  "vermelho",
  "vermelhos",
  "vermelha",
  "vermelhas",
  "azul",
  "azuis",
  "amarelo",
  "amarelos",
  "amarela",
  "amarelas",
  "verde",
  "verdes",
  "preto",
  "pretos",
  "preta",
  "pretas",
  "branco",
  "brancos",
  "branca",
  "brancas",
  "sem",
  "linho",
  "de",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);

function extrairPalavrasChave(descricao: string): string[] {
  console.log("função chamada");

  const tokens: string[] = tokenizer.tokenize(descricao) || [];

  // Remove stop words
  const tokensFiltrados = tokens.filter(
    (token: string) => !stopWords.has(token.toLowerCase())
  );

  // Usa um stemmer para obter as raízes das palavras (opcional)
  const stemmer = natural.PorterStemmer;
  const stems: string[] = tokensFiltrados.map((token: string) =>
    stemmer.stem(token)
  );

  // Conta a frequência das palavras
  const frequenciaPalavras: { [key: string]: number } = {};
  stems.forEach((stem: string) => {
    if (frequenciaPalavras[stem]) {
      frequenciaPalavras[stem]++;
    } else {
      frequenciaPalavras[stem] = 1;
    }
  });

  // Ordena as palavras por frequência
  const palavrasOrdenadas: string[] = Object.keys(frequenciaPalavras).sort(
    (a, b) => frequenciaPalavras[b] - frequenciaPalavras[a]
  );
  // Pode ajustar o número de palavras-chave a serem retornadas

  const numeroPalavrasChave: number = 5;

  const palavrasChave: string[] = palavrasOrdenadas.slice(
    0,
    numeroPalavrasChave
  );

  return palavrasChave;
}

async function scraping(req: Request, res: Response) {
  const urlClone = "https://www.posthaus.com.br/";

  const searchFor = req.params.content;
  console.log(searchFor);

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log("Iniciei");

    await page.goto(`${urlClone}${searchFor}`);
    console.log("Fui para URL");

    const links = await page.$$eval(".ZahOa > a", (el) =>
      el.map((link) => link.href)
    );

    for (const link of links) {
      await processProductLink(link, page);
    }
    await page.waitForTimeout(3000);
    await browser.close();
    res.json({ msg: "deu bom" }).status(200);
  } catch (error) {
    console.log(error);
  }
}
async function processProductLink(link: string, page: puppeteer.Page) {
  await page.goto(link);
  await page.waitForSelector(".jBoZhA > .jPWGbB > .gHwVao");
  await page.waitForSelector(".eMQuAB > img");
  await page.waitForSelector(".euhAJe h1");
  await page.waitForSelector(".llynDC");
  await page.waitForSelector(".rYQsU");
  await page.waitForSelector(".sc-kgoBCf.jeIRcN");
  const title = await page.$eval(".euhAJe h1", (element) => element.innerHTML);
  const sizes = await page.$$eval(".llynDC", (el) =>
    el.map((size) => size.innerHTML)
  );
  const regex: RegExp = /\s(\d+)x/i;
  const preco = await page.$eval(".rYQsU", (element) => element.innerHTML);
  const price = parseFloat(
    preco
      ?.replace(/&nbsp;|\s|[^\d,.]/g, "")
      .replace("R$", "")
      .replace(",", ".") || "0"
  );

  const brand = link.split("/")[3];
  const category = link.split("/")[4];
  const summary = await page.$eval(
    ".jBoZhA > .jPWGbB > .gHwVao",
    (element) => element.innerHTML
  );
  const palavrasChave: string[] = extrairPalavrasChave(summary);

  const flags = palavrasChave.unshift(brand, category);

  const images = await page.$$eval(".eMQuAB > img", (el) =>
    el.map((img) => img.src)
  );
  const details = await page.$$eval(".sc-kgoBCf.jeIRcN", (el) =>
    el.map((p) => p.innerHTML)
  );

  const getColorName = await page.$$eval(
    "#colorSelectorRadioBullet_link > span",
    (el) => el.map((name) => name.innerHTML)
  );

  const colors = getColorName ? getColorName : [];
  const getPriceDiscont = await page.$$eval(
    ".LSdgo .daKbcm.sc-ebFjAB.sc-dliRfk label",
    (el) => el.map((elemento) => elemento.innerHTML)
  );
  const cleanPriceDiscont = getPriceDiscont ? getPriceDiscont : [];
  const priceDiscont: string[] = cleanPriceDiscont
    .map((element) => element.replace(/&nbsp;|\s/g, ""))
    .filter((element) => element.trim() !== "");

  const parcelable = priceDiscont.some((element) => element.includes("x"));
  const match: string | undefined = priceDiscont.find((element) =>
    regex.test(element)
  );

  const max_installments: number = match
    ? parseInt(match.match(regex)![1], 10)
    : 1;
  const obj = {
    title,
    price,
    parcelable,
    max_installments,
    priceDiscont,
    flags,
    images,
    summary,
    sizes,
    palavrasChave,
    details,
    colors,
    brand,
    category,
  };
  await createProductInDatabase(obj);
}

async function createProductInDatabase(productInfo: any) {
  const {title,
    price,
    parcelable,
    max_installments,
    priceDiscont,
    flags,
    images,
    summary,
    sizes,
    palavrasChave,
    details,
    colors,
    brand,
    category} = productInfo
  try {
    const quantity = Math.floor(Math.random() * 100) + 1;
    const sold = Math.floor(Math.random() * 200);
    console.log(sold, quantity);

    const assessment = Math.floor(Math.random() * 5) + 1;
    const sizesAsString = sizes.join(", ");
    const product = await Product.create({
      title: title,
      summary: summary,
      quantidy: 2,
      sold: 2,
      price: price,
      state: true,
      category: category,
      sizes: sizesAsString,/*gamb*/
      brand: brand,
      guarantee: "Warranty: 3 months of coverage by Urban Vogue.",
      variation: "sem variação",/*retirar*/
      assessment: 4.5,/* add qtd de avaliações ou padrao de 10*/
      parcelable: parcelable,
      max_installments: max_installments,
      interest_rate: 23.0,
    });
    /*rever videos sobre relação de tabela e mudar o schema talvez*/
    console.log("produto adicionado");
  } catch (error) {
    console.error(error);
  }
}
export default {
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
  scraping,
};
