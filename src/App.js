import React, { useState, useEffect } from "react";
import Alarm from "./Alarm";
import RingtoneSelector from "./RingtoneSelector";
import AlarmHistory from "./AlarmHistory"; // Import AlarmHistory
import "./App.css";

function App() {
  const [alarmTime, setAlarmTime] = useState("");
  const [ringtone, setRingtone] = useState("default.mp3");
  const [customRingtone, setCustomRingtone] = useState(null);
  const [alarmActive, setAlarmActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentTime12hr, setCurrentTime12hr] = useState("");
  const [snoozeTime, setSnoozeTime] = useState(5); // Snooze duration in minutes
  const [darkMode, setDarkMode] = useState(false);
  const [days, setDays] = useState([]); // Add days state
  const [alarmHistory, setAlarmHistory] = useState([]); // Add alarm history state

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const formattedTime24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      setCurrentTime(formattedTime24);
      const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
      const todayIsAlarmDay = days.length === 0 || days.includes(currentDay);
      
      if (alarmActive && todayIsAlarmDay && formattedTime24.slice(0, 8) === alarmTime) { // Compare only time part
        playRingtone();
        setAlarmActive(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmTime, alarmActive, days]);

  const handleTimeChange = (event) => {
    setAlarmTime(event.target.value);
  };

  const handleDayChange = (day) => {
    setDays(prevDays =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleRingtoneChange = (event) => {
    setRingtone(event.target.value);
  };

  const handleCustomRingtoneChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCustomRingtone(URL.createObjectURL(event.target.files[0]));
      setRingtone(null);
    }
  };

  const handleSetAlarm = () => {
    // Format days array into a readable string
    const daysString = days.length > 0 ? days.join(', ') : 'Today';
    
    // Add new alarm to history
    setAlarmHistory(prevHistory => [
      ...prevHistory,
      {
        time: alarmTime,
        days: daysString,
        date: new Date().toLocaleString() // Record the current date and time
      }
    ]);

    setAlarmActive(true);
    alert(`Alarm Setup Successfully... It will ring on ${daysString}`);
    console.log("Alarm set for:", alarmTime);
  };

  const handleSnooze = () => {
    const now = new Date();
    const snoozeDate = new Date(now.getTime() + snoozeTime * 60000);
    const snoozeHours = snoozeDate.getHours();
    const snoozeMinutes = snoozeDate.getMinutes();
    const snoozeSeconds = snoozeDate.getSeconds();
    const snoozeTimeFormatted = `${String(snoozeHours).padStart(2, '0')}:${String(snoozeMinutes).padStart(2, '0')}:${String(snoozeSeconds).padStart(2, '0')} ${snoozeHours >= 12 ? 'PM' : 'AM'}`;
    setAlarmTime(snoozeTimeFormatted);
    setAlarmActive(false);
    console.log("Alarm snoozed to:", snoozeTimeFormatted);
  };

  const handleClose = () => {
    setAlarmActive(false);
    console.log("Alarm closed");
  };

  const playRingtone = () => {
    const audio = new Audio(customRingtone || (process.env.PUBLIC_URL + '/' + ringtone));
    audio.play();
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <div className="App">
      <h1>Alarm App</h1>
      <div className="current-time">
        <span>Current Time: {currentTime}</span>
        <span> {currentTime12hr}</span>
      </div>
      <Alarm 
        time={alarmTime} 
        days={days} // Pass the days array
        onTimeChange={handleTimeChange} 
        onDayChange={handleDayChange} 
        onSetAlarm={handleSetAlarm} 
      />
      <RingtoneSelector 
        ringtone={ringtone} 
        onRingtoneChange={handleRingtoneChange} 
        onCustomRingtoneChange={handleCustomRingtoneChange} 
      />
      {alarmActive && (
        <div className="alarm-controls">
          <button onClick={handleSnooze} className="control-button">Snooze</button>
          <button onClick={handleClose} className="control-button">Close</button>
        </div>
      )}
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light" : "Dark"} Mode
      </button>
      <AlarmHistory history={alarmHistory} /> {/* Display the alarm history */}
    </div>
  );
}

export default App;
