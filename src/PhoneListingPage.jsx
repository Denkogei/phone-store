import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhoneData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/phones");
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    return <HandleDisplayPhone data={data} loading={loading} error={error} />;
};

function HandleDisplayPhone({ data, loading, error }) {
    if (loading) return <p>Loading......</p>;
    if (error) return <p>ERROR: {error}</p>;

    return (
        <section>
            <h2 style={{color:"white",textAlign:"center"}}>AVAILABLE PHONES</h2>
            <div className="phone-list">
                {data.map((phone) => (
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
                ))}
            </div>
        </section>
    );
}

export default PhoneData; 
