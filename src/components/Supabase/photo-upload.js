import React, { useState } from "react";
import { supabase } from "./supabase"; // Ensure correct path
import { SessionContextProvider } from "@supabase/auth-helpers-react"; // Correct import
import { v4 as uuidv4 } from "uuid";

const user = {
  id: "images-test-1",
};

function PhotoUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { date, error } = await supabase.storage
        .from("pet-palok")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: url } = await supabase.storage
        .from("pet-palok")
        .getPublicUrl(filePath);

      console.log(url.publicUrl);
      setFileUrl(url.publicUrl);
      
      alert("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <SessionContextProvider supabaseClient={supabase}>
        <h1>Upload Photo</h1>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="btn btn-primary"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {fileUrl && (
          <div>
            <h2>Uploaded Photo</h2>
            <img src={fileUrl} alt="Uploaded" style={{ width: "300px" }} />
            <p>
              Public URL:{" "}
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                {fileUrl}
              </a>
            </p>
          </div>
        )}
      </SessionContextProvider>
    </div>
  );
}

export default PhotoUpload;
