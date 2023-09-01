$("#id").hide();
var btnAction = 'insert';

$("#addNew").on("click", function() {
    window.location.href = '/pages/sale_operations.php';
})

$("#closeModal").on("click", function() {
    window.location.href = '/pages/sales.php';
})

function resetForm() {
    $("#saleForm")[0].reset();
}

function clearCustomerOption() {
    $("#customer_name").html('');
}

function clearFuelTypeOption() {
    $("#fuel_type").html('');
}

read_all_customer_select_options();

read_all_fuel_type_select_options();

function read_all_customer_select_options() {

    clearCustomerOption();

    let sendingdata = {
        "action": "read_all_customer_api"
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/sale_operations.php',
        data: sendingdata,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            let options = '';
            let checkOptions = ''
            if (status) {
                response.forEach(res => {
                    for (let i in res) {
                        if (res['name'] !== checkOptions) {
                            options += `<option class=" get_info" get_name="${res['name']}" value="${res['name']}">${res['name']}</option>`;
                        }
                        checkOptions = res['name'];
                    }

                });
            }
            $("#customer_name").append(options);
        },
        error: function(data) {
            console.log(data.responseText);
        }
    })
}

function fetch_single_customer(name) {
    let sendingData = {
        "action": "read_single_customer_api",
        "name": name
    };

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/sale_operations.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            console.log(response);
            if (status) {
                $("#customer_phone").val(response[0].phone);
                $("#customer_address").val(response[0].address);
            }
        },
        error: function(data) {
            console.log(data);
        }
    })

}

$("#customer_name").change(function() {
    let name = $("#customer_name").val();
    console.log("name", name);
    fetch_single_customer(name)
});

function read_all_fuel_type_select_options() {
    clearFuelTypeOption();
    let sendingData = {
        "action": "read_all_fuel_api"
    }
    $.ajax({
        method: "POST",
        dataType: "json",
        url: '../api/sale_operations.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            let html = '';
            let checkfuelType = '';

            if (status) {

                response.forEach(res => {

                    for (let i in res) {

                        if (res['fuel_type'] !== checkfuelType) {

                            html += `<option value="${res['fuel_type']}" >${res['fuel_type']}</option>`

                        }

                        checkfuelType = res['fuel_type'];
                    }
                })
            }
            $("#fuel_type").append(html);
        },
        error: function(data) {
            console.log(data);
        }
    })
}


function fetch_single_fuel(fuel_type) {
    let sendingData = {
        "action": "read_single_fuel_api",
        "fuel_type": fuel_type
    };

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/sale_operations.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            console.log(response);
            if (status) {
                $("#tunk_number").val(response[0].tunk_number);
                $("#tunk_capacity").val(response[0].tunk_capacity);
                $("#price_per_litter").val(response[0].price_per_litter);
                let total = 0.0;
                let litters = null;
                const add_event_litter_inputs = document.querySelector('#litters');
                add_event_litter_inputs.addEventListener('input', function(e) {
                    litters = e.target.value;
                    let price_per_litter = $("#price_per_litter").val();
                    total = litters * price_per_litter;
                    $("#total_price").val(total);
                })

            }
        },
        error: function(data) {
            console.log(data);
        }
    })

}

$("#fuel_type").change(function() {
    let fuel_type = $("#fuel_type").val();
    fetch_single_fuel(fuel_type)
});


$("#saleForm").on("submit", function(e) {
    e.preventDefault();
    let id = $("#id").val();
    let customer_name = $("#customer_name").val();
    let customer_phone = $("#customer_phone").val();
    let customer_address = $("#customer_address").val();
    let fuel_type = $("#fuel_type").val();
    let tunk_number = $("#tunk_number").val();
    let tunk_capacity = $("#tunk_capacity").val();
    let litters = $("#litters").val();
    let price_per_litter = $("#price_per_litter").val();
    let total_price = $("#total_price").val();
    let status = $("#status").val();
    let sendingData = {}

    if (btnAction == 'insert') {
        sendingData = {
            "customer_name": customer_name,
            "customer_phone": customer_phone,
            "customer_address": customer_address,
            "fuel_type": fuel_type,
            "tunk_number": tunk_number,
            "tunk_capacity": tunk_capacity,
            "litters": litters,
            "price_per_litter": price_per_litter,
            "total_price": total_price,
            "status": status,
            "action": "register_sale_api"
        }
    } else {
        sendingData = {
            "id": id,
            "customer_name": customer_name,
            "customer_phone": customer_phone,
            "customer_address": customer_address,
            "fuel_type": fuel_type,
            "tunk_number": tunk_number,
            "tunk_capacity": tunk_capacity,
            "litters": litters,
            "price_per_litter": price_per_litter,
            "total_price": total_price,
            "status": status,
            "action": "update_sale_api"
        }
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/sale_operations.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;

            if (status) {
                displayMessage('success', response);
                btnAction = 'insert'
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
        }, 3000)
    } else {
        error.classList = 'alert alert-danger';
        error.innerHTML = message;
    }
}

loadData();

function loadData() {

    let sendingData = {
        "action": "read_all_sale_api"
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/sale_operations.php',
        data: sendingData,
        success: function(data) {

            let status = data.status;
            let response = data.data;
            let th = '';
            let tr = '';

            if (status) {

                response.forEach(res => {

                    th = '<tr>';
                    tr += '<tr>';

                    for (let i in res) {

                        th += `<th>${i}</th>`;

                    }

                    th += '<th>Action</th>';
                    th += '</tr>';


                    for (let i in res) {

                        tr += `<td>${res[i]}</td>`;

                    }

                    tr += `
                    <td>
                    <a href='/pages/sale_operations.php?id=${res['id']}' class=" btn btn-success p-2 rounded text-white update_info" update_id="${res['id']}"><i class="fas fa-edit"></i></a>
                    <a class=" btn btn-danger p-2 rounded text-white delete_info" delete_id="${res['id']}"><i class="fas fa-trash"></i></a>
                    </td>
                    `;
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

function delete_sale_info(id) {

    let sendingData = {
        "action": "delete_sale_api",
        "id": id
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/sale_operations.php',
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

$("#tableData tbody").on("click", "a.delete_info", function() {
    let id = $(this).attr("delete_id");
    if (confirm("are you sure you want to delete ?")) {
        delete_sale_info(id);
    }
})

function fetch_single_sale_info(id) {
    let sendingData = {
        "action": "read_single_sale_api",
        "id": id
    };

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/sale_operations.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            console.log("response : ", response);
            if (status) {

                $("#id").val(response[0].id);
                $("#customer_name").val(response[0].c_name);
                $("#customer_phone").val(response[0].c_phone);
                $("#customer_address").val(response[0].c_address);
                $("#fuel_type").val(response[0].f_type);
                $("#tunk_number").val(response[0].t_number);
                $("#tunk_capacity").val(response[0].t_capacity);
                $("#litters").val(response[0].litters);
                $("#price_per_litter").val(response[0].p_per_litter);
                $("#total_price").val(response[0].t_price);
                $("#status").val(response[0].status);
                btnAction = 'update';

            }
        },
        error: function(data) {
            console.log(data.responseText);
        }
    })
}
const saleId = $("#id").val();
fetch_single_sale_info(saleId);