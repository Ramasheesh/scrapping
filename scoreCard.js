const request = require("request");

const cheerio = require('cheerio');
function scoreDetails(url){
    // console.log("Link from score card: ",url);
    // we have a url from score card from all match 
    request(url , cb)
}

function cb(err,res,body){
    if(err){
        console.log("error" , err);
    }
    else{
       getScore(body)
    }
}


function getScore(html){
    let selecTool = cheerio.load(html);
//1: venue of the match
    // let venueData = selecTool('.ds-flex.ds-justify-between.ds-items-center>.ds-truncate')
    let venue = selecTool('div[class="ds-text-tight-m ds-font-regular ds-text-typo-mid3"]')
    console.log('venue: ', venue.text());
2//teams
    let teams1 = selecTool('[class="ci-team-score ds-flex ds-justify-between ds-items-center ds-text-typo ds-opacity-50 ds-mb-2"]');
    console.log('teams1: ', teams1.text());
    let teams2 = selecTool('[class="ci-team-score ds-flex ds-justify-between ds-items-center ds-text-typo ds-mb-2"]');
    console.log('teams1: ', teams2.text());
3// winners
    let winners = selecTool('[class="ds-text-tight-m ds-font-regular ds-truncate ds-text-typo"]');
    console.log('winners: ', winners.text());
4// Score Details
    // let scores = selecTool('[class="ds-w-full ds-table ds-table-md ds-table-auto  ci-scorecard-table"]')
    // console.log('scores: ', scores.text());
}

module.exports = {
    scoreCard : scoreDetails
}
