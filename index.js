"use strict;"

//
// Render the visualization.
//
function renderViz(data) {
    var dataset = new vis.DataSet();
    for (var i = 0; i < data.length; ++i) {
        const record = data[i];
        dataset.add({
            // Trading strategy parameters.
            x: record.smaPeriod,        
            y: record.stopLossPct,

            // Trading strategy profit.
            z: record.result,
            style: record.result,
        });
    }

    var options = {
        width:  "900px",
        height: "900px",
        style: "surface",
        showPerspective: false,
        showGrid: true,
        showShadow: true,
        keepAspectRatio: false,
        showLegend: true,
        legendLabel: "Profit (%)",
        verticalRatio: 0.5,
        xLabel: "Simple moving average (days)",
        yLabel: "Stop loss (%)",
        zLabel: "Profit (%)",
        valueMax: 40,
    };

    var container = document.getElementById("container");
    new vis.Graph3d(container, dataset, options);
}

//
// Load the data then render the vizualization.
//
function loadViz() {
    fetch("data.json")
        .catch(err => {
            console.error("Failed to load data.");
            console.error(err && err.stack || err);
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            renderViz(data);
        })
        .catch(err => {
            console.error("Failed to render visualization.");
            console.error(err && err.stack || err);
        });
}