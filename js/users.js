var btnAction = 'insert';

displayData();

$("#id").hide();

$("#addNew").on("click", function() {
    showModal()
});

$("#closeModal").on("click", function() {
    hideModal();
})

function showModal() {
    $("#userModal").modal('show');
}

function hideModal() {
    $("#userModal").modal('hide');
}

function resetForm() {
    $("#userForm")[0].reset();
}

$("#image").on("change", function(e) {
    let image_file = e.target.files[0];
    let show_image = document.querySelector("#imageshow");
    let reader = new FileReader();
    reader.readAsDataURL(image_file);

    reader.onload = e => {
        show_image.src = e.target.result;
    }

})

$("#userForm").on("submit", (e) => {

    e.preventDefault();

    let form_data = new FormData($("#userForm")[0]);

    form_data.append("image", $("input[type='file']")[0].files[0]);

    if (btnAction == 'insert') {

        form_data.append("action", "register_user_api");

    } else {

        form_data.append("action", "update_user_api");
    };



    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/users.php',
        contentType: false,
        processData: false,
        data: form_data,
        success: function(data) {

            let status = data.status;
            let response = data.data;

            if (status) {

                displayMessage('success', response);

            } else {

                displayMessage('error', response);

            }
        },
        error: function(data) {

            displayMessage('error', data.responseText);

        }
    })
})

function displayMessage(type, message) {

    let success = document.querySelector('.alert-success');
    let error = document.querySelector('.alert-danger');

    if (type == 'success') {

        error.classList = 'alert alert-danger d-none';
        success.classList = 'alert alert-success';
        success.innerHTML = message;
        setTimeout(() => {
            success.classList = 'alert alert-success d-none';
            resetForm();
            hideModal();
        }, 3000);

    } else {
        error.classList = 'alert alert-danger';
        error.innerHTML = message;
    }

}

function displayData() {
    $("#tableData tr").html(' ');
    let sendingData = {
        "action": "fecth_users_info_api"
    }
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/users.php",
        data: sendingData,
        success: function(data) {

            let status = data.status;
            let response = data.data;

            if (status) {

                let tr = '';
                let th = '';

                response.forEach(res => {

                    tr += '<tr>';
                    th = '<>';

                    for (let i in res) {

                        th += `<th>${i}</th>`;
                    }
                    th += '<th>Action</th>';
                    th += '</tr>';

                    for (let i in res) {
                        if (i == 'image') {

                            tr += `<td><img style="width:50px;height :50px ; border-radius : 100% ; object-fit : 'cover' "  src='../uploads/${res['image']}'/></td>`
                        } else {

                            tr += `<td>${res[i]}</td>`

                        }
                    }
                    tr += `<td>
                    <a class="btn btn-sucess update_info" update_id="${res['id']}">Edit</a>
                    <a class="btn btn-sucess delete_info" delete_id="${res['id']}">Delete</a>
                    </td>`;
                    tr += '</tr>';

                });

                $("#tableData thead").append(th);
                $("#tableData tbody").append(tr);
                console.log("user info", response);
            }
        },
        error: function(data) {
            displayMessage('error', data.responseText);
        }
    })
}

function delete_user_info(id) {


    let sendingData = {
        'action': 'delete_user_info_api',
        'id': id
    }
    $.ajax({

        method: "POST",
        dataType: "JSON",
        url: "../api/users.php",
        data: sendingData,
        success: function(data) {

            let status = data.status;
            let response = data.data;

            if (status) {

                alert(response)
                displayData();

            } else {
                alert(response)
            }

        },

        error: function(data) {}
    })
}


$("#tableData tbody").on("click", "a.delete_info", function() {

    let id = $(this).attr("delete_id");
    if (confirm("are you sure you want to delete this user info")) {
        delete_user_info(id);
    }

})

function fetch_single_user_info(id) {
    let sendingData = {
        'action': 'fetch_single_user_info_api',
        'id': id
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/users.php',
        data: sendingData,
        success: function(data) {

            let status = data.status;

            let response = data.data;

            if (status) {
                $("#id").val(response[0].id);
                $("#username").val(response[0].username);
                $("#email").val(response[0].email);
                $("#rollType").val(response[0].rollType);
                $("#phone").val(response[0].phone);
                $("#imageshow").attr('src', `../uploads/${response[0].image}`);

                btnAction = 'update';

            }

        },
        error: function(data) {
            console.log(data.responseText);
        }
    })
}

$("#tableData tbody").on("click", "a.update_info", function() {

    let id = $(this).attr("update_id");
    showModal();
    fetch_single_user_info(id);

})