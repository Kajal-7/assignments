const fs = require('fs')

function runLoopNtimes(n){
    for(let i=0;i<n;i++){

    }
    return "done"
}
fs.readFile("read-file.txt", "utf-8", function(err, data){
    console.log("1",data)
})
// Using async

function read(){
    return new Promise((resolve)=>{
        fs.readFile("read-file.txt", "utf-8", function(err, data){
            resolve(data)
        })
    })
}

read().then((data)=>{
    console.log(data)
    console.log(runLoopNtimes(1000000));
})

console.log("2",runLoopNtimes(1000000));
