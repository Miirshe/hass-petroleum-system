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
             <h2 class="pageheader-title">Fuel Table</h2>
             <div class="page-breadcrumb">
                 <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">HASS -> Petroleum System / </a></li>
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Tables</a></li>
                         <li class="breadcrumb-item active" aria-current="page">Fuel Table</li>
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
              <h5 class="card-header">Fuel Table</h5>
              <div class="card-body">
                <div class="row justify-content-between align-items-center mt-2">
                  <div class="col-sm-6">
                    <button class="btn btn-success " id="addNew">Add New Fuel</button>
                  </div>
                  <div class="col-sm-4">
                    <input type="text" name="search" id="search" class="form-control p-3" placeholder="Search for .....">
                  </div>
                </div>
                  <div class="table-responsive mt-2">
                    <table class="table table-striped table-bordered first" id="tableData">
                      <thead>
                      </thead>
                      <tbody>

                      </tbody>
                        
                      </table>
                  </div>
              </div>
          </div>
      </div>
      <!-- ============================================================== -->
      <!-- end basic table  -->
      <!-- ============================================================== -->
  </div>

  
  </div>
    <div class="modal" tabindex="-1" id="fuelModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Fuel Registration</h5>
              </div>
              <div class="modal-body">
				<form id="fuelForm">
                    <div class="row">
                       <div class="col-sm-12">
                            <div class="alert alert-success d-none" role="alert">
                                A simple success alert—check it out!
                            </div>
                            <div class="alert alert-danger d-none" role="alert">
                                A simple danger alert—check it out!
                            </div>
                        </div>
                    </div>
				    <div class="form-group">
                        <input id="id" name="id" type="text" class="form-control p-3">
                    </div>
				    <div class="form-group">
                        <input id="tunk_number" name="tunk_number" type="text" class="form-control p-3" placeholder="Enter  Tunk_number..">
                    </div>
				    <div class="form-group">
                        <input id="tunk_capacity" name="tunk_capacity" type="text" class="form-control p-3" placeholder="Enter Tunk_capacity">
                    </div>
					<div class="form-group">
                        <input id="fuel_type" name="fuel_type" type="text" class="form-control p-3" placeholder="Enter Fuel_type">
                    </div>
					<div class="form-group">
                        <input id="price_per_litter" name="price_per_litter" type="double" class="form-control p-3" placeholder="Enter Price_per_litter">
                    </div>
				    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">Close</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
				</form>
              </div>
            </div>
          </div>
        </div>
      </div>>
    </div>
</div>


<?php
include './footer.php';
?>
<script src="../js/fuel.js"></script>


