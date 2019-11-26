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
    $('#showMap').click(function(e) {
        e.preventDefault();
        $('#weather-card').fadeIn(1000).addClass('d-none');
        $('#map-card').fadeIn(1000).removeClass('d-none');
    });

    //https://samples.openweathermap.org/data/2.5/weather?q=lagos&appid=8fb73799f65352e83e4792ed87c0a624
    //8fb73799f65352e83e4792ed87c0a624


    function fetch_weather(city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + $('#searchInput').val() +
                '&appid=8fb73799f65352e83e4792ed87c0a624')
            .then(res => res.json())
            .then(res => {
                $('#freint').html(res.main.temp);
                var f = res.main.temp;
                var aF = (f - 32) * 5;
                var c = Math.round((aF / 9) * 100) / 100;
                $('#celcius').html(c);
                $('#Humility').html(res.main.humidity);
                $('#Pressure').html(res.main.pressure);
                $('#Wind').html(res.wind.speed);
                $('#weather').html(res.weather[0].description);
                $('#city').html(res.name);
                $('#searchspinner').toggleClass('d-none');
                $('#weather_img').attr('src', 'http://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png');
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
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    function initMap(uluru = {
        lat: -25.344,
        lng: 131.036
    }) {
        // The location of Uluru
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 12,
                center: uluru,
                label: labels[labelIndex++ % labels.length],
                icon: 'images/icons/Pin.png'
            });
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: 'images/icons/Pin.png'
        });
        marker.addListener('click', toggleBounce(marker));
        // var weather = marker.GetCurrentWeatherAtMarker();
    }

    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    ////////////////////////////////////////////////////////////////////////
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        console.log(position.coords.latitude);
    }
    $(function() {
        var availableTags = [
            "Palmyra Atoll",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "United States Minor Outlying Islands",
            "United States Virgin Islands",
            "Utah",
            "Vermont",
            "Virginia",
            "Wake Island",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming",
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "Baker Island",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District of Columbia",
            "Florida",
            "Georgia",
            "Guam",
        ];
        $("#searchInput").autocomplete({
            source: availableTags
        });
    });
});