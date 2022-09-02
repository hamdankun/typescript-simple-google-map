// Code goes here!

import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyCXj7P5vjjY8R8uLTERrHe49lWAUiv0Gz8";

const form = document.querySelector("form");
const addressInput = document.getElementById("address") as HTMLInputElement;

let map: google.maps.Map;

interface GeoCodeResponse {
  status: "OK" | "ZERO_RESULTS";
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const enteredAddress = addressInput.value;

  axios
    .get<GeoCodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "OK") {
        const locations = response.data.results;
        const center = response.data.results[0].geometry.location;

        map = new google.maps.Map(document.getElementById("map")!, {
          center: center,
          zoom: 10,
        });

        locations.forEach((item) => {
          new google.maps.Marker({
            position: item.geometry.location,
            map,
          });
        });
      }
    })
    .catch((error) => console.log(error));
});

declare var window: Window & { initMap: () => void };

window.initMap = () => {
  console.log("haii");
};
