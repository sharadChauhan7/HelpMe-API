import express from 'express';
import cors from 'cors';
import axios from 'axios'
import Auth from './routes/auth.route.js'
import SOS from './routes/sos.route.js'

const app = express();

// Basic middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});



app.use('/api/auth',Auth);
app.use('/api/help',SOS);

app.post('/getHelp',async (req,res)=>{
    try{
        console.log("Help");
    let data = req.body;
    // generate the current date and time in the format "MM-DD-YYYY HH:MMAM/PM"
    let date = new Date();
    let formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    // console.log(formattedDate);
    let NotifyData ={
        appId: 23095,
        appToken: "t7U6tMbwevUKc9gC7Eddsf",
        title: "Emergency",
        body: " Are you okay?",        
        dateSent: formattedDate,
        pushData: JSON.stringify({ "screen": "/emergency" }),
    }
console.log(NotifyData.data);
    let SendNotify = await axios.post('https://app.nativenotify.com/api/notification',NotifyData);

    console.log(SendNotify);
    // console.log(data);
    res.send("Working");
    }
    catch(err){
        console.log(err);
    }
})
app.get('/',async (req,res)=>{
    console.log("Help");
    res.send("Help");
})