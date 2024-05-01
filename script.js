'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//////////////USING THE GEOLOCATION API//////////////
// takes in 2 callback function, 1st for success, 2nd for error
// the st callback function has a position parameter
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log('position: ', position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log('lat long: ', latitude, longitude);
      console.log(
        `https://www.google.com/maps/@${latitude},${longitude},14z?entry=ttu`
      );

      const coords = [latitude, longitude];

      // L is the namespace of Leaflet so its uses leaflet apii on usch and such variable
      // 2nd value is zoom level
      const map = L.map('map').setView(coords, 13);
      // now that map is an object of the leaflet library, we can see its methods
      console.log(map);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //////////////DISPLAYING A MAP MARKER//////////////
      map.on('click', function (mapEvent) {
        console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('workout')
          .openPopup();
      });
    },
    function () {
      alert('could not get your position');
    }
  );
}

//////////////RENDERING WORKOUT INPUT FORM//////////////
