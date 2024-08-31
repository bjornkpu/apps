import {fetchAllRecords, fetchBurns, fetchRecords} from "./api.js";

(async () => {

    if (!localStorage.getItem('apiKey')) return

    var burnNumbers = await fetchBurns();

    const traces = []

    for (const burn of burnNumbers){
        const records = await fetchRecords(burn)
        const firstRecord = new Date(records[0].Time).getTime()

        var timeAxis = records.map(r => {
            const timestamp = new Date(r.Time).getTime()
            const normalizedTs = new Date(timestamp - firstRecord)
            return normalizedTs.toISOString()
        });
        console.table(timeAxis)
        
        traces.push(
            {
                type: 'line',
                mode: 'lines+markers',
                x: timeAxis,
                y: records.map(r => r.Temp1),
                name: `Burn ${burn} - Display`,
                line: {
                    dash: 'solid',
                    color: 'rgb(82, 64, 219)',
                    width: 2
                },
                connectgaps: false,
            },
            {
                type: 'line',
                mode: 'lines+markers',
                x: timeAxis,
                y: records.map(r => r.Temp2),
                name: `Burn ${burn} - Sidehull`,
                line: {
                    dash: 'dot',
                    color: 'rgb(220, 60, 80)',
                    width: 2
                },
                connectgaps: false,
            },
            {
                type: 'line',
                mode: 'lines+markers',
                x: timeAxis,
                y: records.map(r => r.Temp3),
                name: `Burn ${burn} - Topphull`,
                line: {
                    dash: 'dot',
                    color: 'rgb(35,163,35)',
                    width: 2
                },
                connectgaps: false,
            },
        )
    }

    var data = traces;

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
        },
        font: {size: 12},
        showlegend: true,
    };

    var config = {responsive: true}

    Plotly.newPlot('graph', data, layout, config );

})();
