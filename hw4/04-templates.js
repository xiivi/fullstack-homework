const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

// Add your code here
async function fetchCountries(url){
  let countries =[];
  await fetch(url)
  .then((response) =>{
    return response.json();
  })
  .then((myJson) => {
    myJson.forEach(object => {
      if(object.capital !== undefined){
        countries.push(object.capital);
        console.log(object);
      }
    })
  })
  .catch((error) => {
    console.log(error);
  });
  return countries;
}

function sortAscendingList(list){
  return list.sort((a,b) => a < b ? -1 : 1);
}

function sortDescendingPopulous(name, population){
  let results = [];
  let list = new Map();

  for( let i = 0; i < name.length; i += 1){
    list.set(name[i], population[i]) 
  }

  let mapDescPop = new Map([...list.entries()].sort((a, b) => b[1] - a[1]));

  console.log(mapDescPop);
  for(const [name, population] of mapDescPop){
    results.push(`${name} - ${population}`);
  }

  console.log(results);

  return results;
}

function sortSummarizeRegions(list){
  let results =[]; 
  let map = new Map(); 

  list.forEach(region => {
    map.set(region, map.get(region) + 1 || 1);
  }) 

  for(const [region, value] of map){
    results.push(`${region} - ${value}`);
  }

  console.log(map);

  return results;
}

async function fetchPopulous(url){
  let results = [];

  let common = [];
  let populous = [];
  await fetch(url)
  .then((response) =>{
    return response.json();
  })
  .then((myJson) => {
    myJson.forEach(object => {
      if(object.capital !== undefined){
        if(object.population >= 50000000){
          common.push(object.name.common);        
          populous.push(object.population);
        }
      }
    })

    results = sortDescendingPopulous(common, populous); 
  })
  .catch((error) => {
    console.log(error);
  });
  return results;
}

async function fetchRegions(url){
  let results = [];

  let regions = [];

  await fetch(url)
  .then((response) =>{
    return response.json();
  })
  .then((myJson) => {
    myJson.forEach(object => {
      regions.push(object.region);
    })

    results = sortSummarizeRegions(regions);
  })
  .catch((error) => {
    console.log(error);
  });
  return results;
}

app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });

});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  let countries = [];
  (async() => {
    countries = await fetchCountries(url);
    countries = sortAscendingList(countries);
    res.render('page', {
      heading: 'Countries and Capitals',
      results: countries,
    });
  })();

});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  let populous = [];
  (async() => {
    populous = await fetchPopulous(url);
    res.render('page', {
      heading: 'Most Populous Countries',
      results: populous,
    });
  })();

});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  let regions = [];

  (async() => {
      regions = await fetchRegions(url);    
      res.render('page', {
        heading: 'Regions of the World',
        results: regions,
    });
  })();

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
