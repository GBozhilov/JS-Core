function solve(usernames) {
    let users = new Set();

    usernames.forEach(u => users.add(u));

    Array.from(users)
        .sort((u1, u2) => sortUsers(u1, u2))
        .forEach(u => console.log(u));

    function sortUsers(u1, u2) {
        if (u1.length !== u2.length) {
            return u1.length - u2.length;
        } else {
            return u1.localeCompare(u2);
        }
    }
}

solve([
    'Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Ariel',
    'Braston',
    'Lilly'
]);