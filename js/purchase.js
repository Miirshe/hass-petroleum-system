$("#addNew").on("click", function() {
    window.location.href = '/pages/add_edit_purchase.php';
})

loadData();

function loadData() {

    let sendingData = {
        "action": "read_all_purchase_api"
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/add_edit_purchase.php',
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
                    <a class=" btn btn-success text-white update_info" update_id="${res['id']}">Edit</a>
                    <a class=" btn btn-danger text-white delete_info" delete_id="${res['id']}">Delete</a>
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

function delete_purchase_info(id) {

    let sendingData = {
        "action": "delete_purchase_api",
        "id": id
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/add_edit_purchase.php',
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
        delete_purchase_info(id);
    }
})