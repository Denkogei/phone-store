import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PhoneListingPage from './components/PhoneListingPage';
import About from './components/About';
import AddPhone from './components/AddPhone';

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<PhoneListingPage />} />
            <Route path='/add-phone' element={<AddPhone />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
