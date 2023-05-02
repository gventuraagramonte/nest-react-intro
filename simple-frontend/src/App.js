import './App.css';
import React from 'react';
import Layout from './components/shared/Layout';
import { Route, Routes } from 'react-router-dom'
import AllEmployees from './pages/AllEmployees'
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<AllEmployees />}></Route>
        <Route path='/add-employee' element={<AddEmployee />}></Route>
        <Route path='/edit-employee/:id' element={<EditEmployee />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
