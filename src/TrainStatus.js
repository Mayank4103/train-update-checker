import React, { useState } from 'react';
import axios from 'axios';
import './TrainStatus.css';

const TrainStatus = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [trainStatus, setTrainStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTrainStatus = async () => {
    setLoading(true);
    setError('');
    setTrainStatus(null);

    const options = {
      method: 'GET',
      url: 'https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status',
      params: {
        departure_date: departureDate,
        isH5: 'true',
        client: 'web',
        train_number: trainNumber,
      },
      headers: {
        'x-rapidapi-key': '622b81d0e2mshc56d34e1e42dba8p13715ajsnd8445af0fb89',
        'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log('API Response:', response.data); // Debugging log
      setTrainStatus(response.data);
    } catch (error) {
      console.error('Error fetching train status:', error); // Debugging log
      setError('Failed to fetch train status. Please check the train number and departure date.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trainNumber && departureDate) {
      fetchTrainStatus();
    } else {
      setError('Please enter both train number and departure date.');
    }
  };

  return (
    <div className="train-status">
      <h2>Train Status</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
          placeholder="Enter Train Number"
          required
        />
        <input
          type="text"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          placeholder="Enter Departure Date"
          required
        />
        <button type="submit">Get Train Status</button>
      </form>
      {loading ? (
        <p>Loading train status...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : trainStatus ? (
        <div>
          <p><strong>Current Station:</strong> {trainStatus.current_station}</p>
          <p><strong>Status Message:</strong> {trainStatus.train_status_message}</p>
          <p><strong>Time of Availability:</strong> {trainStatus.time_of_availability}</p>
          <p><strong>Server Timestamp:</strong> {trainStatus.server_timestamp}</p>
          <p><strong>Terminated:</strong> {trainStatus.terminated ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>Enter train number and departure date to get the status.</p>
      )}
    </div>
  );
};

export default TrainStatus;

