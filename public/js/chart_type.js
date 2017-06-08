function createTempChart (link, id) {
    if(id == "myChart") {
        line_bar_chart(link, "line", id, "rgba(255, 99, 132, 0.2)", "rgb(255, 99, 132)",  'Temperature', '°C');
    }
};

function createHumidChart (link, id) {
    if(id == "myChart1") {
        line_bar_chart(link, "bar", id , "rgba(180, 226, 243, 0.5)", "rgb(150, 226, 243)", 'Humidity', '%');
    }
};

$(document).ready(function () {

        //URL Query variables for the input parameter "link"
        var urlAddress = "http://145.24.222.154/api/";
        var temp = "temperature";
        var humid = "humidity";
        var limitDefaultUrl = "?limit=5";
        var limitUrl = "?limit=";
        var idUrl = "&sort=-date&sensor_id=";
        var readingUrl = "&reading=";

        //the createChart(); function that creates the charts with the given input parameters that are available.

        //default temp chart
        createTempChart(urlAddress + temp + limitDefaultUrl + idUrl + 1, "myChart");

        //chart with the sensor value input to choose the correct sensor in the select options.
        $('.chartLink').change(function () {
            //gets the value of the select option
            input = $('.chartLink').val();
            createTempChart(urlAddress + temp + limitDefaultUrl + idUrl + input, "myChart");
        });

        //chart with a limit input
        $('.getValue').click(function() {
            //gets the input value for limit
            limitValue = $("#limitValue").val();
            createTempChart(urlAddress + temp + limitUrl + limitValue + idUrl + input, "myChart");
        });

        $('.getReading').on("keyup", function () {
            getReading = $("#getReading").val();
            input = $('.chartLink option:selected').val();
            if (input == "choose") {
                swal("Oops!", "Choose a sensor first!", "error");
            }
            else {
                createTempChart(urlAddress + temp + limitUrl + limitValue + idUrl + input + readingUrl + getReading, "myChart");
            }
        });

        //default humid chart
        createHumidChart(urlAddress + humid + limitDefaultUrl + idUrl + 1, "myChart1");

        $('.chartLink1').change(function () {
            //gets the value of the select option
            input = $('.chartLink1').val();
            createHumidChart(urlAddress + humid + limitDefaultUrl + idUrl + input, "myChart1");
        });

        $('.getValue1').click(function() {
            //gets the input value for limit
            limitValue = $("#limitValue1").val();
            createHumidChart(urlAddress + humid + limitUrl + limitValue + idUrl + input, "myChart1");
        });

        $('.getReading1').on("keyup", function () {
            getReading = $("#getReading1").val();
            input = $('.chartLink1 option:selected').val();
            if (input == "choose") {
                swal("Oops!", "Choose a sensor first!", "error");
            }
            else{
                createHumidChart(urlAddress + humid + limitUrl + limitValue + idUrl + input + readingUrl + getReading, "myChart1");
            }
        });
});