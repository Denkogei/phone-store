import React, { useState } from 'react';
import axios from 'axios';

const AddPhone = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: 'available',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      await axios.post('http://localhost:3000/phones', formData);
      setMessage('Phone added successfully!');
      setMessageType('success');
      setFormData({ name: '', description: '', price: '', status: 'available', image: '' });
    } catch (error) {
      setMessage('Failed to add phone.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{paddingTop:"30px", paddingBottom:"20px"}}>Add New Phone</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Phone Name" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" required />
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Phone'}</button>
      </form>

      {/* Success or error message */}
      {message && (
            <p style={{
                color: messageType === 'success' ? 'green' : 'red',
                backgroundColor: messageType === 'success' ? '#8dee84' : '#f8d7da',
                border: messageType === 'success' ? '1px solid green' : '1px solid red', 
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
                width: "500px",
                color: 'black',
                fontWeight:'bolder',
                marginTop: '20px',
                // Center the message horizontally and vertically in the page
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {message}
              </p>
      )}
    </div>
  );
};

export default AddPhone;
