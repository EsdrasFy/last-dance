interface Image {
    url: string;
  }
  
  interface Detail {
    detail: string;
  }
  
  interface Size {
    size: string;
  }
  
  interface Flag {
    flag: string;
  }
  
  interface Card {
    id: number;
    title: string;
    summary: string;
    quantidy: number;
    sold: number;
    price: string;
    state: boolean;
    category: string;
    brand: string;
    guarantee: string;
    assessment: number;
    qtd_assessment: number;
    parcelable: boolean;
    max_installments: number;
    interest_rate: number;
    updated_at: string;
    created_at: string;
    createdAt: string;
    updatedAt: string;
    images: Image[];
    colors: string[]; // Se houver um array de cores, ajuste conforme necessário
    details: Detail[];
    sizes: Size[];
    flags: Flag[];
  }
  
  export default Card;
  