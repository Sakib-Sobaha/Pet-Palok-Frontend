import { useState } from "react";
import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [fileUrls, setFileUrls] = useState([]);

  const uploadFiles = async (files) => {
    setUploading(true);
    const urls = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        let { error } = await supabase.storage
          .from("pet-palok")
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        const { data: url } = await supabase.storage
          .from("pet-palok")
          .getPublicUrl(filePath);

        urls.push(url.publicUrl);
      }
      setFileUrls(urls);
    } catch (error) {
      console.log(error);
      alert("Error uploading files");
    } finally {
      setUploading(false);
    }

    return urls;
  };

  return { uploadFiles, uploading, fileUrls };
}
