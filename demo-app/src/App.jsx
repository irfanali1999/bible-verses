import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function RandomVerse() {
  const [verse, setVerse] = useState('');

  const fetchRandomVerse = async () => {
    try {
      const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
      setVerse(`${response.data[0].bookname} ${response.data[0].chapter}:${response.data[0].verse} - ${response.data[0].text}`);
    } catch (error) {
      console.error('Error fetching random verse:', error);
    }
  };

  return (
    <div className="verse-container">
      <h2>Random Verse</h2>
      <button onClick={fetchRandomVerse}>Get Random Verse</button>
      {verse && <p>{verse}</p>}
    </div>
  );
}

function SpecificVerse() {
  const [reference, setReference] = useState('');
  const [verse, setVerse] = useState('');

  const fetchSpecificVerse = async () => {
    try {
      const response = await axios.get(`https://labs.bible.org/api/?passage=${reference}&type=json`);
      setVerse(`${response.data[0].bookname} ${response.data[0].chapter}:${response.data[0].verse} - ${response.data[0].text}`);
    } catch (error) {
      console.error('Error fetching specific verse:', error);
    }
  };

  return (
    <div className="verse-container">
      <h2>Specific Verse</h2>
      <input
        type="text"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="Enter verse reference (e.g., John 3:16)"
      />
      <button onClick={fetchSpecificVerse}>Get Verse</button>
      {verse && <p>{verse}</p>}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Bible Verse App</h1>
      <RandomVerse />
      <SpecificVerse />
    </div>
  );
}

export default App;