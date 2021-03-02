let nineDayData;
let currentData =  {"rainfall":{"data":[{"unit":"mm","place":"Central &amp; Western District","max":21,"min":2,"main":"FALSE"},{"unit":"mm","place":"Eastern District","max":6,"min":0,"main":"FALSE"},{"unit":"mm","place":"Kwai Tsing","max":0,"main":"FALSE"},{"unit":"mm","place":"Islands District","max":10,"min":0,"main":"FALSE"},{"unit":"mm","place":"North District","max":0,"main":"FALSE"},{"unit":"mm","place":"Sai Kung","max":1,"min":0,"main":"FALSE"},{"unit":"mm","place":"Sha Tin","max":0,"main":"FALSE"},{"unit":"mm","place":"Southern District","max":57,"min":0,"main":"FALSE"},{"unit":"mm","place":"Tai Po","max":0,"main":"FALSE"},{"unit":"mm","place":"Tsuen Wan","max":0,"main":"FALSE"},{"unit":"mm","place":"Tuen Mun","max":0,"main":"FALSE"},{"unit":"mm","place":"Wan Chai","max":19,"min":12,"main":"FALSE"},{"unit":"mm","place":"Yuen Long","max":0,"main":"FALSE"},{"unit":"mm","place":"Yau Tsim Mong","max":4,"min":0,"main":"FALSE"},{"unit":"mm","place":"Sham Shui Po","max":0,"main":"FALSE"},{"unit":"mm","place":"Kowloon City","max":4,"min":0,"main":"FALSE"},{"unit":"mm","place":"Wong Tai Sin","max":0,"main":"FALSE"},{"unit":"mm","place":"Kwun Tong","max":2,"min":0,"main":"FALSE"}],"startTime":"2020-09-29T09:45:00+08:00","endTime":"2020-09-29T10:45:00+08:00"},"icon":[63],"iconUpdateTime":"2020-09-29T11:15:00+08:00","uvindex":{"data":[{"place":"King's Park","value":2,"desc":"low"}],"recordDesc":"During the past hour"},"updateTime":"2020-09-29T11:16:00+08:00","temperature":{"data":[{"place":"King's Park","value":26,"unit":"C"},{"place":"Hong Kong Observatory","value":27,"unit":"C"},{"place":"Wong Chuk Hang","value":25,"unit":"C"},{"place":"Ta Kwu Ling","value":29,"unit":"C"},{"place":"Tai Po","value":27,"unit":"C"},{"place":"Sha Tin","value":29,"unit":"C"},{"place":"Tuen Mun","value":27,"unit":"C"},{"place":"Tseung Kwan O","value":27,"unit":"C"},{"place":"Sai Kung","value":28,"unit":"C"},{"place":"Cheung Chau","value":25,"unit":"C"},{"place":"Chek Lap Kok","value":29,"unit":"C"},{"place":"Tsing Yi","value":28,"unit":"C"},{"place":"Shek Kong","value":29,"unit":"C"},{"place":"Tsuen Wan Ho Koon","value":27,"unit":"C"},{"place":"Tsuen Wan Shing Mun Valley","value":28,"unit":"C"},{"place":"Hong Kong Park","value":25,"unit":"C"},{"place":"Shau Kei Wan","value":26,"unit":"C"},{"place":"Kowloon City","value":27,"unit":"C"},{"place":"Happy Valley","value":26,"unit":"C"},{"place":"Wong Tai Sin","value":27,"unit":"C"},{"place":"Stanley","value":26,"unit":"C"},{"place":"Kwun Tong","value":26,"unit":"C"},{"place":"Sham Shui Po","value":28,"unit":"C"},{"place":"Kai Tak Runway Park","value":26,"unit":"C"},{"place":"Yuen Long Park","value":30,"unit":"C"},{"place":"Tai Mei Tuk","value":28,"unit":"C"}],"recordTime":"2020-09-29T11:00:00+08:00"},"warningMessage":["The Thunderstorm Warning was issued at 11:15 a.m. It will remain effective until 1:00 p.m. today. Isolated thunderstorms are expected to occur over Hong Kong Island and Kowloon."],"mintempFrom00To09":"","rainfallFrom00To12":"","rainfallLastMonth":"","rainfallJanuaryToLastMonth":"","tcmessage":"","humidity":{"recordTime":"2020-09-29T11:00:00+08:00","data":[{"unit":"percent","value":94,"place":"Hong Kong Observatory"}]}};

async function currentWeatherAPIcall(){
    try{
        let response = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en");
        if(response.status === 200){
            currentData = await response.json();
            console.log(currentData);
        } else{
            console.log("HTTP return status: "+response.status);
        }
    } catch(error){
        console.log("ERROR: ", error);
    }
    finally {
        console.log("CURRENT WEATHER API CALL CONCLUDED");
    }
}

async function nineDayWeatherAPIcall(){
    try{
        let response = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en");
        if(response.status === 200){
            nineDayData = await response.json();
            console.log(nineDayData);
        } else{
            console.log("HTTP return status: "+response.status);
        }
    } catch(error){
        console.log("ERROR: ", error);
    } finally {
    console.log("9 DAY API CALL CONCLUDED");
    }
}

