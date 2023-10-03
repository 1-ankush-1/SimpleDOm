//get data from form
function addUser(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let user = {}
    for (let [name, value] of data) {
        user[name] = value
    }

    axios.post("https://crudcrud.com/api/bfcf10f3434a4905bcd2d50682d61bca/Appointment", user).then((res) => {
        console.log("done", res);
        //set item in localstorage
        // localStorage.setItem(user.email, JSON.stringify(user));
        addinTable(user);
    }).catch(err => console.log(err));
    //reset the input field data
    formData.reset();
}

//add user in table
function addinTable(user) {
    //create row element
    let row = document.createElement('tr');
    //create three table data element and put user detail
    let name = document.createElement('td');
    name.textContent = user.name;
    let email = document.createElement('td');
    email.textContent = user.email;
    let phone = document.createElement('td');
    phone.textContent = user.phone;
    //create opearation row to hold edit and delete
    let operations = document.createElement('td');
    let btndel = document.createElement('button');
    btndel.className = "btn btn-danger delete";
    btndel.textContent = "Delete";
    let editbtn = document.createElement("button");
    editbtn.className = "btn btn-primary me-2 edit"
    editbtn.textContent = "Edit";
    operations.appendChild(editbtn);
    operations.appendChild(btndel);
    //three child in row
    row.appendChild(name);
    row.appendChild(email);
    row.appendChild(phone);
    row.appendChild(operations);
    //add row in body
    body.appendChild(row)
}

function deleteUser(e) {
    e.preventDefault();
    //check if any class contains delete
    if (e.target.classList.contains('delete')) {
        if (confirm("Are you sure!")) {
            //get the row
            let row = e.target.parentElement.parentElement;
            //remove the row from table
            body.removeChild(row);
            //remove the row from localhost
            localStorage.removeItem(row.cells[1].innerText);
        }
    }
    //check if any class contains edit
    if (e.target.classList.contains("edit")) {
        //get row and all celll data
        let row = e.target.parentElement.parentElement;
        let name = row.cells[0].innerText;
        let email = row.cells[1].innerText;
        let phone = row.cells[2].innerText;

        // Remove the row from table and localhost
        body.removeChild(row);
        localStorage.removeItem(row.cells[1].innerText);

        //putting values in input fields
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone;
    }
}

//get form data and listen for event
let formData = document.getElementById("demoForm");
formData.addEventListener('submit', addUser);

//get tablebody to delete user
let body = document.getElementById("tablebody");
body.addEventListener('click', deleteUser);

