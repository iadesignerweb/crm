
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CustomersPage from './pages/CustomersPage';
import DealsPage from './pages/DealsPage';
import TasksPage from './pages/TasksPage';
import { Customer, Deal, Task, DealStage } from './types';
import { mockCustomers, mockDeals, mockTasks } from './constants';

type Page = 'dashboard' | 'customers' | 'deals' | 'tasks';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addCustomer = useCallback((customer: Omit<Customer, 'id' | 'createdAt'>) => {
    setCustomers(prev => [...prev, { ...customer, id: prev.length + 1, createdAt: new Date() }]);
  }, []);

  const updateCustomer = useCallback((updatedCustomer: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  }, []);

  const addDeal = useCallback((deal: Omit<Deal, 'id'>) => {
    setDeals(prev => [...prev, { ...deal, id: prev.length + 1 }]);
  }, []);

  const updateDealStage = useCallback((dealId: number, newStage: DealStage) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: newStage } : d));
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id' | 'completed'>) => {
    setTasks(prev => [...prev, { ...task, id: prev.length + 1, completed: false }]);
  }, []);
  
  const toggleTask = useCallback((taskId: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard customers={customers} deals={deals} tasks={tasks} />;
      case 'customers':
        return <CustomersPage customers={customers} deals={deals} addCustomer={addCustomer} updateCustomer={updateCustomer} />;
      case 'deals':
        return <DealsPage deals={deals} customers={customers} updateDealStage={updateDealStage} addDeal={addDeal} />;
      case 'tasks':
        return <TasksPage tasks={tasks} customers={customers} addTask={addTask} toggleTask={toggleTask} />;
      default:
        return <Dashboard customers={customers} deals={deals} tasks={tasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-light font-sans">
      <Sidebar currentPage={page} setPage={setPage} isOpen={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPageTitle={page.charAt(0).toUpperCase() + page.slice(1)} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light p-4 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
