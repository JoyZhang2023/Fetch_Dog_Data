// import express and create web server
import express from "express";
import path from "path";

const app = express();
app.set('port', process.env.PORT || 3000);


// read html file
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));

app.get('/dogbreed',(req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// access css file
app.get('/public/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','styles.css'));
});

// access js file
app.get('/public/fetchDog.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','fetchDog.js'));
});



// handle 404 error code 
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send("404-Not Found");
});

// indicator of running
app.listen(app.get('port'), ()=> {
    console.log("Express Server is running");
});
