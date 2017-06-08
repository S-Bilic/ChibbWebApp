//create Chart function with an if statement that checks the correct chart Types.
// function createTempChart (link, chartType, id, color, bordercolor, label, Ylabel) {
//     if(chartType == "bar" || chartType == "line" || chartType == "radar" || chartType == "pie") {
//         line_bar_chart(link, chartType, id, color, bordercolor, label, Ylabel);
//     }
// };

function createTempChart (link, id) {
    if(id == "myChart") {
        line_bar_chart(link, "line", id, "#eee", "#eee", "Humid", "%");
    }
};


function createHumidChart (link, id) {
    if(id == "myChart1") {
        line_bar_chart(link, "bar", id, "#eee", "#eee", "Humid", "%");
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
        createChart(urlAddress + temp + limitDefaultUrl + idUrl + 1 , "line", "myChart", "rgba(255, 99, 132, 0.2)", "rgb(255, 99, 132)",  'Temperature', '°C');
        createHumidChart(urlAddress + humid + limitDefaultUrl + idUrl + 1, "myChart1");

        //chart with the sensor value input to choose the correct sensor in the select options.
        $('.chartLink').change(function () {
            //gets the value of the select option
            input = $('.chartLink').val();
            createChart(urlAddress + temp + limitDefaultUrl + idUrl + input, "line", "myChart", "rgba(255, 99, 132, 0.2)", "rgb(255, 99, 132)",  'Temperature', '°C');
        });

        //chart with a limit input
        $('.getValue').click(function() {
            //gets the input value for limit
            limitValue = $("#limitValue").val();
            createChart(urlAddress + temp + limitUrl + limitValue + idUrl + input, "line", "myChart", "rgba(255, 99, 132, 0.2)", "rgb(255, 99, 132)", 'Temperature', '°C');
        });

        $('.getReading').on("keyup", function () {
            getReading = $("#getReading").val();
            input = $('.chartLink option:selected').val();
            if (input == "choose") {
                swal("Oops!", "Choose a sensor first!", "error");
            }
            else {
            createChart(urlAddress + temp + limitUrl + limitValue + idUrl + input + readingUrl + getReading, "line", "myChart", "rgba(255, 99, 132, 0.2)", "rgb(255, 99, 132)", 'Temperature', '°C');
            }
        });

        //default humid chart
        createHumidChart(urlAddress + humid + limitDefaultUrl + idUrl + 1, "myChart1");
        // createChart(urlAddress + humid + limitDefaultUrl + idUrl + 1, "bar", "myChart1", "rgba(180, 226, 243, 0.5)", "rgb(150, 226, 243)", 'Humidity', '%');

        $('.chartLink1').change(function () {
            //gets the value of the select option
            input = $('.chartLink1').val();
            createHumidChart(urlAddress + humid + limitDefaultUrl + idUrl + input, "myChart1");
            // createChart(urlAddress + humid + limitDefaultUrl + idUrl + input, "bar", "myChart1", "rgba(180, 226, 243, 0.5)", "rgb(150, 226, 243)", 'Humidity', '%');
        });

        $('.getValue1').click(function() {
            //gets the input value for limit

            limitValue = $("#limitValue1").val();
            createHumidChart(urlAddress + humid + limitUrl + limitValue + input, "myChart1");
            // createChart(urlAddress + humid + limitUrl + limitValue + idUrl + input, "bar", "myChart1", "rgba(180, 226, 243, 0.5)", "rgb(150, 226, 243)", 'Humidity', '%');
        });

        $('.getReading1').on("keyup", function () {
            getReading = $("#getReading1").val();
            input = $('.chartLink1 option:selected').val();
            if (input == "choose") {
                swal("Oops!", "Choose a sensor first!", "error");
            }
            else{
                createHumidChart(urlAddress + humid + limitUrl + limitValue + idUrl + input + readingUrl + getReading, "myChart1");
                // createChart(urlAddress + humid + limitUrl + limitValue + idUrl + input + readingUrl + getReading, "bar", "myChart1", "rgba(180, 226, 243, 0.5)", "rgb(150, 226, 243)", 'Humidity', '%');
            }
        });
});