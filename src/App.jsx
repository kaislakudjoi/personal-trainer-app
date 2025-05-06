import { useState, useEffect } from 'react'
import { getCustomers } from './api/customerApi'
import { getTrainings } from './api/trainingApi'
import { CustomerList } from './components/customer/CustomerList';
import { TrainingList } from './components/training/TrainingList';
import { Calendar } from './components/Calendar';
import { Link, Outlet } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';


function App() {

  return (
    <>
      <Container>
        <CssBaseline />
        {/* AppBar for the top navigation bar */}
        <AppBar position="static">
          {/* Toolbar for the content inside the AppBar */}
          <Toolbar sx={{ backgroundColor: '#FFB6C1', color: 'white' }}>
            <nav style={{ display: "flex", gap: '1rem' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>PERSONAL TRAINER APP 🥊</Typography>
              {/* Navigation links */}
              <Link to={"/customers"} style={{ color: 'white', textDecoration: 'none' }}>Customers</Link>
              <Link to={"/trainings"} style={{ color: 'white', textDecoration: 'none' }}>Trainings</Link>
              <Link to={"/calendar"} style={{ color: 'white', textDecoration: 'none' }}>Calendar</Link>
              <Link to={"/statistics"} style={{ color: 'white', textDecoration: 'none' }}>Statistics</Link>

            </nav>
          </Toolbar>
        </AppBar>
        {/* Outlet for rendering routes */}
        <Outlet />
      </Container>
    </>
  )
}

export default App
