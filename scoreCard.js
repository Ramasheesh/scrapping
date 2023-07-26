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
    // console.log('venueData: ', venueData);
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
    let scores = selecTool('.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody>tr')
    // console.log('Batting Details: ', scores.html());
    for (let i = 0; i < scores.length; i++) {
        let allcolums = selecTool(scores[i]).find("td");        
        console.log(i,'allcolums: ', allcolums.text());
        if(selecTool(selecTool(allcolums[i]).find('span')[0]).hasClass("ds-table-row-compact-bottom ds-border-none")){
            console.log('wickets ');
        }
    }
5// Batting data
    let batsmanData = selecTool('[class="ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-flex ds-items-center"]')
    // console.log('batsmanData: ', batsmanData.text());
        for (let i = 0; i < batsmanData.length; i++) {
            let allcolums = selecTool(batsmanData[i]).find("td>a>span");        
            // console.log(i,'allcolums: ', allcolums.text());
            if(i<=5){
                console.log(i,' Player of Team 1: ', allcolums.text());
            }
            if(i<=20 && i>5){
                console.log(i,' Player Team 2: ', allcolums.text());
            }
        }
//6 not out
    let noutOut = selecTool('[class="ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-flex ds-items-center ds-border-line-primary ci-scorecard-player-notout"]')
    // console.log('noutOut: ', noutOut.text());
    for (let i = 0; i < noutOut.length; i++) {
        let noutOutP = selecTool(noutOut[i]).find("td>a>span");        
        if(i<=1){
            console.log('noutOut Player Team 1: ', noutOutP.text());
        }
        if(i<=3 && i>1){
            console.log('noutOut Player Team 2: ', noutOutP.text());
        }
    }
//7 Not Play in match
    let notPlay = selecTool('[class="!ds-py-2"]')
    console.log( notPlay.text());
//8 fall of wickets
    let fallOfWickets = selecTool('[class="ds-text-tight-s ds-font-regular ds-leading-4"]')
    // console.log('fallOfWickets: ', fallOfWickets.text());
    for (let i = 0; i < fallOfWickets.length; i++) {
        let wickets = selecTool(fallOfWickets[i]).find("div>span");        
        if(i== 0){
            // console.log('wickets of Team 1: ', wickets.text());
        }
        if(i == 1){
                // console.log('wickets of Team 2: ', wickets.text());
        }
       
    }
}

module.exports = {
    scoreCard : scoreDetails
}
