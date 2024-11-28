import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Classes from './components/Classes.jsx';
import Coaches from './components/Coaches.jsx';
import Contact from './components/Contact.jsx';
import Students from './components/Students.jsx';
import About from './components/About.jsx';
import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/classes/" element={<Classes />} />
                    <Route path="/coaches/" element={<Coaches />} />
                    <Route path="/contacts/" element={<Contact />} />
                    <Route path="/students/" element={<Students />} />
                    <Route path="/about/" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
