const { json } = require('body-parser');
var express = require('express');
var app = express();



/* node javascript express serving a html file on port 8080 */
app.use(express.static(__dirname + '/public'));
app.listen(8080);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());



const ms = require("ms");
const puppeteer = require("puppeteer");




app.post('/hello', function(req, res) {
  res.send('Hello World!');
  console.log("Hello world")
});


app.post('/hello', function(req, res) {
  res.send('Hello World!');
  console.log("Hello world")
  // http://localhost:5000/registrerforflytning
});


app.post('/norgesKart', function(req, res) {
   
    var test = Object.values(req.body)
    for (var i = 0; i < test.length; i++) {
    if (test[i].koordinater == null) {
      console.log("NULL verdi på koordinater for produksjonsplassid: " + test[i].produksjonsplassid)
    } else {
      var coordObj = JSON.parse(test[i].koordinater)
      // console.log("coord.crs.properties: " + coordObj.coordinates)
      arr = String(coordObj.coordinates).split(",")
      // console.log("arr: " + arr)
      console.log("arr: " + arr[0])
      console.log("arr: " + arr[1])
      // let arr = coordinates.split(",")
      hentKart(arr[0], arr[1], i);
      
      // console.log(test[i].coordinates)
      // hentKart()
    }
    
    // var tester = Object.values(req.body[2])
    // console.log("tester: " + test[1].koordinater)
 
}});


async function hentKart(x, y, index) {
  const browser = await puppeteer.launch();
  

  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  })
  await page.goto(`https://www.norgeskart.no/#!?zoom=3&sok=${x},${y}`, {waitUntil: 'networkidle2'});
  await page.screenshot({ path: `${__dirname}/public/photos/${index}.png`})
  // await page.goto("https://www.google.com", {waitUntil: 'networkidle2'});
  
  // await page.goto("https://www.norgeskart.no/#!?zoom=7&sok=11.348141,60.845944", {waitUntil: 'networkidle2'});
  // await page.screenshot({ path: "./photos/second.png"})

  // await page.focus('#searchBarId');
  // await page.keyboard.down('Control');
  // await page.keyboard.press('A');
  // await page.keyboard.up('Control');
  // await page.keyboard.press('Backspace');

  // await page.type("#searchBarId", `${x},${y}`, {delay: 10})
 
  // new Promise(r => setTimeout(r, 100000)).then(
  //     await page.screenshot({ path: `./photos/Set-${index}-photo.png`})
  // );

  // await page.type("#searchBarId",  `${x},${y}`).then(
  //     ms => new Promise(resolve => setTimeout(resolve, ms))
  //     ).then(
  //         await page.screenshot({ path: `./photos/${index}.png` }))
  //         console.log(`bildet med index: ${index} er lagret`)
          
  await browser.close();
};

// puppeteer
// .launch({
//   defaultViewport: {
//     width: 1280,
//     height: 2000,
//   },
// })
// .then(async (browser) => {
//   
// }
