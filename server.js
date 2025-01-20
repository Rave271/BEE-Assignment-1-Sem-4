
const express = require("express");
const fs=require("fs");

const app=express();

const file="./requests-log.json";

app.use((req,res,next)=>{
    const log={
        Timestamp: new Date().toISOString(),
        IP: req.ip,
        URL: req.url,
        Protocol: req.protocol,
        Method: req.method,
        Hostname: req.hostname,
        Query: req.query,
       "Request-Headers": req.headers,
        "User-Agent": req.get("User-Agent"),
        
    };
    fs.appendFile(file,JSON.stringify(log)+",\n \t \n",(err)=>{
        if(err){
            console.log(err);
        }
        next();
    });
})



app.get('/',(req,res)=>{
fs.readFile("root.html","utf8",(err,data)=>{
    if(err){
        console.log(err);
        res.writeHead(500);
    }else{
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
    }
})
});
app.listen(2727,()=>{
    console.log("Server is running on port 2727");
})