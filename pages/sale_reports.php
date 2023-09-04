<?php
include './header.php';
include './navbar.php';
include './sidebar.php';
?>
<div class="dashboard-wrapper">
<div class="container-fluid  dashboard-content">
<div class="row">
     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
         <div class="page-header">
             <h2 class="pageheader-title">Sale Report</h2>
             <div class="page-breadcrumb">
                 <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">HASS -> Petroleum System / </a></li>
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Report</a></li>
                         <li class="breadcrumb-item active" aria-current="page">Sale Reports</li>
                     </ol>
                 </nav>
             </div>
         </div>
     </div>
  </div>
<div class="row">
      <!-- ============================================================== -->
      <!-- basic table  -->
      <!-- ============================================================== -->
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
              <h5 class="card-header">Sale Reports</h5>
              <div class="card-body">
			  <form id="saleReport">
				<div class="row justify-content-between align-items-center mt-2">	
                  <div class="col-sm-3">
					<select name="type" id="type" class="form-control">
						<option value="0">All</option>
						<option value="custom">custom</option>
					</select>
                  </div>
                  <div class="col-sm-3">
				  <select name="c_name" id="c_name" class="form-control">
					</select>
                  </div>
                  <div class="col-sm-3">
					<input type="date" id="from" name="from" class="form-control p-2">
                  </div>
                  <div class="col-sm-3">
					<input type="date" id="to" name="to" class="form-control p-2">
                  </div>
                  <div class="col-sm-3">
                    <button type="submit" class="btn btn-success mt-2" id="addNew">Get Report Statement</button>
                  </div>
                </div>
				</form>
                <div class="table-responsive mt-2" id="printArea">
                    <table class="table table-striped table-bordered first" id="tableData">
                      <thead>
                      </thead>
                      <tbody>

                      </tbody>
                        
                      </table>
					  <button class="btn btn-success text-white mt-5" id="printReport">Print</button>
					  <button class="btn btn-success text-white mt-5" id="exportReport">Export</button>
                  </div>
              </div>
          </div>
      </div>
      <!-- ============================================================== -->
      <!-- end basic table  -->
      <!-- ============================================================== -->
  </div>
  </div>
</div>


<?php
include './footer.php';
?>
<script src="../js/sale_reports.js"></script>


