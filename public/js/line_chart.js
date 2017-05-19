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
            // formattedTime = date.getHours() + ';' + date.getMinutes() + ';' + date.getSeconds();
            // sortedDate.push(formattedTime);
        });

        // Use the result array in the chart data
        var ctx = document.getElementById("myChart4");
        var myChart4 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedDate,
                datasets: [{
                    label: 'Temperature',
                    data: temp,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                            // maxTicksLimit: 20
                        }
                    }]
                    // xAxes: [{
                    //     ticks: {
                    //         beginAtZero:true,
                    //         maxTicksLimit: 5
                    //     }
                    // }]
                }
            }
        });

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
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        var pieData = {
            labels: [
                "Purple",
                "Green",
                "Orange",
                "Yellow",
            ],
            datasets: [
                {
                    data: temp,
                    backgroundColor: [
                        "#878BB6",
                        "#4ACAB4",
                        "#FF8153",
                        "#FFEA88",
                        "#878BB6",
                        "#4ACAB4",
                        "#FF8153",
                        "#FFEA88",
                        "#878BB6",
                        "#4ACAB4",
                        "#FF8153",
                        "#FFEA88"
                    ]
                }]
        };

        var ctx = document.getElementById("myChart2").getContext("2d");
        var myChart2 = new Chart(ctx, {
            type: 'doughnut',
            data: pieData
        });

        var ctx = document.getElementById("myChart1");
        var myChart1 = new Chart(ctx, {
            type: 'radar',
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
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
}
