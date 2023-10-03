const totalPrice = document.getElementById("totalprice");

//Occur when First time page load or refreshed
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("product")) {
        //adding data in table
        const products = JSON.parse(localStorage.getItem("product"));
        let price = 0;
        for (let pr of products) {
            price += parseInt(pr.sellprice);
            AddInTable(pr)
        }
        totalPrice.textContent = price;
    } else {
        AddContentOnLoad();
    }
})

//loaded on when localstorage is empty
async function AddContentOnLoad() {
    try {
        const res = await axios.get("https://crudcrud.com/api/5f5e57bc2d164da69d23f01520ced5a5/product");
        // if no data found
        if (res.data.length <= 0) {
            return;
        }
        //setting data in localstorage
        localStorage.setItem("product", JSON.stringify(res.data));
        //adding data in table
        let price = 0;
        for (let e of res.data) {
            price += parseInt(pr.sellprice);
            AddInTable(e)
        }
        totalPrice.textContent = price;
    } catch (err) {
        console.log(err);
        alert("failed to load content");
    }
}

//Add item on server and in localStorage
function addProduct(e) {
    e.preventDefault();

    const form = new FormData(mainForm);
    let data = {}
    for (let [name, value] of form) {
        data[name] = value;
    }

    axios.post("https://crudcrud.com/api/5f5e57bc2d164da69d23f01520ced5a5/product", data).then((res) => {
        if (Object.keys(res?.data).length > 0) {
            const Products = JSON.parse(localStorage.getItem("product")) ?? [];
            Products.push(res.data);
            localStorage.setItem("product", JSON.stringify(Products));
            AddInTable(res.data);
            //increase price
            totalPrice.textContent = parseInt(totalPrice.textContent) + parseInt(res.data.sellprice);
        }
    }).catch(err => alert("Not Able to Add Product"));
}

//creating and adding the html
function AddInTable(item) {
    const row = document.createElement('tr');
    row.className = "text-center"
    row.id = item._id;
    const sprice = document.createElement('td');
    sprice.textContent = item.sellprice
    const pname = document.createElement('td');
    pname.textContent = item.pname
    const operation = document.createElement('td');
    const button = document.createElement('button');
    button.className = "btn btn-danger delete";
    button.textContent = "Delete"
    //operation child
    operation.appendChild(button);
    //row childs
    row.appendChild(pname);
    row.appendChild(sprice);
    row.appendChild(operation);
    //body child
    tableBody.appendChild(row);
}

//deleting
function deleteProduct(e) {
    e.preventDefault();
    //check for delete event
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure!")) {
            //get the row
            let row = e.target.parentElement.parentElement;

            //delete item from server and localstorage
            axios.delete(`https://crudcrud.com/api/5f5e57bc2d164da69d23f01520ced5a5/product/${row.id}`).then((res) => {
                //when item get deleted
                if (res.status === 200) {
                    let products = JSON.parse(localStorage.getItem("product"));

                    //compare by id
                    const data = products.filter((pr) => {
                        return pr._id !== row.id
                    })

                    //setting localstorage after removing item
                    localStorage.setItem("product", JSON.stringify(data));

                    //remove the row from table
                    tableBody.removeChild(row);

                    //decrease price
                    const price = row.cells[1].innerText;
                    totalPrice.textContent = parseInt(totalPrice.textContent) - parseInt(price);
                }
            }).catch(err => alert("not able to delete the item"));
        }
    }
}

//variable and eventlisteners
const mainForm = document.getElementById('MainForm');
const tableBody = document.getElementById("tablebody");
mainForm.addEventListener("submit", addProduct);
tableBody.addEventListener("click", deleteProduct);