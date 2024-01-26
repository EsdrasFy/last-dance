import axios from "axios";

async function ProductsById(ids: string) {
  try {
    const url_default = `http://localhost:9090/product/${ids}`;
    const data = await axios.get<any[]>(url_default);
    if (!data) {
      console.log("n oego produto");
    }
    return {
      data: data.data,
      status: data.status,
    };
  } catch (error) {
  }
}
export default ProductsById;
