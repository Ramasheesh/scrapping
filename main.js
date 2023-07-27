// reqquest to web links
const request = require("request");
// get the data from web to html body
const cheerio = require('cheerio');
const allMatch = require('./allMatch');
const fs = require('fs');
const path = require('path');

let url = "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038"
request(url,cb);
function cb(err,res,body){
    if(err){
        console.error("error",err);
    }
    else{
        handleHtml(body);
        // console.log(body);
    }
}

let iplPath = path.join(__dirname,'TataIPL');
    if(!fs.existsSync(iplPath)){
        fs.mkdirSync(iplPath);
    }

function handleHtml(html){
    let selecTool = cheerio.load(html)
    let ancherEle = selecTool('a[href="/series/indian-premier-league-2023-1345038/match-schedule-fixtures-and-results"]')
    // console.log(ancherEle.text());

    // attr method get the data from html body
    let reativeLink = ancherEle.attr("href");
    let fullLink = "https://www.espncricinfo.com" + reativeLink;
    // console.log('fullLink: ', fullLink);
    allMatch.getAllMatch(fullLink);

}
// /series/major-league-cricket-2023-1357742/match-schedule-fixtures-and-results"
