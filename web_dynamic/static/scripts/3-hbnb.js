$(document).ready(function () {
    const checkedAmenities = {};

    function updateAmenities() {
        const checkedAmenitiesList = Object.values(checkedAmenities);
        const amenitiesText = checkedAmenitiesList.join(', ');
        $('.amenities h4').text(amenitiesText);
    }

    function checkAPIStatus() {
        $.ajax({
            type: 'GET',
            url: 'http://0.0.0.0:5001/api/v1/status/',
            success: function (response) {
                if (response.status === 'OK') {
                    $('#api_status').addClass('available');
                } else {
                    $('#api_status').removeClass('available');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Error checking API status:', errorThrown);
            }
        });
    }

    function loadPlaces() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (response) {
                $('.places').empty(); // Clear existing places
                response.forEach(function (place) {
                    const article = $('<article>');
                    article.append($('<div>').addClass('title_box').append($('<h2>').text(place.name)).append($('<div>').addClass('price_by_night').text('$' + place.price_by_night)));
                    article.append($('<div>').addClass('information').append($('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''))).append($('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''))).append($('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''))));
                    article.append($('<div>').addClass('description').text(place.description));
                    $('.places').append(article);
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Error loading places:', errorThrown);
            }
        });
    }

    checkAPIStatus();
    loadPlaces();

    $('input[type="checkbox"]').change(function () {
        const amenityID = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            checkedAmenities[amenityID] = amenityName;
        } else {
            delete checkedAmenities[amenityID];
        }

        updateAmenities();
    });
});
