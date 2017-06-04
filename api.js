var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

var router = express.Router();

router.get('/api/estaciones', require('./api/estaciones').Estaciones);
router.get('/api/estaciones/:idema', require('./api/estacionSummary').EstacionSummary);
router.get('/api/estaciones/:idema/:startDate/:endDate', require('./api/estacionDates').EstacionDates);

app.use(router);

app.listen(3000, function() {  
  console.log("Node server running on http://localhost:3000");
});



