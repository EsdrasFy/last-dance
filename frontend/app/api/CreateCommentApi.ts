import axios, { AxiosError } from "axios";

interface Comment {
  text_comment: string;
  user_id: number | undefined;
  user_img: string;
  product_id: number;
  username: string;
  rating: string;
  recommend: boolean;
}

interface Url {
  url: string;
}

interface CreateCommentApiProps {
  comment: Comment;
  urls: Url[];
}

async function CreateCommentApi({ comment, urls }: CreateCommentApiProps) {
  console.log("chamado");

  const urlFetch = "http://localhost:9090/comment/create";
  try {
    const response = await axios.post(urlFetch, {
      comment,
      urls,
    });
    
    if (response.status >= 201 && response.status < 300) {
      return { data: response.data, error: null };
    } else {
      return { data: null, error: response.statusText };
    }
  } catch (error) {
    if((axios.isAxiosError(error) && error.response?.data.msg)){
      return { data: null, error: error.message || 'Erro desconhecido' };
    }
    return { data: null, error: 'Erro desconhecido' };
  }
}
export default CreateCommentApi;
