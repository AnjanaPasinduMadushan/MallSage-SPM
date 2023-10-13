import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import LocationFeatures from '../../../components/Table/RestingLocationFeatures';
import RlBarChart from '../../../components/Charts/rlBarChart';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';

const RestingLocationReport = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const res = await axios.get('http://localhost:5050/restingLocation');
        setLocations(res.data.locations);
        console.log(res.data.locations);
      } catch (err) {
        console.error(err);
      }
    }

    getLocations();
  }, []);

  console.log(locations);

  const chartData = locations.map((key) => ({
    name: key.locationName,
    value: +(key.availability * 100.00 / 220).toFixed(2),
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));

  // const chartWidth = 600;
  // const chartHeight = 600;
  // const centerX = chartWidth / 2;
  // const centerY = chartHeight / 2;

  return (
    <div style={{ marginTop: '10px', maxWidth: '100%', overflowX: 'hidden' }}>
      <Grid container spacing={1} justifyContent="center" marginLeft={3} marginRight={1}>
        <Grid item xs={12} sm={3.5}>
          <Typography variant='h4' align='center' >
            Availability Distribution
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={chartData}
              outerRadius={120}
              label={({ name, value }) => `${name}: ${value} %`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Grid>
        <Grid item xs={12} sm={4}>
          <RlBarChart />
        </Grid>
      </Grid>
      <LocationFeatures />
    </div>
  );
}

export default RestingLocationReport;
