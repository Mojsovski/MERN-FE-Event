interface IRegency {
  name: string;
  id: string;
}

interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isPublished: boolean;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    region: string;
    coordinate: {
      x: number;
      y: number;
    };
  };
  banner: string;
}

export type { IEvent, IRegency };
