require('./connect')
const mongoose=require('mongoose')
var Schema = mongoose.Schema;


var personSchema = new Schema({
    
    name :{ type :String},
    year :{type :String}
    

  });
var movieSchema=new Schema({
  name :{ type :String},
    year :{type :String},
    subs:{type:Array}
})
var User = mongoose.model("names",personSchema,collection="names");
var Col_2010 = mongoose.model('col10',movieSchema,collection="2010_col"); 
var Col_2011 = mongoose.model('col11',movieSchema,collection="2011_col"); 
var Col_2012 = mongoose.model('col12',movieSchema,collection="2012_col"); 
var Col_2013 = mongoose.model('col13',movieSchema,collection="2013_col"); 
var Col_2014 = mongoose.model('col14',movieSchema,collection="2014_col"); 
var Col_2015 = mongoose.model('col15',movieSchema,collection="2015_col"); 
var Col_2016 = mongoose.model('col16',movieSchema,collection="2016_col"); 
var Col_2017 = mongoose.model('col17',movieSchema,collection="2017_col"); 
var Col_2018 = mongoose.model('col18',movieSchema,collection="2018_col"); 
var Col_2019 = mongoose.model('col19',movieSchema,collection="2019_col"); 
var Col_2020 = mongoose.model('col20',movieSchema,collection="2020_col"); 


module.exports={User,Col_2010,Col_2011,Col_2012,Col_2013,Col_2014,Col_2015,Col_2016,Col_2017,Col_2018,Col_2019,Col_2020}
