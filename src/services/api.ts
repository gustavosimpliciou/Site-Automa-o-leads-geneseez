import { FormData } from '../types';

/**
 * Envia os dados do formulário para o webhook do n8n
 * @param data Dados do formulário do usuário
 * @returns Promise que resolve quando os dados são enviados
 */
export const submitFormData = async (data: FormData): Promise<void> => {
  try {
    const response = await fetch('https://geneseez.app.n8n.cloud/webhook-test/formulario-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    
    // Pequeno delay para melhor experiência do usuário
    await new Promise(resolve => setTimeout(resolve, 800));
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    throw error;
  }
};