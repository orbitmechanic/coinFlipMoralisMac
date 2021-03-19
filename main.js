Moralis.initialize("IYOarGZPltuYpMm414LrEACUjPInzFcKCWDR0ovS"); // Application id from moralis.io
Moralis.serverURL = "https://xzwygifofpgw.moralis.io:2053/server"; //Server url from moralis.io

async function login() {
    try {
        user = await Moralis.Web3.authenticate();
        console.log(user);
        alert("User logged in");
        document.getElementById("login_button").style.display = "none";
        document.getElementById("game").style.display = "block";
    } catch (error) {
        console.log(error);
    }
}

async function flip(side) {
    alert(side);
}

document.getElementById("login_button").onclick = login;
document.getElementById("headsbutton").onclick = function(){flip("heads")};
document.getElementById("tailsbutton").onclick = function(){flip("tails")};
