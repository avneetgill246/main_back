
const sgMail = require('@sendgrid/mail');
var express = require('express');

const {User,Col_2010,Col_2011,Col_2012,Col_2013,Col_2014,Col_2015,Col_2016,Col_2017,Col_2018,Col_2019,Col_2020}= require('../db/model')
var router = express.Router();
const {fetchEntry} =require('fpl-api')
const {Fantex,Common} =require('../db/fantex')

sgMail.setApiKey('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');

router.get('/movies/recent',function(req,res){
  User.find().sort({_id:-1}).limit(10).then((data)=>res.send(data))
})

router.get('/movies', function(req, res) {
    const title = req.query.title;
    var condition = title ? { name: { $regex: new RegExp(title), $options: "i" } } : {};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving movies."
        });
      });
});
var obj = {

  "2010":Col_2010,
  "2011":Col_2011,
  "2012":Col_2012,
  "2013":Col_2013,
  "2014":Col_2014,
  "2015":Col_2015,
  "2016":Col_2016,
  "2017":Col_2017,
  "2018":Col_2018,
  "2019":Col_2019,
  "2020":Col_2020,


}

router.get('/movie', function(req, res) {
  const id = req.query.id;
  const year =req.query.year;
 
console.log({year:year})
obj[year].findById(id,(err,resp)=>{
 
      res.send(resp);
})})


router.get('/years', function(req,res){
  User.find().distinct('year', function(error, ids) {
   res.send(ids)
});

})
// tmbd url for all gneres "https://api.themoviedb.org/3/genre/movie/list?api_key=38256fd26085644fb2c7eb1512298ea6&language=en-US"

router.get('/count',function (req,res) {
  User.countDocuments({}, function( err, count){
    res.send({'count':count})
}) 
})

router.post('/fantex',function(req,res){
  body=req.body
 
  fetchEntry(parseInt(body.fplid)).then((resp)=>{
    
    res.send(resp)
  }).catch((err)=>{
    console.log(err)
    res.send({'error':1})
  })
  
})

router.post('/fantex/final',function(req,res){
  body=req.body
  fetchEntry(parseInt(body.fplid)).then((resp)=>{
    let obj={
      'teamname':resp.name,
      'id':resp.id,
      'player_first_name':resp.player_first_name,
      'player_last_name':resp.player_last_name,
      'player_region_name':resp.player_region_name,
      'phoneNum':body.number,
      'email':body.email
    }
    Fantex.findOne({'id':obj.id},(err,resppp)=>{
      if (resppp){
        res.send({'error':1})
       
      }else{
        Fantex.create(obj,(err,respp)=>{
          if(err){
            res.send({'error':1})
          }

          const msg = {
            to: ['avneetsinghgill246@gmail.com','jnm.nzam@gmail.com','edarkwah55@gmail.com'],
            from: 'avneetsinghgill246@gmail.com',
            subject: 'Player Registration -'+obj.player_first_name+' '+obj.player_last_name,
            text: 'Team Name: '+obj.teamname+'\n Team Id: '+obj.id+ '\n Country: '+obj.player_region_name+'\n Phone Number: '+obj.phoneNum 
       
          };
          sgMail.send(msg);
          
          const msg1 = {
            to: obj.email,
            from: 'avneetsinghgill246@gmail.com',
            subject: 'Thank You -'+obj.player_first_name+' '+obj.player_last_name,
            text: 'Team Name: '+obj.teamname+'\n Team Id: '+obj.id+ '\n Country: '+obj.player_region_name+'\n Phone Number: '+obj.phoneNum +'\n Join the Whatsapp Group for Cash League - https://chat.whatsapp.com/BsAcqR1c214FWf9aLixUGP \n Also, Join the Fantex Chat Room - https://chat.whatsapp.com/EUTj6IV3jJy9wOZchvwJBs'
       
          };

          sgMail.send(msg1);
          
       
          res.send ('all done')
              })
      }
     

    })

   
  })
})

router.post('/common',(req,res)=>{
 const abc=req.body.abc
  const main =req.body.main

 const test=req.body.test
 obj[test.year].findOne({ movie: test.name}).
 then(doc =>  obj[test.year].updateOne({ _id: doc._id }, { subs: main })).then(()=>{
   abc.forEach(gb=>{
     Common.findOne({word:gb},(err,res)=>{
       if (res==null){
        Common.insertMany({word:gb},(err)=>{
          if (err){
            console.log(err)
          }
        })
       }
     })
   
   })
 }

 ).catch(console.log)

  res.send('done')
  

})

