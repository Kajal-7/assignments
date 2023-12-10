const { log } = require("console");
const fs = require("fs");
function runLoopNtimes(n){
    for(let i=0;i<n;i++){

    }
    return "done"
}

const content = "Hey, I am writing a file."
fs.writeFile("write-file.txt", content, err=>{
    if(err) console.log(err);
    else
    console.log("Done Writing A File");
})

console.log(runLoopNtimes(10000000));
