//Conseguir el país con Fetch API versión Async/Await
const getCountryFetchAsync =  async (countryCode) => {
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
    if(response.status === 200){
        const country = await response.json();
        return country.name;
    }
    else throw new Error('Unable to fetch data');
}

getCountryFetchAsync('CL').then((country) =>{
    console.log(`Fetch API Async/Await: ${country}`);
}).catch((error) =>{
    console.log(error);
});


//Conseguir el país con Fetch API.
const getCountryFetch = (countryCode) => {
    return fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`).then((response) => {
        if(response.status === 200) return response.json();
        else throw new Error('Unable to fetch data');
    }).then((country) => {
        return country.name;
    });
}

getCountryFetch('CL').then((country) =>{
    console.log(`Fetch API Promise: ${country}`);
}).catch((error) =>{
    console.log(error);
});



//Conseguir el país con Ajax XHR usando Promise
const getCountryAjaxXHRPromise = (countryCode) => new Promise((resolve,reject) => {
    const request = new XMLHttpRequest();
    request.open('GET',`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
    request.send();
    request.addEventListener('readystatechange',(e)=>{
        if(e.target.readyState === 4 && e.target.status === 200) {
            const country = JSON.parse(e.target.responseText);
            resolve(country.name);
        }
        else if(e.target.readyState === 4){
            reject('An error has taken place');
        }
    });
});

getCountryAjaxXHRPromise('CL').then((country) => {
    console.log(`AJAX XHR Promise: ${country}`);
}).catch((err) => {
    console.log(err);
});


//Conseguir el país con Ajax XHR usando Callback
const getCountryAjaxXHR = (countryCode,callback) => {
    const request = new XMLHttpRequest();
    request.open('GET',`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
    request.send();
    request.addEventListener('readystatechange',(e)=>{
        if(e.target.readyState === 4 && e.target.status === 200) {
            const country = JSON.parse(e.target.responseText);
            callback(undefined, country.name);
        }
        else if(e.target.readyState === 4){
            callback('Error', undefined);
        }
    });
}

getCountryAjaxXHR('CL',(error, country) => {
    if (error) {
        console.log(`Error: ${error}`);
    } else {
        console.log(`AJAX XHR Callback: ${country}`);
    }
});