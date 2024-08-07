import React from "react";

function Alarm({ time, days = [], onTimeChange, onDayChange, onSetAlarm }) {
  return (
    <div className="alarm">
      <label>
        Alarm Time:
        <input 
          type="time" 
          value={time} 
          onChange={onTimeChange} 
          step="60" // Excludes seconds from the time picker
        />
      </label>
      <div>
        <span>Days:</span>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
          <label key={index}>
            <input 
              type="checkbox" 
              checked={days.includes(day)} 
              onChange={() => onDayChange(day)} 
            />
            {day}
          </label>
        ))}
      </div>
      <button onClick={onSetAlarm}>Set Alarm</button>
    </div>
  );
}

export default Alarm;
