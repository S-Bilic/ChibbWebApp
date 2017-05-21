// get API stream data
var xhr = new XMLHttpRequest();
xhr.open('GET', "//145.24.222.154/api/sensors", true);
xhr.send();

xhr.onreadystatechange = processRequest;

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // JSON parse the data that is received
        var response = JSON.parse(xhr.responseText);
        var data = response;
        var temp = [];
        var sortedDate = [];
        var unsortedDate = [];
        var sortedTime = [];

        data.forEach(function (sensorNode) {
            temp.push(sensorNode.reading);
            unsortedDate.push(sensorNode.timestamp);
        });

        var sort = unsortedDate.sort(function(x, y){
           return x - y;
        });

        sort.forEach(function (entry) {
            var date = new Date(entry * 1000);
            console.log(date);
            formattedDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
            sortedDate.push(formattedDate);
            formattedTime = date.getHours() + ';' + date.getMinutes() + ';' + date.getSeconds();
            sortedTime.push(formattedTime);
        });



        // Use the result array in the chart data
        var ctx = document.getElementById("myChart4");
        var myChart4 = new Chart(ctx, {
            type: 'line',
            data: {
                // labels: sortedDate,
                labels: ['day 1', 'day 2', 'day 3', 'day 4'],
                datasets: [{
                    label: 'Temperature',
                    // data: temp,
                    data: [1,5,10,13,12],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsiveAnimationDuration: 3500,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:true,
                            maxTicksLimit: 20
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            stepSize : 5
                            // maxTicksLimit: 20
                        }
                    }]
                }
            }
        });

        function updateData() {
            myChart4.data.datasets[0].data = temp;
            myChart4.data.labels = sortedDate;
            myChart4.update();
        };

        document.getElementById("updateData").onclick = updateData;

        function SwitchTimeFormat () {
            myChart4.data.labels = sortedTime;
            myChart4.update();
        }

        document.getElementById("SwitchTimeFormat").onclick = SwitchTimeFormat;

        function SwitchDateFormat () {
            myChart4.data.labels = sortedDate;
            myChart4.update();
        }

        document.getElementById("SwitchDateFormat").onclick = SwitchDateFormat;


        var ctx = document.getElementById("myChart3");
        var myChart3 = new Chart(ctx, {
            type: 'bar',
            data: {
                // labels:['Red', 'Blue', 'Green', 'Yellow'],
                labels: sortedDate,
                datasets: [{
                    label: 'Temperature',
                    // data:[5, 10, 15, 40],
                    data: temp,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsiveAnimationDuration: 3500,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
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
