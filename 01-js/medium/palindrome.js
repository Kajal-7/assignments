/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/


function isPalindrome(stri) {
  stri = stri.toLowerCase()
  // remove spaces , punctuation marks 
  let str =""
  for (let i=0;i<stri.length;i++){
    
    if((stri[i]>='a' && stri[i]<='z') || (stri[i]>='0' && stri[i]<='9'))
      str+= stri[i]
  }
  console.log(str);
  let len = str.length
  for(let i=0; i<len; i++){
    if(str[i] !== str[len-i-1])
      return false;
  }
  return true;
}

module.exports = isPalindrome;
