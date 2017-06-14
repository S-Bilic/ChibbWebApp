function myMap() {
    var locations = [
        ['SMART TECH LAB', 51.8105978, 4.6272719, 2],
        ['CHIBB HOUSE', 51.897318, 4.424676, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(51.8105978, 4.6272719),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    //information window html content
    var contentString =
        '<div class="row">'+
        '<div class="col-xs-12 col-md-12">'+
        '<div class="row">'+
        '<h3 class="chibb smart"></h3>'+
        '</div>'+
        '<div class="row">'+
        '<h3 class="text-center col-xs-12 btn-lg btn-danger fa fa-cloud" id="temp"> </h3>'+
        '</div>'+
        '<div class="row">'+
        '<h3 class="text-center col-xs-12 btn-lg btn-info fa fa-tint" id="humid"></h3>'+
        '</div>'+
        '</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0] + contentString);
                infowindow.open(map, marker);
                var temp = firstRecentY.toString();
                $("#temp").text(temp + "ºC");


                //convert humid firstRecentY to a string and call it in the content with an ID.
                var humid = firstRecentY1.toString();
                $("#humid").text(humid + '%');
            }
        })(marker, i));
    }
}
