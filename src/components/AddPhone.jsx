import React, { useState } from 'react'
import axios from 'axios'


//state object that holds the data for all the form fields. Initially, it contains empty strings for name, description, price, status, and image. status has a default value of 'available'.
const AddPhone = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      status: 'available',
      image: '',
    });

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    //updates the formData state whenever the user changes an input field (e.g., typing in the text field or selecting a value in the dropdown).
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}))
    };

    //This function handles the form submission.
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('')

    try {
        await axios.post('http://localhost:3000/phones', formData);
        setMessage('Phone added successfully!');
        setFormData({ name: '', description: '', price: '', status: 'available', image: '' });
      } catch (error) {
        setMessage('Failed to add phone.');
      } finally {
        setLoading(false);
      }
    };
    //form rendering
    return (
        <div>
          <h2 style={{color:"black", paddingTop:"30px"}}>Add New Phone</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Phone Name" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" required />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
            <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Phone'}</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      );
    
    
}
export default AddPhone