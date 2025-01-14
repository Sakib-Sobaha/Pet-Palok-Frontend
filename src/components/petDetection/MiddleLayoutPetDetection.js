import React, { useState } from 'react';
import { useFileUpload } from "../Supabase/image-uploader"; // Import custom hook for Supabase uploads

export default function ImageUrlForm() {
    const [formData, setFormData] = useState({
        imageUrl: ''
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); // State for image preview
    const [loading, setLoading] = useState(false);
    const { uploadFiles } = useFileUpload(); // Custom hook for file upload

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Generate a preview URL for the selected file
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No auth token found in local storage.");
            setLoading(false);
            return;
        }

        let fileUrl = null;
        if (file) {
            try {
                const [uploadedFileUrl] = await uploadFiles([file]); // Upload the file and get the URL
                fileUrl = uploadedFileUrl;
                console.log("File uploaded to Supabase:", fileUrl);

                // Update formData with the uploaded file URL
                setFormData({
                    imageUrl: fileUrl
                });
            } catch (error) {
                console.error("File upload failed:", error);
                setModalContent("Failed to upload the image. Please try again.");
                setModalOpen(true);
                setLoading(false);
                return;
            }
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/pet-predictor/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ imageUrl: fileUrl })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch API');
            }

            const responseData = await response.json();
            console.log('API Response:', responseData);
            setModalContent(`Predicted pet: ${(responseData.prediction)} `);
            setModalOpen(true);
        } catch (error) {
            console.error('API call failed:', error);
            setModalContent('Failed to predict pet');
            setModalOpen(true);
        } finally {
            setLoading(false);
            setFile(null);
            setFilePreview(null); // Clear the preview
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full col-span-2 font-serif"
                />

                {/* Show image preview */}
                {filePreview && (
                    <div className="col-span-2 flex justify-center items-center">
                        <img
                            src={filePreview}
                            alt="Preview"
                            className="max-w-xs max-h-40 rounded-md shadow-md"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className={`btn btn-primary col-span-2 ${loading ? "loading" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Predict Pet"}
                </button>
            </form>

            {isModalOpen && (
                <div className="modal modal-open font-serif font-bold fill-success-content">
                    <div className="modal-box flex flex-col justify-center items-center">
                        <p>{modalContent}</p>
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
