const fs = require("fs");
const words = JSON.parse(fs.readFileSync("./config.json")).profanity;
module.exports=function(text){
    function a(gh){
        var chars = "!#$%";
        var g = "";
        for(var b = 0;b<gh;b++)g+=chars[Math.floor(Math.random()*chars.length)];
        return g;
        }
    for(var i = 0;i<words.length;i++){
    text=text.replace(new RegExp(words[i],"g"),a(words[i].length));
        }
    return text;
    }
