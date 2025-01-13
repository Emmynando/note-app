export type EventItem = {
  start?: Date;
  end?: Date;
  data?: { appointment?: Appointment; blockout?: Blockout };
  isDraggable?: boolean;
  resourceId?: number;
};

export type Appointment = {
  id: number;
  status: string;
  category: string;
  resource: string;
  title: string;
};

export type Blockout = { id: number; name: string };
