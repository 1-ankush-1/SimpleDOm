//whole document object
console.dir(document);

//access property
console.log(document.domain);
console.log(document.URL);

//change title name
document.title = "something";

//get doctype
console.log(document.doctype);

//access head
console.log(document.head);

//access body
console.log(document.body);

//get array of all attribute
const data = document.querySelectorAll("*");

//change the 2 value content of dom
data[2].textContent = "Hello";

//get all the forms or links(similar things)
console.log(document.forms)
console.log(document.links)
console.log(document.images)

/**
 * selector
*/

/**getElementbyId*/

const main = document.getElementById("header-title");
main.textContent = "Byy";        //styling doesnt effect it
main.innerText = "byy";          //it follows styling too
main.innerHTML = "<h3>Byy</h3>"  //instead of replacing it will added like a child

//add border to header
const header = document.getElementById("main-header");
header.style.borderBottom = "solid 3px black";
main.style.color = "green";

/**getElementsByClassName */
let items = document.getElementsByClassName('list-group-item');
//make background green of 3rd
items[2].style.backgroundColor = "green";
//make color black of all items
for (let item of items) {
    item.style.color = "black";
}

//added li without classname
const list = document.getElementsByClassName("list-group");
list[0].children[list[0].children.length - 1].style.color = "red";

const listWithTag = document.getElementsByTagName("li");
listWithTag[listWithTag.length - 1].style.color = "blue"


