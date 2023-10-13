const path = require("path");

module.exports = path.dirname(process.mainModule.filename);

/** Two way we can set a path 
 - using Helper function like this file 
 * path.dirname - which file directory name you want to get
 * process - global variable that available everywher
 * mainModule - this property refer to the module that started our application here is server.js
 * filename - give the name of that file where our application is running
 
 OR 
 
 - res.sendFile(path.join(__dirname,".." ,"views", "shop.html"));
 * sendFile - we can send any file 
 * path.join - to merge the path
 * __dirname - get the current path
 * ".." - got to root of current
 * views - folder name 
 * shop.html -file name
*/
