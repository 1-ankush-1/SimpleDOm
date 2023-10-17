const inpform = document.getElementById("playerform");
const searchform = document.getElementById("searchform");
const playerProfiles = document.getElementById("player_profile");
inpform.addEventListener("submit", AddPlayer);
searchform.addEventListener("submit", searchPlayer);
playerProfiles.addEventListener('click', editPlayer);

function AddPlayer(e) {
    e.preventDefault();
    const playerid = document.getElementById("p_id");
    const playerform = new FormData(inpform);

    const playerdata = {}
    //get data
    for (let entry of playerform.entries()) {
        if (!entry[1]) {
            alert(`${entry[0]} field is empty`);
            return;
        }
        playerdata[entry[0]] = entry[1];
    }
    console.log(playerid.value);
    //id exist means updating else new data
    if (playerid.value) {
        axios.put(`http://localhost:3000/player/edit/${playerid.value}`, playerdata).then((res) => {
            if (res.status === 200) {
                alert("player updated successfully");
                playerid.value = null;
                inpform.reset();
            }
        }).catch(err => console.log(err));
    } else {
        axios.post("http://localhost:3000/player/add", playerdata).then((res) => {
            if (res.status === 200) {
                alert("player added successfully");
                playerid.value;
                inpform.reset();
            }
        }).catch(err => console.log(err));
    }
}


function searchPlayer(e) {
    e.preventDefault();
    const searchData = new FormData(searchform);
    search = {}
    for (let entry of searchData.entries()) {
        search[entry[0]] = entry[1];
    }
    axios.post(`http://localhost:3000/player`, { name: search.name }).then((res) => {
        const players = res?.data.data
        if (players.length > 0) {
            //add in html
            for (let i = 0; i < players.length; i++) {
                addPlayerinHtml(players[i]);
                //scroll to specific part
                window.location.hash = players[i].id;
            }
            //empty form field
            searchform.reset();
        } else {
            alert("no player found")
        }
    }).catch(err => {
        alert("no player found");
        console.log(err)
    });
}

function editPlayer(e) {
    e.preventDefault();
    if (e.target.classList.contains('edit')) {
        const row = e.target.parentElement.parentElement;

        //get data from player profile html
        const leftDiv = row.children[1];
        const divimg = leftDiv.children[0];
        const img = divimg.children[0].src;
        const unorderedlist = leftDiv.children[1];
        const name = unorderedlist.children[0].children[0].children[0].textContent;
        const dob = unorderedlist.children[1].children[0].children[0].textContent
        const birthplace = unorderedlist.children[2].children[0].children[0].textContent
        const noofmatches = unorderedlist.children[3].children[0].children[0].textContent
        const score = unorderedlist.children[4].children[0].children[0].textContent
        const fifties = unorderedlist.children[5].children[0].children[0].textContent
        const century = unorderedlist.children[6].children[0].children[0].textContent
        const wickets = unorderedlist.children[7].children[0].children[0].textContent
        const avg = unorderedlist.children[8].children[0].children[0].textContent
        const rightDiv = row.children[2];
        const career = rightDiv.children[0].textContent;

        //setting values in input form
        document.getElementById("p_id").value = row.id;
        document.getElementById('name').value = name;
        document.getElementById('img').value = img;
        document.getElementById('career').value = career;
        document.getElementById('avg').value = parseFloat(avg);
        document.getElementById('birthplace').value = birthplace;
        document.getElementById('century').value = parseInt(century);
        document.getElementById('dob').value = dob;
        document.getElementById('fifties').value = parseInt(fifties);
        document.getElementById('noofmatches').value = parseInt(noofmatches);
        document.getElementById('score').value = parseInt(score);
        document.getElementById('wickets').value = parseInt(wickets);
        playerProfiles.removeChild(row);
        window.location.hash = 'playerform';
    }
}


function addPlayerinHtml(player) {

    const row = document.createElement('div');
    row.className = "row mt-2 mb-2 p-1"
    row.id = player.id;
    row.style.height = "100vh";

    const EditDiv = document.createElement('div');
    EditDiv.className = "w-100";
    // const form = document.createElement('form');
    // form.className = "Player edit";
    const editbtn = document.createElement("button");
    editbtn.className = "btn fw-bold float-end w-20 edit";
    editbtn.textContent = "Edit";

    const profileLeftDiv = document.createElement('div');
    profileLeftDiv.className = "col-12 col-md-3 d-flex align-items-center justify-content-center flex-column left";
    const profilepicDiv = document.createElement('div');
    const profilepic = document.createElement("img");
    profilepic.src = player.img;
    profilepic.className = "img_round";
    profilepic.alt = player.name;
    // const horizontalLine = document.createElement("hr");
    const unorderedList = document.createElement("ul");
    unorderedList.className = "list-group p-4";
    unorderedList.innerHTML =
        `
            <li class="list-group-item">
                <h5>Name : <span>${player.name}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>DOB: <span>${player.dob}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>BirthPlace: <span>${player.birthplace}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>Matches : <span>${player.noofmatches}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>Score : <span>${player.score}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>Fifties : <span>${player.fifties}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>Centuries : <span>${player.century}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>Wickets : <span>${player.wickets}</span></h5>
            </li>
            <li class="list-group-item">
                <h5>Average : <span>${player.avg}</span></h5>
            </li>
        `
    const profileRightDiv = document.createElement('div');
    profileRightDiv.className = "col-12 col-md-9 text-center d-flex align-items-center justify-content-center right";
    const career = document.createElement('p');
    career.textContent = player.career;
    profileRightDiv.appendChild(career);

    //edit
    // form.appendChild(editbtn);
    EditDiv.appendChild(editbtn)

    //left div
    profilepicDiv.appendChild(profilepic);
    profileLeftDiv.appendChild(profilepicDiv);
    // profileLeftDiv.appendChild(horizontalLine);
    profileLeftDiv.appendChild(unorderedList);

    //parent
    row.appendChild(EditDiv);
    row.appendChild(profileLeftDiv);
    row.appendChild(profileRightDiv);

    playerProfiles.appendChild(row);
}
