$(document).ready(function() {
    const WEATHER_API = 'fb73799f65352e83e4792ed87c0a624';
    var city = $('#searchInput').val();
    $('#main_search_input').submit(function(event) {
        event.preventDefault();
        $('#searchIcon').toggleClass('fa-search');
        $('#searchspinner').toggleClass('d-none');
        $('#header_searchInput').val($('#searchInput').val());
        //searchInput
        fetch_weather($('#searchInput').val())
        console.log($('#searchInput').val())

    });
    $('#input-nav-container').submit(function(event) {
        event.preventDefault();
        fetch_weather($('#header_searchInput').val())
        console.log($('#searchInput').val())

    });
    $('.showMap').click(function(e) {
        e.preventDefault();
        $('#weather-card').fadeIn(1000).addClass('d-none');
        $('#map-card').fadeIn(1000).removeClass('d-none');
        $('.navbar #navbar-search').removeClass('d-none');
        $('searchform').addClass('d-none');
    });
    $('#showWeather').click(function(e) {
        e.preventDefault();
        $('#weather-card').fadeOut(1000).removeClass('d-none');
        $('#map-card').fadeIn(1000).addClass('d-none');
    });
    //a30ad436e4474b2b8f5cfb6a90fd135a
    //https://samples.openweathermap.org/data/2.5/weather?q=lagos&appid=8fb73799f65352e83e4792ed87c0a624
    //8fb73799f65352e83e4792ed87c0a624


    function fetch_weather(city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city +
                '&appid=8fb73799f65352e83e4792ed87c0a624')
            .then(res => res.json())
            .then(res => {
                $('#error').addClass('d-none');
                $('#main_search_input').addClass('d-none');
                $('#input-nav-container').removeClass('d-none');
                $('#freint').html(res.main.temp);
                var f = res.main.temp;
                var aF = (f - 32) * 5;
                var c = Math.round((aF / 9) * 100) / 100;
                $('.hide').toggle();
                $('#body').fadeIn().addClass('bg-teal-light').removeClass('img-bg');
                $('#celcius').html(c);
                $('#Humility').html(res.main.humidity);
                $('#Pressure').html(res.main.pressure);
                $('#Wind').html(res.wind.speed);
                $('#weather').html(res.weather[0].description);
                $('#city').html(res.name);
                $('#searchspinner').toggleClass('d-none');
                weatherbit(city);
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
            .catch(function(error, status) {
                $('#error').fadeIn().removeClass('d-none');
                if (error == 'TypeError: Failed to fetch') {
                    $('#error_message').html('Failed to fetch weather details, Posible network error!');
                } else if (error == 'TypeError: Cannot read property \'temp\' of undefined') {
                    $('#error_message').html('Place not found or network error! check your network, Confirm if city exist and refresh the page');
                } else {
                    $('#error').html(error);
                }
                $('#searchIcon').toggleClass('fa-search');
                $('#searchspinner').toggleClass('d-none');
            });

        /***********************************************/
        //
        //Get Weather from weatherbit 
        //
        /*================================================*/


    }

    function initMap(uluru = {
        lat: -25.344,
        lng: 131.036
    }) {
        $('#body').fadeIn().removeClass('bg-teal-light').addClass('img-bg');
        // The location of Uluru
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 12,
                center: uluru,
                //label: labels[labelIndex++ % labels.length],
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
    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //         x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }

    function showPosition(position) {
        console.log(position.coords.latitude);
    }
    // $(function() {
    //     var availableTags = [
    //         "Palmyra Atoll",
    //         "Pennsylvania",
    //         "Puerto Rico",
    //         "Rhode Island",
    //         "South Carolina",
    //         "South Dakota",
    //         "Tennessee",
    //         "Texas",
    //         "United States Minor Outlying Islands",
    //         "United States Virgin Islands",
    //         "Utah",
    //         "Vermont",
    //         "Virginia",
    //         "Wake Island",
    //         "Washington",
    //         "West Virginia",
    //         "Wisconsin",
    //         "Wyoming",
    //         "Alabama",
    //         "Alaska",
    //         "American Samoa",
    //         "Arizona",
    //         "Arkansas",
    //         "Baker Island",
    //         "California",
    //         "Colorado",
    //         "Connecticut",
    //         "Delaware",
    //         "District of Columbia",
    //         "Florida",
    //         "Georgia",
    //         "Guam",
    //     ];
    // });
    // $("#searchInput").autocomplete({
    //     source: availableTags
    // });

    function weatherbit(city) {
        fetch('https://api.weatherbit.io/v2.0/forecast/daily?city=' + city + '&key=a30ad436e4474b2b8f5cfb6a90fd135a')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                    //first row
                $('#high_temp').html(res.data[0].high_temp);
                $('#low_temp').html(res.data[0].low_temp);
                $('#description').html(res.data[0].weather.description);
                $('#wind_cdir_full').html(res.data[0].wind_cdir_full);
                $('#Snow').html(res.data[0].snow);

                //
                //first row
                $('#high_temp2').html(res.data[1].high_temp);
                $('#low_temp2').html(res.data[1].low_temp);
                $('#weatherdescription2').html(res.data[1].weather.description);
                $('#weatherwind_cdir_full2').html(res.data[1].wind_cdir_full);
                $('#Snow2').html(res.data[1].snow);

                //
                //first row
                $('#date').html(res.data[2].datetime);
                $('#high_temp3').html(res.data[2].high_temp);
                $('#low_temp3').html(res.data[2].low_temp);
                $('#description3').html(res.data[2].weather.description);
                $('#wind_cdir_full3').html(res.data[2].wind_cdir_full);
                $('#Snow3').html(res.data[2].snow);

                //
                //Pick 5 out of 16 arrays response
                // for (let index = 0; index < 5; index++) {
                //     // const resultObj = res[index];
                //     var tr = document.createAttribute('tr');
                //     for (let a = 0; a < 5; a++) {
                //         var td = document.createAttribute('td');
                //         var date = document.createTextNode(res.data[1].datetime);
                //         var high_temp = document.createTextNode(res.data[1].high_temp);
                //         var low_temp = document.createTextNode(res.data[1].low_temp);
                //         var weatherDescription = document.createTextNode(res.data[1].weather.description);
                //         var weatherWind_cdir_full = document.createTextNode(res.data[1].weather.wind_cdir_full);
                //         var valueArr = [date,
                //             high_temp,
                //             low_temp,
                //             weatherDescription,
                //             weatherWind_cdir_full,
                //             valueArr
                //         ]
                //         for (let arrInd = 0; arrInd < valueArr.length; arrInd++) {
                //             const element = valueArr[arrInd];
                //             td.appendChild(element);
                //             var tb = tr.appendChild(td);
                //             document.getElementById('table_body').appendChild(tb);
                //         }
                //     }
                // }
            })
            .catch(function(error, status) {
                $('#error').fadeIn().removeClass('d-none');
                if (error == 'TypeError: Failed to fetch') {
                    $('#error_message').html('Failed to fetch weather details, Posible network error!');
                } else if (error == 'TypeError: Cannot read property \'temp\' of undefined') {
                    $('#error_message').html('Place not found or network error! check your network, Confirm if city exist and refresh the page');
                } else {
                    $('#error').html(error);
                }
                $('#searchIcon').toggleClass('fa-search');
                $('#searchspinner').toggleClass('d-none');
            });
    }
});