import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.conts";

import { ICart } from "@/types/Ticket";

const orderServices = {
  addOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
  //   getCategories: (params?: string) =>
  //     instance.get(`${endpoint.CATEGORY}?${params}`),
  //   getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  //   deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${endpoint.ORDER}/${id}/${status}`),
};

export default orderServices;
