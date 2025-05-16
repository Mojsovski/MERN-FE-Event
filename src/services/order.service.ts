import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.conts";

import { ICart } from "@/types/Ticket";

const orderServices = {
  addOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
  getOrders: (params?: string) => instance.get(`${endpoint.ORDER}?${params}`),
  getMemberOrder: (params?: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
  getOrderById: (id: string) => instance.get(`${endpoint.ORDER}/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${endpoint.ORDER}/${id}/${status}`),
  deleteOrder: (id: string) => instance.delete(`${endpoint.ORDER}/${id}`),
};

export default orderServices;
