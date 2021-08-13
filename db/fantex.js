require('./connect')
const mongoose=require('mongoose')
var Schema = mongoose.Schema;


var fantexSchema=new Schema({
  teamname :{ type :String},
    id :{type :Number},
    player_first_name:{type:String},
    player_last_name:{type:String},
    player_region_name:{type:String},
    phoneNum:{type :Number},
    email:{type:String}
})
var Fantex = mongoose.model("fantex",fantexSchema,collection="fantex");


var commonSchema=new Schema({
  word :{ type :String}
 
})
var Common = mongoose.model("common",commonSchema,collection="common");


module.exports={Fantex,Common}