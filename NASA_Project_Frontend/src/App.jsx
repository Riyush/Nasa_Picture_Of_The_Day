import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DayJS from 'dayjs'
import axios from 'axios'

function App() {

    const [date, setDate] = useState(null)
    const [photoData, setPhotoData] = useState(null)

    const current_date = DayJS().format("YYYY-MM-DD")

    // Function to fetch data from the Django backend
    const fetchPhotoData = (current_date) => {
        fetch('http://127.0.0.1:8000/API_Endpoint', {
            method: 'POST',  // You can use GET or POST depending on your Django view setup
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: current_date })  // Send the current date to the backend
        })
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            // Set the received photo data in state
            setPhotoData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    // Run the effect when the component mounts or when the date changes
    useEffect(() => {
        if (date !== current_date) {
            setDate(current_date);
            fetchPhotoData(current_date);  // Send request to Django
        }
    }, [current_date, date]);


    // Upon render, check if current date is the same as current value in state variable
    // If not, requery the bacnkend for new data, 
    // if it is the same, use current values in the state variables

  return <>
  <div>
            <h1>NASA APOD Data</h1>
            {photoData ? (
                <div>
                    <h2>{photoData[0].title}</h2>
                    <p>Date: {photoData[0].date}</p>
                    <p>Copyright: {photoData[0].copyright}</p>
                    <p>{photoData[0].explanation}</p>
                    <img src={photoData[0].hdurl} alt={photoData[0].title} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
  </>
}

export default App
