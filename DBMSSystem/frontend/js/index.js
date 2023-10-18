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
        let tables = document.querySelectorAll(".sometables");

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
    table.addEventListener("click", fetchSpecificTable);
}

/**
 * EVENTS
 */
const alltables = document.getElementById("alltables");
const addField = document.getElementById("addFieldButton");
const AddFieldContainer = document.getElementById("fieldsContainer");
const createNewTable = document.getElementById("CreateTableForm");
const respectiveTableDiv = document.getElementById("respectiveTable");
const tableCardName = document.getElementById("tableCardName");
const addNewRowInTable = document.getElementById("AddRowInTable");
addNewRowInTable.addEventListener("submit", addNewRowInTablePostReq)
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
            //remove child before adding child
            while (respectiveTableDiv.firstChild) {
                respectiveTableDiv.removeChild(respectiveTableDiv.firstChild);
            }

            while (addNewRowInTable.firstChild) {
                addNewRowInTable.removeChild(addNewRowInTable.firstChild)
            }
            const tabledata = res.data;
            addFetchedFieldInTable(tabledata);
            tableCardName.textContent = e.target.id;

            for (let i = 0; i < tabledata.tablehead.length; i++) {
                let input = document.createElement('input');
                input.name = tabledata.tablehead[i];
                input.placeholder = tabledata.tablehead[i];
                input.className = "form-control"
                addNewRowInTable.appendChild(input);
            }

            let button = document.createElement('button');
            button.className = "btn mt-3 bg-primary text-white"
            button.type = "submit"
            button.textContent = "Add"
            addNewRowInTable.appendChild(button)
        }
    }).catch(err => {
        console.log(err);
    })
}


function deleteFieldFromTable(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        let row = e.target.parentElement.parentElement;
        let fieldname = row.parentElement.parentElement.children[0].children[0].children[0].textContent;
        const fieldvalue = row.children[0].textContent;
        axios.delete(`http://localhost:3000/tables/delete/${fieldvalue}?tablename=${tableCardName.textContent}&fieldname=${fieldname}`).then(res => {
            if (res.status === 200) {
                const tableBodyID = document.getElementById("tableId");
                tableBodyID.removeChild(row);
                alert("user deleted successfully");
            }
        }).catch(err => console.log(err));
    }
}

function addNewRowInTablePostReq(e) {
    e.preventDefault();
    const data = new FormData(e.target)
    const table = {}
    for (let entry of data.entries()) {
        table[entry[0]] = entry[1];
    }
    //seprate key and values
    const tablekeys = Object.keys(table);
    const tablevalues = Object.values(table);

    axios.post("http://localhost:3000/tables/insert-field", {
        tablekeys,
        tablevalues,
        tablename: tableCardName.textContent
    }).then(res => {
        if (res.status === 200) {
            alert("user inserted successfully");
            addNewlyInsertedFieldInTable(tablevalues);
            //close modal
            let myModal = document.getElementById('insertFieldModal')
            let modal = bootstrap.Modal.getInstance(myModal)
            modal.hide()
        }
    }).catch(err => {
        alert("Failed to Insert");
        console.log(err);
    })
}

function addNewlyInsertedFieldInTable(tablevalues) {
    //adding new data row in table
    const tbody = document.getElementById("tableId");
    const tbodyrow = document.createElement("tr");
    const tdbutton = document.createElement("td");
    const delbutton = document.createElement("button");
    delbutton.textContent = "Delete";
    delbutton.className = "btn bg-danger text-white delete";
    for (let j = 0; j < tablevalues.length; j++) {
        const td = document.createElement("td");
        td.textContent = tablevalues[j];
        tbodyrow.appendChild(td);
    }
    tdbutton.appendChild(delbutton);
    tbodyrow.appendChild(tdbutton);
    tbody.appendChild(tbodyrow);
}

function addFetchedFieldInTable(tableData) {
    const table = document.createElement("table");
    table.className = "table table-hover table-bordered";
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
    tbody.id = "tableId"
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
    const listenForDelete = document.getElementById("tableId");
    listenForDelete.addEventListener("click", deleteFieldFromTable);
}

/**
 * CREATE TABLE MODAL 
 */
function addNewTable(e) {
    e.preventDefault();
    // console.log("clicked");
    let inputs = e.target.getElementsByTagName('input');
    let selects = e.target.getElementsByTagName('select');
    let data = {
        tableName: '',
        fields: []
    };

    //get table and fieldname
    for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].name === 'tablename') {
            data.tableName = inputs[j].value;
        } else if (inputs[j].name === 'fieldname') {
            data.fields.push({
                name: inputs[j].value,
                type: ''
            });
        }
    }

    //get fieldtypes
    for (let k = 0; k < selects.length; k++) {
        if (selects[k].name === 'fieldtype') {
            data.fields[k].type = selects[k].value;
        }
    }

    axios.post("http://localhost:3000/tables/add", data).then(res => {
        if (res.status === 200) {
            alert("Table created successfully");
            addLeftSide(data.tableName.toLowerCase());
            //close modal
            let myModal = document.getElementById('CreateTableModal')
            let modal = bootstrap.Modal.getInstance(myModal)
            modal.hide()
        }
    }).catch(err => {
        alert("Failed to Create");
        console.log(err);
    })
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