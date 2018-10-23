function students() {
    const URL = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students';
    const USERNAME = 'guest';
    const PASSWORD = 'guest';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const AUTH = {
        'Authorization': 'Basic ' + BASE_64,
        'Content-type': 'application/json'
    };

    loadStudents();
    $('#addStudent').on('click', addStudent);

    function loadStudents() {
        let request = {
            url: URL,
            method: "GET",
            headers: AUTH
        };

        $.get(request)
            .then(displayStudents)
            .catch(displayError);
    }

    function displayStudents(students) {
        $('#results').find('tr').nextAll().remove();
        let sortedStudents = students.sort((a, b) => a.ID - b.ID);

        for (const student of sortedStudents) {
            $('#results')
                .append($('<tr>')
                    .append($('<td>').text(student.ID))
                    .append($('<td>').text(student.FirstName))
                    .append($('<td>').text(student.LastName))
                    .append($('<td>').text(student.FacultyNumber))
                    .append($('<td>').text(student.Grade))
                );
        }
    }

    function addStudent(ev) {
        ev.preventDefault();
        let ID = Number($('#ID').val());
        let FirstName = $('#FirstName').val();
        let LastName = $('#LastName').val();
        let FacultyNumber = $('#FacultyNumber').val();
        let Grade = Number($('#Grade').val());

        let facultyNumberRegex = /^\d+$/;

        if (FirstName.trim() !== "" && LastName.trim() !== "" && facultyNumberRegex.test(FacultyNumber)) {
            let request = {
                url: URL,
                method: "POST",
                headers: AUTH,
                data: JSON.stringify({
                    ID: ID,
                    FirstName: FirstName,
                    LastName: LastName,
                    FacultyNumber: FacultyNumber,
                    Grade: Grade
                })
            };

            $.ajax(request)
                .then(loadStudents)
                .catch(displayError);
        }
    }

    function displayError() {
        alert('Error');
    }
}