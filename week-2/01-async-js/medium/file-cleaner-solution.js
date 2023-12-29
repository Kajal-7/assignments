const fs = require("fs/promises")

const removeSpacesFromFile = async ()=>{
    try{
        const data = await fs.readFile("file.txt", "utf-8");
        const newContent = data.replace(/\s+/g,' ').trim().replace(/\s([.,;:?!])/g,'$1');
        await fs.writeFile("file.txt", newContent)
    }catch(err){
        console.log(err);
    }
    
}

removeSpacesFromFile();

