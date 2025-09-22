
import React, { useState, useCallback } from 'react';
import { generateSalesEmail } from '../services/geminiService';
import { Customer, Deal } from '../types';
import { SparklesIcon } from './icons';

interface EmailGeneratorProps {
  customer: Customer;
  deal: Deal | undefined;
}

const EmailGenerator: React.FC<EmailGeneratorProps> = ({ customer, deal }) => {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateEmail = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setGeneratedEmail('');
    try {
      const emailContent = await generateSalesEmail(customer, deal);
      setGeneratedEmail(emailContent);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [customer, deal]);

  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold text-dark mb-3">Assistente de IA Gemini</h3>
      <p className="text-sm text-medium mb-4">Gere um e-mail de follow-up personalizado para este cliente com base em seus dados e estágio do negócio.</p>
      
      <button
        onClick={handleGenerateEmail}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark disabled:bg-gray-400 transition-colors duration-200"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? 'Gerando...' : 'Gerar E-mail de Follow-up'}
      </button>

      {error && <p className="mt-4 text-sm text-red-600 font-medium p-3 bg-red-100 border border-red-200 rounded-md">{error}</p>}

      {generatedEmail && (
        <div className="mt-4 p-4 border bg-white rounded-md">
          <h4 className="font-semibold text-dark mb-2">E-mail Sugerido:</h4>
          <div className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
            {generatedEmail}
          </div>
           <button
            onClick={() => navigator.clipboard.writeText(generatedEmail)}
            className="mt-3 text-sm px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Copiar Texto
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;
