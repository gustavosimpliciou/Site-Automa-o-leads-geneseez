import { FormData } from '../types';

/**
 * Submits form data to the webhook
 * @param data User form data
 * @returns Promise that resolves when data is submitted
 */
export const submitFormData = async (data: FormData): Promise<void> => {
  try {
    // Replace with your actual webhook URL
    const webhookUrl = 'https://seuservidor.n8n.cloud/webhook/sitegratis';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    // Log for development purposes
    console.log('Form submitted successfully:', data);
    
    // Adding a slight delay to simulate processing
    return new Promise(resolve => setTimeout(resolve, 800));
  } catch (error) {
    console.error('Error submitting form data:', error);
    throw error;
  }
};