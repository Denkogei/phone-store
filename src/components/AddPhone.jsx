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

  // Function to format the phone number and validate it
  const validateAndFormatPhoneNumber = (phone) => {
    // Remove any non-numeric characters (like spaces, dashes)
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if phone number starts with '0' and prepend the country code
    if (cleanedPhone.startsWith('0')) {
      return '+254' + cleanedPhone.substring(1); // For Kenya, replace 0 with +254
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
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Phone</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Phone Name"
          required
          style={styles.input}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={styles.textarea}
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          required
          style={styles.input}
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          style={styles.select}
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
          style={styles.input}
        />
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          style={styles.input}
        />
        {/* Show phone number error message */}
        {phoneError && (
          <p style={styles.errorMessage}>{phoneError}</p>
        )}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Adding...' : 'Add Phone'}
        </button>
      </form>

      {/* Success or error message */}
      {message && (
        <p
          style={{
            ...styles.message,
            backgroundColor: messageType === 'success' ? '#8dee84' : '#f8d7da',
            border: messageType === 'success' ? '1px solid green' : '1px solid red',
            color: messageType === 'success' ? 'green' : 'red', marginTop: "12vh"
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

// Styles for the form and messages
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border 0.3s',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    height: '120px',
    boxSizing: 'border-box',
    transition: 'border 0.3s',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border 0.3s',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#a5d6a7',
    cursor: 'not-allowed',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  message: {
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '20px',
    margin: '0 auto',
    width: '100%',
  },
};

export default AddPhone;
