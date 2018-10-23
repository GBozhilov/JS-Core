function toggle() {
    let div = document.getElementById('extra');
    let span = document.getElementsByClassName('button')[0];
    let button = document.getElementsByClassName('button')[0];

    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.textContent = 'Less';
        return;
    }

    div.style.display = 'none';
    button.textContent = 'More';
}