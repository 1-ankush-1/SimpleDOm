## Started with Node js

It is a runtime environment. So we can run javascript on server.

Nodejs uses V8 engine(written in C++) build by google(engine that run javascript in browser)

V8 add some features additional features

- file

  ```
      const fs = require("fs");
  ```

  - create file

    ```
    fs.writeFileSync("hello.txt","Hello there")
    ```

## Communication Process -

```
          (request)           (request)                 (response)             (request)
          (abc.com)         (Find abc.com)     (send- 192.168.12.1)     (192.168.12.1)
[client]  --------> (Internet) ------> {Resolve DNS} ------> (Internet) ------> [server](handel auth ,database ,server logic etc)
    |                                                                                                                       |
    |  (got the reponse)                                                                                          |(response)
    |                                                                                                                       |
    ___________________(sending response back to client)_______________
```

- node js comes in picture at the server side to handel the logic.

- `Process`

```
[client]---->[server] listen for request
```

- client send request

```
        Send a response back(html,json etc)
[client] <---------------------[server]
```
