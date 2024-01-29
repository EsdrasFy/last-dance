import axios, { AxiosError } from "axios";

interface Comment {
  text_comment: string;
  user_id: number | undefined;
  user_img: string;
  product_id: number;
  comment_id: number;
  rating: string;
  username:string;
  timespost:Date;
  recommend: boolean;
  urls: Url[];
}

interface Url {
  url: string;
}

interface ApiResponse {
  comments: Comment[];
  status: number;
}

async function CommentsApi(id: number): Promise<ApiResponse | null> {
  const urlFetch = `http://localhost:9090/comments/${id}`;

  try {
    const response = await axios.get<ApiResponse>(urlFetch);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Erro na requisição:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro na requisição:", error || "Erro desconhecido");
    return null;
  }
}

export default CommentsApi;
