    // Function to fetch data from the Django backend
    const fetchPhotoData = async (current_date, setPhotoData) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/API_Endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: current_date })
            });
            const data = await response.json();  // Convert response to JSON after awaiting for a response
            setPhotoData(data);  // Set state with the fetched data
            savetoStorage(current_date, data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to save data within the context of a session
    function savetoStorage(new_date, new_photoData){
        sessionStorage.setItem("date", new_date)
        sessionStorage.setItem("photoData", JSON.stringify(new_photoData))
    }

    // Function to load from Storage
    function loadFromStorage(setDate, setPhotoData) {
        const storedDate = sessionStorage.getItem("date");
        const storedPhotoData = sessionStorage.getItem("photoData");

        if (storedDate !== null) {
            setDate(storedDate);
        }
        if (storedPhotoData !== null) {
            setPhotoData(JSON.parse(storedPhotoData));
        }
    }


export { loadFromStorage, savetoStorage, fetchPhotoData}