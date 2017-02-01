var express = require('express')
var app = express();

// handle request for the home page
app.get('/', function (req, res) {
  res.send('enter a timestamp in the url !');
})

// handle request when passing a param 
app.get("/:date", function(req, res) {
    
    // variable to store the response
    var jsonRes = {
        unix: null,
        natural: null
    };
    
    // check if the passed param is a valid timestamp
    if( !Number.isNaN( Number(req.params.date) ) ) {
        
        jsonRes.unix = Number(req.params.date);
        
        // convert the timestamp to a date obj
        var dateObj = new Date(Number(req.params.date) * 1000);
        
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            
        var dateString = monthNames[dateObj.getUTCMonth()] + 
            " " + dateObj.getUTCDate() + 
            ", " + dateObj.getUTCFullYear();
            
        jsonRes.natural = dateString;
    }
    res.send(jsonRes);
})


app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening on port 8080!');
})
