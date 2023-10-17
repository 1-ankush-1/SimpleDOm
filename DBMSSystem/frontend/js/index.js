async function onloadData() {
    try {
        //get data
        const alltables = await axios.get("http://localhost:3000/tables");

        //check if data is empty
        if (alltables.data.length <= 0) {
            return;
        }

        //setting data in localstorage
        localStorage.setItem("tables", JSON.stringify(alltables.data));

        //adding data in table
        for (let e of alltables.data) {
            addLeftSide(e)
        }
        //get all classes
        var tables = document.querySelectorAll(".sometables");

        // Add an event listener to the all table
        for (let i = 0; i < tables.length; i++) {
            tables[i].addEventListener("click", fetchSpecificTable);
        }

    } catch (err) {
        console.log(err);
    }
}

function fetchSpecificTable(e) {
    e.preventDefault();
    //get data of particular table
    axios.post("http://localhost:3000/tables/tablename", { tablename: e.target.id }).then(res => {
        console.log(res.data);
        if (res.data.data.length > 0) {
            console.log(res.data.data)
        }
    }).catch(err => {
        console.log(err);
    })
}

//onload get tables
function addLeftSide(tablename) {
    const table = document.createElement("div")
    table.id = tablename;
    table.className = "sometables"
    table.textContent = tablename;
    alltables.appendChild(table);
}

window.addEventListener("DOMContentLoaded", onloadData);
const alltables = document.getElementById("alltables");
const addField = document.getElementById("addFieldButton");
const AddFieldContainer = document.getElementById("fieldsContainer");
const createNewTable = document.getElementById("CreateTableForm");
addField.addEventListener('click', addFieldInCreateModalForm);
createNewTable.addEventListener("submit", function (e) {
    e.preventDefault();
    addNewTable(e);
});

function addNewTable(e) {
    const data = new FormData(createNewTable)
    const table = {}
    for (let entry of data.entries()) {
        table[entry[0]] = entry[1];
    }
    console.log(table);
}

function addFieldInCreateModalForm(e) {
    e.preventDefault();
    // console.log("in")
    const row = document.createElement("div")
    row.className = "row";
    row.innerHTML = `
    <div class="row">
    <div class="col">
      <h5>Field name</h5>
      <input
        type="text"
        name="fieldname"
        id="fieldname"
        class="form-control"
        required
      />
    </div>
    <div class="col">
      <h5>Type</h5>
      <select
        name="fieldtype"
        id="fieldtype"
        class="form-control"
        required
      >
        <!-- Add your options here -->
        <option value="">Select type</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
      </select>
    </div>
  </div>
    `
    AddFieldContainer.appendChild(row);
}