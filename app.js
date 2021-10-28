let button = document.querySelector('.button');
let input1 = document.querySelector('#latitude');
let input2 = document.querySelector('#longitude');
let daysNo = document.querySelector('#noOfdays');
let futuretemp = document.querySelector('.row');
// let todaytemp = document.querySelector('.today');
let maxTemp = document.querySelector('.max');
let minTemp = document.querySelector('.min');
const key = "196b946b36b60be609878a4f03195daa";

// button.addEventListener('click', () => {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input1.value}&appid=${key}`)
//     .then(response => response.json())
//     .then(data => 
//         {
//         // var maxTempval = data['main']['temp_max'];
//         // var minTempval = data['main']['temp_min'];

//         // maxTemp.innerHTML = maxTempval;
//         // minTemp.innerHTML = minTempval;
//         futuretemp.innerHTML = `<div class="future item">
//                                         <div class="date">date</div>
//                                         <div class="temp">Max: ${data['main']['temp_max']}</div>
//                                         <div class="temp">Min: ${data['main']['temp_mix']}</div>
//                                     </div>`
//     })
//     .catch(Error => alert("Wrong city name"))
// })

async function fetchs(){
    // button.addEventListener('click', () =>{

        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${input1.value}&lon=${input2.value}&exclude=hourly,minutely&units=metric&appid=${key}`);
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        //     showdata(data);
        // })
        const data = await res.json();

        return data;


    // })
}

button.addEventListener('click', async () =>{
    let data=[];
    try {
        data = await fetchs();

    } catch (e){
        alert(e);
    }
    console.log(data);
    showdata(data);
})

async function countdown(secs,elem){
    let element = document.getElementById(elem);
    element.innerHTML = "please wait for "+secs+" seconds";
    if(secs < 1 ){
        clearTimeout(timer);
        element.innerHTML = "";
    }
    secs--;
    var timer = setTimeout('countdown('+secs+',"'+elem+'")',1000);
}
async function showdata(data){
    futuretemp.innerHTML = "";
    data.daily.forEach((date,index) =>{
        let daysNo = document.getElementById("noOfdays");
        if(daysNo.value < 9 ){
            if( index < daysNo.value){
                countdown(3,"status");
                setTimeout( () =>{
                    futuretemp.innerHTML += `
                                            <div class="col-sm col-md-4 col-lg-2">
                                            <div class="card">
                                            <div class=card-body>
                                            <div class="future item">
                                            <div class="date">${window.moment(date.dt * 1000).format('DD/MM/YYYY')}</div>
                                            <div class="temp">Max: ${date.temp.max}</div>
                                            <div class="temp">Min: ${date.temp.min}</div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>`
                },3000)
                
            }
        }
    
    })
}


