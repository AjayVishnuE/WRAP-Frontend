const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
app.use(cors());
port=3000;
app.use(express.static("views"));
const b=require("body-parser");
app.use(express.json());
app.use(b.urlencoded({extended:true}));
mongoose.set('strictQuery',true);
var copy=0;
mongoose.connect("mongodb+srv://Ferno:123@cluster0.wqriud4.mongodb.net/Wrap",{useNewUrlParser:true,useUnifiedTopology:true},(err,result)=>{
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("Success Conneted to Database")
    }
});
const sh={
    user:String,
    name:String,
    pass:Number,
    address1:String,
    address2:String
}
const table=mongoose.model("Login",sh);
app.get("/",(req,res)=>{
    res.send("Working....");
});
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/views/Login.html");
});
app.post("/signupresponse",(req,res)=>{
    const data=new table({
        user:req.body.names,
        name:req.body.name,
        pass:req.body.pass
    });
    copy=req.body.names;
     data.save();
    console.log(data);
    app.get('/me',(req,res)=>{
        res.json(copy);
    })
    res.sendFile(__dirname+"/views/Home.html");
});
app.post("/loginresponse",(req,res)=>{
    const n=req.body.name;
    const p=req.body.pass;
    copy=req.body.name;
    table.findOne({name:n})
    .then(table=>{
        if(table)
        {
                if(table.pass==p)
                {
                    app.get('/me',(req,res)=>{
                        res.json(table.user);
                        console.log(table.user);
                    })
                    res.sendFile(__dirname+"/views/Home.html");
                }
                else
                {
                    res.send("Password is Incorrect");
                }
        }
        else
        {
            res.send("Invalid Data");
        }
    })
})
app.get("/",(req,res)=>{
    res.send("Working");
})
app.get("/update",(req,res)=>{
    res.sendFile(__dirname +"/update.html"); 
})
app.post("/updateresponse",(req,res)=>{
    const n=req.body.name;
    const p=req.body.pass;
    const data=table.findOne({pass:n})
    .then(data=>{
        if(data)
        {
          console.log(data.pass);
          table.updateOne({pass:n},{pass:p},(err,result)=>{
          if(err)
          {
            console.log(err);
          }
          else
          {
            console.log("Updated");
          }
          });
        }
        else
        {
            res.send("Invalid Password");
        }
    })
    
})
app.post("/delete",(req,res)=>{
    const n=req.body.name;
    table.deleteOne({name:n}).then(table=>{
        if(table)
        {
            console.log("Deleted record");
        }
        else
        {
            console.log(err);
        }
    })
})
app.listen(port,(req,res)=>{
    console.log("Server Started at 3000");
})
