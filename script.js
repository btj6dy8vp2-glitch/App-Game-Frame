let consoles=JSON.parse(localStorage.getItem("consoles")||"[]");
let games=JSON.parse(localStorage.getItem("games")||"[]");

const library=document.getElementById("libraryGames");

function save(){

localStorage.setItem(
"consoles",
JSON.stringify(consoles)
);

localStorage.setItem(
"games",
JSON.stringify(games)
);

}

document
.querySelectorAll(".tab")
.forEach(tab=>{

tab.onclick=()=>{

document
.querySelectorAll(".tab")
.forEach(t=>
t.classList.remove("active")
);

document
.querySelectorAll(".page")
.forEach(p=>
p.classList.remove("active")
);

tab.classList.add("active");

document
.getElementById(
tab.dataset.page
)
.classList.add("active");

};

});

function render(){

document.getElementById(
"gameCount"
).innerText=
games.length+" games";

let gameConsole=
document.getElementById(
"gameConsole"
);

let filter=
document.getElementById(
"consoleFilter"
);

let consoleList=
document.getElementById(
"consoleList"
);

gameConsole.innerHTML="";
filter.innerHTML=
`<option value="all">
All Consoles
</option>`;

consoleList.innerHTML="";
library.innerHTML="";

consoles.forEach((c,index)=>{

gameConsole.innerHTML+=
`<option>${c}</option>`;

filter.innerHTML+=
`<option>${c}</option>`;

consoleList.innerHTML+=
`
<div style="margin-top:10px">
${c}
<button
onclick="removeConsole(${index})"
class="smallButton">
Remove
</button>
</div>
`;

});

games.forEach((g,index)=>{

library.innerHTML+=
`
<div
class="gameCard"
onclick="playGame(${index})">

${g.image ?
`<img
class="gameImage"
src="${g.image}">
`
:""}

<div class="gameInfo">

<h3>${g.name}</h3>

<p>${g.console}</p>

<p>
Played:
${g.lastPlayed||"Never"}
</p>

</div>

<div class="gameButtons">

<button
class="smallButton"
onclick="
event.stopPropagation();
removeGame(${index})
">
Delete
</button>

<button
class="smallButton"
onclick="
event.stopPropagation();
clearLogs(${index})
">
Clear Logs
</button>

</div>

</div>
`;

});

}

function playGame(index){

games[index].lastPlayed=
"Today";

const text=[
"Happy gaming!",
"Quest loaded!",
"Tonight begins now!",
"Controller connected!"
];

document.getElementById(
"messageBox"
).innerText=
text[
Math.floor(
Math.random()*text.length
)
];

save();
render();

}

function removeGame(index){

games.splice(index,1);

save();
render();

}

function clearLogs(index){

games[index].lastPlayed=null;

save();
render();

}

function removeConsole(index){

const name=
consoles[index];

consoles.splice(index,1);

games=
games.filter(
g=>g.console!==name
);

save();
render();

}

document.getElementById(
"addConsoleBtn"
).onclick=()=>{

const value=
document.getElementById(
"consoleInput"
).value.trim();

if(!value)return;

consoles.push(value);

document.getElementById(
"consoleInput"
).value="";

save();
render();

};

document.getElementById(
"addGameBtn"
).onclick=()=>{

const name=
document.getElementById(
"gameName"
).value.trim();

const consoleName=
document.getElementById(
"gameConsole"
).value;

if(!name)return;

const file=
document.getElementById(
"gameImage"
).files[0];

if(file){

const reader=
new FileReader();

reader.onload=e=>{

games.push({

name:name,
console:consoleName,
image:e.target.result,
lastPlayed:null

});

save();
render();

};

reader.readAsDataURL(file);

}else{

games.push({

name:name,
console:consoleName,
image:null,
lastPlayed:null

});

save();
render();

}

};

document.getElementById(
"spinBtn"
).onclick=()=>{

if(!games.length)return;

const game=
games[
Math.floor(
Math.random()*games.length
)
];

document.getElementById(
"wheel"
).innerText=
"Tonight's game:\n"+game.name;

};

render();