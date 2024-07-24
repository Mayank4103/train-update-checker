import React, { useState } from 'react';
import axios from 'axios'
import './PnrStatus.css';

const PnrStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrStatus, setPnrStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPnrStatus = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnrNumber}`,
      headers: {
        'x-rapidapi-key': '622b81d0e2mshc56d34e1e42dba8p13715ajsnd8445af0fb89',
        'x-rapidapi-host': 'irctc-indian-railway-pnr-status.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setPnrStatus(response.data);
    } catch (error) {
      console.error(error);
    }
    
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pnrNumber.length === 10) {
      fetchPnrStatus();
    }
  };

  return (
    <div className="pnr-status">
      <h2>PNR Status</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pnrNumber}
          onChange={(e) => setPnrNumber(e.target.value)}
          placeholder="Enter PNR Number"
          required
        />
        <button type="submit">Get PNR Status</button>
      </form>
      {loading && <p>Loading...</p>}
      {pnrStatus && (
        <div>
          <p><strong>PNR Number:</strong> {pnrStatus.pnrNumber}</p>
          <p><strong>Date of Journey:</strong> {pnrStatus.dateOfJourney}</p>
          <p><strong>Train Number:</strong> {pnrStatus.trainNumber}</p>
          <p><strong>Train Name:</strong> {pnrStatus.trainName}</p>
          <p><strong>Source Station:</strong> {pnrStatus.sourceStation}</p>
          <p><strong>Destination Station:</strong> {pnrStatus.destinationStation}</p>
          <p><strong>Reservation Upto:</strong> {pnrStatus.reservationUpto}</p>
          <p><strong>Boarding Point:</strong> {pnrStatus.boardingPoint}</p>
          <p><strong>Journey Class:</strong> {pnrStatus.journeyClass}</p>
          <p><strong>Chart Status:</strong> {pnrStatus.chartStatus}</p>
          <p><strong>Number of Passengers:</strong> {pnrStatus.numberOfpassenger}</p>
          <p><strong>Booking Fare:</strong> {pnrStatus.bookingFare}</p>
          <p><strong>Ticket Fare:</strong> {pnrStatus.ticketFare}</p>
          <p><strong>Quota:</strong> {pnrStatus.quota}</p>
          <p><strong>Booking Date:</strong> {pnrStatus.bookingDate}</p>
          <p><strong>Arrival Date:</strong> {pnrStatus.arrivalDate}</p>
          <p><strong>Distance:</strong> {pnrStatus.distance} km</p>
        </div>
      )}
      {!loading && !pnrStatus && <p>Enter PNR number to get the status.</p>}
    </div>
  );
};

export default PnrStatus;
