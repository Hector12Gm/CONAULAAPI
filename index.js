var app=require("./app");

const PORT=3000 || process.env.PORT;


app.listen(PORT,()=>{
    console.log(`The api is listening at port ${PORT}`);
});