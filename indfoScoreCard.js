const request = require("request");

const cheerio = require('cheerio');
// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-schedule-fixtures-and-results"
//     request(url , cb)

function getInfoFromScoreCard(url){
    // console.log("Link from score card: ",url);
    // we have a url from score card from all match 
    request(url , cb)
}

function cb(err,res,body){
    if(err){
        console.log("error" , err);
    }
    else{
       getMatchDetails(body)
    }
}

function getMatchDetails(html){
    let selecTool = cheerio.load(html);
    /*1: Venue Of the Match*/
    let venuOfMatch = selecTool('div[class="ds-text-tight-xs ds-truncate ds-text-typo-mid3"]')
    // let venuOfMatch = selecTool('a[href="/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard"]')
    // let venuOfMatch = selecTool('a[href="/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard"]')
    // console.log('venuOfMatch: ', venuOfMatch.text());
    console.log('MatchDetails: ', venuOfMatch.length);
    
    for(let i = 0 ; i <= venuOfMatch.length-1 ; i++ ){
        // Hole Arr List of Matches
        // let resultArr = selecTool(venuOfMatch[i]).text();

        // single Arr who first Match
        // let resultArr = selecTool(venuOfMatch[0]).text();
        let usefullDataInResult = selecTool(venuOfMatch[i]).text().split(",");
        // console.log('usefullDataInResult: ', usefullDataInResult);
        // console.log("Venue: ",usefullDataInResult[0]);
        // console.log("Data: ",usefullDataInResult[1]);
        // console.log("Year: ",usefullDataInResult[2]);
        // console.log("leage: ",usefullDataInResult[3]);
        for(let i = 0; i<=usefullDataInResult.length-1 ;i++){
            let formatResult = ["Inning",'City','Date','Year','Leage']
            console.log(formatResult[i]+ ": " + usefullDataInResult[i] );
        }
        break;

    }
    /*1: Teams Of the Match*/
    // let result = selecTool('div[class="ds-flex ds-flex-col ds-mt-2 ds-mb-2"] ')
    let resultTeam1 = selecTool('div[class="ci-team-score ds-flex ds-justify-between ds-items-center ds-text-typo ds-opacity-50 ds-my-1"]')
    let resultTeam2 = selecTool('div[class="ci-team-score ds-flex ds-justify-between ds-items-center ds-text-typo ds-my-1"]')
    // console.log('resultTeam2: ', resultTeam2.text());
    for (let i = 0; i < resultTeam2.length-1; i++) {
        const IndexResultForTeam1 = selecTool(resultTeam1[i]);
        const IndexResultForTeam2 = selecTool(resultTeam2[i]);
        console.log("Match B/w teams: ",i,": ", IndexResultForTeam1.text() , ' __Vs__ ' , IndexResultForTeam2.text());
        break;
    }
    /*1: Result Of the Match*/
    let winResult = selecTool('p[class="ds-text-tight-s ds-font-regular ds-line-clamp-2 ds-text-typo"]')
    // let winResult = selecTool(`div[class="ds-grow ds-px-4 ds-border-r ds-border-line-default-translucent"]`)
    // let winResult = selecTool(`div[class="ds-p-4 hover:ds-bg-ui-fill-translucent ds-border-none ds-border-t ds-border-line"]`)
    // console.log('winResult: ', winResult.text());
    // console.log('winResult: ', (winResult.text()).split(','));
    for (let i = 0; i < winResult.length-1; i++) {
        const IndexResult = selecTool(winResult[i]);
        console.log('MatchResult: ' ,i,"", IndexResult.text());
        break;
        
    }
    
}

module.exports = {
    gifc : getInfoFromScoreCard
}