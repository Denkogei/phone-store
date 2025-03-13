import React, { useState } from 'react';
import axios from 'axios';

const AddPhone = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: 'available',
    image: '',
    phoneNumber: '', // Add phoneNumber field to the state
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAndFormatPhoneNumber = (phone) => {
    // Remove any non-numeric characters (like spaces, dashes)
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if phone number starts with '0' and prepend the country code
    if (cleanedPhone.startsWith('0')) {
      return '+254' + cleanedPhone.substring(1);
    }

    // If it doesn't start with '0', check if it's in international format
    if (/^\+?\d{9,15}$/.test(cleanedPhone)) {
      return cleanedPhone; // Valid phone number, return it as is
    }

    return null; // Return null if the phone number is invalid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');
    setPhoneError(''); // Reset phone error

    // Validate and format the phone number
    const formattedPhone = validateAndFormatPhoneNumber(formData.phoneNumber);
    if (!formattedPhone) {
      setPhoneError('Invalid phone number. Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    // Proceed with the form submission
    try {
      const data = { ...formData, phoneNumber: formattedPhone }; // Include formatted phone number in the submission
      await axios.post('https://phone-store-backend-626o.onrender.com/phones', data);
      setMessage('Phone added successfully!');
      setMessageType('success');
      setFormData({
        name: '',
        description: '',
        price: '',
        status: 'available',
        image: '',
        phoneNumber: '', // Clear phoneNumber after submission
      });
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
            width: 90%; /* Reduce width to 90% */
            max-width: 400px; /* Further reduce max-width */
            margin: 0 auto;
            padding: 20px; /* Add padding to prevent touching edges */
            padding-top: 12vh;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow-x: hidden; /* Prevent horizontal overflow */
          }

          .header {
            text-align: center;
            font-size: 20px; /* Reduce font size for header */
            font-weight: bold;
            margin-bottom: 20px;
          }

          .form {
            display: flex;
            flex-direction: column;
            gap: 10px; /* Reduce gap between form items */
            width: 100%; /* Full width */
          }

          .input, .textarea, .select {
            padding: 8px; /* Reduce padding */
            font-size: 14px; /* Reduce font size for inputs */
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 90%; /* Reduce width to 90% */
            margin: 0 auto; /* Center the form fields */
            box-sizing: border-box;
            transition: border 0.3s;
          }

          .textarea {
            height: 100px; /* Reduce height of textarea */
          }

          .button {
            padding: 10px; /* Reduce padding */
            font-size: 14px; /* Reduce font size for button */
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 90%; /* Reduce width to 90% */
            margin: 0 auto; /* Center the button */
          }

          .button:disabled {
            background-color: #a5d6a7;
            cursor: not-allowed;
          }

          .errorMessage {
            color: red;
            font-size: 12px; /* Reduce font size for error message */
            margin-top: 5px;
            text-align: center; /* Center the error message */
          }

          .message {
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
            margin: 0 auto;
            width: 90%; /* Reduce width to 90% */
            font-size: 14px; /* Reduce font size for message */
            position: fixed; /* Fix the message position */
            top: 20px; /* Position from the top */
            left: 50%; /* Center horizontally */
            transform: translateX(-50%); /* Center horizontally */
            z-index: 1000; /* Ensure it appears above other elements */
          }

          @media (max-width: 600px) {
            .container {
              padding: 10px; /* Reduce padding for smaller screens */
              max-width: 90%; /* Reduce max-width for smaller screens */
            }

            .header {
              font-size: 18px; /* Further reduce font size for smaller screens */
            }

            .input, .textarea, .select, .button {
              font-size: 13px; /* Further reduce font size for inputs on smaller screens */
              width: 90%; /* Reduce width to 90% for smaller screens */
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
        {/* Show phone number error message */}
        {phoneError && <p className="errorMessage">{phoneError}</p>}
        <button type="submit" disabled={loading} className="button">
          {loading ? 'Adding...' : 'Add Phone'}
        </button>
      </form>

      {/* Success or error message */}
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