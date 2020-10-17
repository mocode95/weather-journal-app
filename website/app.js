/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey  = "&APPID=937293a8a2e393c66161e60eddd014e4"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create data with OpenWeatherMap API

const createData = async () => {
    const nwZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const response = await fetch(`${baseURL}${nwZip}${apiKey}`);
    try {
        const data = await response.json();
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateUI();
    } catch (error) {
        console.error("error", error);
    }
};

//event listener for the element with the id: generate
document.getElementById('generate').addEventListener('click', createData);

// Retrieve Data 
const retrieveData = async (url = '') => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        // appropriately handle the error
    }
};

// POST Data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
          // Body data type must match "Content-Type" header
        body: JSON.stringify(data)
        });
};

// Update UI 
const updateUI = async () => {
    const projectData = await retrieveData('/all');
    document.getElementById('temp').innerHTML    = `Temperature:  ${(projectData.temperature).toFixed(0)} &#176;F`;
    document.getElementById('date').innerHTML    = `Today Date:   ${projectData.date}`;
    document.getElementById('content').innerHTML = `Your feelings:  ${projectData.feelings}`;
};