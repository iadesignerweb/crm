
import { Customer, Deal, Task, DealStage } from './types';

export const DEAL_STAGES: DealStage[] = [
  DealStage.Lead,
  DealStage.Contacted,
  DealStage.Proposal,
  DealStage.Won,
  DealStage.Lost,
];

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Anna Smith', email: 'anna.smith@example.com', phone: '(555) 123-4567', company: 'Innovatech Solutions', createdAt: new Date('2023-10-20'), notes: 'Interested in the marketing automation solution.' },
  { id: 2, name: 'Bruno Costa', email: 'bruno.costa@example.com', phone: '(555) 987-6543', company: 'Nexus IT', createdAt: new Date('2023-11-05') },
  { id: 3, name: 'Carla Diaz', email: 'carla.diaz@example.com', phone: '(555) 555-8888', company: 'Digital Hub', createdAt: new Date('2024-01-15'), notes: 'Needs a detailed proposal by the end of the week.' },
  { id: 4, name: 'Daniel Martin', email: 'daniel.martin@example.com', phone: '(555) 444-7777', company: 'Velocity Corp', createdAt: new Date('2024-02-01') },
];

export const mockDeals: Deal[] = [
  { id: 1, title: 'Automation Project', value: 15000, customerId: 1, stage: DealStage.Proposal, expectedCloseDate: new Date('2024-07-30') },
  { id: 2, title: 'IT Consulting', value: 8000, customerId: 2, stage: DealStage.Contacted, expectedCloseDate: new Date('2024-08-15') },
  { id: 3, title: 'E-commerce Development', value: 25000, customerId: 3, stage: DealStage.Won, expectedCloseDate: new Date('2024-06-25') },
  { id: 4, title: 'New Lead - Velocity', value: 12000, customerId: 4, stage: DealStage.Lead, expectedCloseDate: new Date('2024-09-01') },
  { id: 5, title: 'Support Contract', value: 5000, customerId: 1, stage: DealStage.Won, expectedCloseDate: new Date('2024-05-10') },
  { id: 6, title: 'System Upgrade', value: 7500, customerId: 3, stage: DealStage.Lost, expectedCloseDate: new Date('2024-04-20') },
];

export const mockTasks: Task[] = [
  { id: 1, title: 'Follow-up with Anna Smith', dueDate: new Date('2024-07-28'), customerId: 1, completed: false },
  { id: 2, title: 'Send proposal to Carla Diaz', dueDate: new Date('2024-07-25'), customerId: 3, completed: true },
  { id: 3, title: 'Schedule meeting with Bruno Costa', dueDate: new Date('2024-08-02'), customerId: 2, completed: false },
  { id: 4, title: 'Prepare presentation for Velocity Corp', dueDate: new Date('2024-08-10'), customerId: 4, completed: false },
];
