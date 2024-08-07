import React from "react";
import "./RingtoneSelector.css";

function RingtoneSelector({ ringtone, onRingtoneChange, onCustomRingtoneChange }) {
  return (
    <div className="ringtone-selector">
      <label htmlFor="ringtone">Select Ringtone:</label>
      <select id="ringtone" value={ringtone || ""} onChange={onRingtoneChange}>
        <option value="default.mp3">Default</option>
        <option value="ringtone1.mp3">Ringtone 1</option>
        <option value="ringtone2.mp3">Ringtone 2</option>
      </select>
      <div>
        <label htmlFor="customRingtone">Or upload your own ringtone:</label>
        <input type="file" id="customRingtone" onChange={onCustomRingtoneChange} accept="audio/*" />
      </div>
    </div>
  );
}

export default RingtoneSelector;
