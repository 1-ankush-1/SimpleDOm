
let formData = document.getElementById("my-form");
//listen for event
formData.addEventListener("submit", (e) => {
    //so not lose state
    e.preventDefault();
    let ans = {};
    //because data is form data
    let data = new FormData(e.target);
    //destructure name and value
    for (let [name, value] of data) {
        if (!value) {
            alert(`${name} is empty`);
            return;
        }
        ans[name] = value;
    }
    //printing result
    localStorage.setItem("UserData", JSON.stringify(ans));
});

let btn = document.querySelector(".btn");
btn.addEventListener('click', e => {
    e.target.value = "Open the console.log ==>";
});

btn.addEventListener('mouseover', e => {
    console.log("hello")
    e.target.value = "Click Me"
})

btn.addEventListener('mouseout', e => {
    console.log("hello")
    e.target.value = "Submit"
})
