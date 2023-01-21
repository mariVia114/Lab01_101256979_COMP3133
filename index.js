var fs = require("fs")
var csv = require('csv-parser')

if(fs.existsSync("canada.txt")){
    fs.unlinkSync("canada.txt", (err) =>{
    if(err){
        console.log(err);
    }
    console.log("Existing file deleted")
})
}

if (fs.existsSync("usa.txt")) {
fs.unlinkSync("usa.txt", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Existing file deleted");
});
}

const writerCanada = fs.createWriteStream('./canada.txt')
const writerUSA = fs.createWriteStream("./usa.txt");
const header = "country,year,population\n";
writerCanada.write(header)
writerUSA.write(header);
fs.createReadStream('input_countries.csv')
.pipe(csv())
.on('data', (data) => {
    if(data.country == "Canada"){
        writerCanada.write(
          `${data["country"]},${data["year"]},${data["population"]}\n`);
    }
    if (data.country == "United States") {
      writerUSA.write(
        `${data["country"]},${data["year"]},${data["population"]}\n`
      );
    }
})
.on('end',() =>{
    console.log("Task completed")
})