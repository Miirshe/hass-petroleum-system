var btnAction = 'insert';

fetch_categories_fn();

function showModal() {
    $("#categoryModal").modal('show');
}

function resetForm() {
    $("#categoryForm")[0].reset();
}

$("#id").hide();

$("#closeModal").on('click', function() {
    hideModal();
})

function hideModal() {
    $("#categoryModal").modal('hide');
}

function clearTable() {
    $("#tableData tr").html(' ');
}

$("#addNew").on('click', function() {
    showModal();
})

$("#categoryForm").on('submit', function(e) {
    e.preventDefault();
    let id = $("#id").val();
    let name = $("#name").val();
    let icon = $("#icon").val();
    let role = $("#role").val();

    let sendingData = {};

    if (btnAction == 'insert') {

        sendingData = {
            "name": name,
            "icon": icon,
            "role": role,
            "action": 'register_category_api'
        }

    } else {

        sendingData = {
            "id": id,
            "name": name,
            "icon": icon,
            "role": role,
            "action": 'update_category_api'
        }

    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/categories.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {
                fetch_categories_fn();
                disPlayMessage('success', response);
                btnAction = 'insert'
            } else {
                disPlayMessage('error', response);
            }

        },
        error: function(data) {

            disPlayMessage('error', data.data);

        }
    })

})

function disPlayMessage(type, message) {
    let success = document.querySelector('.alert-success');
    let error = document.querySelector('.alert-danger');
    if (type == 'success') {
        error.classList = 'alert alert-danger d-none';
        success.classList = 'alert alert-success';
        success.innerHTML = message;
        setTimeout(() => {
            resetForm();
            success.classList = 'alert alert-success d-none';
            hideModal();
        }, 3000)
    }

}


function fetch_categories_fn() {
    clearTable();
    let sendingData = {
        "action": "read_all_categories_api"
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/categories.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            console.log(response);
            let tr = '';
            let th = '';
            if (status) {

                response.forEach(res => {
                    tr += '<tr>';
                    th = '<tr>';

                    for (let i in res) {
                        th += `<th>${i}</th>`;
                    }
                    th += '<th>Actions</th>';
                    th += '</tr>';


                    for (let i in res) {
                        tr += `<td>${res[i]}</td>`;
                    }
                    tr += `
					<td>
					<a class="btn btn-success text-white update_info" update_id = "${res['id']}">Edit</a>
					<a class="btn btn-danger text-white delete_info" delete_id = "${res['id']}">Delete</a>
					</td>`;
                    tr += '</tr>';

                });

                $("#tableData thead").append(th);
                $("#tableData tbody").append(tr);


            } else {
                console.log('error', response);
            }

        },
        error: function(data) {

            console.log(data.data);

        }
    })

}

function delete_category_fn(id) {
    let sendingData = {
        "action": "delete_category_api",
        "id": id
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/categories.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {
                fetch_categories_fn();
                alert(response);
            } else {
                alert(response);
            }

        },
        error: function(data) {

            console.log('error', data.data);

        }
    })
}

$("#tableData tbody").on('click', 'a.delete_info', function() {

    let id = $(this).attr('delete_id');

    if (confirm('Are you sure you want to delete')) {

        delete_category_fn(id);

    }
})

function read_category_fn(id) {
    let sendingData = {
        "action": "read_category_api",
        "id": id
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/categories.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {

                $("#id").val(response[0].id);
                $("#name").val(response[0].name);
                $("#icon").val(response[0].icon);
                $("#role").val(response[0].role);

                btnAction = 'update'

            } else {
                console.log(response);
            }

        },
        error: function(data) {

            console.log('error', data.data);

        }
    })
}

$("#tableData tbody").on('click', 'a.update_info', function() {

    let id = $(this).attr('update_id');
    showModal();
    read_category_fn(id);
})