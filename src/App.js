import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PhoneListingPage from './components/PhoneListingPage';
import PhoneDetail from './components/PhoneDetail';
import About from './components/About';
import AddPhone from './components/AddPhone';
import ErrorPage from './components/ErrorPage';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search term change
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());  // Update the search term
  };

  return (
    <Router>
      <div>
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<PhoneListingPage searchTerm={searchTerm} />} />
          <Route path="/phone/:id" element={<PhoneDetail />} />
          <Route path="/add-phone" element={<AddPhone />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
