// import 
// require - um pouco mais antiga que o import 

const fs = require('fs') //file system

fs.readFile('arquivo.txt', 'utf8', (err, data) => {

    if(err){
        console.log(err)
        return
    }

    if(data) {
        if(data == "Rony Fonseca"){
            console.log("Você logou " + data)
        }
        else (
            console.log("Não Logou")
        )
    }

})