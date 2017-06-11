$(document).ready(function () {
    var url = "http://145.24.222.154/api/nodemanager";

    //get the json status data from the api nodemanager
    function getNodes() {
        $.getJSON(url, function (json) {
            displayNodes(json)
        });
    }

    //display the nodes using a for loop on the data combining it with a content string that shows the corresponding sensor_type, sensor_id and status
    function displayNodes(data) {
        for (var i = 0; i < data.length; i++) {
            var sensorcolor = "";
            if (data[i].status == "active") {
                sensorcolor = "fa fa-1x fa-circle fa-circle-on";
            } else {
                sensorcolor = "fa fa-1x fa-circle fa-circle-off";
            }
            var html = ' <div class="col-xs-12 text-center vertical-offset">' +
                '<h4>'+data[i].sensor_type + ' ' + data[i].sensor_id +'</h4>' +
                '<div class=" ' + sensorcolor + ' "></div>' +
                '</div>' +
                '<div class="col-xs-12 text-center vertical-offset">' +
                '<button class="btn btn-info btn-on" data-status="' + data[i].status + '" data-sensor=' + data[i]._id + '>TOGGLE</button>' +
                '<button class="btn btn-info btn-delete" data-status="' + data[i].status + '" data-sensor=' + data[i]._id + '>DELETE</button>' +
                '</div>';

            $('.sensornodes').append(html);
        }
        addNode();
        updateNode();
        deleteNode();
    }

    //add a sensor node to the api nodemanager. Using the users input to POST data.
    function addNode() {
        $(".btn-add").click(function () {
            var sensor_id = $("#sensor_id").val();
            var sensor_type = $("#sensor_type").val();
            var location = $("#sensor_location").val();

            var object = {
                "sensor_id": sensor_id,
                "sensor_type": sensor_type,
                "location": location,
                "status": "active",
                "interval": 0
            };

            var json = JSON.stringify(object);

            $.ajax({
                url: url,
                data: json,
                type: 'POST',
                contentType: "application/json",
                success: function (result) {
                    location.reload();
                }
            });
        });
    }

    //update the node to active or inactive. Using the PUT method for the update.
    function updateNode() {
        $('.btn-on').click(function () {
            var id = $(this).attr('data-sensor');
            var status = $(this).attr('data-status');

            var new_status = "";
            if (status === "active") {
                new_status = "inactive"
            } else {
                new_status = "active";
            }

            var object = {
                "status": new_status
            };

            var json = JSON.stringify(object);

            $.ajax({
                url: url + "/" + id,
                data: json,
                type: 'PUT',
                contentType: "application/json",
                success: function (result) {
                    location.reload();
                }
            });
            // console.log(status);
        });
    };

    //delete the node. Using the DELETE method
    function deleteNode() {
        $('.btn-delete').click(function () {
            var id = $(this).attr('data-sensor');
            var status = $(this).attr('data-status');
            $.ajax({
                url: url + "/" + id,
                data: null,
                type: 'DELETE',
                contentType: "application/json",
                success: function (result) {
                    location.reload();
                }
            });
        });
    }
    getNodes()
});

