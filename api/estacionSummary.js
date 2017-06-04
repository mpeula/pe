http = require("https");
Iconv  = require('iconv').Iconv;
config = require('./config.json');

var EstacionSummary = function EstacionSummary(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  var options = {
    "method": "GET",
    "rejectUnauthorized": false,
    "hostname": config.hostname,
    "path": "/api/valores/climatologicos/valoresextremos/parametro/t/estacion/"+req.params.idema+config.apiKey,
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
          urlData.datos_json = data.map(function(value){
            value.longitud = parseCoordinate(value.longitud);
            value.latitud = parseCoordinate(value.latitud);
            return value;
          });
          res.send(urlData);
        });
      });

      req.end();

    });
  });

  req.end();
}
function parseCoordinate(coordinate) {
  var letter = coordinate.substr(-1);
  var number = parseInt(coordinate.replace(letter, ""))/10000;
  if(letter === "W" || letter === "S") {
    number *= -1;
  }
  return number;
}

module.exports.EstacionSummary = EstacionSummary;