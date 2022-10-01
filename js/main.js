const MainContainer = document.querySelector(".main-container");

const weatherCardList = document.querySelector(".weather-info-container");

const weatherInput = document.querySelector("#input");

const toggleLight = document.querySelector(" #hide-checkbox");

const mainHeading = document.querySelector("#heading");

const searchButton = document.querySelector("#button");

const fToCToggle = document.querySelector("#tgb");

const emptyContainerMessage = document.createElement("h3");
emptyContainerMessage.setAttribute("id", "empty-message");
emptyContainerMessage.textContent = `Empty City List. Please Add Some Cities.`;
emptyContainerMessage.style.color = "#fff";
emptyContainerMessage.style.fontSize = "1rem";
emptyContainerMessage.style.paddingTop = "1rem"
weatherCardList.append(emptyContainerMessage);

let weatherData = [];
let weatherCards = [];
let cityInput = null;
let tempValue = null;
let cValue = null;
let fValue = null;
let cities = [];
let rescode = null;

const fetchWeatherData = async () => {
  const API_KEY = "617cd36aad37b7177528c71b6dad5201";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  weatherData = data;
  rescode = res.status;
  if (!res.ok) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "City Name is Wrong!",
    });
    weatherInput.value = "";
  } else {
    tempValue = weatherData.main.temp;
    cValue = Math.round(weatherData.main.temp);
    fValue = Math.round((cValue * 9) / 5 + 32);
    addWeatherCard();
  }
};

const addWeatherCard = () => {
  const { weather, name, main } = weatherData;
  let firstWord = name.split(" ")[0];

  const weatherItem = {
    temp: Math.round(main.temp),
    icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
    description: weather[0].description,
    cityName: firstWord,
  };

  weatherCards.push(weatherItem);

  if (
    weatherCardList.hasChildNodes(emptyContainerMessage) &&
    weatherCardList.childElementCount > 0
  ) {
    emptyContainerMessage.remove();
  }

  if (weatherCardList.childElementCount < 5 && !cities.includes(name)) {
    cities.push(firstWord);
    weatherCardList.innerHTML += `
    <div class="weather-info-card">
    <h1 class="temp" id="temp">${Math.round(tempValue)} °C</h1>
    <h3 id="weather-type">
          <img id="icon" src="./assets/icons/${weather[0].icon}.png"/>
          ${weather[0].description}
          </h3>
          <h2 id="city-name">${firstWord}</h2>
          <div id='close'>X</div>
        </div>
    `;
  } else if (cities.includes(name)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `You already have ${firstWord}!`,
    });
  }

  weatherInput.value = "";
};

MainContainer.addEventListener("click", (e) => {
  const key = e.target;

  if (key.id === "button") {
    if (weatherCardList.childElementCount < 5 && weatherInput.value) {
      fetchWeatherData();
    } else if (!weatherInput.value || rescode === 404) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter a City Name!",
      });
      weatherInput.value = "";
    } else if (weatherCardList.childElementCount >= 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Maximum number of cards!",
      });
      weatherInput.value = "";
    }
  } else if (key.id === "close") {
    Swal.fire({
      title: "Do you want to remove weather card?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Removed!", "", "success");
        key.parentElement.remove();
        cities.splice(key.previousElementSibling.innerText, 1);
        weatherCardList.childElementCount < 1
          ? weatherCardList.append(emptyContainerMessage)
          : null;
      }
    });
  }

  if (e.target === toggleLight && toggleLight.checked) {
    weatherCardList.style.backgroundColor = "#DFB059a9";
    mainHeading.style.color = "#FFF";
    searchButton.style.backgroundColor = "#DFB059";
  } else if (e.target === toggleLight) {
    weatherCardList.style.backgroundColor = "#215e9bcc";
    mainHeading.style.color = "#215e9bcc";
    searchButton.style.backgroundColor = "#215e9bcc";
  }

  if (e.target === fToCToggle && fToCToggle.checked) {
    Array.from(weatherCardList.children).forEach((card) => {
      card.children[0].textContent = Math.round((card.children[0].textContent.split(' ')[0] * 9) / 5 + 32) + ' °F'
    })
  } else if (e.target === fToCToggle) {
    Array.from(weatherCardList.children).forEach((card) => {
      card.children[0].textContent = Math.round((card.children[0].textContent.split(' ')[0] - 32) * 5 / 9) + ' °C'
    })
  }
});

weatherInput.addEventListener("change", (e) => {
  cityInput = e.target.value;
});

document.addEventListener("DOMContentLoaded", () => {
  VANTA.CLOUDS({
    el: ".left-container",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    speed: 0.60
  })
});
