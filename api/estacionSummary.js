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
    "path": "/opendata/api/valores/climatologicos/valoresextremos/parametro/t/estacion/"+req.params.idema+config.apiKey,
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
          var parsedData = {
            'indicativo': data.indicativo,
            'nombre': data.nombre,
            'provincia': data.ubicacion,
            'absolutos': {
              'temMin': {
                'date': new Date(data.anioMin[12], data.mesMin, data.diaMin[12]),
                'value': parseInt(data.temMin[12])/10
              },
              'temMax': {
                'date': new Date(data.anioMax[12], data.mesMax, data.diaMax[12]),
                'value': parseInt(data.temMax[12])/10
              },
              'temMedBaja': {
                'date': new Date(data.anioMedBaja[12], data.mesMedBaja),
                'value': parseInt(data.temMedBaja[12])/10
              },
              'temMedAlta': {
                'date': new Date(data.anioMedAlta[12], data.mesMedAlta),
                'value': parseInt(data.temMedAlta[12])/10
              },
              'temMedMin': {
                'date': new Date(data.anioMedMin[12], data.mesMedMin),
                'value': parseInt(data.temMedMin[12])/10
              },
              'temMedMax': {
                'date': new Date(data.anioMedMax[12], data.mesMedMax),
                'value': parseInt(data.temMedMax[12])/10
              }
            },
            'seriesMensuales': [{
              name: 'temMin',
              data: data.temMin.splice(0, 12).map(function(value, key){
                return {
                  y: parseInt(value)/10,
                  year: data.anioMin[key]
                }
              })
            }, {
              name: 'temMax',
              data: data.temMax.splice(0, 12).map(function(value, key){
                return {
                  y: parseInt(value)/10,
                  year: data.anioMax[key]
                }
              })
            }, {
              name: 'temMedBaja',
              data: data.temMedBaja.splice(0, 12).map(function(value, key){
                return {
                  y: parseInt(value)/10,
                  year: data.anioMedBaja[key]
                }
              })
            }, {
              name: 'temMedAlta',
              data: data.temMedAlta.splice(0, 12).map(function(value, key){
                return {
                  y: parseInt(value)/10,
                  year: data.anioMedAlta[key]
                }
              })
            }, {
              name: 'temMedMin',
              data: data.temMedMin.splice(0, 12).map(function(value, key){
                return {
                  y: parseInt(value)/10,
                  year: data.anioMedMin[key]
                }
              })
            }, {
              name: 'temMedMax',
              data: data.temMedMax.splice(0, 12).map(function(value, key){
                return {
                  y: parseInt(value)/10,
                  year: data.anioMedMax[key]
                }
              })
            }]
          }
          urlData.datos_json = parsedData;
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