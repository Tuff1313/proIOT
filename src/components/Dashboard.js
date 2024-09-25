import React, { useState, useEffect } from 'react';
import FluidLevelChart from './FluidLevelChart';
import Alert from './Alert';
import axios from 'axios';

const Dashboard = () => {
  const [fluidLevel, setFluidLevel] = useState(0);
  const [alert, setAlert] = useState(false);
  const [fluidData, setFluidData] = useState([]);

  useEffect(() => {
    const fetchFluidLevel = async () => {
      try {
        const response = await axios.get('/api/fluid-level'); // Adjust the API endpoint as needed
        setFluidLevel(response.data.level);
        setFluidData(response.data.history);
        if (response.data.level < 100) {
          setAlert(true);
        } else {
          setAlert(false);
        }
      } catch (error) {
        console.error('Error fetching fluid level:', error);
      }
    };

    fetchFluidLevel();
    const interval = setInterval(fetchFluidLevel, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Current Fluid Level: {fluidLevel} mL</h2>
      <FluidLevelChart data={fluidData} />
      {alert && <Alert />}
    </div>
  );
};

export default Dashboard;

