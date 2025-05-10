import { FormData } from '../types';

/**
 * Submits form data to the webhook
 * @param data User form data
 * @returns Promise that resolves when data is submitted
 */
export const submitFormData = async (data: FormData): Promise<void> => {
  try {
    // Send directly to n8n webhook since we're having issues with Supabase Edge Functions
    const response = await fetch('https://geneseez.app.n8n.cloud/webhook-test/formulario-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    // Adding a slight delay to simulate processing
    return new Promise(resolve => setTimeout(resolve, 800));
  } catch (error) {
    console.error('Error submitting form data:', error);
    throw error;
  }
};