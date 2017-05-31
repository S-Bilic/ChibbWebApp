// get API stream data

function line_bar_chart(link, chartType, id, color, bordercolor, label, Ylabel) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', link, true);

    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // JSON parse the data that is received

            var response = JSON.parse(xhr.responseText);
            var data = response;
            var reading = [];
            var date = [];
            var dateDays = [];
            var dateTime = [];

            data.forEach(function (sensorNode) {
                reading.push(sensorNode.reading);
                date.push(sensorNode.date);
            });

            recentY = reading;


            date.forEach(function (sensorDate) {
                splitDate = sensorDate.split(" ");
                day = splitDate[0];
                dateDays.push(day);
                time = splitDate[1];
                dateTime.push(time);
            });

            recentDateX = dateDays;
            recentTimeX = dateTime;

            // var format = unsortedDate;
            //
            // format.forEach(function (entry) {
            //     // var date = new Date(entry * 1000);
            //     // var seconds = "0" + date.getSeconds();
            //     // var minutes = "0" + date.getMinutes();
            //     // var hours = "0" + date.getHours();
            //     // var day = "0" + date.getDate();
            //     // var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            //     // var namedMonth = months[date.getMonth()];
            //
            //     // formattedDate = day.substr(-2) + "-" +  namedMonth + "-" + date.getFullYear();
            //     sortedDate.push(formattedDate);
            //
            //     // formattedTime = hours.substr(-2) + ';' + minutes.substr(-2)+ ';' + seconds.substr(-2);
            //     sortedTime.push(formattedTime);
            // });
            //
            // recentDateX = sortedDate.slice(Math.max(sortedDate.length -5));
            // recentTimeX = sortedTime.slice(Math.max(sortedTime.length -5));

            // recentDateX = sortedDate;
            // recentTimeX = sortedTime;

            // Use the result array in the chart data


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

            var ctx = document.getElementById(id);
            var myChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: recentTimeX,
                    // labels: ['day 1', 'day 2', 'day 3', 'day 4'],
                    datasets: [{
                        label: label,
                        data: recentY,
                        // data: [1,5,10,13,12],
                        backgroundColor: color,
                        borderColor: bordercolor,
                        borderWidth: 1
                    }
                    ]
                },
                options: {
                    responsiveAnimationDuration: 0,
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                                // maxTicksLimit: 20
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: Ylabel,
                            },
                            ticks: {
                                beginAtZero: true
                                // stepSize: 5
                                // maxTicksLimit: 20
                            }
                        }]
                    }
                }
            });


            // $(document).ready(function () {
            //     var obj = new Object();
            //     $('#chartLink').change(function () {
            //         input = chartLink = obj.chartLink = $('#chartLink').val();
            //
            //         if (input) {
            //             myChart.clear();
            //             createChart(chartLink, "line", "myChart", "rgba(255, 99, 132, 0.2)", "rgb(255, 99, 132)",  'Temperature', '°C');
            //         }
            //         else {
            //             alert('error');
            //         }
            //     });
            // });

            // $(document).ready(function () {
            //
            //     var Temp = "temperature";
            //     var Humid = "humidity";
            //     var urlAddress = "http://145.24.222.154/api/";
            //     var urlQuery = "?limit=5&sort=-date&sensor_id=";
            //     var obj = new Object();
            //
            //     $('#chartLink').change(function () {
            //
            //         // $("#inputTemp1").val(urlAddress + Temp + urlQuery + 1);
            //         // $("#inputTemp2").val(urlAddress + Temp + urlQuery + 2);
            //         // $("#inputTemp3").val(urlAddress + Temp + urlQuery + 3);
            //
            //         input = chartLink = obj.chartLink = $('#chartLink').val();
            //
            //
            //         if (input) {
            //             createChart(chartLink, "line", "myChart", "rgba(255, 99, 132, 0.2)", "rgb(255, 99, 132)",  'Temperature', '°C');
            //             if (id == "myChart") {
            //                 myChart.destroy();
            //             }
            //         }
            //         else {
            //             alert('error');
            //         }
            //     });
            //
            //     $('#chartLink2').change(function () {
            //
            //         $("#inputHumid1").val(urlAddress + Humid + urlQuery + 1);
            //         $("#inputHumid2").val(urlAddress + Humid + urlQuery + 2);
            //         $("#inputHumid3").val(urlAddress + Humid + urlQuery + 3);
            //
            //         input2 = chartLink2 = obj.chartLink2 = $('#chartLink2').val();
            //
            //         if (input2) {
            //             createChart(chartLink2, "bar", "myChart1", "rgba(180, 226, 243, 0.5)", "rgb(150, 226, 243)", 'Humidity', '%');
            //             if (id == 'myChart1') {
            //                 myChart.destroy();
            //             }
            //         }
            //         else {
            //             alert('error');
            //         }
            //     });
            // });

            // function updateData() {
            //     myChart.data.datasets[0].data = recentY;
            //     myChart.data.labels = recentDateX;
            // };
            // document.getElementById("updateData").onclick = updateData;

            // $("button").click(function(){
            //     $("btn").toggleClass("btn");
            //     myChart.data.labels = recentTimeX;
            //     myChart.data.labels = recentDateX;
            //     myChart.update();
            // });

            var astate = 0;

            $('#switchFormat').click(function (e) {
                // $(this).click("click", function () {
                    if (astate == 0 && id == "myChart") {
                        myChart.data.labels = recentTimeX;
                        myChart.update();
                        astate = 1;
                    } else {
                        myChart.data.labels = recentDateX;
                        myChart.update();
                        astate = 0;
                    }
                // });
            });
            $('#switchFormat1').click(function (e) {
                // $(this).click("click", function () {
                if (astate == 0 && id == "myChart1") {
                    myChart.data.labels = recentTimeX;
                    myChart.update();
                    astate = 1;
                } else {
                    myChart.data.labels = recentDateX;
                    myChart.update();
                    astate = 0;
                }
                // });
            });

            // var ctx = document.getElementById("myChart3");
            // var myChart3 = new Chart(ctx, {
            //     type: 'bar',
            //     data: {
            //         // labels:['Red', 'Blue', 'Green', 'Yellow'],
            //         labels: sortedDate,
            //         datasets: [{
            //             label: 'Temperature',
            //             // data:[5, 10, 15, 40],
            //             data: temp,
            //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //             borderColor: 'rgba(255,99,132,1)',
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         responsiveAnimationDuration: 3500,
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     beginAtZero: true
            //                 }
            //             }]
            //         }
            //     }
            // });
            //
            // var pieData = {
            //     labels: [
            //         "Purple",
            //         "Green",
            //         "Orange",
            //         "Yellow",
            //     ],
            //     datasets: [
            //         {
            //             data: temp,
            //             backgroundColor: [
            //                 "#878BB6",
            //                 "#4ACAB4",
            //                 "#FF8153",
            //                 "#FFEA88",
            //                 "#878BB6",
            //                 "#4ACAB4",
            //                 "#FF8153",
            //                 "#FFEA88",
            //                 "#878BB6",
            //                 "#4ACAB4",
            //                 "#FF8153",
            //                 "#FFEA88"
            //             ]
            //         }
            //     ]
            // };
            //
            // var ctx = document.getElementById("myChart2").getContext("2d");
            // var myChart2 = new Chart(ctx, {
            //     type: 'polarArea',
            //     data: pieData,
            //     options: {
            //         animation:{
            //             animateScale:true,
            //             responsiveAnimationDuration: 3500,
            //         }
            //     }
            // });
            //
            // var ctx = document.getElementById("myChart1");
            // var myChart1 = new Chart(ctx, {
            //     type: 'pie',
            //     data: {
            //         labels: sortedDate,
            //         datasets: [{
            //             label: 'Temperature',
            //             // data:[5, 10, 15, 40],
            //             data: temp,
            //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //             borderColor: 'rgba(255,99,132,1)',
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         responsiveAnimationDuration: 3500,
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     beginAtZero:true
            //                 }
            //             }]
            //         }
            //     }
            // });
        }
    }
};

