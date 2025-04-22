import { DateValue } from "@heroui/react";

interface IRegency {
  name: string;
  id: string;
}

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFeatured?: boolean | string;
  isPublish?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  location?: {
    region: string;
    coordinates: number[];
    address: string;
  };
  banner?: string | FileList;
}

interface IEventForm extends IEvent {
  address?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
}

export type { IEvent, IRegency, IEventForm };
