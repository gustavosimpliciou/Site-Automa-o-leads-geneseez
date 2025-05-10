import { FormData } from '../types';

/**
 * Submits form data to the webhook
 * @param data User form data
 * @returns Promise that resolves when data is submitted
 */
export const submitFormData = async (data: FormData): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/form-proxy`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
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