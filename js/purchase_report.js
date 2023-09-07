fetch_single_s_name();
$('#s_name').attr('disabled', true);
$('#from').attr('disabled', true);
$('#to').attr('disabled', true);
$("#type").change(function() {
    const type = $('#type').val();
    console.log('type is : ', type);
    if (type == 'custom') {
        $('#s_name').attr('disabled', false);
        $('#from').attr('disabled', false);
        $('#to').attr('disabled', false);
    } else {

        $('#s_name').attr('disabled', true);
        $('#from').attr('disabled', true);
        $('#to').attr('disabled', true);

    }
})

function clearTable() {
    $('#tableData tr').html('');
}

$('#purchaseReport').on('submit', function(e) {
    clearTable();
    e.preventDefault();
    let s_name = $('#s_name').val();
    let from = $('#from').val();
    let to = $('#to').val();

    let sendingData = {
        's_name': s_name,
        'from': from,
        'to': to,
        'action': 'purchase_report_api'
    }


    $.ajax({

        method: 'POST',
        dataType: 'JSON',
        url: '../api/purchase_report.php',
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
                    th += '</tr>';
                    for (let i in res) {
                        tr += `<td>${res[i]}</td>`
                    }
                    tr += '</tr>';
                });
            }
            $('#tableData thead').append(th);
            $('#tableData tbody').append(tr);
        },
        error: function(data) {
            console.log(data.data);
        }
    });
});

function fetch_single_s_name() {
    let sendingData = {
        'action': 'fetch_single_s_name_api'
    };

    $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: '../api/purchase_report.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            let checkName = '';
            let options = '';
            if (status) {
                response.forEach(res => {

                    for (let i in res) {
                        if (res['s_name'] !== checkName) {
                            options += `<option value='${res['s_name']}'>${res['s_name']}</option>`
                        }
                        checkName = res['s_name'];
                    };

                });
            }
            $('#s_name').append(options);
        },
        error: function(data) {
            console.log(data.data);
        }

    })
}


$("#printReport").on('click', function() {
    print_report_statements();
});

function print_report_statements() {
    let printArea = document.querySelector("#printArea");

    let new_window = window.open('');
    new_window.document.write(`<!doctype html>
	<html lang="en">
	 
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">`)
    new_window.document.write(`
	<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,600&display=swap');
    body{
        font-family: 'Poppins', sans-serif;
        padding:20px !important;
    }

    table{
        width:100%;
        padding:5px !important;
        border-collapse:collapse;
    }
    thead{
        background-color:#35858B;
        color:#ffffff !important;
        padding:5px !important;
    }
    tr{
        padding: 5px !important;
    }
    th , td{
        padding: 5px !important;
        text-align:left !important;
        margin-top: 5px !important;
        border-bottom: 1px solid #ddd !important;
    }
          
	</style> <title>Hass Petroleum system</title>`);
    new_window.document.write(printArea.innerHTML);
    new_window.document.write(`</head><body></body></html>`);
    new_window.print();
    new_window.close();
    new_window.close();
}

$("#exportReport").on("click", function() {
    let file = new Blob([$("#tableData").html()], { type: "application/vnd-ms-excel" });
    let url = URL.createObjectURL(file);
    let a = $("<a />", {
        href: url,
        download: "print_statemenr.xls"
    }).appendTo("body").get(0).click();
    e.preventDefault();
})