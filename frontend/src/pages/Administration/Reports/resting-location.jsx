import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import LocationFeatures from '../../../components/Table/RestingLocationFeatures';
import axios from 'axios';

const RestingLocationReport = () => {

  const [locations, setLocations] = useState([])

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

  console.log(locations)

  const chartData = locations.map((key) => ({
    name: key.locationName,
    value: +(key.availability * 100.00 / 220).toFixed(2),
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }));

  const chartWidth = 600;
  const chartHeight = 600;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  return (
    <>
      <PieChart width={chartWidth} height={chartHeight}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={chartData}
          cx={centerX}
          cy={centerY}
          outerRadius={80}
          label={({ name, value }) => `${name}: ${value} %`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <LocationFeatures />
    </>
  );
}

export default RestingLocationReport;
