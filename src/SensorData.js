// src/SensorData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SensorData = () => {
  const [sensors, setSensors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sensors');
        setSensors(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>IV Sensor Monitoring System</h1>
      <table>
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>Fluid Type</th>
            <th>Volume</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map(sensor => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.fluid_type}</td>
              <td>{sensor.volume}</td>
              <td>{sensor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorData;
