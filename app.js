let soap = require('soap');
let express = require('express');
let fs = require('fs');


// let parser = new DOMParser();
// the splitter function, used by the service
function splitter_function(args) {
  console.log(typeof (args));
  let msgType = args.slice(args.indexOf("<MessageType>") + 13, args.indexOf("</MessageType>"))
  // let type = xmlDoc.getElementsByTagName("MessageType")[0].childNodes[0].nodeValue;
  // console.log(type);
  
  switch (msgType) {
    case "MSG_1":
      console.log("MENSAJE 1");
      break;
    case "MSG_2":
      console.log("MENSAJE 2");
      break;
    case "MSG_3":
      console.log("MENSAJE 3");
      break;
    case "MSG_4":
      console.log("MENSAJE 4");
      break;
    default:
      console.log("NO SE ENCONTRÓ COINCIDENCIA");
      break;
  }
  /*
  let xmlDoc = parser.parseFromString(txt, "text/xml");
*/
  // var splitter = args.splitter;
  // var splitted_msg = args.message.split(splitter);
  // var result = [];
  // for(var i=0; i<splitted_msg.length; i++){
  //   result.push(splitted_msg[i]);
  // }
  return {
    result: "HOLA PERRI"
  }
}

// the service
let serviceObject = {
  CrosettoReceiveService: {
    CrosettoReceiveServiceSoapPort: {
      CrosettoReceive: splitter_function
    },
    CrosettoReceiveServiceSoap12Port: {
      CrosettoReceive: splitter_function
    }
  }
};


let xml = fs.readFileSync('CrosettoService.wsdl', 'utf8');
let app = express();
let port = 8000;

app.listen(port, function () {
  console.log('Listening on port ' + port);
  let wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("http://localhost:" + port + wsdl_path + "?wsdl para chequear si el servicio se encuentra en funcionamiento.");
});


/*
// XML with namespace prefixes 's', 'sn', and 'p' in a variable called txt
txt = `
<address xmlns:p='example.com/postal' xmlns:s='example.com/street' xmlns:sn='example.com/streetNum'>
  <s:street>Roble Ave</s:street>
  <sn:streetNumber>649</sn:streetNumber>
  <p:postalcode>94025</p:postalcode>
</address>`;

//Everything else the same
if (window.DOMParser) {
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(txt, "text/xml");
}
else // Internet Explorer
{
  xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async = false;
  xmlDoc.loadXML(txt);
}

//The prefix should not be included when you request the xml namespace
//Gets "streetNumber" (note there is no prefix of "sn"
console.log(xmlDoc.getElementsByTagName("streetNumber")[0].childNodes[0].nodeValue);

//Gets Street name
console.log(xmlDoc.getElementsByTagName("street")[0].childNodes[0].nodeValue);

//Gets Postal Code
console.log(xmlDoc.getElementsByTagName("postalcode")[0].childNodes[0].nodeValue);
*/