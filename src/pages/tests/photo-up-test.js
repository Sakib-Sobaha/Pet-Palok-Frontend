import React, { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../../components/Supabase/supabase";
import { useFileUpload } from "../../components/Supabase/image-uploader"; // Import the custom hook

function PhotoUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { uploadFiles, uploading, fileUrls } = useFileUpload();

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files first!");
      return;
    }

    const urls = await uploadFiles(selectedFiles);
    console.log("Uploaded URLs:", urls);
  };

  return (
    <div>
      <SessionContextProvider supabaseClient={supabase}>
        <h1>Upload Photos</h1>
        <input type="file" onChange={handleFileChange} multiple />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="btn btn-primary"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {fileUrls.length > 0 && (
          <div>
            <h2>Uploaded Photos</h2>
            {fileUrls.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Uploaded ${index + 1}`} style={{ width: "300px" }} />
                <p>
                  Public URL:{" "}
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </SessionContextProvider>
    </div>
  );
}

export default PhotoUpload;
