$(document).ready(init);

function init () {
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
}

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

// search function
$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}',
  success: function (data) {
    for (const currentPlace of data) {
      $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom  </div></div> <div class="user"></div><div class="description">' + currentPlace.description + '</div></article>');
    }
  }
});

// button

$('button').click(() => {
  console.log(x);
  $('article').remove();
  const request = $.ajax({
    url: 'http://b41de8df0b4c.19.hbtn-cod.io:34196/api/v1/places_search/',
    method: 'POST',
    data: JSON.stringify({ amenities: x }),
    contentType: 'application/json',
    dataType: 'json'
  }).done((data) => {
    console.log(data);
    data.forEach(data => {
      $('section.places').append('<article> <div class="title"><h2>' + data.name + '</h2><div class="price_by_night">' + data.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i></br>' + data.max_guest + ' Guests </div> <div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data.number_rooms + 'Bedrooms </div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data.number_bathrooms + ' Bathroom </div></div><div class="user"><strong>Owner: ' + '</strong></div><div class="description">' + data.description + '</div></article>');
    });
  });
});
