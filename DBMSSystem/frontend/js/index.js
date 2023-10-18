/**
 * ON LOAD 
 */
window.addEventListener("DOMContentLoaded", onloadData);

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

//onload get tables
function addLeftSide(tablename) {
    const table = document.createElement("li")
    table.id = tablename;
    table.className = "list-group-item text-black-50 cursor-pointer sometables"
    table.textContent = tablename;
    alltables.appendChild(table);
}

/**
 * EVENTS
 */
const alltables = document.getElementById("alltables");
const addField = document.getElementById("addFieldButton");
const AddFieldContainer = document.getElementById("fieldsContainer");
const createNewTable = document.getElementById("CreateTableForm");
const respectiveTableDiv = document.getElementById("respectiveTable");
const listenForDelete = document.getElementById("tableId");
addField.addEventListener('click', addFieldInCreateModalForm);
createNewTable.addEventListener("submit", addNewTable);

/**
 * Right side  
*/
function fetchSpecificTable(e) {
    e.preventDefault();
    //get data of particular table
    axios.post("http://localhost:3000/tables/tablename", { tablename: e.target.id }).then(res => {
        if (res.status === 200) {
            addFetchedFieldInTable(res.data);
        }
    }).catch(err => {
        console.log(err);
    })
}

function addFetchedFieldInTable(tableData) {
    //remove child before adding child
    while (respectiveTableDiv.firstChild) {
        respectiveTableDiv.removeChild(respectiveTableDiv.firstChild);
    }

    const table = document.createElement("table");
    table.className = "table table-hover table-bordered";
    table.id = "tableId"
    const thead = document.createElement("thead");
    thead.className = "table-primary";
    const theadrow = document.createElement("tr");
    //put header in table
    for (let i = 0; i < tableData.tablehead.length; i++) {
        const th = document.createElement("th");
        th.textContent = tableData.tablehead[i];
        theadrow.appendChild(th);
    }
    const operation = document.createElement("th");
    operation.textContent = "Operation"
    theadrow.appendChild(operation);
    thead.appendChild(theadrow);
    table.appendChild(thead);
    //put body in table
    const tbody = document.createElement("tbody");
    for (let i = 0; i < tableData.tablevalues.length; i++) {
        const tbodyrow = document.createElement("tr");
        const tdbutton = document.createElement("td");
        const delbutton = document.createElement("button");
        delbutton.textContent = "Delete";
        delbutton.className = "btn bg-danger text-white delete";
        tdbutton.appendChild(delbutton);
        for (let j = 0; j < tableData.tablevalues[i].length; j++) {
            const td = document.createElement("td");
            td.textContent = tableData.tablevalues[i][j];
            tbodyrow.appendChild(td);
        }
        tbodyrow.appendChild(tdbutton);
        tbody.appendChild(tbodyrow);
    }
    table.appendChild(tbody);
    respectiveTableDiv.appendChild(table);
}

/**
 * CREATE TABLE MODAL 
 */
function addNewTable(e) {
    e.preventDefault();
    // console.log("clicked");
    const data = new FormData(createNewTable)
    const table = {}
    for (let entry of data.entries()) {
        table[entry[0]] = entry[1];
    }
    console.log(table);
}

function addFieldInCreateModalForm(e) {
    e.preventDefault();
    const row = document.createElement("div")
    row.className = "row";
    row.innerHTML = `
    <div class="col">
      <h6>Field name</h6>
      <input
        type="text"
        name="fieldname"
        id="fieldname"
        class="form-control"
        required
      />
    </div>
    <div class="col">
      <h6>Type</h6>
      <select
        name="fieldtype"
        id="fieldtype"
        class="form-control"
        required
      >
        <option value="">Select type</option>
        <option value="string">String</option>
        <option value="integer">Integer</option>
        <option value="boolean">Boolean</option>
        <option value="json">JSON</option>
        <option value="double">Double</option>
      </select>
    </div>
    `
    AddFieldContainer.appendChild(row);
}