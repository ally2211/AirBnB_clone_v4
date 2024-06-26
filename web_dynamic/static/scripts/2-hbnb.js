$(document).ready(function() {
    // This function executes when the DOM is fully loaded
    // Initialize an object to store checked amenity IDs
    var checkedAmenities = {};
    // Listen for changes on each input checkbox
    $('input[type="checkbox"]').change(function() {
        // This function executes when the state of a checkbox changes
        // Get the Amenity ID from the data-id attribute of the checkbox's parent <li> tag
        var amenityID = $(this).closest('li').data('id');
        var amenityName = $(this).closest('li').data('name');
        // Check if the checkbox is checked
        if ($(this).is(':checked')) {
            // If checked, add the Amenity ID to the checkedAmenities object
            checkedAmenities[amenityID] = amenityName;
        } else {
            // If unchecked, remove the Amenity ID from the checkedAmenities object
            delete checkedAmenities[amenityID];
        }
        // Update the h4 tag inside the div with id "amenities"
        updateAmenitiesList();
    });
    // Function to update the h4 tag inside the div with id "amenities"
    function updateAmenitiesList() {
        var amenityNames = Object.values(checkedAmenities);
        // Update the content of #checkedAmenitiesList with the names of checked amenities
        $('#checkedAmenitiesList').text(amenityNames.join(', '));
    } 

    // Fetch API status 
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        // Check if the status is "OK"
        if (data.status === 'OK') {
            // If yes, add the 'available' class to div#api_status
            $('#api_status').addClass('available');
        } else {
            // If not, remove the 'available' class
            $('#api_status').removeClass('available');
        }
    }).fail(function(error) {
        console.error('Error fetching API status:', error);
        $('#api_status').removeClass('available');
    });
});
