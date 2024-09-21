import { useState, useEffect } from 'react'
import './App.css'
import DayJS from 'dayjs'
import {loadFromStorage, fetchPhotoData } from './data_manipulation_functions.js'

function App() {

    const [date, setDate] = useState(null)
    const [photoData, setPhotoData] = useState(null)

    // New loading state to ensure that data is properly loaded from storage
    const [loading, setLoading] = useState(true); 

    const current_date = DayJS().format("YYYY-MM-DD")

    useEffect(() => {
        loadFromStorage(setDate, setPhotoData)
        setLoading(false)
    }, []) // Empty dependency array to run only once when the component mounts on reload

    // Wrapping fetchPhotoData in this useEffect block ensures
    // that we only fetch data when the component first mounts.
    // Directly calling the fufnction would cause it it occur on 
    // each render which is unnecessary
    useEffect(() => {
        console.log('Stored date:', date)
        console.log('Current date:', current_date)
        if (!loading && date !== current_date) {
            setDate(current_date);
            fetchPhotoData(current_date, setPhotoData);  // Send request to Django
            
        }
    }, [current_date, date, loading]);

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
