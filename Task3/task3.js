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
    if (newItem === "") {
        return;
    }
    //create element
    let ItemToAdd = document.createElement("li");
    //add same class
    ItemToAdd.className = 'list-group-item';
    //append text node
    ItemToAdd.appendChild(document.createTextNode(newItem));

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
}

//get form and listen for events
let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
form.addEventListener('submit', Add)
itemList.addEventListener('click', Remove)