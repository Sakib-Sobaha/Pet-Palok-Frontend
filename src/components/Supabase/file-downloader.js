import { supabase } from "./supabase";

export const downloadFile = async (filePath) => {
  try {
    const { data, error } = await supabase.storage
      .from("pet-palok")
      .download(filePath);

    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filePath.split("/").pop()); // Use the file name for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
