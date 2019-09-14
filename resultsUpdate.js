//Scrape athletic.net for the results of that week and update a json file that represents an associative array where the key is each team member's name, and the value is how many points they got.

const rp = require('request-promise');
const fs = require('fs');
var athleteIDtoNames = {
  "15854667": "Aakarsh",
  "12255501": "Akshay",
  "15854661": "Amna",
  "10415950": "Andrew C",
  "12255502": "Andrew H",
  "12255493": "Anna",
  "10415964": "Arjun",
  "12255496": "Ben",
  "15854678": "Brevin",
  "12255512": "Charles",
  "14519743": "Colin",
  "14026999": "Collin",
  "15854682": "Daniel",
  "14027004": "Danny",
  "10415946": "Darian",
  "14026983": "Defne",
  "10415963": "Dominick",
  "12255498": "Drew",
  "14027002": "Edward",
  "10415945": "Ellora",
  "15854669": "Elwin",
  "12255510": "Eric",
  "12255491": "Fiona",
  "10415962": "Gabe",
  "12255489": "Ivy",
  "10415958": "Jackson",
  "15854680": "Jasper",
  "15854674": "Jeffrey",
  "15854665": "Jessica",
  "15854681": "Jonathan",
  "15854673": "Julian",
  "15854671": "Kaleb",
  "15854662": "Katherine",
  "15854664": "Katie",
  "10415956": "Kyle",
  "15854668": "Landan",
  "12255509": "Logan",
  "15854677": "Massimo",
  "10415941": "Melissa",
  "14026988": "Mia",
  "15854675": "Naim",
  "11080093": "Nalin",
  "15854663": "Nodoka",
  "14027006": "Oscar",
  "14026987": "Peri",
  "15854666": "Prateek",
  "14026993": "Raj",
  "14026992": "Raymond",
  "12255504": "Rishab",
  "14026996": "Ryan",
  "15854676": "Schuyler",
  "14027003": "Shishir",
  "12255516": "Sid",
  "15854670": "Siyi",
  "15854683": "Spencer",
  "15854679": "Thomas",
  "12255495": "Trevor",
  "10415953": "Tyler",
  "12508991": "Varun",
  "14026997": "Vicram"
};


var meetLink = "https://www.athletic.net/CrossCountry/meet/145525/results";
var results = {};
var length=0;
var racesStarted=0;
var racesFinished=0;
rp(meetLink)
  .then(function (html) {
    //success!
    //console.log(html.substring(html.indexOf('"IDMeetDiv":')+12,html.indexOf('"IDMeetDiv":')+19));
    for (let i = 0; i!==-1; i = html.indexOf('"IDMeetDiv":', i + 1)) {
      let id = html.substring(i + 12, i + 18);
      if (Number(id)) {
        racesStarted++;
        let raceLink = meetLink + "/" + id;
        rp(raceLink)
          .then(function (html) {
            let totalRunners = html.match(/"FirstName"/g).length;
            for (let i = html.indexOf('"Place":'); i != -1; i = html.indexOf('"Place":', i + 1)) {
              let athleteIDIndex = html.indexOf('"AthleteID":', i);
              let place = html.substring(i + 8, html.indexOf('"AthleteName":', i) - 1);
              let athleteID = html.substring(athleteIDIndex + 12, html.indexOf(',"FirstName":', i));
              if (athleteIDIndex === -1)
                break;
              if (athleteIDtoNames[athleteID]) {
                let score = Math.round(100 * (1 - (place - 1) / totalRunners));
                let name = athleteIDtoNames[athleteID];
                results[name] = score;
                length++;
              }
              if(place==totalRunners) {
                racesFinished++;
                if(racesFinished===racesStarted){
                  fs.writeFile("results.json",JSON.stringify(results),()=>{});
                  console.log("done");
                }
              }
            }
          }).catch(function (err) {
            console.log(err);
          })
      }
    }
  })
  .catch(function (err) {
    console.log(err);
  });

//HTML selector for school name from meet results page:
    //document.getElementsByClassName("table DataTable table-responsive table-hover mb-0")[0].getElementsByTagName("tr")[0].getElementsByClassName("truncate d-block mw-225")[0].innerHTML;
//HTML selector for each race table from results page:
    //document.getElementsByClassName("col-sm-6 mb-3 mb-sm-0");