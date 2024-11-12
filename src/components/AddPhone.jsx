import React, { useState } from 'react'
import axios from 'axios'


const AddPhone = () => {
    const[name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('available');
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState('')
    const [message, setMessage] = useState('')
  return (
    <div>AddPhone</div>
  )
}

export default AddPhone