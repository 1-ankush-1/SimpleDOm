//fetch old records
async function onloadData() {
    try {
        //get data
        const items = await axios.get("http://localhost:4000/shopitems");

        //check if data is empty
        if (items.data.length <= 0) {
            return;
        }

        //setting data in localstorage
        localStorage.setItem("allproduct", JSON.stringify(items.data));

        //adding data in table
        for (let prod of items.data) {
            addinTable(prod)
        }
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener("DOMContentLoaded", onloadData)

//add new data
function addItem(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let item = {}
    for (let [name, value] of data) {
        item[name] = value
    }
    axios.post("http://localhost:4000/shopitems/add", item).then((res) => {
        //when get response from backend add it in localstorage
        if (Object.keys(res?.data).length > 0) {
            let allProducts = JSON.parse(localStorage.getItem("allproduct")) ?? [];
            allProducts.push(res.data);
            localStorage.setItem("allproduct", JSON.stringify(allProducts));
            //adding data in table
            addinTable(res.data);
            //reset the input field data
            formData.reset();
        }
    }).catch(err => console.log(err));
}


//add item in table
function addinTable(item) {
    //create row element
    let row = document.createElement('tr');
    //create three table data element and put user detail
    let name = document.createElement('td');
    name.textContent = item.name;
    let desc = document.createElement('td');
    desc.textContent = item.desc;
    let price = document.createElement('td');
    price.textContent = item.price;
    let quantity = document.createElement('td');
    quantity.textContent = item.quantity;
    //create opearation row to hold edit and delete
    let operations = document.createElement('td');
    let btnbuy1 = document.createElement('button');
    let btnbuy2 = document.createElement('button');
    let btnbuy3 = document.createElement('button');
    btnbuy1.className = "btn btn-primary me-2 buy 1"
    editbtn.textContent = "Buy 1";
    btnbuy2.className = "btn btn-primary me-2 but 2"
    editbtn.textContent = "Buy 2";
    btnbuy3.className = "btn btn-primary me-2 buy 3"
    editbtn.textContent = "Buy 3";
    //append buttons
    operations.appendChild(btnbuy1);
    operations.appendChild(btnbuy2);
    operations.appendChild(btnbuy3);
    //append items
    row.appendChild(name);
    row.appendChild(desc);
    row.appendChild(price);
    row.appendChild(quantity);
    row.appendChild(operations);
    //assign id
    row.id = item.id;
    //add row in body
    body.appendChild(row)
}

//Delete and Edit User
function buyItem(e) {
    e.preventDefault();

    //check if any class contains buy
    if (e.target.classList.contains("buy")) {
        let prodTobuy;
        if (e.target.classList.contains("1")) {
            prodTobuy = 1;
        } else if (e.target.classList.contains("2")) {
            prodTobuy = 2;
        } else if (e.target.classList.contains("3")) {
            prodTobuy = 3;
        }

        //edit in the backend
        axios.put(`http://localhost:4000/shopitems/buy/${row.id}`).then((res) => {
            //when item get edited
            if (res.status === 200) {
                //get row and all cell data
                let row = e.target.parentElement.parentElement;
                row.cells[3].innerText - prodTobuy;

                let allProducts = JSON.parse(localStorage.getItem("allproduct"));
                //compare by id
                const data = allProducts.map((app) => {
                    if (app.id === row.id) {
                        return row.quantity - prodTobuy;
                    }
                })

                //setting localstorage after removing item
                localStorage.setItem("allproduct", JSON.stringify(data));
            }
        }).catch(err => console.log(err));
    }
}

//get form data and listen for event
let formData = document.getElementById("demoForm");
formData.addEventListener('submit', addItem);

//get tablebody to Buy Item
let body = document.getElementById("tablebody");
body.addEventListener('click', buyItem);

