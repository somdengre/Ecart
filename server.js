const app = require("./backend/app");
// const dotenv = require("dotenv");
const connectDatabase = require("./backend/config/database")
const cloudinary = require("cloudinary");
//Handling Uncaught Exception eg. console.log(youtube);

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Uncaught Exception`);
    process.exit(1);
})



//config

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" })
}


// Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLODINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})




// Unhandled Promise rejection
// promise rejections in the prodcut controllers are handled using catch async error function but in the  the above connectDatabase() function 
// if we handle the promise rejection using catch and simple console log the error then the server is still running with an error printed on the screen
// we want to colse the server instead so on unhandledRejection we just print the error and shut down the server and close the process and remove the catch block from that promise. 
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise rejection`)
    server.close(() => {
        process.exit(1);
    });
});