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

//////////////REFACTORING FOR PROJECT ARCHITECTURE//////////////
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    // we need to use the bind keyword to bind this keyword to the current object
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('could not get your position');
        }
      );
    }
  }

  // in a regular function call , the this keyword is set as undefined
  _loadMap(position) {
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
    this.#map = L.map('map').setView(coords, 13);
    // now that map is an object of the leaflet library, we can see its methods
    console.log(this.#map);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //////////////DISPLAYING A MAP MARKER//////////////
    //////////////RENDERING WORKOUT INPUT FORM//////////////

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new App();

//////////////USING THE GEOLOCATION API//////////////
// takes in 2 callback function, 1st for success, 2nd for error
// the st callback function has a position parameter
