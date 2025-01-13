import React, { useState } from "react";
import Together from "together-ai";
import { useFileUpload } from "../Supabase/image-uploader"; // Import custom hook for Supabase uploads

const together = new Together({
  apiKey: `${process.env.REACT_APP_TOGETHER_API_KEY}`,
});

export default function MiddleLayoutTogetherAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { uploadFiles } = useFileUpload(); // Custom hook for file upload

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTextMessage = {
      role: "user",
      content: {
        type: "text",
        text: input,
      },
    };

    setMessages((prev) => [...prev, newTextMessage]);

    let fileUrl = null;
    if (file) {
      try {
        const [uploadedFileUrl] = await uploadFiles([file]); // Upload the file and get the URL
        fileUrl = uploadedFileUrl;
        console.log("File uploaded to Supabase:", fileUrl);

        const newFileMessage = {
          role: "user",
          content: {
            type: "image_url",
            image_url: {
              url: fileUrl, // Use Supabase-uploaded URL
            },
          },
        };

        setMessages((prev) => [...prev, newFileMessage]);
      } catch (error) {
        console.error("File upload failed:", error);
        alert("Failed to upload the image. Please try again.");
        setLoading(false);
        return;
      }
    }

    try {
      const userMessages = [newTextMessage];
      if (fileUrl) {
        userMessages.push({
          role: "user",
          content: {
            type: "image_url",
            image_url: { url: fileUrl },
          },
        });
      }

      const response = await together.chat.completions.create({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOGETHER_API_KEY}`,
        },
        messages: userMessages,
        model: "meta-llama/Llama-Vision-Free",
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stream: true,
      });

      let aiContent = "";
      for await (const token of response) {
        aiContent += token.choices[0]?.delta?.content || "";
      }

      const aiMessage = {
        role: "assistant",
        content: aiContent || "Sorry, I couldn't process that.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
      setInput(""); // Clear input field
      setFile(null); // Clear file selection
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap my-2 p-4 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-100 text-blue-800 shadow-md"
                : "bg-white text-black shadow-lg"
            }`}
          >
            {msg.role === "user" ? "User: " : "AI: "}
            {msg.content.type === "text"
              ? msg.content.text
              : msg.content.image_url?.url && (
                  <img
                    src={msg.content.image_url.url}
                    alt="Uploaded content"
                    className="max-w-full max-h-40 mt-2"
                  />
                )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          className="input input-bordered w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
        />
        <button
          type="submit"
          className={`btn btn-outline btn-secondary ${
            loading ? "loading" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Send"}
        </button>
      </form>
    </div>
  );
}
