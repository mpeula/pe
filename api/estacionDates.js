http = require("https");
Iconv  = require('iconv').Iconv;
chunk = require('chunk-date-range');
config = require('./config.json');

var EstacionDates = function EstacionDates(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  var periods = chunk(
    new Date(parseInt(req.params.startDate)), 
    new Date(parseInt(req.params.endDate)), 
    'month'
  );
  var finalData = [];
  periodLoop(0);

  function periodLoop(index){
    getPeriod(req.params.idema, periods[index].start, periods[index].end).then(function(response){
      finalData = finalData.concat(response);
      if(index < periods.length - 1)
        periodLoop(index+1);
      else
        res.send(finalData);
    });
  }
  
}

function getPeriod(idema, startDate, endDate){
  
  return new Promise(function(resolve, reject){
    var options = {
      "method": "GET",
      "rejectUnauthorized": false,
      "hostname": config.hostname,
      "path": "/opendata/api/valores/climatologicos/diarios/datos/fechaini/"+dateFormat(startDate)+"/fechafin/"+dateFormat(endDate)+"/estacion/"+idema+config.apiKey,
      "headers": {
        "cache-control": "no-cache"
      }
    };

    var req = http.request(options, function (response) {
      var chunks = [];

      response.on("data", function (chunk) {
        chunks.push(chunk);
      });

      response.on("end", function () {
        var body = Buffer.concat(chunks);
        var urlData = JSON.parse(body.toString());
        
        var options = {
          "method": "GET",
          "rejectUnauthorized": false,
          "hostname": config.hostname,
          "path": urlData.datos.replace(config.hostname, ""),
          "encoding": "utf8",
          "headers": {
            "cache-control": "no-cache"
          }
        };

        var req = http.get(options, function (response) {
          var chunks = [];
          response.on("data", function (chunk) {
            chunks.push(chunk);
          });

          response.on("end", function () {
            var iconv = new Iconv('latin1', 'UTF-8');
            var str = iconv.convert(Buffer.concat(chunks)).toString();
            var data = JSON.parse(str);
            resolve(data);            
          });
        });

        req.end();

      });
    });
    req.end();
  });
}

function dateFormat(date){
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T00:00:00UTC';
}

module.exports.EstacionDates = EstacionDates;