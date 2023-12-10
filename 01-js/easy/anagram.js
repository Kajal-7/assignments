/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // make a map
  let freMap = new Map()
  // lowercase and uppercase are treated same 
  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()
  // add fre for string 1
  for (let i =0; i<str1.length; i++){
    let currFre = 1
    if(freMap.has(str1[i])){
      currFre+= freMap.get(str1[i])
    }
    freMap.set(str1[i], currFre)
  }
  
  // subtract frequency for string 2
  for (let i =0; i<str2.length; i++){
    let currFre = -1
    if(freMap.has(str2[i])){
      currFre+= freMap.get(str2[i])
    }
    freMap.set(str2[i], currFre)
  }

  for(let item of freMap){
    if(item[1]!=0){
      return false;
    }
  }
  return true;
}

module.exports = isAnagram;
