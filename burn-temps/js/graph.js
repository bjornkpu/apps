import {fetchAllRecords} from "./api.js";

(async () => {

    if (!localStorage.getItem('apiKey')) return
    var records = await fetchAllRecords({limit:1000})
    console.table(records.list)
    var message = 'Hello World!';
    console.log(message);

    var timeAxis = records.list.map(r => (new Date(r.Time)));

    var trace1 = {
        type: 'line',
        mode: 'lines+markers',
        x: timeAxis,
        y: records.list.map(r => r.Temp1),
        name: 'Display',
        line: {
            dash: 'solid', // dot
            color: 'rgb(82, 64, 219)',
            width: 2
        },
        connectgaps: false,
    }

    var trace2 = {
        type: 'line',
        mode: 'lines+markers',
        x: timeAxis,
        y: records.list.map(r => r.Temp2),
        name: 'Sidehull',
        line: {
            dash: 'dot', // dot
            color: 'rgb(220, 60, 80)',
            width: 2
        },
        connectgaps: false,
    }

    var trace3 = {
        type: 'line',
        mode: 'lines+markers',
        x: timeAxis,
        y: records.list.map(r => r.Temp3),
        name: 'Topphull',
        line: {
            dash: 'dot', // dot
            color: 'rgb(35,163,35)',
            width: 2
        },
        connectgaps: false,
    }


    var data = [ trace1, trace2, trace3 ];

    var layout = {
        title: 'Burn Graph!',
        xaxis: {
            title: 'Time',
            autorange: true,
            type: 'date'
        },
        yaxis: {
            title: 'Temperature',
            autotick: true,
            tick0: 0,
            dtick: 100,
            range: [0, 1200]
        },
        font: {size: 12},
        showlegend: true,
        shapes: [
            {
                type: 'rect',
                xref: 'x',
                yref: 'paper',
                x0: '2024-08-24 14:10:00+00:00',
                y0: 0,
                x1: '2024-08-24 16:30:00+00:00',
                y1: 1,
                fillcolor: '#FF000055',
                opacity: 0.2,
                editable: true,
                line: {
                    width: 0,
                },
                label: {
                    text: 'Heat',
                    font: { size: 10, color: 'green' },
                    textposition: 'top center',
                },
            },
            {
                type: 'rect',
                xref: 'x',
                yref: 'paper',
                x0: '2024-08-24 16:30:00+00:00',
                y0: 0,
                x1: '2024-08-24 18:25:00+00:00',
                y1: 1,
                fillcolor: '#FF000099',
                opacity: 0.2,
                editable: true,
                line: {
                    width: 0,
                },
                label: {
                    text: 'Max temp',
                    font: { size: 10, color: 'green' },
                    textposition: 'top center',
                },
            },
            {
                type: 'rect',
                xref: 'x',
                yref: 'paper',
                x0: '2024-08-24 18:25:00+00:00',
                y0: 0,
                x1: '2024-08-24 18:55:00+00:00',
                y1: 1,
                fillcolor: '#FF0000FF',
                opacity: 0.2,
                editable: true,
                line: {
                    width: 0,
                },
                label: {
                    text: 'Hold',
                    font: { size: 10, color: 'green' },
                    textposition: 'top center',
                },
            },
            {
                type: 'rect',
                xref: 'x',
                yref: 'paper',
                x0: '2024-08-24 18:55:00+00:00',
                y0: 0,
                x1: '2024-08-25 12:00:00+00:00',
                y1: 1,
                fillcolor: '#0000FF55',
                opacity: 0.2,
                editable: true,
                line: {
                    width: 0,
                },
                label: {
                    text: 'Cool',
                    font: { size: 10, color: 'green' },
                    textposition: 'top center',
                },
            },
            // {
            //     type: 'line',
            //     x0: '2015-02-01',
            //     y0: 8,
            //     x1: '2015-02-28',
            //     y1: 8,
            //     fillcolor: '#d3d3d3',
            //     opacity: 0.2,
            //     editable: true,
            //     label: {
            //         text: 'January average',
            //         yanchor: 'top',
            //     },
            // },
        ],
    };

    var config = {responsive: true}


    Plotly.newPlot('graph', data, layout, config );

})();
