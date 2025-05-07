import { useState, useEffect } from 'react'
import { getCustomers } from './api/customerApi'
import { getTrainings } from './api/trainingApi'
import { CustomerList } from './components/customer/CustomerList';
import { TrainingList } from './components/training/TrainingList';
import { Calendar } from './components/Calendar';
import { Link, Outlet } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function App() {
  // State for managing the visibility of the mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Navigation links used both in the top bar and the drawer
  const navLinks = [
    { label: 'Customers', path: '/customers' },
    { label: 'Trainings', path: '/trainings' },
    { label: 'Calendar', path: '/calendar' },
    { label: 'Statistics', path: '/statistics' },
  ];

  return (
    <>
      <CssBaseline />

      {/* AppBar for the top navigation bar */}
      <AppBar position="static">

        {/* Toolbar for the content inside the AppBar */}
        <Toolbar sx={{ backgroundColor: '#FFB6C1', color: 'white', display: 'flex', justifyContent: 'space-between' }}>

          {/* App title and home link */}
          <Link to="/customers" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>PersonalTrainer</Typography>
          </Link>

          {/* Hamburger menu icon for small screens */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Navigation links for larger screens */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '1rem' }}>

            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} style={{ color: 'white', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}

          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer menu for mobile navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>

        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>

            {navLinks.map((link) => (
              <ListItem button component={Link} to={link.path} key={link.path}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}

          </List>
        </Box>
      </Drawer>

      {/* Outlet for rendering routes */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}

export default App
