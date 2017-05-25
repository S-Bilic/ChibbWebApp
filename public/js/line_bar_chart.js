// get API stream data


var line_bar_chart = function (link, chartType, id, color, bordercolor, label, Ylabel) {

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
            var sortedDate = [];
            var unsortedDate = [];
            var sortedTime = [];

            data.forEach(function (sensorNode) {
                reading.push(sensorNode.reading);
                unsortedDate.push(sensorNode.date);
            });

            recentY = reading.slice(Math.max(reading.length -5));

            var format = unsortedDate;

            format.forEach(function (entry) {
                var date = new Date(entry * 1000);
                var seconds = "0" + date.getSeconds();
                var minutes = "0" + date.getMinutes();
                var hours = "0" + date.getHours();
                var day = "0" + date.getDate();
                var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
                var namedMonth = months[date.getMonth()];

                formattedDate = day.substr(-2) + "-" +  namedMonth + "-" + date.getFullYear();
                sortedDate.push(formattedDate);

                formattedTime = hours.substr(-2) + ';' + minutes.substr(-2)+ ';' + seconds.substr(-2);
                sortedTime.push(formattedTime);
            });

            recentDateX = sortedDate.slice(Math.max(sortedDate.length -5));
            recentTimeX = sortedTime.slice(Math.max(sortedTime.length -5));

            // Use the result array in the chart data
            var ctx = document.getElementById(id);
            var myChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: recentDateX,
                    // labels: ['day 1', 'day 2', 'day 3', 'day 4'],
                    datasets: [{
                        label: label,
                        data: recentY,
                        // data: [1,5,10,13,12],
                        backgroundColor: color,
                        borderColor: bordercolor,
                        borderWidth: 1
                    },
                        {
                            type:chartType,
                            label: label,
                            // data: recentY,
                            data: [1,5,10,13,12],
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

            $('.switchFormat').click(function () {
                // $(this).click("click", function () {
                    if (astate == 0) {
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