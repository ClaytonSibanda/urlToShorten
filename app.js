/**
 * Created by Clayza on 2017-07-10.
 */
const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
app.use(bodyParser.json());
app.use(cors());
// connect to the dataBasse
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/longUrls');




app.use(express.static(__dirname+'/public'));

app.get('/new/:urlToShorten(*)',(req,res)=>{
    //regex for url
    let urlToShorten=req.params.urlToShorten;
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let arr=['q','a','d','c','v','d','y','o','q','r','f','k','xc'];
    if(expression.test(urlToShorten)===true)
    {let short = Math.floor(Math.random()*100000).toString()+arr[Math.floor(Math.random()*arr.length)];
      let data = new shortUrl({
          originalUrl: urlToShorten,
          shortUrl:short
      });

      data.save(err=>{
          if(err){
              return res.send('Error saving url');
          }
      });

       res.json({data});
    }
    else
        res.json({"urlShortened":'Invalid url'});



});

//Query database and forward to the originalurl
app.get('/:urlToForward',(req,res)=>{
    let shorterUrl= req.params.urlToForward;

    shortUrl.findOne({'shortUrl':shorterUrl},(err,data)=>{
        if(err){
            return res.send('Error reading the database');
        }
        let re = new RegExp('^(http|https)://','i');
        let strToCheck = data.originalUrl;

        if(re.test(strToCheck)){
            res.redirect(301,data.originalUrl);
        }
        else{
            res.redirect(301,'http://'+data.originalUrl);
        }
    });
});


let port=process.env.PORT || 3000;

app.listen(port,()=>{ console.log('Everything is working fine');});