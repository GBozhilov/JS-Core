function gladiatorInventory(inputArr) {
    let inventory = inputArr.shift().split(' ');

    for (let commandLine of inputArr) {
        if (commandLine === 'Fight!') break;

        let index;
        let [command, equipment] = commandLine.split(' ');

        switch (command) {
            case 'Buy':
                if (!inventory.includes(equipment)) {
                    inventory.push(equipment);
                }
                break;
            case 'Trash':
                inventory = inventory.filter(e => e !== equipment);
                break;
            case 'Repair':
                index = inventory.indexOf(equipment);
                if (index > -1) {
                    let removed = inventory.splice(index, 1);
                    inventory.push(removed[0]);
                }
                break;
            case 'Upgrade':
                let [item, upgrade] = equipment.split('-');
                index = inventory.indexOf(item);
                if (index > -1) {
                    inventory.splice(index + 1, 0, `${item}:${upgrade}`);
                }
        }
    }

    console.log(inventory.join(' '));
}

// gladiatorInventory([
//     'SWORD Shield Spear',
//     'Buy Bag',
//     'Trash Shield',
//     'Repair Spear',
//     'Upgrade SWORD-Steel',
//     'Fight!'
// ]);
gladiatorInventory([
    'SWORD Shield Spear',
    'Trash Bow',
    'Repair Shield',
    'Upgrade Helmet-V',
    'Fight!'
]);