const testdata={

  'fe':
      [
          {
              'title':'HTML5',
              'path_id':'fe',
              'icon':'html5',
              'path_level':1,
              'topic_desc':'HTML stands for Hyper Text Markup Language HTML is the standard markup language for creating Web pages HTML describes the structure of a Web page HTML consists of a series of elements HTML elements tell the browser how to display the content HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc. .Learn the basics of HTML Tags and the new Semantics of HTML. Learn in Depth about img,table,a and div tags.',
              'youtube_videos':[
                  {
                      'src':'https://www.youtube.com/embed/UB1O30fR-EE',
                      
              
                  },

                  {
                      'src':'https://www.youtube.com/embed/pQN-pnXPaVg',
                      
              
                  }
                 
              ],
              'projects':[
                  {
                      'title':' Codecademy Project',
                      'descp':'Create your first website and on your own computer.',
                      'link':'https://www.youtube.com/watch?v=47GaFnnex5w'
                  },
               
                  {
                      'title':'Career Planning Tips',
                      'descp':'The 9 most important career planning tips',
                      'link':'https://www.w3schools.com/cert/career_tips.asp'
                  },
                  {
                      'title':'Simple HTML website',
                      'descp':'Creating a simple website',
                      'link':'https://www.youtube.com/watch?v=wkJsvW9Sa9w'
                  },
              ],
              'quiz':{
                  'qna':[
                      {
                          'ques':'<b> tag makes the enclosed text bold. What is other tag to make text bold?',
                          'op':[
                              '<strong>','<dar>','<black>','<emp>'
                          ],
                      },
                      {
                          'ques':'Tags and text that are not directly displayed on the page are written in _____ section.',
                          'op':[
                              ' <html>','<head>','<title>','<body>'
                          ],
                         
                      },
                      {
                          'ques':'Choose the correct HTML code to create an email link?',
                          'op':[
                              ' <a href= "admin@mcqsets.com "></a>','<a href= "mailto:example@gmail.com"></a>','<mail>admin@mcqsets.com </mail>','<mail href= "example@gmail.com">'
                          ],
                         
                      },
                      {
                          'ques':'To create a combo box (drop down box) which tag will you use?',
                          'op':[
                              '<select>','<list>','<input type="dropdown">','all of above'
                          ],
                         
                      },
                      {
                          'ques':' What is the correct HTML for adding a background color?',
                          'op':[
                              '<body color="yellow">','<body bgcolor="yellow">','<background>yellow</background>','<body background="yellow">'
                          ],
                         
                      },

                  ],
                  'ansArray':[0,1,1,0,1],
                  'path_id':'fe',
                  'path_level':1
              }
              
          },
          {
              'title':'CSS3',
              'path_id':'fe',
              'icon':'css3-alt',
              'path_level':2,
              'topic_desc':'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript. ',
              'youtube_videos':[
                  {
                      'src':'https://www.youtube.com/embed/1Rs2ND1ryYc',
                      
              
                  },
                  {
                      'src':'https://www.youtube.com/embed/yfoY53QXEnI',
                      
              
                  }
                 
              ],
              'projects':[
                  {
                      'title':'CSS Animations',
                      'descp':'6 Animation projects',
                      'link':'https://www.youtube.com/embed/vNc2s-ic1cc'
                  },
                  {
                      'title':'Parallax Website ',
                      'descp':'CReate parallax effect in your website',
                      'link':'https://www.youtube.com/watch?v=JttTcnidSdQ'
                  },
                  {
                      'title':'CSS Cheat Sheet',
                      'descp':'CSS Cheat Sheet contains the most common style snippets',
                      'link':'https://htmlcheatsheet.com/css/'
                  },
                  {
                      'title':'CSS Project Ideas',
                      'descp':'10 CSS project ideas',
                      'link':'https://www.upgrad.com/blog/css-project-ideas-topics-for-beginners/'
                  },
              ],
              'quiz':{
                  'qna':[
                      {
                          'ques':' How do you make a list that lists its items with squares?',
                          'op':[
                              'list-type: square','type: square','type: 2','list-style-type: square'
                          ],
                         
                      },
                      {
                          'ques':'Find the specificity of this ” ul li”',
                          'op':[
                              'specificity = 0,0,0,0','specificity = 0,0,1,2',' specificity = 0,0,0,2','specificity = 2,0,0,0'
                          ],
                         
                      },
                      {
                          'ques':'Which of the following selector selects all elements of E that have the attribute attr that end with the given value?',
                          'op':[
                              'E[attr^=value]','E[attr$=value]',' E[attr*=value]','none of the mentioned'
                          ],
                         
                      },
                      {
                          'ques':'Which of the following transform property value defines a 3D rotation along the Z-axis?',
                          'op':[
                              'rotate-Z(angle)','rotate-Z-axis(angle)','rotateZ(angle)','all of the mentioned'
                          ],
                         
                      },
                      {
                          'ques':'The __________ rule makes it possible to define different style rules for different media types in the same stylesheet.',
                          'op':[
                              'audio/video','sink','@media','@canvas'
                          ],
                         
                      },
                  ],
                  'ansArray':[3,2,1,2,2],
                  'path_id':'fe',
                  'path_level':2
              }
              
          },
          




]


  }




  router.get('/techplan', (req, res) => {
const pid = req.query.pid
const tid= req.query.sid

if (testdata.hasOwnProperty(pid)){
  if(testdata[pid].length >= parseInt(tid) && parseInt(tid) >= 0){
      res.send({'main':testdata[pid][parseInt(tid)-1],'total':testdata[pid].length})
  }else{
      res.send({'main':-1,'total':-1})
  }
}else{
  res.send({'main':-1,'total':-1})
}





})

module.exports = router;

