
let map = L.map("map");
map.setView([-33.8688, 151.209], 0);
map.flyTo([-33.8688, 151.209], 13);
L.tileLayer(
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=KIgo2TvlDDD69kwl8OUo",
  {
    attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
  }
).addTo(map);
let darkIcon = L.icon({
  iconUrl: "./assets/images/icon-location.svg",

  iconSize: [28, 35], // size of the icon
  iconAnchor: [12, 34], // point of the icon which will correspond to marker's location
});
let marker = L.marker([-33.8688, 151.209], { icon: darkIcon }).addTo(map);

function updateMap(lat, lng) {
  marker.setLatLng([lat, lng]);
  map.flyTo([lat, lng], 13);
}

fetch("https://www.cloudflare.com/cdn-cgi/trace")
  .then((res) => {
    return res.text();
  })
  .then((data) => {
    let array = data.split("\n");
    let ipString = array[2];
    let ip = ipString.match(/ip=(.*)/)[1];
    fetch(
      `https://geo.ipify.org/api/v1?apiKey=at_X5XC3rVRJHHfJSpWjDql2Em5rxn1d&ipAddress=${ip}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.code) {
          document.querySelector(".header__form__error").innerHTML =
            data.messages;
        }

        updateMap(data.location.lat, data.location.lng);
        updateInfo("ip", data.ip);
        updateInfo(
          "location",
          `${data.location.region}, ${data.location.country}, ${data.location.postalCode}`
        );
        updateInfo("timezone", data.location.timezone);
        updateInfo("isp", data.isp);
        input.value = "";
        document.querySelector(".header__form__error").innerHTML = "";

        //unfocus the input after submission
        const temporary = document.createElement("input");
        document.body.appendChild(temporary);
        temporary.focus();
        document.body.removeChild(temporary);
      });
  });

const form = document.querySelector(".header__form");
const input = document.querySelector(".header__form__input");
const panel = document.querySelector(".panel");
const mapRef = document.querySelector("#map");
const header = document.querySelector(".header");

input.addEventListener("focus", (e) => {
  //hide the pannel
  panel.style.transform = "translateX(-50%) translateY(100vh)";
});
input.addEventListener("blur", (e) => {
  //show the panel
  panel.style.transform = "translateX(-50%) translateY(50%)";
});

function updateInfo(title, info) {
  let qs = "." + title + " " + ".panel__detail";
  document.querySelector(qs).textContent = info;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value;
  let query;
  if (value.trim() === "") {
    return;
  }
  if (typeof value[0] === "number") {
    query = "ipAddress";
  }
  if (typeof value[0] === "string") {
    query = "domain";
  }
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_X5XC3rVRJHHfJSpWjDql2Em5rxn1d&${query}=${value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code) {
        document.querySelector(".header__form__error").innerHTML =
          data.messages;
      }

      updateMap(data.location.lat, data.location.lng);
      updateInfo("ip", data.ip);
      updateInfo(
        "location",
        `${data.location.region}, ${data.location.country}, ${data.location.postalCode}`
      );
      updateInfo("timezone", data.location.timezone);
      updateInfo("isp", data.isp);
      input.value = "";
      document.querySelector(".header__form__error").innerHTML = "";

      //unfocus the input after submission
      const temporary = document.createElement("input");
      document.body.appendChild(temporary);
      temporary.focus();
      document.body.removeChild(temporary);
    });
});
