 // add Marker
  var markers = [];
$(document).ready(function (){

  var locations = [['Newton', 42.329495, -71.193173],
                   ['Westford', 42.614909, -71.410264]];
  // create a LatLng object containing the coordinate for the center of the map
  var latlngNewton = new google.maps.LatLng(42.329495, -71.193173);
  var latlngWestford = new google.maps.LatLng(42.614909, -71.410264);

  var mapCenter = new google.maps.LatLng(42.4833808,-71.2393681);
  var mapZoom = 10;

  // prepare the map properties
  var options = {
    zoom: mapZoom,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControl: true,
    mapTypeControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  // initialize the map object
  var map = new google.maps.Map(document.getElementById('google_map'), options);

 

 marker1 = new google.maps.Marker({
    position: latlngNewton, map: map
  });
  marker2 =new google.maps.Marker({
    position: latlngWestford, map: map
  });
  
marker1.info = new google.maps .InfoWindow({ content:  '<div class="info"><strong>Masters of Karate</strong><br><br>103 Union St<br> Newton Center, MA</div>'});
marker2.info = new google.maps .InfoWindow({ content:  '<div class="info"><strong>Masters of Karate</strong><br><br>64 Brookside Rd<br> Westford, MA</div>'});
 
  
  var infowindow1 = new google.maps.InfoWindow({
    content:  '<div class="info"><strong>Masters of Karate</strong><br><br>103 Union St<br> Newton Center, MA</div>'
  });  
  // add listener for a click on the pin
  google.maps.event.addListener(marker1, 'click', function() {
    infowindow1.open(map, marker1);
  });

  var infowindow2 = new google.maps.InfoWindow({
    content:   '<div class="info"><strong>Masters of Karate</strong><br><br>64 Brookside Rd<br> Westford, MA</div>'
  });  
  google.maps.event.addListener(marker2, 'click', function() {
    infowindow2.open(map, marker2);
  });
  // add information window

});
