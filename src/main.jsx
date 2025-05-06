import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import App from './App.jsx'
import { CustomerList } from './components/customer/CustomerList.jsx'
import { TrainingList } from './components/training/TrainingList.jsx'
import { Calendar } from './components/Calendar.jsx'
import { TrainingStatistics } from './components/TrainingStatistics.jsx'

// Create the root of the React app and render the components
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>

      {/* Define the routes for the application */}
      <Routes>

        <Route path="/" element={<App />}>
          <Route index element={<CustomerList />} /> {/* Default route */}
          <Route path="customers" element={<CustomerList />} />
          <Route path="trainings" element={<TrainingList />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="statistics" element={<TrainingStatistics />} />

        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)