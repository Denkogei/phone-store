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

  // Handle phone number properly (making sure it's in E.164 format)
  const phoneNumber = phone.phoneNumber || '+254724554147'; // Use the phone number from DB, or fallback to your number if missing
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi%20I'm%20interested%20in%20the%20${encodeURIComponent(phone.name)}`;

  return (
    <div className="phone-detail" style={styles.container}>
      <h2 style={styles.header}>{phone.name}</h2>
      <img src={phone.image} alt={phone.name} className="phone-image" style={styles.image} />
      <p>{phone.description}</p>
      <p>Price: KES {phone.price}</p>
      <p>Status: {phone.status.charAt(0).toUpperCase() + phone.status.slice(1)}</p>
      
      {/* Display the phone number */}
      <p>Phone Number: <strong>{phoneNumber}</strong></p>

      {/* WhatsApp button with icon */}
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={styles.whatsappButton}
      >
        <i className="fab fa-whatsapp" style={styles.icon}></i> Chat on WhatsApp
      </a>
    </div>
  );
};

// Styling for the phone details page
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
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  whatsappButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#25d366',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
    textAlign: 'center',
  },
  icon: {
    marginRight: '8px',
    fontSize: '20px',
  },
};

export default PhoneDetail;
