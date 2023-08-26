var btnAction = 'insert';
loadData();
$("#closeModal").on("click", function() {
    $("#customerModal").modal("hide");
})

function showModal() {
    $("#customerModal").modal("show");
}

function hideModal() {
    $("#customerModal").modal("hide");
}

function resetForm() {
    $("#customerForm")[0].reset();
}

$("#addNew").on("click", function() {
    showModal();
})

function clearData() {
    $("#tableData tr").html('');
}
$("#id").hide();

$("#customerForm").on("submit", function(e) {
    e.preventDefault();
    let id = $("#id").val();
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let address = $("#address").val();

    let sendingData = {};

    if (btnAction === 'insert') {
        sendingData = {
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "action": "register_customer_api"
        }
    } else {

        sendingData = {
            "id": id,
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "action": "update_customer_api"
        }
    }

    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/customers.php',
        data: sendingData,
        success: function(data) {

            let status = data.status;
            let response = data.data;

            if (status) {
                displayMessage('success', response);
                loadData();
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
        success.innerHTML = message
        setTimeout(() => {
            success.classList = 'alert alert-success d-none';
            resetForm();
            hideModal();
        }, 3000)
    } else {
        error.classList = 'alert alert-success';
        error.innerHTML = message
    }
}

function loadData() {
    clearData();
    let sendingData = {
        "action": "read_all_customers_api"
    }
    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/customers.php',
        data: sendingData,
        success: function(data) {

            let status = data.status;
            let response = data.data;
            let tr = '';
            let th = '';

            if (status) {
                response.forEach(res => {
                    tr += '<tr>'
                    th = '<tr>'

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
					<a class="btn btn-success text-white update_info" update_id="${res['id']}">Edit</a>
					<a class="btn btn-danger text-white delete_info" delete_id="${res['id']}">Delete</a>
					</td>`;
                    tr += '</tr>';

                });
            }

            $("#tableData thead").append(th);
            $("#tableData tbody").append(tr);

        },
        error: function(data) {
            console.log(data.responseText);
        }
    })
}

function delete_customer_info(id) {
    let sendingData = {
        "action": "delete_customers_api",
        "id": id
    }

    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/customers.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {
                alert(response);
                loadData();
            } else {
                console.log(res);
            }
        },
        error: function(data) {
            console.log(data.responseText);
        }
    })
}

$("#tableData tbody").on("click", "a.delete_info", function() {
    let id = $(this).attr("delete_id");
    if (confirm("Are you sure you want to delete")) {
        delete_customer_info(id)
    }
});

function fetch_single_customer_info(id) {
    let sendingData = {
        "action": "read_single_customers_api",
        "id": id
    }

    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/customers.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {
                $("#id").val(response[0].id);
                $("#name").val(response[0].name);
                $("#email").val(response[0].email);
                $("#phone").val(response[0].phone);
                $("#address").val(response[0].address);
                loadData();
                btnAction = 'update';

            } else {
                console.log(res);
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
    fetch_single_customer_info(id)
});