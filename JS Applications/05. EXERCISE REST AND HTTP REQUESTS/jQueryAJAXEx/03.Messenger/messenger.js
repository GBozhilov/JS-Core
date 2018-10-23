function attachEvents() {
    let baseServiceUrl = 'https://messenger-26d9e.firebaseio.com/messenger';
    $('#submit').on('click', createMessage);
    $('#refresh').on('click', loadMessages);

    loadMessages();

    function loadMessages() {
        $.get(baseServiceUrl + '.json')
            .then(displayMessages);
    }

    function displayMessages(messages) {
        $('#messages').empty();
        let orderedMessages = {};
        messages = Object.keys(messages)
            .sort((a, b) => a.timestamp - b.timestamp)
            .forEach(k => orderedMessages[k] = messages[k]);

        let result = '';

        for (const message in orderedMessages) {
            let author = orderedMessages[message]['author'];
            let content = orderedMessages[message]['content'];
            result += `${author}: ${content}\n`;
        }

        $('#messages').text(result.slice(0, -1));
    }

    function createMessage() {
        let data = {
            author: $('#author').val(),
            content: $('#content').val(),
            timestamp: Date.now()
        };

        $('#content').val('');

        $.post(baseServiceUrl + '.json', JSON.stringify(data))
            .then(loadMessages);
    }
}