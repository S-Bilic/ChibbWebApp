//line_bar_chart function with given parameters: link, chart type, chart id, chart color, chart border color, chart label, chart label Y axis.
function line_bar_chart(link, chartType, id, color, bordercolor, label, Ylabel) {

    //get the json data from the API
    $.get(link, function(response) {
        var data = response;

        //arrays that are used for containing different values from the JSON objects.
        //reading: temperature/humidity values, dateDate: timestamp DD/MM/YYYY, dateTime: timestamp HH/MM/SS.
        var reading = [];
        var dateDate = [];
        var dateTime = [];

        //get the readings and timestamps for each object in the response data. Convert the two timestamp arrays to a local date format using moment.js.
        data.forEach(function (sensorNode) {
            reading.push(sensorNode.reading);
            moment.locale("NL");
            dateDate.push(moment(sensorNode.date).format('LL'));
            dateTime.push(moment(sensorNode.date).format('LTS'));
        });

        //reverse the array to display the recent values from right to left in the chart.
        //for easy understanding give a new variable to "reading", because the recent readings are displayed on the Y axis in the chart.
        //and a new variable to "dateDate" and "dateTime", because the recent DD/MM/YYYY and HH/MM/SS are displayed on the X axis in the chart.
        recentY = reading.reverse();
        recentDateX = dateDate.reverse();
        recentTimeX = dateTime.reverse();

        //get only the first RecentY with given statements for each chart to display in Google Maps.
        if (id == "myChart") {
            firstRecentY = recentY[4];
        }
        if (id == "myChart1") {
            firstRecentY1 = recentY[4];
        }

        //before creating a new chart remove the chart id, hidden iframe and give a new canvas.
        if (id == "myChart") {
            $('#myChart').remove();
            $('iframe.chartjs-hidden-iframe').remove();
            $('#graphContainer').append('<canvas id="myChart"><canvas>');
        }
        if (id == "myChart1") {
            $('#myChart1').remove();
            $('iframe.chartjs-hidden-iframe').remove();
            $('#graphContainer1').append('<canvas id="myChart1"><canvas>');
        }

        //chart properties including the parameters of the "line_bar_chart" function
        Chart.defaults.global.elements.responsive = true;
        //chart id
        var ctx = document.getElementById(id);
        var myChart = new Chart(ctx, {
            //give a type to the chart. i.e.: "line"
            type: chartType,
            data: {
                //x-axis for date/time
                labels: recentTimeX,
                datasets: [{
                    //chart head label
                    label: label,
                    //y-axis for recent readings
                    data: recentY,
                    //chart color
                    backgroundColor: color,
                    //chart border color
                    borderColor: bordercolor,
                    borderWidth: 1,
                }]
            },
            options: {
                responsiveAnimationDuration: 0,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            //y-axis label
                            labelString: Ylabel,
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                pan: {
                    enabled: true,
                    //pan only x-xis
                    mode: 'x'
                },
                zoom: {
                    enabled: true,
                    //zoom only x-axis
                    mode: 'x'
                }
            }
        });

        //compare function with given statements that compares the humidity chart values in the temperature chart.
        $('.compare').click(function () {
            //input value from the default select option: "choose".
            input = $('.chartLink1 option:selected').val();
            //if statement that checks the input > alert.
            if (input == "choose") {
                swal("Oops!", "Choose a sensor first!", "error");
            }
            //else if statement that checks the corresponding chart id > pushes recent humidity data to the temperature chart.
            else if(id == "myChart") {
                myChart.data.datasets.push({
                    label: 'Humidity ' + input ,
                    backgroundColor:'rgba(0, 0, 0, 0.0)',
                    borderColor:'rgba(180, 226, 243, 0.9)',
                    data: recentY,
                    width: 1,
                    type: 'line'
                });
                myChart.update();
            }
        });

        //compare1 function with given statements that compares the temperature chart values in the humidity chart.
        $('.compare1').click(function () {
            //input value from the default select option: "choose".
            input = $('.chartLink option:selected').val();
            //if statement that checks the input > alert.
            if (input == "choose") {
                swal("Oops!", "Choose a sensor first!", "error");
            }
            //else if statement that checks the corresponding chart id > pushes recent temperature data to the humidity chart.
            else if(id == "myChart1") {
                myChart.data.datasets.push({
                    label: 'Temperature ' + input ,
                    backgroundColor:'rgba(0, 0, 0, 0.0)',
                    borderColor:'rgba(255, 99, 132, 0.9)',
                    data: recentY,
                    type: 'line'
                });
                myChart.update();
            }
        });

        //state variable
        var astate = 0;

        //switches between date: DD/MM/YYYY and time: HH/MM/SS on the x-axis
        //statements to check the current state and corresponding id for switching between date and time.
        $('.switchFormat').click(function () {
            if (astate == 0 && id == "myChart") {
                myChart.data.labels = recentDateX;
                //update the chart with the new labels.
                myChart.update();
                astate = 1;
            } else if (id == "myChart") {
                myChart.data.labels = recentTimeX;
                myChart.update();
                astate = 0;
            }
        });

        $('.switchFormat1').click(function () {
            if (astate == 0 && id == "myChart1") {
                myChart.data.labels = recentDateX;
                myChart.update();
                astate = 1;
            } else if (id == "myChart1") {
                myChart.data.labels = recentTimeX;
                myChart.update();
                astate = 0;
            }
        });
    });
};