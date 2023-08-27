var btnAction = 'insert';
loadData();

function resetForm() {
    $("#supplierForm")[0].reset();
}

function clearData() {
    $("#tableData tr").html('');
}

function showModal() {
    $("#supplierModal").modal('show');
}

$("#id").hide();

function hideModal() {
    $("#supplierModal").modal('hide');
}

$("#addNew").on("click", function() {
    showModal();
})

$("#closeModal").on("click", function() {
    hideModal();
})

$("#supplierForm").on("submit", function(e) {
    e.preventDefault();
    id = $("#id").val();
    name = $("#name").val();
    email = $("#email").val();
    phone = $("#phone").val();
    address = $("#address").val();

    let sendingData = {};
    if (btnAction === 'insert') {

        sendingData = {
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "action": "register_supplier_api"
        }

    } else {

        sendingData = {
            "id": id,
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "action": "update_supplier_api"
        }

    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/supplier.php',
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
            displayMessage(data.responseText);
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
            success.classList = 'alert alert-success d-none';
            resetForm();
            hideModal();
        }, 3000)
    } else {
        error.classList = 'alert alert-danger';
        error.innerHTML = message;
    }
}

function loadData() {
    clearData();
    let sendingData = {
        "action": "read_all_supplier_api"
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/supplier.php',
        data: sendingData,
        success: function(data) {

            let status = data.status;

            let response = data.data;

            let tr = '';
            let th = '';

            if (status) {

                response.forEach(res => {

                    tr += '<tr>';
                    th = '<tr>';

                    for (let i in res) {

                        th += `<th>${i}</th>`

                    }
                    th += '<th>Actions</th>';

                    th += '</tr>';

                    for (let i in res) {

                        tr += `<td>${res[i]}</td>`

                    }

                    tr += `
					<td>
					<a class="btn btn-success text-white update_info" update_id="${res['id']}">Edit</a>
					<a class="btn btn-danger text-white delete_info" delete_id="${res['id']}">Delete</a>
					</td>
					`
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

function delete_single_supplier_info(id) {

    let sendingData = {

        "action": "delete_single_supplier_api",
        "id": id

    };

    $.ajax({

        method: 'POST',
        dataType: 'JSON',
        url: '../api/supplier.php',
        data: sendingData,
        success: function(data) {

            let status = data.status;
            let response = data.data;

            if (status) {
                alert(response);
                loadData();
            } else {
                alert(response);
            }
        },
        error: function(data) {
            console.log(data.responseText);
        }
    })

}

$("#tableData tbody").on("click", 'a.delete_info', function() {

    let id = $(this).attr('delete_id');
    if (confirm("are you sure you want to delete this info?")) {
        delete_single_supplier_info(id);
    }

})

function read_single_supplier_info(id) {

    let sendingData = {

        "action": "read_single_supplier_api",
        "id": id

    };

    $.ajax({

        method: 'POST',
        dataType: 'JSON',
        url: '../api/supplier.php',
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
                btnAction = 'update';
                loadData();
            } else {
                console.log(response);
            }
        },
        error: function(data) {
            console.log(data.responseText);
        }
    })

}

$("#tableData tbody").on("click", 'a.update_info', function() {

    let id = $(this).attr('update_id');
    showModal();
    read_single_supplier_info(id);
})