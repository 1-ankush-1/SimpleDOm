const inpform = document.getElementById("playerform");
const searchform = document.getElementById("searchform");
inpform.addEventListener("submit", AddPlayer);
searchform.addEventListener("submit", searchPlayer);
const some = document.getElementById("some");
console.log(some.innerText);

function AddPlayer(e) {
    e.preventDefault();

    const playerform = new FormData(inpform);

    playerdata = {}

    //get data
    for (let entry of playerform.entries()) {
        playerdata[entry[0]] = entry[1];
    }

    axios.post("http://localhost:3000/player/add", playerdata).then((res) => {
        if (res.status === 200) {
            alert("player added successfully");
            inpform.reset();
        }
    }).catch(err => console.log(err));
}


function searchPlayer(e) {
    e.preventDefault();
    const searchData = new FormData(searchform);
    search = {}
    for (let entry of searchData.entries()) {
        search[entry[0]] = entry[1];
    }

    axios.post(`http://localhost:3000/player`, { name: search.name }).then((res) => {

        if (Object.keys(res?.data.data).length > 0) {
            //add in html
            addPlayerinHtml(res?.data.data);
            //empty field
            searchform.reset();
        }
    }).catch(err => console.log(err));
}

function editPlayer() {
    e.preventDefault();

    axios.delete(`http://localhost:3000/player/delete/${id}`).then((res) => {
        if (res.status === 200) {
            const name = document.getElementById("name");

        }
    }).catch(err => console.log(err));
}

function addPlayerinHtml(data) {
    console.log(data);
}
