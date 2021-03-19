Moralis.initialize("IYOarGZPltuYpMm414LrEACUjPInzFcKCWDR0ovS"); // Application id from moralis.io
Moralis.serverURL = "https://xzwygifofpgw.moralis.io:2053/server"; //Server url from moralis.io

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
    } catch (error) {
        console.log(error);
    }
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
        });
}

document.getElementById("login_button").onclick = login;
document.getElementById("headsbutton").onclick = function(){flip("heads")};
document.getElementById("tailsbutton").onclick = function(){flip("tails")};
