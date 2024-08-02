let playercount=0;
let team=[];
document.getElementById("playercount").innerHTML=playercount;
function add_to_team(name,image,type,id){
    if(playercount==11){
        alert("your team is full")
    }else if(team.includes(id)){alert("player already included")}
    else{
        team.push(id);
        playercount++;
        update_count();
        const teams = document.getElementById("team");
        const div = document.createElement("div");
        div.classList.add("players-team");
        div.innerHTML = `
        <img src=${image} alt=${"player photo"} id="players-team-img">
        <h3>${name}</h3>
        `
        teams.appendChild(div);

    }
}

function update_count(){
    document.getElementById("playercount").innerHTML=playercount;
}


fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=A")
.then(res => res.json())
.then(data=>{
    player_display(data.player);
})



document.getElementById("btn").addEventListener('click',()=>{
    let user=document.getElementById("userInput").value ;
    if (!user || user.length === 0) {
        alert("No elements found");
    } else{
    
    
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${user}`)
        .then(res => res.json())
        .then(data => {
            player_display(data.player);
          
        })
       
    }});


const imgUrl = (player) =>
    {
        if(player.strCutout!=null)return player.strCutout;
        else if(player.strThumb!=null) return player.strThumb;
        else if(player.strRender!=null) return player.strRender;
        else return "https://qph.cf2.quoracdn.net/main-qimg-6d72b77c81c9841bd98fc806d702e859-lq";
    }

const player_display = (userdata) => {
    
    const container = document.getElementById("userdata");
    container.innerHTML='';
    userdata.forEach(element => {
        
        const div = document.createElement("div");
        div.classList.add("players");
        let url = imgUrl(element);
        div.innerHTML = `
        <div class="cards">
        <div><img src=${url} alt="" ></div>
        <div class="playerInfo">
        <div class="playerInfo1">
        <h1>${element.strPlayer}</h1>
        <h6>${element.strNationality} <br> ${element.strPosition} <br> ${element.strSport} <br> ${element.strTeam}</h6>
        </div>
        <div class="playerInfo2">
        
        <a href="${element.strInstagram}" ><i class="fa-brands fa-square-instagram fa-2xl" style="color: #fc98eb;"></i></a>
        <button type="button" class="btn  btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='show_details(${element.idPlayer})' >details</button>
        <a href="${element.strTwitter}" ><i class="fa-brands fa-twitter fa-2xl" style="color: #74C0FC;"></i></a>
        <p></p>
        </div>
        <button onclick="add_to_team('${element.strPlayer}', '${url}', '${element.strPosition}', '${element.idPlayer}')"     class="btn btn-outline-primary">Add to team</button>
        
        </div>
        </div>

        <div class="Team">
        <div class="header">
        </div> 
        `
        container.appendChild(div);
    });
}





function show_details(id) {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
        const player = data.players[0]; 
        const modalTitle = document.getElementById("exampleModalLabel");
        const modalBody = document.querySelector(".modal-body");

        modalTitle.textContent = player.strPlayer;
        modalBody.innerHTML = `
            <p>Sport: ${player.strNationality}</p>
            <p>Player: ${player.strSport}</p>
            <p>Team: ${player.strTeam}</p>
            <p>Team: ${player.strTeam}</p>
            <p>Honour: ${player.strBirthLocation}</p>
            <p>Season: ${player.strEthnicity}</p>
        `;
    console.log(data.players);
    })
    .catch(err => {
        alert(`error with show details${err}`)
    })
}

