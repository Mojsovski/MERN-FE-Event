import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.conts";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  addEvent: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
  getEventById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
  updateEvent: (id: string, payload: IEvent) =>
    instance.put(`${endpoint.EVENT}/${id}`, payload),

  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  getRegencyById: (id: string) =>
    instance.get(`${endpoint.REGION}/${id}/regency`),
};

export default eventServices;
