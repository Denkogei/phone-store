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

  // Get the height of the navbar dynamically
  const navbarHeight = document.querySelector('nav')?.offsetHeight || 80; // Default to 80px if navbar height is not found

  // If loading, show loading message
  if (loading) {
    return (
      <div style={{ paddingTop: `${navbarHeight + 30}px`, textAlign: 'center' }}>
        <style>
          {`
            @media (max-width: 768px) {
              div {
                padding-top: 60px !important; /* Reduce padding for mobile */
              }
            }
          `}
        </style>
        Loading phones...
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div style={{ paddingTop: `${navbarHeight + 20}px`, textAlign: 'center' }}>
        <style>
          {`
            @media (max-width: 768px) {
              div {
                padding-top: 60px !important; /* Reduce padding for mobile */
              }
            }
          `}
        </style>
        {error}
      </div>
    );
  }

  // Handle card click to navigate to phone details
  const handleCardClick = (id) => {
    navigate(`/phone/${id}`);  // Navigate to the phone detail page
  };

  return (
    <div>
      <style>
        {`
          @media (max-width: 768px) {
            h2 {
              padding-top: 60px !important; /* Reduce padding for mobile */
            }
          }
        `}
      </style>
      <h2 style={{ padding: "30px", paddingTop: `${navbarHeight + 20}px` }}>Available Phones</h2>
      {filteredPhones.length === 0 ? (
        <p style={{ paddingTop: `${navbarHeight + 20}px`, textAlign: 'center' }}>
          <style>
            {`
              @media (max-width: 768px) {
                p {
                  padding-top: 60px !important; /* Reduce padding for mobile */
                }
              }
            `}
          </style>
          No phones found matching your search.
        </p>
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