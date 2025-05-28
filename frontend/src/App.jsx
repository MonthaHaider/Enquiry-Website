 import React from 'react';
import './App.css';
import Getusers from './CRUD/Getusers';
import Addusers from './CRUD/Addusers';
import Updateusers from './CRUD/Updateusers';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for displaying all users */}
        <Route path="/" element={<Getusers />} />

        {/* Route for adding a new user */}
        <Route path="/Addusers" element={<Addusers />} />

        {/* Route for updating an existing user with dynamic id */}
        <Route path="/Updateusers/:id" element={<Updateusers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;