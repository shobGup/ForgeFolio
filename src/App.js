import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Import your components
import Login from './pages/Login';
import Home from './pages/Home';
import Works from './pages/Works';
import Portfolios from './pages/Portfolios';
import Edit from './pages/Edit';

const App = () => {
    return (
        <div className="app">
            <Router>
                {/* <nav>
                    <Link to="/ForgeFolio">Login</Link>
                    <Link to="/home">Home</Link>
                    <Link to="/works">Works</Link>
                    <Link to="/portfolios">Portfolios</Link>
                    <Link to="/edit">Edit</Link>
                </nav> */}

                <Routes>
                    <Route path="/ForgeFolio" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home?" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/portfolios" element={<Portfolios />} />
                    <Route path="/edit" element={<Edit />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
