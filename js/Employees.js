var btnAction = 'insert';
displayData();
$("#id").hide();

function resetForm() {
    $("#employeeForm")[0].reset();
}

function showModal() {
    $("#employeeModal").modal('show');
}

function hideModal() {
    $("#employeeModal").modal('hide');
}

function clearTable() {
    $("#tableData tr").html('');
}
$("#addNew").on('click', function() {
    showModal();
})
$("#closeModal").on("click", function() {
    hideModal();
})



$("#employeeForm").on("submit", function(e) {
    e.preventDefault();
    let id = $("#id").val();
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let position = $("#position").val();

    let sendingData = {};

    if (btnAction == 'insert') {

        sendingData = {
            "name": name,
            "email": email,
            "phone": phone,
            "position": position,
            "action": "register_employee_api",
        }

    } else {

        sendingData = {

            "id": id,
            "name": name,
            "email": email,
            "phone": phone,
            "position": position,
            "action": "update_employee_api",
        }

    }



    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "../api/Employees.php",
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;

            if (status) {
                displayData();
                displayMessage('success', response);
                btnAction = 'insert';
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

    if (type === 'success') {
        error.classList = 'alert alert-danger d-none';
        success.classList = 'alert alert-success';
        success.innerHTML = message;
        setTimeout(() => {
            resetForm();
            success.classList = 'alert alert-success d-none';
            hideModal();
        }, 3000)
    } else {
        error.classList = 'alert alert-danger';
        error.innerHTML = message;
    }

}

function displayData() {

    clearTable();

    let sendingData = {
        "action": "fetch_employees_api"
    }

    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/Employees.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            let th = '';
            let tr = '';

            if (status) {

                response.forEach(employee => {

                    th = '<tr>';
                    tr += '<tr>';

                    for (let i in employee) {
                        th += `<th>${i}</th>`
                    }
                    th += '<th>Actions</th>'
                    th += '</tr>';

                    for (let i in employee) {
                        tr += `<td>${employee[i]}</td>`
                    }
                    tr += `<td>
					<a class=" btn btn-success update_info text-white " update_id = '${employee['id']}'>Edit</a>
					<a class=" btn btn-danger delete_info text-white " delete_id = '${employee['id']}'>Delete</a>
					</td>`;
                    tr += '</tr>';

                });

                $("#tableData thead").append(th);
                $("#tableData tbody").append(tr);
            }
        },
        error: function(data) {
            console.log(data.responseText);
        }
    })
}

function delete_employee_info(id) {

    let sendingData = {
        "action": 'delete_employee_info_api',
        "id": id
    }
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "../api/Employees.php",
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;

            if (status) {
                alert('success', response);
                displayData();
            } else {
                alert('error', response);

            }
        },
        error: function(data) {
            console.log('error', data.responseText);

        }
    })
}

$("#tableData tbody").on("click", "a.delete_info", function() {
    let id = $(this).attr("delete_id");

    if (confirm("Are you sure you want to delete")) {
        delete_employee_info(id);
    }
})

function fetch_single_employee_info(id) {
    let sendingData = {
        "action": "fetch_single_employee_api",
        "id": id
    }

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/Employees.php",
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {

                $("#id").val(response[0].id);
                $("#name").val(response[0].name);
                $("#email").val(response[0].email);
                $("#phone").val(response[0].phone);
                $("#position").val(response[0].position);

                btnAction = 'update';
            }

        },
        error: function(data) {
            console.log(data);
        }
    })
}
$("#tableData tbody").on("click", "a.update_info", function() {
    let id = $(this).attr("update_id");
    showModal();
    fetch_single_employee_info(id);
})