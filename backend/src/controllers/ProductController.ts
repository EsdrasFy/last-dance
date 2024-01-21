import Product from "../models/Product";
import ProductImages from "../models/ProductImages";
import { Model, Op, WhereOptions } from "sequelize";
import * as puppeteer from "puppeteer";
import { Request, Response } from "express";
import * as natural from "natural";
import axios from "axios";
import ProductImage from "../models/ProductImages";
import ProductFlags from "../models/ProductFlags";
import ProductColor from "../models/ProductColors";
import ProductSizes from "../models/ProductSizes";
import ProductDetails from "../models/ProductDetails";
import Card from "../interfaces/Card";

const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

// Your credentials
const CREDENTIALS = require("../../urban-vogue-410216-e4add7f801f7.json");

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

interface ProductAttributes extends Model<any, any> {
  id: number;
  title: string;
  summary: string;
  quantidy: number;
  sold?: number;
  price: number;
  state: boolean;
  category: string;
  sizes?: string;
  brand?: string;
  guarantee?: string;
  variation?: string;
  assessment: number;
  parcelable: boolean;
  max_installments?: number;
  interest_rate?: number;
  updated_at: Date;
  created_at: Date;
}
interface ProductImageAttributes extends Model<any, any> {
  image_id: number;
  product_id?: number;
  url: string;
}
interface ProductFlagsAttributes extends Model<any, any> {
  flags_id: number;
  product_id?: number;
  flag: string;
}
interface ProductColorsAttributes extends Model<any, any> {
  color_id: number;
  product_id?: number;
  name_color: string;
}
interface ProductSizesAttributes extends Model<any, any> {
  size_id: number;
  product_id?: number;
  size: string;
}
interface ProductDetailsAttributes extends Model<any, any> {
  size_id: number;
  product_id?: number;
  size: string;
}
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
    id,
    search,
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
      console.log("categoria");
      console.log(categoria);
      console.log("categoria");
      
    }
    if (state) {
      where.state = state;
    }
    if (id) {
      where.id = id;
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
    if (typeof search === "string") {
      console.log(" AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.log(search);

      options.where = {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { brand: { [Op.like]: `%${search}%` } },
          { category: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const products = await Product.findAll({
      ...options,
      include: [
        {
          model: ProductImage,
          as: "images",
          attributes: ["url"],
        },
        {
          model: ProductColor,
          as: "colors",
          attributes: ["name_color"],
        },
        {
          model: ProductDetails,
          as: "details",
          attributes: ["detail"],
        },
        {
          model: ProductSizes,
          as: "sizes",
          attributes: ["size"],
        },
        {
          model: ProductFlags,
          as: "flags",
          attributes: ["flag"],
        },
      ],
    });
    console.log(products.toString());
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    res.status(500).json({ error: "Erro ao obter produtos" });
  }
}
async function productsById(req: Request, res: Response) {
  const { ids } = req.params;
  if(!ids){
    res.status(404).json({msg: "Need id!"})
  }
  let intIds: number[] = ids.split("&").map((id) => parseInt(id, 10));
  
  try {
   
    const products = await Product.findAll({ 
      where:{
        id:intIds
      },
      include: [
        {
          model: ProductImage,
          as: "images",
          attributes: ["url"],
        },
        {
          model: ProductColor,
          as: "colors",
          attributes: ["name_color"],
        },
        {
          model: ProductDetails,
          as: "details",
          attributes: ["detail"],
        },
        {
          model: ProductSizes,
          as: "sizes",
          attributes: ["size"],
        },
        {
          model: ProductFlags,
          as: "flags",
          attributes: ["flag"],
        },
      ],
    });
    const foundIds = products.map((product:any ) => product.id);
    const notFoundIds = intIds.filter((id) => !foundIds.includes(id));

    // Criar resposta personalizada
    const response = {
      products,
      notFoundIds,
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    res.status(500).json({ error: "Erro ao obter produtos" });
  }
}

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
const translateText = async (text: string, targetLanguage: string) => {
  try {
    let [response] = await translate.translate(text, targetLanguage);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
};
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
  // titulo
  const OldTitle = await page.$eval(
    ".euhAJe h1",
    (element) => element.innerHTML
  );
  const title = await translateText(OldTitle, "en");
  // preço
  const preco = await page.$eval(".rYQsU", (element) => element.innerHTML);
  const formattedPrice = parseFloat(
    preco
      ?.replace(/&nbsp;|\s|[^\d,.]/g, "")
      .replace("R$", "")
      .replace(",", ".") || (Math.random() * (200 - 40) + 40).toFixed(2)
  );

  // Formatar o preço para ter sempre o formato "99,99" ou "0,99"
  const price = formattedPrice.toFixed(2);

  // categoria
  const OldCategory = link.split("/")[4];
  const OldCategory2 = await translateText(OldCategory, "en");

  const category = OldCategory2.toLowerCase().replace(/\s+/g, "-");

  console.log(price);

  // marca
  const brand = link.split("/")[3];
  // tamanhos
  const sizes = await page.$$eval(".llynDC", (el) =>
    el.map((size) => size.innerHTML)
  );
  const regex: RegExp = /\s(\d+)x/i;
  // descrição
  const OldSummary = await page.$eval(
    ".jBoZhA > .jPWGbB > .gHwVao",
    (element) => element.innerHTML
  );
  const summary = await translateText(OldSummary, "en");
  // palavras chaves
  const flags: string[] = extrairPalavrasChave(summary);
  flags.push(brand, category);
  // imagens
  const images = await page.$$eval(".eMQuAB > img", (el) =>
    el.map((img) => img.src)
  );
  // detalhes
  const detailsPT = await page.$$eval(".sc-kgoBCf.jeIRcN", (el) =>
    el.map((p) => p.innerHTML)
  );

  let details: string[] = [];

  for (const detail of detailsPT) {
    const detailEN = await translateText(detail, "en");
    details.push(detailEN);
  }

  // cores
  const getColorName = await page.$$eval(
    "#colorSelectorRadioBullet_link > span",
    (el) => el.map((name) => name.innerHTML)
  );
  const colorsPT = getColorName ? getColorName : [];
  let colors: string[] = [];
  for (const colorPT of colorsPT) {
    const colorEN = await translateText(colorPT, "en");
    colorEN.toLowerCase();
    colors.push(colorEN);
  }
  // preço com desconto
  const getPriceDiscont = await page.$$eval(
    ".LSdgo .daKbcm.sc-ebFjAB.sc-dliRfk label",
    (el) => el.map((elemento) => elemento.innerHTML)
  );
  const cleanPriceDiscont = getPriceDiscont ? getPriceDiscont : [];
  // pegar o valor com desconto
  const priceDiscont: string[] = cleanPriceDiscont
    .map((element) => element.replace(/&nbsp;|\s/g, ""))
    .filter((element) => element.trim() !== "");
  // ver se é parcelavel
  const parcelableLabels = priceDiscont.filter((element) =>
    element.includes("x")
  );

  const parcelable = parcelableLabels.length > 0;

  // parcelas

  const max_installments: number = parcelable
    ? parseInt(parcelableLabels[0].replace("x", ""), 10)
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
    details,
    colors,
    brand,
    category,
  };
  await createProductInDatabase(obj);
}

async function createProductInDatabase(productInfo: any) {
  const {
    title,
    price,
    parcelable,
    max_installments,
    flags,
    images,
    summary,
    sizes,
    details,
    colors,
    brand,
    category,
  } = productInfo;
  console.log(details);

  try {
    const quantity = Math.floor(Math.random() * 100) + 1;
    const sold = Math.floor(Math.random() * 200);
    console.log(sold, quantity);

    const assessment = Math.floor(Math.random() * 5) + 1;

    const product = (await Product.create({
      title: title,
      summary: summary,
      quantidy: quantity,
      sold: sold,
      price: price,
      state: true,
      category: category,
      brand: brand,
      guarantee: "Warranty: 3 months of coverage by Urban Vogue.",
      assessment: assessment,
      qtd_assessment: 10,
      parcelable: parcelable,
      max_installments: max_installments,
      interest_rate: 23.0,
    })) as ProductAttributes;
    if (!product) {
      throw new Error("Erro na criação do produto");
    }
    for (const url of images) {
      const imageCreate = (await ProductImage.create({
        product_id: product.id,
        url: url,
      })) as ProductImageAttributes;
      if (!imageCreate) {
        throw new Error("Erro na criação da imagem");
      }
      console.log("imagem criada");
    }
    for (const flag of flags) {
      const flagCreate = (await ProductFlags.create({
        product_id: product.id,
        flag: flag,
      })) as ProductFlagsAttributes;

      if (!flagCreate) {
        throw new Error("Erro na criação da flag");
      }
      console.log("flag criada");
    }
    for (const color of colors) {
      const colorCreate = (await ProductColor.create({
        product_id: product.id,
        name_color: color,
      })) as ProductColorsAttributes;

      if (!colorCreate) {
        throw new Error("Erro na criação da imagem");
      }
      console.log("cor criada");
    }
    for (const size of sizes) {
      const sizeCreate = (await ProductSizes.create({
        product_id: product.id,
        size: size,
      })) as ProductSizesAttributes;

      if (!sizeCreate) {
        throw new Error("Erro na criação da imagem");
      }
      console.log("size criada");
    }
    for (const detail of details) {
      const detailCreate = (await ProductDetails.create({
        product_id: product.id,
        detail: detail,
      })) as ProductDetailsAttributes;

      if (!detailCreate) {
        throw new Error("Erro na criação da imagem");
      }
      console.log("detail criada");
    }
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
  productsById,
  scraping,
};
