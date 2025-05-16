import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.conts";
import { ITicket } from "@/types/Ticket";

const ticketServices = {
  getTicket: (params?: string) => instance.get(`${endpoint.TICKET}?${params}`),
  getTicketById: (id: string) => instance.get(`${endpoint.TICKET}/${id}`),
  getTicketByEventId: (id: string) =>
    instance.get(`${endpoint.TICKET}/${id}/events`),
  addTicket: (payload: ITicket) => instance.post(endpoint.TICKET, payload),
  deleteTicket: (id: string) => instance.delete(`${endpoint.TICKET}/${id}`),
  updateTicket: (id: string, payload: ITicket) =>
    instance.put(`${endpoint.TICKET}/${id}`, payload),
};

export default ticketServices;
