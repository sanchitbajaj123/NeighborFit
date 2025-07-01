const exp=require('express')
const mod=require('./Schema')
const mongo = require('mongoose');
const cors=require('cors')
const app=exp();
app.use(exp.json());
app.use(cors());

mongo.connect('mongodb://localhost:27017/neighborfit').
then(()=> console.log('mongo on'))

app.post('/submit',(req,res)=>{
    const data=req.body;
    console.log(data);
    res.send(data)
})
app.listen(5000,()=>{
    console.log('listening')
})
