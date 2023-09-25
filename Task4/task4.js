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
    //get body
    let body = document.getElementById("tablebody");
    //create row element
    let row = document.createElement('tr');
    //create three table data element and put user detail
    let name = document.createElement('td');
    name.textContent = user.name;
    let email = document.createElement('td');
    email.textContent = user.email;
    let phone = document.createElement('td');
    phone.textContent = user.phone;
    //three child in row
    row.appendChild(name);
    row.appendChild(email);
    row.appendChild(phone);
    //add row in body
    body.appendChild(row)
}

//get form data and listen for event
let formData = document.getElementById("demoForm");
formData.addEventListener('submit', addUser);
