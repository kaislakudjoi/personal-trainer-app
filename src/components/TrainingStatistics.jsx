import React, { useEffect, useState } from 'react';
import { getTrainings } from '../api/trainingApi';
import _ from 'lodash'; // Import lodash for data manipulation
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from 'recharts'; // Import Recharts components for creating the bar chart
import { Typography, Box } from '@mui/material';

// TrainingStatistics component
export function TrainingStatistics() {
  // State to hold the training data
  const [data, setData] = useState([]);

  // Fetch training data from the API
  useEffect(() => {
    getTrainings().then(trainings => {
      // Crouping the trainings by activity and summing the durations
      const grouped = _(trainings)
        .groupBy('activity')
        .map((items, activity) => ({
          activity,
          duration: _.sumBy(items, 'duration'),
        }))
        .value();

      // Save the grouped data to the state
      setData(grouped);
    });
  }, []);

  return (
    <Box sx={{ height: 500, padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Training statistics
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="duration" fill="#8B0000" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
