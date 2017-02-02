var express = require('express')
var app = express();

// serve static files
app.use("/", express.static("public"));

// handle request when passing a param 
app.get("/:date", function(req, res) {
    
    // variable to store the response
    var jsonRes = {
        unix: null,
        natural: null
    };
    
    // check if the passed param is a valid timestamp
    if( !Number.isNaN( Number(req.params.date) ) ) {
        
        // convert the timestamp to a date obj
        var dateObj = new Date(Number(req.params.date) * 1000);
        
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        // assign the timestamp to unix property
        jsonRes.unix = Number(req.params.date);
        
        //assign the natural date to natural property
        jsonRes.natural = monthNames[dateObj.getUTCMonth()] + 
            " " + dateObj.getUTCDate() + 
            ", " + dateObj.getUTCFullYear();
        
    // check if the passed param is a natural language date
    } else if ( !Number.isNaN( Date.parse(req.params.date) ) ) {
        
        // assign the timestamp to unix property
        jsonRes.unix = Date.parse(req.params.date) / 1000;
        
        //assign the natural date to natural property
        jsonRes.natural = req.params.date;
    }
    
    // return the response in JSON format
    res.json(jsonRes);
})

app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening on port 8080!');
})
