import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React,{ useState } from 'react'
import Navbar from './components/Navbar';
import PhoneListingPage from './components/PhoneListingPage';
import About from './components/About';
import AddPhone from './components/AddPhone';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term); // Update the search term when the user types

    }


  return (
    <>
      <Router>
        <div>
          <Navbar onSearch={handleSearch}/>
          <Routes>
            <Route path="/" element={<PhoneListingPage />} />
            <Route path='/add-phone' element={<AddPhone />} searchTerm={searchTerm} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
