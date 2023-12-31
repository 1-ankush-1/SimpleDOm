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


/**
 * Query selector - second item green and third invisible
 */
const secli = document.querySelector('.list-group-item:nth-child(2)')
const thirdli = document.querySelector('.list-group-item:nth-child(3)')
secli.style.backgroundColor = "green";
thirdli.style.display = "none";

//make 2 green and make odd bg green
const queryalllist = document.querySelectorAll('.list-group-item')
queryalllist[1].style.color = "green";
const oddlist = document.querySelectorAll('.list-group-item:nth-child(odd)')
for (let i = 0; i < oddlist.length; i++) {
    oddlist[i].style.backgroundColor = "green";
}

/**
 * Traversing the Dom
*/

var itemList = document.querySelector("#items");

//parentnode - get parent
itemList.parentNode.style.backgroundColor = "#f4f4f4"
console.log(itemList.parentNode.parentNode)

//parentElement - same as parennode
itemList.parentElement.style.backgroundColor = "#f4f4f4"
console.log(itemList.parentElement.parentElement)

//childnode - get all childs(but it also takes linebreak(the hit enter))
console.log(itemList.childNodes);

//children - same as childnode except do not take linebreak (recommanded)
console.log(itemList.children);

//firstchild - it include linebreak too
console.log(itemList.firstChild);

//firstElementChild - same as firstchild except linebreak(recommanded)
console.log(itemList.firstElementChild);

//lastchild - it include linebreak too
console.log(itemList.lastchild);

//lastElementChild - same as lastchild except linebreak(recommanded)
console.log(itemList.lastElementChild);

//nextSibling - it include linebreak too
console.log(itemList.nextSibling);

//nextElementSibling - same as nextSibling except linebreak
console.log(itemList.nextElementSibling);

//previousSibling - it include linebreak too
console.log(itemList.previousSibling);

//previousElementSibling - same as previousSibling except linebreak
console.log(itemList.previousElementSibling);

//------ADD DIV----------//

//createElement
let newDiv = document.createElement("div");

//add class
newDiv.className = 'divclass'

//add id
newDiv.id = 'divid'

//set attributes
newDiv.setAttribute('title', 'div added')

//create text node
let newDivText = document.createTextNode('Hello World');

//append child 
newDiv.appendChild(newDivText);

//insert the div - insert the div before h1 
let container = document.querySelector("header .container");
let h1 = document.querySelector("header h1");
container.insertBefore(newDiv, h1);

//------ADD DIV END----------//


//add hello before item list and item 1

//After add item - create the element full then get element where you want to insert
const h3 = document.createElement("h2");
h3.className = "head2";
const h3text = document.createTextNode("Hello World");
h3.appendChild(h3text);
let beforeItemList = document.querySelector(".form-inline");
let ulist = document.querySelector("#items");
let mainPlace = ulist.parentElement;
mainPlace.insertBefore(h3,beforeItemList);

//before item
const h2 = document.createElement("h2");
h2.className = "head2";
const h2text = document.createTextNode("Hello World");
h2.appendChild(h2text);
mainPlace.insertBefore(h2, ulist);