function Remove(e) {
    e.preventDefault();
    //listen for only delete button event not whole list
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure')) {
            //get the item because delete is child of li
            let li = e.target.parentElement;
            //remove the item from list
            itemList.removeChild(li);
        }
    }
}

//add an item
function Add(e) {
    e.preventDefault();
    //get the value to insert in item
    let newItem = document.getElementById('item').value;
    let item2 = document.getElementById('item2').value;
    
    if (newItem === "" || item2 === "") {
        return;
    }

    //storing the details in localstorage
    const detail = {
        "subject": newItem,
        "description": item2
    }
    localStorage.setItem("detail", JSON.stringify(detail));

    //create element
    let ItemToAdd = document.createElement("li");
    //add same class
    ItemToAdd.className = 'list-group-item';
    //append text node
    ItemToAdd.appendChild(document.createTextNode(newItem));
    //add break so display on next line
    let newLine = document.createElement('br');
    ItemToAdd.appendChild(newLine);
    //append description text
    ItemToAdd.appendChild(document.createTextNode(item2));

    //create del button
    let del = document.createElement("button");
    //add same class
    del.className = "btn btn-danger btn-sm float-right delete";
    //setvalue
    del.appendChild(document.createTextNode('X'))

    //create edit button
    let edit = document.createElement("button");
    //add same class
    edit.className = "btn btn-primary btn-sm float-right mr-2";
    //setvalue
    edit.appendChild(document.createTextNode('✏️'))

    //add del and edit to new item
    ItemToAdd.appendChild(del);
    ItemToAdd.appendChild(edit);

    //add new item in List
    itemList.appendChild(ItemToAdd);

    //clear the state
    document.getElementById('item').value = "";
    document.getElementById('item2').value = "";
}

function filterItem(e) {
    e.preventDefault();
    //get text
    let inp = e.target.value.toLowerCase();
    //get all items
    let list = itemList.getElementsByTagName('li');
    //convert to array and check if elementcontent not mathch hide it
    Array.from(list).forEach((item) => {
        //get name and desc
        let itemName = item.firstChild.textContent;
        let desc = item.firstChild.nextSibling.nextSibling.textContent;
        //check if name or descrip exist
        if (itemName.toLowerCase().indexOf(inp) != -1 || desc.toLowerCase().indexOf(inp) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
}

//get Elements
let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

//listen for events
form.addEventListener('submit', Add)
itemList.addEventListener('click', Remove)
filter.addEventListener('keyup', filterItem);