async function renderHeader(){
    // await currentWeatherAPIcall();
    let reload = document.createElement('span');
    reload.classList.add("reload-button");
    let reloadImage = document.createElement('img');
    reloadImage.setAttribute('src', 'images/reload.png');
    reload.appendChild(reloadImage);
    reload.addEventListener('click', (event) => {window.location.reload();});
    let iconPanel = document.createElement('div');
    iconPanel.classList.add('icon-panel');
    let divContainer = document.createElement("div");
    divContainer.classList.add("container");
    let divHeader = document.createElement("div");
    divHeader.classList.add("header");
    let h1Header = document.createElement("h1");
    h1Header.setAttribute("id", "heading");
    let currentWeatherImage = document.createElement('img');
    currentWeatherImage.classList.add("currentWeatherImage");
    currentWeatherImage.setAttribute("src", "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + currentData.icon[0] +".png");
    let thermometerImage = document.createElement("img");
    thermometerImage.setAttribute("src", "images/thermometer.png");
    let tempContainer = document.createElement("span");
    tempContainer.classList.add("header-sub-container");
    tempContainer.setAttribute("id", "current-temp-container");
    let currentTemperature = document.createElement("p").appendChild(document.createTextNode(currentData.temperature.data[1].value + "°C"));
    let humidityImage = document.createElement("img");
    humidityImage.setAttribute('src', 'images/drop.png');
    let humidContainer = document.createElement("span");
    humidContainer.classList.add("header-sub-container");
    humidContainer.setAttribute("id", "current-humidity-container");
    let currentHumidity = document.createElement('p').appendChild(document.createTextNode(currentData.humidity.data[0].value + "%"));
    let rainfallImage = document.createElement("img");
    rainfallImage.setAttribute('src', 'images/rain.png');
    let rainfallContainer = document.createElement("span");
    rainfallContainer.classList.add("header-sub-container");
    rainfallContainer.setAttribute("id", "current-rainfall-container");
    let currentRainfall = document.createElement('p').appendChild(document.createTextNode(currentData.rainfall.data[13].max + "mm"));
    let uvContainer;
    if(currentData.uvindex){
        let uvImage = document.createElement('img');
        uvImage.setAttribute('src', 'images/UVindex.png');
        uvContainer = document.createElement("span");
        uvContainer.classList.add("header-sub-container");
        uvContainer.setAttribute("id", "current-uvindex-container");
        let currentUV = document.createElement('p').appendChild(document.createTextNode(currentData.uvindex.data[0].value));
        uvContainer.appendChild(uvImage);
        uvContainer.appendChild(currentUV);
    }
    let lastUpdate = document.createElement('div');
    lastUpdate.setAttribute('id', 'last-updated-time');
    lastUpdate.innerHTML = 'Last update: ';
    lastUpdate.innerHTML += ((currentData.updateTime).substring(11, 16));

    iconPanel.appendChild(currentWeatherImage);
    iconPanel.appendChild(tempContainer);
    iconPanel.appendChild(humidContainer);
    iconPanel.appendChild(rainfallContainer);

    document.body.appendChild(divContainer);
    let displayOption = document.createElement('div');
    displayOption.classList.add('display-option');
    divContainer.appendChild(divHeader);
    divContainer.appendChild(displayOption);
    divHeader.appendChild(h1Header);
    if(currentData.uvindex){
        iconPanel.appendChild(uvContainer);
    }
    divHeader.appendChild(iconPanel);
    let warningContainer;
    if(currentData.warningMessage[0]){
        warningContainer = document.createElement('div');
        warningContainer.setAttribute("id", "current-warning-container");
        let warningTitle = document.createElement('h3').appendChild(document.createTextNode("Warning"));
        let warningArrow = document.createElement('img');
        warningArrow.setAttribute('src', 'images/arrow.png');
        warningContainer.appendChild(warningTitle);
        warningContainer.appendChild(warningArrow);
        let warningContent = document.createElement('div');
        warningContent.appendChild(document.createTextNode(currentData.warningMessage[0]));
        warningContent.setAttribute('id', 'warning-content');
        // warningContainer.appendChild(warningContent);
        divHeader.appendChild(warningContainer);
        divHeader.appendChild(warningContent);
        warningContainer.addEventListener('mouseover', function(){
            warningContent.style.display = 'block';
            warningContainer.style.borderBottomLeftRadius="0";
            warningContainer.style.borderBottomRightRadius="0";
        });
        warningContainer.addEventListener('mouseout', function(){
            warningContent.style.display = 'none';
            warningContainer.style.borderBottomLeftRadius="1rem";
            warningContainer.style.borderBottomRightRadius="1rem";
        });
    }
    divHeader.appendChild(lastUpdate);
    tempContainer.appendChild(thermometerImage);
    tempContainer.appendChild(currentTemperature);
    humidContainer.appendChild(humidityImage);
    humidContainer.appendChild(currentHumidity);
    rainfallContainer.appendChild(rainfallImage);
    rainfallContainer.appendChild(currentRainfall);
    h1Header.appendChild(document.createTextNode("Weather in Hong Kong"));
    h1Header.appendChild(reload);

};

function renderDisplayOption(){
    let displayOption = document.querySelector(".display-option");
    let temperature = document.createElement("button");
    temperature.appendChild(document.createTextNode("Temperature"));
    temperature.setAttribute('id', 'temperature-button');
    temperature.classList.add('selected');
    let forecast = document.createElement("button");
    forecast.setAttribute('id', 'forecast-button');
    forecast.addEventListener('click', function(){
        if(forecast.classList.contains('unselected')){
            forecast.classList.remove('unselected');
        }
        forecast.classList.add('selected');
        if(temperature.classList.contains('selected')){
            temperature.classList.remove('selected')
        }
        temperature.classList.add('unselected');
    });
    temperature.addEventListener('click', function(){
        if(forecast.classList.contains('selected')){
            forecast.classList.remove('selected');
        }
        forecast.classList.add('unselected');
        if(temperature.classList.contains('unselected')){
            temperature.classList.remove("unselected")
        }
        temperature.classList.add('selected');
    });
    forecast.appendChild(document.createTextNode("Forecast"));
    displayOption.appendChild(temperature);
    displayOption.appendChild(forecast);
    document.body.appendChild(displayOption);
    let HKOData = document.createElement('div');
    HKOData.classList.add('HKOData');
    document.body.appendChild(HKOData);
}

async function renderTemperatureData(){
    await currentWeatherAPIcall();
    let HKOData = document.querySelector(".HKOData");
    HKOData.innerHTML = "";
    let districtData = currentData.temperature.data;
    if(districtData){
        for(let i=0; i<districtData.length; i++){
            let cross = document.createElement('img');
            cross.classList.add('close');
            cross.setAttribute('src', 'images/cancel.ico');
            let districtDiv = document.createElement('div');
            districtDiv.classList.add('district-data');
            let placeName = document.createElement('h3');
            placeName.appendChild(document.createTextNode(districtData[i].place));
            districtDiv.appendChild(cross);
            districtDiv.appendChild(placeName);
            let districtTemperature = document.createElement('p');
            districtTemperature.appendChild(document.createTextNode(districtData[i].value + "°C"));
            districtDiv.appendChild(districtTemperature);
            HKOData.appendChild(districtDiv);
            cross.addEventListener('click', (event)=>{
                districtDiv.style.display = "none";
            });
        }
    }
};

async function renderNineDayData(){
    await nineDayWeatherAPIcall();
    let HKOData = document.querySelector(".HKOData");
    HKOData.innerHTML = "";
    let nineDayForecastData = nineDayData.weatherForecast;
    for(let i=0; i<nineDayForecastData.length; i++) {
        let forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-div');
        let forecastedImage = document.createElement('img');
        forecastedImage.classList.add('forecast-img');
        forecastedImage.setAttribute('src', "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + nineDayForecastData[i].ForecastIcon  +".png");
        forecastDiv.appendChild(forecastedImage);
        let forecastedDate = nineDayForecastData[i].forecastDate;
        let fDate = document.createElement('p');
        fDate.appendChild(document.createTextNode(forecastedDate.slice(forecastedDate.length - 2, forecastedDate.length) + "/" + forecastedDate.slice(forecastedDate.length-4,forecastedDate.length-2)));
        fDate.classList.add('forecast-date');
        forecastDiv.appendChild(fDate);
        let forecastDay = document.createElement('p');
        forecastDay.classList.add("forecast-day")
        forecastDay.appendChild(document.createTextNode(nineDayForecastData[i].week));
        forecastDiv.appendChild(forecastDay);
        let minmaxtemp = document.createElement('p');
        minmaxtemp.classList.add('forecast-minmaxtemp');
        minmaxtemp.appendChild(document.createTextNode(nineDayForecastData[i].forecastMintemp.value + "°C | " + nineDayForecastData[i].forecastMaxtemp.value + "°C"));
        forecastDiv.appendChild(minmaxtemp);
        let minmaxhumidity = document.createElement('p');
        minmaxhumidity.classList.add('forecast-minmaxhumidity');
        minmaxhumidity.appendChild(document.createTextNode(nineDayForecastData[i].forecastMinrh.value + "% - "+nineDayForecastData[i].forecastMaxrh.value+"%"));
        forecastDiv.appendChild(minmaxhumidity);
        HKOData.appendChild(forecastDiv);
    }
};


async function renderDocument(){
    await renderHeader();
    renderDisplayOption();
    await renderTemperatureData();
    let temperature = document.querySelector("#temperature-button");
    temperature.addEventListener('click', async () => {
        await renderTemperatureData();
    });
    let forecast = document.querySelector("#forecast-button");
    forecast.addEventListener('click', async () => {
        await renderNineDayData();
    });
}

window.onload = renderDocument;
