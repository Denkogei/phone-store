import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhoneListingPage = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/phones");
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
                console.error('Error fetching data:', error);  // Logging error for debugging
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    return <HandleDisplayPhone data={data} loading={loading} error={error} />;
};

function HandleDisplayPhone({ data, loading, error }) {
    if (loading) {
        return <p className="loading-text">Loading......</p>;  // Styling for loading text
    }

    if (error) {
        return <p className="error-text">{error}</p>;  // Styling for error text
    }

    return (
        <section>
            <h2 style={{ color: "black", textAlign: "center",paddingTop:"30px" }}>AVAILABLE PHONES</h2>
            <div className="phone-list">
                {data.length === 0 ? (
                    <p>No phones available at the moment.</p>  // Handling empty data array
                ) : (
                    data.map((phone) => (
                        <div key={phone.id} className="phone-card">
                            <img src={phone.image} alt={phone.name} className="phone-image" />
                            <div className="phone-info">
                                <h3 className="phone-name">{phone.name}</h3>
                                <p className="phone-description">{phone.description}</p>
                                <p className="phone-price">KES {phone.price}</p>
                                <p className={`phone-status ${phone.status === 'available' ? 'available' : 'out-of-stock'}`}>
                                    {phone.status.charAt(0).toUpperCase() + phone.status.slice(1)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default PhoneListingPage;
