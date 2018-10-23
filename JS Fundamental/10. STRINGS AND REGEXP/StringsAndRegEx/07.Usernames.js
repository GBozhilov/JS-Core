function printUsers(inputEmails) {
    let result = [];

    for (let email of inputEmails) {
        let [alias, domain] = email.split('@');
        let username = alias + '.';
        let domainParts = domain
            .split('.')
            .forEach(p => username += p[0]);

        result.push(username);
    }

    console.log(result.join(', '));
}

printUsers([
    'peshoo@gmail.com',
    'todor_43@mail.dir.bg',
    'foo@bar.com'
]);