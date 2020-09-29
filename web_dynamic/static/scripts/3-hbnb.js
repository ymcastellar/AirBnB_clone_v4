$(document).ready(init);

function init() {
    const ListAmenity = {};
    $('.amenities .popover input').change(function () {
        if ($(this).is(':checked')) {
            ListAmenity[$(this).attr('data-name')] = $(this).attr('data-id');
        } else if ($(this).is(':not(:checked)')) {
            delete ListAmenity[$(this).attr('data-name')];
        }
        const names = Object.keys(ListAmenity);
        $('.amenities h4').text(names.sort().join(', '));
    });

    // Check API status and update status in the header

    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $get(url, function (data, status) {
        console.log(data);
        if (data.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
            }
        }
    });
}