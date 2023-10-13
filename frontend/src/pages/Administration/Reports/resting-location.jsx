import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import LocationFeatures from '../../../components/Table/RestingLocationFeatures';
import RlBarChart from '../../../components/Charts/rlBarChart';
import axios from 'axios';
import { Typography, Grid, Box, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const RestingLocationReport = () => {
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();
  const handleAllZones = () => {
    navigate('/showAllLocations');
  };

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
    const pdfElement = document.getElementById('pdf-content');

    // Remove the button from the PDF content
    const buttonElement = document.getElementById('pdf-button');
    if (buttonElement) {
      buttonElement.style.display = 'none'; // Hide the button
    }

    html2canvas(pdfElement, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('resting_location_report.pdf');

      // Restore the button's display after generating the PDF
      if (buttonElement) {
        buttonElement.style.display = 'block';
      }
    });
  };

  return (

    <>
      <Box display="flex" justifyContent="center" alignItems="center" gap={20} mt={2} style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Button onClick={handleAllZones} variant="outlined" color='error'>
          RESTING HOME
        </Button>
        <Button id="pdf-button" onClick={downloadPdf} variant="outlined" color="warning">Download PDF</Button>
      </Box>
      <div id="pdf-content">
        <div id="pdf-content" style={{ margin: 'auto', width: '80%', backgroundColor: 'white', padding: 20, marginTop: '50px' }}>
          <Grid container spacing={1} justifyContent="center" marginLeft={3} marginRight={1}>
            <Grid item xs={12} sm={4}>
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
      </div>
    </>
  );
}

export default RestingLocationReport;
