$("#addNodes").click(function () {

    var new_sensor = new Object();
    new_sensor.name = $("#sensorName").val();
    new_sensor.id = $("#sensorID").val();
    new_sensor.list = new Object();

    var itemName = $("#itemName").val();
    var itemType = $("#itemValue").val();

    new_sensor.list[itemName] = itemType;

    console.log(JSON.stringify(new_sensor));

    $.post("http://145.24.222.154/api/nodemanager", new_sensor, function (data) {
    console.log(data);

    }, "json");
});
