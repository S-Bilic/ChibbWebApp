// get API stream data
var xhr = new XMLHttpRequest();
xhr.open('GET', "//145.24.222.154/api/sensors/", true);
xhr.send();

xhr.onreadystatechange = processRequest;

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // JSON parse the data that is received
        var response = JSON.parse(xhr.responseText);
        var data = response;
        // Get a specific name with a value from the json objects in the data
        // Regex to remove the curly brackets from the data
        // Separate the pairs(names and values) from each other
        // Variable to check the length of the separated values
        // Array variable where the output is gonna be put
        var json = JSON.stringify(data, ['reading']);
        json = json.replace(/[{}]/g, "");
        var values = json.split(",");
        var valueLength = values.length;
        var result = [];

        // For loop to put every value that is splitted from the name with ':' in the result array
        for (var i = 0;  i < valueLength; i++) {
            var value = values[i].split(":");
            result[i] = value[1];
        }

        // Use the result array in the chart data
        var ctx = document.getElementById("myChart4");
        var myChart4 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: result,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
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

