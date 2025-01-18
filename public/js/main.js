const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");

const city_name = document.getElementById("city_name");

const temp_real_val = document.querySelector(".temp_real_val");
const temp_status = document.getElementById("temp_status");

const datahide = document.querySelector(".middle_layer");

const day = document.getElementById("day");
const today_data = document.getElementById("today_data");



const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "PLZ Enter The City Name Before Search";
        datahide.classList.add("data_hide");
    }

    else {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=1e38f615c86362e493dfc7d117f79ce3`;
            const responce = await fetch(url);
            const data = await responce.json();
            const arrData = [data];
            console.log(arrData);

            city_name.innerText = `${arrData[0].name} ${arrData[0].sys.country}`;
            temp_real_val.innerText = (arrData[0].main.temp - 273.15).toFixed(2);


            const tempStatus = arrData[0].weather[0].main;

            if (tempStatus == "Sunny") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
            }
            else if (tempStatus == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #fff'></i>"
            }
            else if (tempStatus == "Rainy") {
                temp_status.innerHTML = "<i class='fas fa-rain' style='color: #a4b0be'></i>"
            }
            else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
            }

            const getcurrentDay = () => {
                const weekday = ["Sun", "Monday", "Tuesy", "Wed", "Thu", "Fri", "Sat"];
                let currentTime = new Date();
                return weekday[currentTime.getDay()];
            };

            let getCurrentTime = () => {
                const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                var now = new Date();
                var month = months[now.getMonth()];
                var date = now.getDate();
    
                return `${date} ${month} `;
    
            };
    
            day.innerText = getcurrentDay();
            today_data.innerText = getCurrentTime();

            datahide.classList.remove("data_hide");


        }


        catch {
            city_name.innerText = "PLZ Enter The City Name Properly";
            datahide.classList.add("data_hide");

        }
    }
}


submitBtn.addEventListener("click", getInfo);