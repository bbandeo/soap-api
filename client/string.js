let fs = require('fs');
let xml = fs.readFileSync('message.xml', 'utf8');

console.log(xml.indexOf("<MessageType>"))
console.log(xml.indexOf("</MessageType>"))


xml.slice(xml.indexOf("<MessageType>")+13,xml.indexOf("</MessageType>"))