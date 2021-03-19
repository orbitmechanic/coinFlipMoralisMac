Moralis.initialize("IYOarGZPltuYpMm414LrEACUjPInzFcKCWDR0ovS"); // Application id from moralis.io
Moralis.serverURL = "https://xzwygifofpgw.moralis.io:2053/server"; //Server url from moralis.io

function addRowToTable(tableId, data){
    let tableRow = document.createElement('tr');
    data.forEach(element => {
        let newColumn = document.createElement('td');
        newColumn.innerHTML = element;
        tableRow.appendChild(newColumn);
    });
    document.getElementById(tableId).appendChild(tableRow);
}

async function login() {
    try {
        user = await Moralis.User.current();
        if(!user){
            user = await Moralis.Web3.authenticate();
            alert("New user logged in");
            console.log(user);
        } else {
            alert("Same user re-logged in.");
        }
        document.getElementById("login_button").style.display = "none";
        document.getElementById("game").style.display = "block";

        let winners = await Moralis.Cloud.run("biggestWinners",{});
        console.log(winners);
        winners.forEach( (row) => {
            addRowToTable('top_winners',[row.objectId, row.total_sum]);
        })
        
        let losers = await Moralis.Cloud.run("biggestLosers",{});
        console.log(losers);
        losers.forEach( (row) => {
            addRowToTable('top_losers',[row.objectId, row.total_sum]);
        })

        addRowToTable('top_losers',losers);
        let allBets = await Moralis.Cloud.run("biggestBets",{});
        console.log(allBets);
        allBets.forEach( (row) => {
            addRowToTable('top_bets',[row.user,row.bet,row.win]);
        })

    } catch (error) {
        console.log(error);
    }
 
}

async function logout(){
    await Moralis.User.logOut();
    alert("User logged out.");
}

async function flip(side) {
    let amount = document.getElementById("amount").value;
    alert('Side: ' + side + " Amount: " + amount);
    window.web3 = await Moralis.Web3.enable();
    let contractAddress = "0xf271dF427d16D3f7910A8b2311E7c2f4702aF8C4";
    let contractInstance = new web3.eth.Contract(window.abi, contractAddress);
    contractInstance.methods.flip(side == "heads" ? 0:1)
        .send({value:amount, from: ethereum.selectedAddress})
        .on('receipt', function(receipt){
            console.log(receipt);
            if (receipt.events.bet.returnValues.win){
                alert("Win!");
            } else {
                alert("Loss.");
            }
        });
}

document.getElementById("login_button").onclick = login;
document.getElementById("logout_button").onclick = logout;
document.getElementById("headsbutton").onclick = function(){flip("heads")};
document.getElementById("tailsbutton").onclick = function(){flip("tails")};
