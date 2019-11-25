$(document).ready(function() {
  const WEATHER_API = 'fb73799f65352e83e4792ed87c0a624';
  var city = $('#searchInput').val();
  $('.input-join').submit(function(event) {
    event.preventDefault();
    $('#searchIcon').toggleClass('fa-search');
    $('#searchspinner').toggleClass('d-none');
    fetch_weather(city)
    console.log(city)
  });

  //https://samples.openweathermap.org/data/2.5/weather?q=lagos&appid=8fb73799f65352e83e4792ed87c0a624
//8fb73799f65352e83e4792ed87c0a624


  function fetch_weather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + $('#searchInput').val() +
        '&appid=8fb73799f65352e83e4792ed87c0a624')
      .then(res => res.json())
      .then(res => {
        $('#freint').html(res.main.temp);
        $('#Humility').html(res.main.humidity);
        $('#Pressure').html(res.main.pressure);
        $('#Wind').html(res.wind.speed);
        $('#weather').html(res.weather[0].description);
        $('#city').html(res.name);
        $('#searchspinner').toggleClass('d-none');
        var lat = res.coord.lat;
        initMap({
          lat: res.coord.lat,
          lng: res.coord.lon
        })
        // map = new google.maps.Map(document.getElementById('map'), {
        //   center: {
        //     lat: res.coord.lat,
        //     lng: res.coord.lon
        //   },
        //   zoom: 8
        // });
        console.log(res);
        $('#weather-card').fadeIn(1000).removeClass('d-none');
      })
      .catch(err => alert(err));
  }

  function initMap(uluru = {
    lat: -25.344,
    lng: 131.036
  }) {
    // The location of Uluru
    // The map, centered at Uluru
    var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 10,
        center: uluru
      });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });

  }
  map.addListener('click', function(e) {
    initMap(e.latLng);
    console.log(e)
  });
  
});
