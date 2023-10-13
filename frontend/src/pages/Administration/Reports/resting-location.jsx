import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import LocationFeatures from '../../../components/Table/RestingLocationFeatures';
import RlBarChart from '../../../components/Charts/rlBarChart';
import axios from 'axios';
import { Typography, Grid, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  const downloadPdf = () => {
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text("Availability Distribution", 20, 10);

    // Use jspdf-autotable plugin
    pdf.autoTable({
      html: '#pdf-content', // ID of the container holding your components
      startY: 20, // Adjust the starting Y position as needed
    });

    // Save the PDF
    pdf.save('resting_location_report.pdf');
  };

  return (
    <div id="pdf-content">
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
      <Button onClick={downloadPdf}>Download PDF</Button>
    </div>
  );
}

export default RestingLocationReport;
