
const rp = require('request-promise');
const fs = require('fs');

rp('https://www.athletic.net/CrossCountry/School.aspx?SchoolID=1096').then(function(html){
    let sI = html.indexOf('"athletes":');//short for "start index"
    let eI = html.indexOf('"coaches":');//short for "end index"
    var jsonString = "{\n";
    for (let i = html.indexOf('"ID"',sI); i != -1&&i<eI; i = html.indexOf('"ID":', i + 1)) {
        let id = html.substring(i+5,i+13);
        let name = html.substring(i+22,html.indexOf(' ',i+22));
        console.log(name);
        jsonString+='"'+id+'":'+'"'+name+'",\n';
    }
    jsonString=jsonString.substring(0,jsonString.length-2)+"\n}";
    console.log(jsonString);
}).catch(function(err){
    console.log(err);
})