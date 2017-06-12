function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

$(document).ready(function () {
    //Download Line Chart
    $('.download1').click(function () {
        downloadCanvas(this, 'myChart', 'line_chart.png');
    });

    //Download Bar Chart
    $('.download2').click(function () {
        downloadCanvas(this, 'myChart1', 'bar_chart.png');
    });
});