
export enum DealStage {
  Lead = 'Lead',
  Contacted = 'Contactado',
  Proposal = 'Proposta',
  Won = 'Ganho',
  Lost = 'Perdido',
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: Date;
  notes?: string;
}

export interface Deal {
  id: number;
  title: string;
  value: number;
  customerId: number;
  stage: DealStage;
  expectedCloseDate: Date;
}

export interface Task {
  id: number;
  title: string;
  dueDate: Date;
  customerId: number;
  completed: boolean;
}
