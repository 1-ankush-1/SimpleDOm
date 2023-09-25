//get data from form
function addUser(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let user = {}
    for (let [name, value] of data) {
        user[name] = value
    }
    //set item in localstorage
    localStorage.setItem(user.email, JSON.stringify(user));
    addinTable(user);
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
    let operations = document.createElement('td');
    let btndel = document.createElement('button');
    btndel.className = "btn btn-danger delete";
    btndel.id = "del";
    btndel.textContent = "Delete";
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

}

//get form data and listen for event
let formData = document.getElementById("demoForm");
formData.addEventListener('submit', addUser);

//get tablebody to delete user
let body = document.getElementById("tablebody");
body.addEventListener('click', deleteUser);

