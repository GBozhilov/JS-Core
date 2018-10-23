function attachEventsListeners() {
    let units = {
        'km': 1000,
        'm': 1,
        'cm': 0.01,
        'mm': 0.001,
        'mi': 1609.34,
        'yrd': 0.9144,
        'ft': 0.3048,
        'in': 0.0254,
    };

    document.getElementById('convert')
        .addEventListener('click', convert);

    function convert() {
        let inputNum = +document.getElementById('inputDistance').value;
        let inputUnits = document.getElementById('inputUnits').value;
        let outputUnits = document.getElementById('outputUnits').value;

        let result = inputNum * units[inputUnits] / units[outputUnits];

        document.getElementById('outputDistance').value = result;
    }
}
