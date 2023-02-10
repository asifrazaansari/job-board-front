import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavScroll from './components/Navbar';
import Application from './pages/Application/Application';
import Home from './pages/Home/Home';
import CreateJob from './pages/Job/CreateJob';
import Job from './pages/Job/Job';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App">
      <NavScroll />
      <Routes>
        <Route path='/users/login' element={<Login />} />
        <Route path='/users' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Job />} />
        <Route path='/jobs/create' element={<CreateJob />} />
        <Route path='/jobs/:jobId/apply' element={<Application />} />
      </Routes>

    </div>
  );
}

export default App;
