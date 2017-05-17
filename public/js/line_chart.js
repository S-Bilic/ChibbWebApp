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
    }
}

/*Menu-toggle*/
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});