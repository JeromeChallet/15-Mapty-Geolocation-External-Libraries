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
    },
    function () {
      alert('could not get your position');
    }
  );
}
