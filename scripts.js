const form=document.querySelector('#weather-app form')
const weatherEl=document.getElementById('weather')
const h2=document.createElement('h2')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userQuery=form.search.value
    if (!userQuery) return
    const fetchURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=eaa52095952f3eaa180f48bf7902508c&q=${userQuery}`
    try {
        const res = await fetch(fetchURL)
        if (res.status !== 200) throw new Error('Location not found')
        const data = await res.json()
        renderedCity(data);
    } catch (error) {
        weatherEl.innerHTML=''
        h2.textContent=error.message
        weatherEl.appendChild(h2)
        form.search.value=''
    }
})

const renderedCity = ({
    name,
    sys:{
        country
    },
    coord:{
        lat,
        lon
    },
    weather:[{
        icon,
        description
    }],
    main:{
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity
    },
    wind:{
        speed
    },
    dt
}) => {
    form.search.value=''
    const milliTime=(dt)*1000
    const date = new Date(milliTime)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    weatherEl.innerHTML=`
    <h2>${name}, ${country}</h2>
    <p>${description}</p>
    <div id="weather-data">
        <div id="condition">
            <img src="${icon}.svg">
        </div>
        <div id="temperature">
            <p>${temp}° F</p>
            <p><span>Feels Like: </span>${feels_like} F</p>
            <p><span>High: </span>${temp_max} F</p>
            <p><span>Low: </span>${temp_min} F</p>
            <div class="weather-info">
                <p><span>Humidity: </span>${humidity}%</p>
                <p><span>Wind: </span>${speed}mph</p>
            </div>
            <p><span>Last Updated: </span>${timeString}</p>
        </div>
    </div>   
    `
}

//On Load Data
async function loadstartingcity(){
    const fetchURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=eaa52095952f3eaa180f48bf7902508c&q=new york`
    try {
        const res = await fetch(fetchURL)
        if (res.status !== 200) throw new Error('Location not found')
        const data = await res.json()
        renderedCity(data);
    } catch (error) {
        weatherEl.innerHTML=''
        h2.textContent=error.message
        weatherEl.appendChild(h2)
        form.search.value=''
    }
}
loadstartingcity();
