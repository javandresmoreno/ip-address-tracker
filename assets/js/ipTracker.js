const apiKey = "at_T9KWBtqVL4wCXm4IJnXtaHo7cpjBl";

// link for avoid error to CORS Policy
const bypassCorsUrl = "https://cors-anywhere.herokuapp.com/";

const API_URL = "https://geo.ipify.org/api/";
let currentVersion = "v1";

const headersOption = {
  headers: {
    "Access-Control-ALlow_Origin": "*",
  },
};

// elements to update
let currentIp = document.getElementById("current_ip");
let currentTown = document.getElementById("current_town");
let currentZone = document.getElementById("current_zone");
let currentIsp = document.getElementById("current_isp");

//form elements
const enteredIp = document.getElementById("ip_address");
const searchBtn = document.getElementById("search_btn");

//leaflet config
const map = L.map("display_map", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
    }),
  ],
});

const updateMarker = (update_marker = [7.88282, -72.515709]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

const getIPDetails = (default_ip) => {
  if (default_ip === undefined) {
    var ipUrl = `${API_URL}${currentVersion}?apiKey=${apiKey}`;
  } else {
    var ipUrl = `${API_URL}${currentVersion}?apiKey=${apiKey}&ipAddress=${default_ip}`;
  }

  fetch(ipUrl)
    .then((results) => results.json())
    .then((data) => {
      currentIp.innerHTML = data.ip;
      currentTown.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
      currentZone.innerHTML = data.location.timezone;
      currentIsp.innerHTML = data.isp;

      updateMarker([data.location.lat, data.location.lng]);
    })
    .catch((error) => alert("Please enter a valid IP address. (e.g. 1.1.1.1)"));
};

getIPDetails();

document.addEventListener("load", updateMarker());
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (enteredIp.value != "" && enteredIp.value != null) {
    getIPDetails(enteredIp.value);
    return;
  }
  alert("Please enter a valid IP address.");
});
