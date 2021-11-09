const yargs = require("yargs");
const Jimp = require("jimp");
const fs = require("fs");
const http = require("http");

http.createServer((req, res)=>{
    Jimp.read('https://miviaje.com/wp-content/uploads/2016/05/shutterstock_337174700.jpg',
    (err, imagen) => {
        imagen
        .resize(350, Jimp.AUTO)
        .greyscale()
        .quality(60)
        .writeAsync('img.png')
        .then(() => {
            fs.readFile('img.png', (err, Imagen) => {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(Imagen);
            });
        });
    });
})
.listen(8080, ()=> console.log("Puesto conectado, incluye PID", process.pid));

const argv = yargs.command("algo", "Comando de algo",
   {nombre:{
       describe: "Argumento de algo",
       demand: true,
       alias: "a",
   },
   },
   (args)=>{
       console.log(`Buenas ${args.nombre}`);
   }
  ).help().argv; //para correr el yargs: node index.js algo -a=nico