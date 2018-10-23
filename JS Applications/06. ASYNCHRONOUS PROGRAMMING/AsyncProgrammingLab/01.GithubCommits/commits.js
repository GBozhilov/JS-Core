function loadCommits() {
    let list = $('#commits').empty();
    let url = 'https://api.github.com/repos/' +
        $('#username').val() + '/' +
        $('#repo').val() + '/commits';

    $.get(url)
        .then(displayCommits)
        .catch(displayError);

    function displayCommits(commits) {
        for (const commit of commits) {
            let author = commit['commit']['author']['name'];
            let message = commit['commit']['message'];
            let liText = author + ': ' + message;
            let li = $('<li>').text(liText);
            list.append(li);
        }
    }

    function displayError(err) {
        let text = 'Error: ' + err.status + ' (' + err.statusText + ')';
        list.append($('<li>').text(text));
    }
}