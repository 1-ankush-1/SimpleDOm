const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
    console.log("called");
    res.send(
    `
    <html>
        <head>
            <title>Login</title>
        </head>
        <body>
            <form action="/login-auth" method="POST" id="demoForm">
                <label for="name">Name</label>
                <input type="text" name="name" id="name">
                <button type="submit" >Submit</button>
            </form>
        </body>
        <script>
            const form = document.getElementById("demoForm");
            form.addEventListener("submit",(e)=>{
                const AllData = new FormData(e.target);
                const user = {};
                
                for(let [name,value] of AllData){
                    user[name] = value;
                }
                localStorage.setItem("name",user.name);
                console.log("end")
            })
        </script>
    </html>
     `
    );
});

router.post("/login-auth", (req, res, next) => {
    console.log("innn");
    res.redirect("/");
});
module.exports = router;
