import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate

const AddPhone = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: 'available',
    image: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const navigate = useNavigate(); // Step 2: Get the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAndFormatPhoneNumber = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.startsWith('0')) {
      return '+254' + cleanedPhone.substring(1);
    }
    if (/^\+?\d{9,15}$/.test(cleanedPhone)) {
      return cleanedPhone;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');
    setPhoneError('');

    const formattedPhone = validateAndFormatPhoneNumber(formData.phoneNumber);
    if (!formattedPhone) {
      setPhoneError('Invalid phone number. Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    try {
      const data = { ...formData, phoneNumber: formattedPhone };
      await axios.post('https://phone-store-backend-626o.onrender.com/phones', data);
      setMessage('Phone added successfully!');
      setMessageType('success');
      setFormData({
        name: '',
        description: '',
        price: '',
        status: 'available',
        image: '',
        phoneNumber: '',
      });

      // Step 3: Redirect after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate('/'); // Redirect to /phonelisting or '/'
      }, 2000); // 2 seconds delay
    } catch (error) {
      setMessage('Failed to add phone.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <style>
        {`
          .container {
            width: 90%;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            padding-top: 12vh;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow-x: hidden;
          }

          .header {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
          }

          .form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }

          .input, .textarea, .select {
            padding: 8px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 90%;
            margin: 0 auto;
            box-sizing: border-box;
            transition: border 0.3s;
          }

          .textarea {
            height: 100px;
          }

          .button {
            padding: 10px;
            font-size: 14px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 90%;
            margin: 0 auto;
          }

          .button:disabled {
            background-color: #a5d6a7;
            cursor: not-allowed;
          }

          .errorMessage {
            color: red;
            font-size: 12px;
            margin-top: 5px;
            text-align: center;
          }

          .message {
            position: fixed; /* Fixed position */
            top: 20px; /* Position at the top */
            left: 50%; /* Center horizontally */
            transform: translateX(-50%); /* Center horizontally */
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            width: 90%;
            max-width: 400px; /* Match form width */
            font-size: 14px;
            z-index: 1000; /* Ensure it's above other elements */
          }

          @media (max-width: 600px) {
            .container {
              padding: 10px;
              max-width: 90%;
            }

            .header {
              font-size: 18px;
            }

            .input, .textarea, .select, .button {
              font-size: 13px;
              width: 90%;
            }

            .message {
              top: 10px; /* Adjust top position for smaller screens */
              font-size: 12px; /* Smaller font size for mobile */
            }
          }

          @media (min-width: 1024px) {
            .container {
              max-width: 300px; /* Reduced by half */
              padding: 15px; /* Reduced padding */
            }

            .header {
              font-size: 22px; /* Smaller font size */
            }

            .form {
              gap: 8px; /* Reduced gap */
              width:600px;
            }

            .input, .textarea, .select {
              padding: 6px; /* Reduced padding */
              font-size: 18px; /* Smaller font size */
            }

            .textarea {
              height: 80px; /* Reduced height */
            }

            .button {
              padding: 8px; /* Reduced padding */
              font-size: 18px; /* Smaller font size */
            }

            .errorMessage {
              font-size: 11px; /* Smaller font size */
            }

            .message {
              font-size: 12px; /* Smaller font size */
            }
          }
        `}
      </style>

      <h2 className="header">Add New Phone</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Phone Name"
          required
          className="input"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="textarea"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          required
          className="input"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="select"
        >
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="input"
        />
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="input"
        />
        {phoneError && <p className="errorMessage">{phoneError}</p>}
        <button type="submit" disabled={loading} className="button">
          {loading ? 'Adding...' : 'Add Phone'}
        </button>
      </form>

      {message && (
        <p
          className="message"
          style={{
            backgroundColor: messageType === 'success' ? '#8dee84' : '#f8d7da',
            border: messageType === 'success' ? '1px solid green' : '1px solid red',
            color: messageType === 'success' ? 'green' : 'red',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddPhone;