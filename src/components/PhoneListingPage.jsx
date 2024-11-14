import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PhoneListingPage = ({ searchTerm }) => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate programmatically

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get('https://phone-store-backend-626o.onrender.com/phones');
        setPhones(response.data);  // Set phones data to state
      } catch (error) {
        setError('Failed to fetch phones');
        console.error('Error fetching phones:', error);
      } finally {
        setLoading(false);  // Set loading to false when fetch is complete
      }
    };

    fetchPhones(); 
  }, []);  

  // Filter phones based on the search term
  const filteredPhones = phones.filter((phone) =>
    phone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If loading, show loading message
  if (loading) {
    return <div>Loading phones...</div>;
  }

  // If error, show error message
  if (error) {
    return <div>{error}</div>;
  }

  // Handle card click to navigate to phone details
  const handleCardClick = (id) => {
    navigate(`/phone/${id}`);  // Navigate to the phone detail page
  };

  return (
    <div>
      <h2 style={{padding:"30px"}}>Available Phones</h2>
      {filteredPhones.length === 0 ? (
        <p>No phones found matching your search.</p>
      ) : (
        <div className="phone-list">
          {filteredPhones.map((phone) => (
            <div
              key={phone.id}
              className="phone-card"
              onClick={() => handleCardClick(phone.id)}  // Add onClick handler for navigation
            >
              <img src={phone.image} alt={phone.name} className="phone-image" />
              <h3>{phone.name}</h3>
              <p>Price: KES {phone.price}</p>
              {/* Displaying the status */}
              <p className={`phone-status ${phone.status === 'available' ? 'available' : 'out-of-stock'}`}>
                {phone.status.charAt(0).toUpperCase() + phone.status.slice(1)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneListingPage;
