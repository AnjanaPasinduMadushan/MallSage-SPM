import React from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getLuggagesByuserIdandDate } from '../../Api/services/LuggageService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
function PieChart() {

    const userid = useSelector((state) => state.auth.User._id);

    const currentdate = new Date();

    const date = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate();
    const { data, isLoading, error, isError } = useQuery({
        queryFn: () => getLuggagesByuserIdandDate(userid, date),
    });

    ChartJS.register(ArcElement, Tooltip, Legend);
    // Function to categorize the time of day
function categorizeTime(dateTime) {
    const hour = new Date(dateTime).getHours();
    if (hour >= 6 && hour < 12) {
      return 'Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }
  
  // Create a data structure to store the categorized data
  const categorizedData = {
    Morning: 0,
    Afternoon: 0,
    Evening: 0,
  };
  
  // Count the occurrences of each category
  data?.luggages?.forEach((item) => {
    const category = categorizeTime(item.Date);
    categorizedData[category]++;
  });

  const pieChartData = {
    labels: Object.keys(categorizedData),
    datasets: [
      {
        data: Object.values(categorizedData),
        backgroundColor: ['#FF5733', '#FFD700', '#228B22'], // Define colors for each category
      },
    ],
  };
  
  // Options for the pie chart (you can customize as needed)
  const pieChartOptions = {
    responsive: true,
  };
  

  return (
    <div
    style={{
        width: '30%',
        height: '70vh',
        // marginTop: '5%',
        marginLeft: '9%',
    }}
    >
    <Pie data={pieChartData} options={pieChartOptions} />
  </div>
  )
}

export default PieChart