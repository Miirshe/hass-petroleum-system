var btnAction = 'insert';
loadData();

function showModal() {
    $("#fuelModal").modal('show');
}

$("#id").hide();

function resetForm() {
    $("#fuelForm")[0].reset();
}

function hideModal() {
    $("#fuelModal").modal('hide');
}

$("#addNew").on("click", () => {
    showModal();
})
$("#closeModal").on("click", () => {
    hideModal();
})

function clearData() {
    $("#tableData tr").html('');
}

$("#fuelForm").on("submit", (e) => {
    e.preventDefault();
    var id = $("#id").val();
    var tunk_number = $("#tunk_number").val();
    var tunk_capacity = $("#tunk_capacity").val();
    var fuel_type = $("#fuel_type").val();
    var price_per_litter = $("#price_per_litter").val();
    let sendingData = {}
    if (btnAction === 'insert') {
        sendingData = {
            "tunk_number": tunk_number,
            "tunk_capacity": tunk_capacity,
            "fuel_type": fuel_type,
            "price_per_litter": price_per_litter,
            "action": "register_fuel_api"
        }
    } else {
        sendingData = {
            "id": id,
            "tunk_number": tunk_number,
            "tunk_capacity": tunk_capacity,
            "fuel_type": fuel_type,
            "price_per_litter": price_per_litter,
            "action": "update_fuel_api"
        }
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/fuel.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {
                displayMessage('success', response);
                btnAction = 'insert';
                loadData();
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
        "action": "read_all_fuel_api"
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/fuel.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            let th = '';
            let tr = '';
            if (status) {
                response.forEach(res => {
                    tr += '<tr>';
                    th = '<tr>';

                    for (let i in res) {
                        th += `<th>${i}</th>`;
                    }
                    th += "<th>Action</th>";
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

function delete_single_fuel(id) {
    let sendingData = {
        "action": "delete_single_fuel_api",
        "id": id
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/fuel.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {
                alert(response);
                loadData();
            } else {
                console.log('error', response)
            }
        },
        error: function(data) {
            console.log('error', data.responseText);
        }
    })

}

$("#tableData tbody").on("click", "a.delete_info", function() {

    var id = $(this).attr("delete_id");

    if (confirm("Are you sure you want to delete this fuel?")) {

        delete_single_fuel(id);

    }
})

function read_single_fuel(id) {
    let sendingData = {
        "action": "read_single_fuel_api",
        "id": id
    }

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/fuel.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            if (status) {
                $("#id").val(response[0].id);
                $("#tunk_number").val(response[0].tunk_number);
                $("#tunk_capacity").val(response[0].tunk_capacity);
                $("#fuel_type").val(response[0].fuel_type);
                $("#price_per_litter").val(response[0].price_per_litter);
                btnAction = 'update';
                loadData();
            } else {
                console.log('error', response)
            }
        },
        error: function(data) {
            console.log('error', data.responseText);
        }
    })

}

$("#tableData tbody").on("click", "a.update_info", function() {

    var id = $(this).attr("update_id");
    showModal();
    read_single_fuel(id);

})