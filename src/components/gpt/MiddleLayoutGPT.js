import React, { useState } from 'react';

export default function MiddleLayoutGPT() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMessage = {
            role: "user",
            content: input,
        };

        // Update messages state to show the user's message
        setMessages((prev) => [...prev, newMessage]);

        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("No auth token found in local storage.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/openai`, { // Correct API endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    messages: [newMessage], // Correctly include messages in the body
                }),
            });

            if (!response.ok) {
                console.error("Failed to fetch AI response");
                return;
            }

            const data = await response.json(); // Correctly parse the JSON response

            const aiMessage = {
                role: "ai",
                content: data.choices[0]?.message?.content || "Sorry, I didn't understand that.",
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Fetch error:", error);
        }

        setInput(""); // Clear input field
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto py-4">
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`whitespace-pre-wrap ${msg.role === "user" ? "text-blue-500" : "text-green-500"}`}>
                        {msg.role === "user" ? "User: " : "AI: "}
                        {msg.content}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex mt-4">
                <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
            </form>
        </div>
    );
}
