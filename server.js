// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

const server = app.listen(port, listening);

function listening() {
    console.log('Server is running......');
    console.log(`running on localhost: ${port}`);
};

//Get Route
app.get('/all', (req, res) => {
    res.send(projectData);
});

//Post Route
app.post('/', (req, res) => {
    let data = req.body;

    projectData.temperature = data.main.temp;
    projectData.date        = data.date;
    projectData.feelings    = data.feelings;
    
    res.end();
});