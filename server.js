const express= require('express')
const TodoSchema= require('./Model')
const mongoose=require('mongoose')
const cors=require('cors')
mongoose.connect('mongodb+srv://webdevelopment865:9V16Xxu0bpPoJjQX@cluster0.wfqxcss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('db connected');
})
const app=express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get('/gettask',async(req,res)=>{
    try {

        return res.json(await TodoSchema.find())

    } catch (error) {
        console.log(error);
    }
})
app.post("/addtask",async(req,res)=>{
    try {
        const {todo}=req.body
        const newOne=new TodoSchema({
            todo:todo
        })
        await newOne.save()
        return res.json(await TodoSchema.find())
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "EMPTY TODO PLS FILL" });
    }
})
app.delete('/delete/:id',async(req,res)=>{
    try {
        await TodoSchema.findByIdAndDelete(req.params.id)
        return res.json(await TodoSchema.find())
    } catch (error) {
        console.log(error);
    }
})
app.patch('/update/:id',async(req,res)=>{
    try {
        const {todo}=req.body
        await TodoSchema.findByIdAndUpdate(req.params.id,{todo})        
        return res.json(await TodoSchema.find())
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "EMPTY TODO PLS FILL" });
    }
})

app.listen(5000,()=>{
    console.log("server runining........");
    
})