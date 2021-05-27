const soap = require('soap');
const fs = require('fs');

const url = 'http://localhost:8000/wsdl?wsdl';
const xml = fs.readFileSync('message.xml', 'utf8');


soap.createClient(url, function (err, client) {
  if (err) {
    throw err;
  }
  // console.log(client.describe())
  client.CrosettoReceive(xml, function (err, res) {
    if (err)
      throw err;
    console.log(res);
  });
});

/*
// MENSAJE PARA CONSULTA
const xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
<soapenv:Header/>
<soapenv:Body>Some Data</soapenv:Body>
</soapenv:Envelope>`;
*/