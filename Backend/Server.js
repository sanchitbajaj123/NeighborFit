const exp=require('express')
const mod=require('./Schema')
const mongo = require('mongoose');
const cors=require('cors')
const app=exp();
require('dotenv').config();
app.use(exp.json());
app.use(cors()); //cors used so that routes can accesed by frontend

mongo.connect(process.env.DB_URL).
then(()=> console.log('mongo on')) //mongo db connection

//submit route to store review
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
//filter route to filter out data on basis of filters applied
app.get('/filter', async (req, res) => {
  const { clean = 0, rent = 0, electricity = 0, safety = 0 } = req.query;

  const locations = await mod.find();

  const result = locations.filter(loc => {
    const avg = loc.ratings.reduce(
      (acc, r) => {
        acc.clean += r.clean;
        acc.rent += r.rent;
        acc.electricity += r.electricity;
        acc.safety += r.safety;
        return acc;
      },
      { clean: 0, rent: 0, electricity: 0, safety: 0 }
    );

    const len = loc.ratings.length || 1;
    const avgData = {
      clean: avg.clean / len,
      rent: avg.rent / len,
      electricity: avg.electricity / len,
      safety: avg.safety / len
    }; //avg data obtained 

  return (
    avgData.clean >= clean - 1 &&
    avgData.rent <= rent + 1 &&
    avgData.electricity >= electricity - 1 &&
    avgData.safety >= safety - 1
  );//returning all the values and nearby values

  });

  res.json(result);
});
//route to get particular location returning the location document
app.get('/location/:name', async (req, res) => {
  const location = req.params.name;
  const found = await mod.findOne({ location: new RegExp(`^${location}$`, 'i') });
  if (!found) return res.status(404).json({ msg: "Location not found" });

  const avg = found.ratings.reduce(
    (acc, r) => {
      acc.clean += r.clean;
      acc.rent += r.rent;
      acc.electricity += r.electricity;
      acc.safety += r.safety;
      return acc;
    },
    { clean: 0, rent: 0, electricity: 0, safety: 0 }
  );

  const len = found.ratings.length || 1;
  const avgData = {
    clean: (avg.clean / len).toFixed(1),
    rent: (avg.rent / len).toFixed(1),
    electricity: (avg.electricity / len).toFixed(1),
    safety: (avg.safety / len).toFixed(1),
    totalReviews: len
  };

  res.json({ location: found.location, average: avgData, reviews: found.ratings });
});

app.listen(5000,()=>{
    console.log('listening')
}) //server 
