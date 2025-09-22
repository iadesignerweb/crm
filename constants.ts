
import { Customer, Deal, Task, DealStage } from './types';

export const DEAL_STAGES: DealStage[] = [
  DealStage.Lead,
  DealStage.Contacted,
  DealStage.Proposal,
  DealStage.Won,
  DealStage.Lost,
];

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Ana Silva', email: 'ana.silva@example.com', phone: '(11) 98765-4321', company: 'Inovatech Soluções', createdAt: new Date('2023-10-20'), notes: 'Interessada na solução de automação de marketing.' },
  { id: 2, name: 'Bruno Costa', email: 'bruno.costa@example.com', phone: '(21) 91234-5678', company: 'Nexus TI', createdAt: new Date('2023-11-05') },
  { id: 3, name: 'Carla Dias', email: 'carla.dias@example.com', phone: '(31) 95555-8888', company: 'Digital Hub', createdAt: new Date('2024-01-15'), notes: 'Precisa de uma proposta detalhada até o fim da semana.' },
  { id: 4, name: 'Daniel Martins', email: 'daniel.martins@example.com', phone: '(41) 94444-7777', company: 'Velocity Corp', createdAt: new Date('2024-02-01') },
];

export const mockDeals: Deal[] = [
  { id: 1, title: 'Projeto de Automação', value: 15000, customerId: 1, stage: DealStage.Proposal, expectedCloseDate: new Date('2024-07-30') },
  { id: 2, title: 'Consultoria de TI', value: 8000, customerId: 2, stage: DealStage.Contacted, expectedCloseDate: new Date('2024-08-15') },
  { id: 3, title: 'Desenvolvimento de E-commerce', value: 25000, customerId: 3, stage: DealStage.Won, expectedCloseDate: new Date('2024-06-25') },
  { id: 4, title: 'Novo Lead - Velocity', value: 12000, customerId: 4, stage: DealStage.Lead, expectedCloseDate: new Date('2024-09-01') },
  { id: 5, title: 'Contrato de Suporte', value: 5000, customerId: 1, stage: DealStage.Won, expectedCloseDate: new Date('2024-05-10') },
  { id: 6, title: 'Upgrade de Sistema', value: 7500, customerId: 3, stage: DealStage.Lost, expectedCloseDate: new Date('2024-04-20') },
];

export const mockTasks: Task[] = [
  { id: 1, title: 'Follow-up com Ana Silva', dueDate: new Date('2024-07-28'), customerId: 1, completed: false },
  { id: 2, title: 'Enviar proposta para Carla Dias', dueDate: new Date('2024-07-25'), customerId: 3, completed: true },
  { id: 3, title: 'Agendar reunião com Bruno Costa', dueDate: new Date('2024-08-02'), customerId: 2, completed: false },
  { id: 4, title: 'Preparar apresentação para Velocity Corp', dueDate: new Date('2024-08-10'), customerId: 4, completed: false },
];
