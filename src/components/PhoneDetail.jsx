import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PhoneDetail = () => {
  const { id } = useParams(); // Get the phone ID from the URL params
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch phone details by ID
  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await axios.get(`https://phone-store-backend-626o.onrender.com/phones/${id}`);
        setPhone(response.data);
      } catch (error) {
        setError('Failed to fetch phone details');
        console.error('Error fetching phone:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [id]);

  if (loading) {
    return <div>Loading phone details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!phone) {
    return <div>Phone not found</div>;
  }

  // Handle phone number properly
  const phoneNumber = phone.phone_number // Use the phone number from DB, or fallback to your number if missing
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi%20I'm%20interested%20in%20the%20${phone.name}`;

  return (
    <div className="phone-detail">
      <h2>{phone.name}</h2>
      <img src={phone.image} alt={phone.name} className="phone-image" />
      <p>{phone.description}</p>
      <p>Price: KES {phone.price}</p>
      <p>Status: {phone.status.charAt(0).toUpperCase() + phone.status.slice(1)}</p>

      {/* WhatsApp button with icon */}
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-button"
      >
        <i className="fab fa-whatsapp"></i> Chat on WhatsApp
      </a>
    </div>
  );
};

export default PhoneDetail;
