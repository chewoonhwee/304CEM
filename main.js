const axios = require("axios");
const express = require('express');
const mongoose = require("mongoose");
const Record = require("./connect1");
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');

const apikey = "0b08ce0562a3473fbda01943b7ec4766";

var title, image, area, instructions;

app.get('/', (req,res) => {
  Record.find({}, function(err, foods){
      res.render('index',{
          foodList : foods
      });
  })
})

app.get('/getFood', (req, res) =>{

  const query = req.query.title;
  const querystr = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${query}`;
  
  axios.get(querystr).then((response) => {
    title = response.data.results[0].title;
    image = response.data.results[0].image;

      const querystr2 = `https://themealdb.com/api/json/v1/1/search.php?s=${query}`;
      axios.get(querystr2).then((response) => {

        area = response.data.meals[0].strArea;
        category = response.data.meals[0].strCategory;
        instructions = response.data.meals[0].strInstructions;

        foodValue = new Record({
          title:title,
          image:image,
          category:category,
          area:area,
          instruction:instructions
        });

        foodValue.save()
        .then(result=> {
            console.log("Success" + result);
        }
        ).catch (error=> {
            console.log("Error" + error);
        }
        ); 
      });
    });
    res.redirect(req.get("referer"));
});//close get Food

app.get('/editFood', (req, res) =>{
    
  const food = req.query.title;
  const area = req.query.area;

  Record.updateOne({food: `${food}`}, {area: `${area}`}, function(err, res){
      
      if (err) return handleError(err);
      console.log("Success");
  });
  res.redirect(req.get("referer"));
});//close editFood

app.get('/deleteFood', (req, res) =>{

  const food2 = req.query.title;
  Record.deleteOne({_id: `${food2}`}, function(err){
      
      if (err) return handleError(err);
      console.log("Success");
  });
  res.redirect(req.get("referer"));
});//close deleteFood

app.listen(process.env.PORT || 5000, ()=>{

  console.log('Server listening to port 5000');
  
  });//close close listen