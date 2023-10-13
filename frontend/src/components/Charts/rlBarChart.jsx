import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const RlBarChart = () => {

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const res = await axios.get('http://localhost:5050/restingLocation').catch((err) => {
        console.log(err)
      })
      setLocations(res.data.locations)
      console.log(res.data.locations)
    }

    getLocations();
  }, []);

  console.log(locations);

  const chartData = locations.map((key) => ({
    name: key.locationName,
    amt: +(key.avgTime).toFixed(2),
  }));

  return (
    <>
      <Typography variant='h4' align='center' marginLeft={5}>
        Average Waiting Time(min)
      </Typography>
      <br />
      <br />
      <br />
      <BarChart
        width={500}
        height={300}
        data={chartData}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="amt" fill="#8884d8" background={{ fill: '#eee' }}>
          <LabelList dataKey="amt" position="top" fontSize={10} />
        </Bar>
      </BarChart>
    </>
  )
}

export default RlBarChart