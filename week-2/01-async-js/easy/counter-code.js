// Using set interval
let counter =0;

setInterval(function(){
    counter++;
    console.log(counter)
}, 1000)

// Without Using set Interval -> i.e. Using setTimeout
 
let counter2=0

function delay(){
    return new Promise((resolve)=> setTimeout(resolve, 1000))
}

async function count(){
    await delay()
    console.log(++counter2)
    count()
}

count()

