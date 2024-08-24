import { supabase } from './supabase';

export async function deleteFileFromSupabase(fileUrl) {
  try {
    // Extract the file path from the URL
    const filePath = fileUrl.split('/').pop();

    const { error } = await supabase.storage
      .from('pet-palok')
      .remove([filePath]);

    if (error) {
      throw error;
    }

    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file from Supabase:', error);
  }
}
