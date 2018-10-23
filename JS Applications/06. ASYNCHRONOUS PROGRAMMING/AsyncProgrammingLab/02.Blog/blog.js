function attachEvents() {
    const URL = 'https://baas.kinvey.com/appdata/kid_SkOUHGqNm/';
    const USERNAME = 'peter';
    const PASSWORD = 'p';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const AUTH = {'Authorization': 'Basic ' + BASE_64};
    const SELECT = $('#posts');
    const TITLE = $('#post-title');
    const BODY = $('#post-body');
    const COMMENTS = $('#post-comments');

    $('#btnLoadPosts').on('click', loadPosts);
    $('#btnViewPost').on('click', viewPost);

    function loadPosts() {
        let request = {
            url: URL + 'posts',
            method: 'GET',
            headers: AUTH
        };

        $.ajax(request)
            .then(function (posts) {
                for (const post of posts) {
                    let option = $('<option>')
                        .text(post['title'])
                        .attr('id', post['_id'])
                        .attr('body', post['body']);
                    SELECT.append(option);
                }
            })
            .catch(displayError);
    }

    function viewPost() {
        let selectedElement = SELECT.find(':selected');
        let id = selectedElement.attr('id');
        let request = {
            method: 'GET',
            url: URL + `comments/?query={"post_id":"${id}"}`,
            headers: AUTH
        };

        $.ajax(request)
            .then(function (comments) {
                BODY.empty();
                COMMENTS.empty();

                let title = selectedElement.text();
                let body = selectedElement.attr('body');
                TITLE.text(title);
                BODY.text(body);

                for (const comment of comments) {
                    let li = $('<li>')
                        .text(comment['text']);
                    COMMENTS.append(li);
                }
            })
            .catch(displayError);
    }

    function displayError(err) {
        let errorDiv = $('<div>')
            .text("Error: " + err.status + ' (' + err.statusText + ')');
        $(document.body).prepend(errorDiv);

        setTimeout(function () {
            $(errorDiv).fadeOut(function () {
                $(errorDiv).remove();
            });
        }, 1500);
    }
}