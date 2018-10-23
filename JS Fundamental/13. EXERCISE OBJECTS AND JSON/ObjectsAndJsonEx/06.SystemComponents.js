function systemComponents(inputArr) {
    let register = new Map();

    for (let line of inputArr) {
        let [system, component, subComponent] = line.split(/\s*\|\s*/);

        if (!register.has(system)) {
            register.set(system, new Map());
        }

        if (!register.get(system).has(component)) {
            register.get(system).set(component, []);
        }

        register.get(system).get(component).push(subComponent);
    }

    let systemsSorted = Array.from(register.keys())
        .sort((s1, s2) => sortSystems(s1, s2));

    for (let system of systemsSorted) {
        console.log(system);

        let componentsSorted = Array.from(register.get(system).keys())
            .sort((c1, c2) => sortComponents(system, c1, c2));

        for (let component of componentsSorted) {
            console.log(`|||${component}`);

            register.get(system).get(component)
                .forEach(x => console.log(`||||||${x}`));
        }
    }

    function sortSystems(s1, s2) {
        if (register.get(s1).size !== register.get(s2).size) {
            return register.get(s2).size - register.get(s1).size;
        } else {
            return s1.toLowerCase().localeCompare(s2.toLowerCase());
        }
    }

    function sortComponents(system, c1, c2) {
        return register.get(system).get(c2).length -
            register.get(system).get(c1).length;
    }
}

function solve(inputArr) {
    let register = new Map();

    for (let line of inputArr) {
        let [system, component, subComponent] = line.split(/\s*\|\s*/);

        if (!register.has(system)) {
            register.set(system, new Map());
        }

        if (!register.get(system).has(component)) {
            register.get(system).set(component, []);
        }

        register.get(system).get(component).push(subComponent);
    }

    let systemsSorted = Array.from(register.keys())
        .sort((s1, s2) => sortSystems(s1, s2));

    for (let system of systemsSorted) {
        console.log(system);

        let componentsSorted = Array.from(register.get(system).keys())
            .sort((c1, c2) => sortComponents(system, c1, c2));

        for (let component of componentsSorted) {
            console.log(`|||${component}`);

            register.get(system).get(component)
                .forEach(subComponent => console.log(`||||||${subComponent}`));
        }
    }

    function sortSystems(s1, s2) {
        if (register.get(s1).size !== register.get(s2).size) {
            return register.get(s2).size - register.get(s1).size;
        } else {
            return s1.toLowerCase().localeCompare(s2.toLowerCase());
        }
    }

    function sortComponents(system, c1, c2) {
        return register.get(system).get(c2).length -
            register.get(system).get(c1).length;
    }
}

solve([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]);