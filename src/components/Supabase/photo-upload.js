import React, { useState } from 'react';
import { supabase } from './supabase'; // Ensure correct path
import { SessionContextProvider } from "@supabase/auth-helpers-react"; // Correct import
import { v4 as uuidv4 } from "uuid";

function PhotoUpload() {
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    async function getImages() {
        const {data, error} = await supabase
            .storage
            .from('pet-palok')
            .list("images/",{
                limit: 100,
                offset: 0,
                sortBy: {column: 'created_at', order: 'desc'}
            });

        if (data) {
            console.log(data);
            setImages(data);
        } else {
            console.log(error);
        }
    }

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        setUploading(true);

        const { data, error } = await supabase
            .storage
            .from('pet-palok')
            .upload("images/" + uuidv4(), file);

        if (data) {
            getImages();
        } else {
            console.log(error);
        }

        setUploading(false);
    };

    return (
        <div>
            <SessionContextProvider supabaseClient={supabase}>
                <h1>Upload Photo</h1>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                </button>

                {uploadedUrl && (
                    <div>
                        <h2>Uploaded Photo</h2>
                        <img src={uploadedUrl} alt="Uploaded" style={{ width: '300px' }} />
                        <p>Public URL: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a></p>
                    </div>
                )}
            </SessionContextProvider>
        </div>
    );
}

export default PhotoUpload;
