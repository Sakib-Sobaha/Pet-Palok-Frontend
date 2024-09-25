import React, { useState } from 'react';

export default function ItemDetailsForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        type: '',
        petType: ''
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No auth token found in local storage.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/price-predictor/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch API');
            }

            const responseData = await response.json();
            console.log('API Response:', responseData);
            setModalContent(`Predicted price: ${responseData.price}`);
            setModalOpen(true);
            // alert('Prediction received: ' + responseData.price);
        } catch (error) {
            console.error('API call failed:', error);
            setModalContent('Failed to predict price');
            setModalOpen(true);
            // alert('Error: ' + error.message);
        }

        
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="input input-bordered w-full col-span-2 font-serif"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="textarea textarea-bordered w-full col-span-2 font-serif"
                />
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="input input-bordered w-full font-serif"
                />
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Type"
                    className="input input-bordered w-full font-serif"
                />
                <input
                    type="text"
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    placeholder="Pet Type"
                    className="input input-bordered w-full font-serif"
                />
                <button type="submit" className="btn btn-primary col-span-2">Predict Price</button>
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
