//Scrape athletic.net for the results of that week and update a json file that represents an associative array where the key is each team member's name, and the value is how many points they got.

var raceLink="https://www.athletic.net/CrossCountry/meet/145525/results";




//HTML selector for school name from meet results page: 
    //document.getElementsByClassName("table DataTable table-responsive table-hover mb-0")[0].getElementsByTagName("tr")[0].getElementsByClassName("truncate d-block mw-225")[0].innerHTML;
//HTML selector for each race table from results page:
    //document.getElementsByClassName("col-sm-6 mb-3 mb-sm-0");