const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res, next) => {
    const fileContent = fs.readFileSync("Messages.txt", 'utf8');
    res.send(
        `
    <html>
        <head>
            <title>Home</title>
        </head>
        <body>
            <p>${fileContent}</p>
            <form action="/" method="POST" id="MsgForm">
                <label for="message">Message</label>
                <input type="text" name="message" id="message">
                <button type="submit" >Send</button>
            </form>
        </body>
        <script>
            // get name from localstrg
            let username = localStorage.getItem('name');
        
            // use hidden input so name can also get send
            let hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'username');
            hiddenInput.setAttribute('value', username);
        
            // append it in parent
            document.getElementById('MsgForm').appendChild(hiddenInput);
        </script>
    </html>
     `
    );
})

router.post("/", (req, res, next) => {
    const { username, message } = req.body;
    fs.appendFile("Messages.txt", `${username}:${message}`, err => {
        if (err) throw err;
        console.log('Saved!');
    })
    res.redirect("/")
})

module.exports = router;