const request = require("request");
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
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

    let venue = selecTool('div[class="ds-text-tight-m ds-font-regular ds-text-typo-mid3"]')
    let venueOfMatch =  selecTool(venue).text();
    // console.log('venueOfMatch: ', venueOfMatch);

2//teams
    let team = selecTool('[class="ds-flex ds-flex-col ds-mt-3 md:ds-mt-0 ds-mt-0 ds-mb-1"] [class="ds-flex ds-items-center ds-min-w-0 ds-mr-1"]');
    let ownTeam =  selecTool(team[0]).text();
    let oponentTeam =  selecTool(team[1]).text();

    console.log('ownTeam: ',ownTeam);
    console.log('oponentTeam: ', oponentTeam);

3// winners
    let winners = selecTool('[class="ds-text-tight-m ds-font-regular ds-truncate ds-text-typo"]');
    // console.log('winners: ', winners.text());
    let winnersOfMatch =  selecTool(winners).text();

4// Batting data

/*
    let batsmanData = selecTool('[class="ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-flex ds-items-center"]')
    for (let i = 0; i < batsmanData.length; i++) {
        let allcolums = selecTool(batsmanData[i]).find("td>a>span");        
        if(i<=5){
            // console.log(i,' Player of Team 1: ', allcolums.text());
        }
        if(i<=20 && i>5){
            // console.log(i,' Player Team 2: ', allcolums.text());
        }
    }
//5 not out
    let noutOut = selecTool('[class="ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-flex ds-items-center ds-border-line-primary ci-scorecard-player-notout"]')
    for (let i = 0; i < noutOut.length; i++) {
        let noutOutP = selecTool(noutOut[i]).find("td>a>span");        
        if(i<=1){
            let notOutPlayers = selecTool( noutOutP).text();

        }
        if(i<=3 && i>1){
            // console.log('noutOut Player Team 2: ', noutOutP.text());
            let notOutPlayers = selecTool( noutOutP).text();

        }
    }

//6 fall of wickets
    let fallOfWickets = selecTool('[class="ds-text-tight-s ds-font-regular ds-leading-4"]')
    for (let i = 0; i < fallOfWickets.length; i++) {
        let wickets = selecTool(fallOfWickets[i]).find("div>span");        
        if(i== 0){
            // console.log('wickets of Team 1: ', wickets.text());
        }
        if(i == 1){
                // console.log('wickets of Team 2: ', wickets.text());
        }

    }
*/
4// Score Details
    let batsMan = selecTool('.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody')
    // console.log('Batting Details: ', scores.html());
    let htmlString = "";
    for (let i = 0; i < batsMan.length; i++) {
        htmlString = htmlString + selecTool(batsMan[i]).html();
        let allRow = selecTool(batsMan[i]).find('tr')
        for (let i = 0; i < allRow.length; i++) {
            // console.log('element: ', selecTool( allRow[i]).text());
            let rows = selecTool(allRow[i]);
            let firstColums = rows.find('td')[0];
            if(selecTool(firstColums).hasClass('ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-flex ds-items-center')){
                // name | runs | bals | 4 's| 6's | sr
                

                let playesName = selecTool(rows.find('td')[0]).text().trim();
                let wicketTaker = selecTool(rows.find('td')[1]).text();
                let runs = selecTool(rows.find('td')[2]).text();
                let balls = selecTool(rows.find('td')[3]).text();
                // let M = selecTool(rows.find('td')[4]).text();
                let noOf4 = selecTool(rows.find('td')[5]).text();
                let noOf6 = selecTool(rows.find('td')[6]).text();
                let sr = selecTool(rows.find('td')[7]).text();
                //console
                // console.table(`PlayerName: ${playesName} |runs: ${runs} |balls: ${balls} |4's: ${noOf4} |6's: ${noOf6} |stricRate: ${sr}`);
                
                //Wicket Taker
                // console.log(`wicket Taker: ${wicketTaker}`);
                
                /*
                for (let i = 0; i< 8; i++) {
                    if(i == 1 ||  i == 4) continue;
                    else{
                        console.log(selecTool(rows.find('td')[i]).text());
                    }
                }
                */
                extractInfo(ownTeam,oponentTeam ,playesName,runs,balls,noOf4,noOf6,sr ,venueOfMatch,winnersOfMatch)
            }
            
        }
    }
    
    function extractInfo(ownTeam,oponentTeam ,playesName,runs,balls,noOf4,noOf6,sr ,venueOfMatch,winnersOfMatch ) {
        let teamNamePath = path.join(__dirname,'TataIPL',ownTeam);
            if(!fs.existsSync(teamNamePath)){
                fs.mkdirSync(teamNamePath);
            }
        let playerPath = path.join(teamNamePath,playesName + '.xlsx');
        let content = excelReader(playerPath,playesName)
        let infoVarObj = {ownTeam,oponentTeam ,playesName,runs,balls,noOf4,noOf6,sr ,venueOfMatch,winnersOfMatch};//objrct
        content.push(infoVarObj);
        excelWriter(playerPath, content , playesName);

    }
}
// read the data from excel file
function excelReader(playerPath,sheetName) {
    //if playe path not exits
    if (!fs.existsSync(playerPath)) {
        return[];
    }

    // if player path exist  and having some data
    let workBook = xlsx.readFile(playerPath);
    let exceData = workBook.Sheets[sheetName];
    // A dictionary of the worksheets in the workbook. Use SheetNames to reference these.
    let playerObj = xlsx.utils.sheet_to_json(exceData);
    return playerObj;
 
}
function excelWriter(playerPath ,jsObject , sheetName) {
    //create new workbook
    let newWorkBook = xlsx.utils.book_new();
    // create one sheet in workbook and convert json to sheet
    let newWorkSheet = xlsx.utils.json_to_sheet(jsObject);
    //Append a worksheet to a workbook
    xlsx.utils.book_append_sheet(newWorkBook , newWorkSheet , sheetName);
    // Attempts to write workbook data to file
    xlsx.writeFile(newWorkBook,playerPath);
}
module.exports = {
    scoreCard : scoreDetails
}
