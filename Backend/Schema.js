const mon=require('mongoose')

const schema=new mon.Schema({
    location:String,
    ratings:[{
        user:{type:String,default:"Anonymous"},
        clean:Number,
        rent:Number,
        electricity:Number,
        safety:Number,
        review:String
    }],

},{timestamps:true})
module.exports=mon.model('schema',schema)