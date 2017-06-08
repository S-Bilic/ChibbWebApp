
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

//Download Line Chart
document.getElementById('download1').addEventListener('click', function() {
    downloadCanvas(this, 'myChart', 'line_chart.png');
}, false);

//Download Bar Chart
document.getElementById('download2').addEventListener('click', function() {
    downloadCanvas(this, 'myChart', 'bar_chart.png');
}, false);

