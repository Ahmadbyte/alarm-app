// AlarmHistory.js
import React from "react";
import './AlarmHistory.css';

const AlarmHistory = ({ history }) => {
  return (
    <div className="alarm-history">
      <h2>Alarm History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <strong>Time:</strong> {entry.time} <br />
            <strong>Days:</strong> {entry.days} <br />
            <strong>Date:</strong> {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlarmHistory;
