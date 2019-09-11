//Scrape athletic.net for the results of that week and update a json file that represents an associative array where the key is each team member's name, and the value is how many points they got.

const rp = require('request-promise');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';


var raceLink = "https://www.athletic.net/CrossCountry/meet/145525/results";

let link = raceLink;
rp(link)
  .then(function (html) {
    //success!
    console.log(html.substring(html.indexOf('"IDMeetDiv":')+12,html.indexOf('"IDMeetDiv":')+19));
    
  })
  .catch(function (err) {
    console.log(err);
  });


//HTML selector for school name from meet results page:
    //document.getElementsByClassName("table DataTable table-responsive table-hover mb-0")[0].getElementsByTagName("tr")[0].getElementsByClassName("truncate d-block mw-225")[0].innerHTML;
//HTML selector for each race table from results page:
    //document.getElementsByClassName("col-sm-6 mb-3 mb-sm-0");