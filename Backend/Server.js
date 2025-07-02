const exp=require('express')
const mod=require('./Schema')
const mongo = require('mongoose');
const cors=require('cors')
const app=exp();
app.use(exp.json());
app.use(cors());

mongo.connect('mongodb://localhost:27017/neighborfit').
then(()=> console.log('mongo on'))

app.post('/submit',async(req,res)=>{
      const {
      location,
      user,
      clean,
      rent,
      electricity,
      safety,
      review
    }=req.body;
    const fl=await mod.findOne({location});
    if(!fl){
        const d=new mod(
            {
                location,
                ratings:[{
                    user,
                    clean,
                    rent,
                    electricity,
                    safety,
                    review
                }]
            }
        )
        await d.save();
    }
    else{
    fl.ratings.push({
      user,
      clean,
      rent,
      electricity,
      safety,
      review})
    await fl.save();}
    res.status(200).send("addded"+JSON.stringify(req.body))
})
app.listen(5000,()=>{
    console.log('listening')
})
