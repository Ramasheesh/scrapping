// reqquest to web links
const request = require("request");
// get the data from web to html body
const cheerio = require('cheerio');

const scoreCard = require("./scoreCard");

function getAllMatch(url){
    // console.log("full link from allmatch: ",url);
    request(url ,cb)
}
function cb(err,res,body){
    if(err){
        console.error("error",err);
    }
    else{
        handleHtml(body);
        // console.log(body);
    }
}
function handleHtml(html){
    let selecTool = cheerio.load(html)
    // let allMatchEle = selecTool('a[href="/series/indian-premier-league-2023-1345038/gujarat-titans-vs-chennai-super-kings-1st-match-1359475/full-scorecard"]');
    let allMatchEle = selecTool('a[class="ds-no-tap-higlight"]');

    // console.log('allMatchEle: ', allMatchEle.text());

    for(let i =68 ; i<= allMatchEle.length-1 ; i++ ){
        let allMatchLink = selecTool(allMatchEle[i]).attr('href')
        // console.log('allMatchLink: ',i,": ", allMatchLink);
        let fullLink = "https://www.espncricinfo.com" + allMatchLink;
        // console.log('fullLink: ',i, fullLink);
        // if(fullLink[i] == fullLink[i+1]) return;
        scoreCard.scoreCard(fullLink)
        // break;
    }

}
// data from allMatch
module.exports ={
    getAllMatch: getAllMatch
}
