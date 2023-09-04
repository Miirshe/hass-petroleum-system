fetch_c_name_into_sales();

$("#c_name").attr("disabled", true);
$("#from").attr("disabled", true);
$("#to").attr("disabled", true);
$("#type").change(function() {
    const type = $("#type").val();
    if (!type == 0) {
        $("#c_name").attr("disabled", false);
        $("#from").attr("disabled", false);
        $("#to").attr("disabled", false);
    }
})

$("#saleReport").on("submit", function(e) {
    e.preventDefault();
    let type = $("#type").val();
    let c_name = $("#c_name").val();
    let from = $("#from").val();
    let to = $("#to").val();

    let sendingData = {
        "c_name": c_name,
        "from": from,
        "to": to,
        "action": "sale_report_api"
    };

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/sale_reports.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let respose = data.data;
            let tr = '';
            let th = '';
            if (status) {

                respose.forEach(res => {
                    tr += "<tr>";
                    th = "<tr>";
                    for (let i in res) {
                        th += `<th>${i}</th>`;
                    }
                    th += '</tr>';

                    for (let i in res) {
                        tr += `<td>${res[i]}</td>`;
                    }
                    tr += '</tr>';
                });

            }
            $("#tableData thead").append(th);
            $("#tableData tbody").append(tr);
        },
        error: function(data) {
            console.log(data);
        }
    })
});

function fetch_c_name_into_sales() {
    $("#c_name").html('');
    let sendingData = {
        "action": "fetc_sale_of_c_name"
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '../api/sale_reports.php',
        data: sendingData,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            let op = '';
            let op_check = ''
            if (status) {
                response.forEach(res => {
                    for (let i in res) {
                        if (res['c_name'] != op_check) {
                            op += `<option value="${res['c_name']}">${res['c_name']}</option> `;
                        }
                        op_check = res[i];
                    }
                })
            }
            $("#c_name").append(op);
        },
        error: function(data) {
            console.log(data);

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