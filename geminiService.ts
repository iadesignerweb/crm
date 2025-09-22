
import { GoogleGenAI } from "@google/genai";
import { Customer, Deal } from '../types';

// Acessa a API key de forma segura para evitar erros em ambientes de navegador onde `process` não está definido.
const API_KEY = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Falha ao inicializar o GoogleGenAI. Verifique a chave de API.", error);
    ai = null;
  }
}

if (!ai) {
  console.warn("Serviço de IA Gemini não inicializado. Verifique se a API_KEY está configurada corretamente no ambiente.");
}

export const generateSalesEmail = async (customer: Customer, deal: Deal | undefined): Promise<string> => {
  if (!ai) {
    throw new Error("Serviço de IA indisponível. Verifique se a chave de API foi configurada corretamente.");
  }
  
  const prompt = `
    Escreva um e-mail de follow-up profissional e amigável para um cliente.

    **Contexto:**
    - **Meu Nome:** [Seu Nome/Nome do Vendedor]
    - **Minha Empresa:** Gemini CRM Pro
    - **Nome do Cliente:** ${customer.name}
    - **Empresa do Cliente:** ${customer.company}

    **Informações Adicionais do Cliente:**
    ${customer.notes ? `- Anotações: ${customer.notes}`: ''}

    ${deal ? `
    **Detalhes do Negócio:**
    - **Título do Negócio:** ${deal.title}
    - **Valor:** R$ ${deal.value.toLocaleString('pt-BR')}
    - **Estágio Atual:** ${deal.stage}
    - **Data de Fechamento Esperada:** ${deal.expectedCloseDate.toLocaleDateString('pt-BR')}
    ` : `
    **Detalhes do Negócio:**
    - Nenhum negócio ativo associado no momento. O objetivo é iniciar uma conversa e identificar uma oportunidade.
    `}

    **Instruções para o E-mail:**
    1.  Seja conciso e direto ao ponto.
    2.  Use um tom positivo e prestativo.
    3.  Personalize a mensagem com base nas informações do cliente e do negócio.
    4.  Termine com uma chamada para ação clara (ex: agendar uma breve chamada, responder a uma pergunta).
    5.  Assine o e-mail como "[Seu Nome]".
    6.  Não inclua um assunto, apenas o corpo do e-mail.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Falha ao gerar conteúdo com a IA. Verifique sua chave de API e tente novamente.");
  }
};
