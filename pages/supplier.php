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
             <h2 class="pageheader-title">Supplier Table</h2>
             <div class="page-breadcrumb">
                 <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">HASS -> Petroleum System / </a></li>
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Tables</a></li>
                         <li class="breadcrumb-item active" aria-current="page">Supplier Table</li>
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
              <h5 class="card-header">Supplier Table</h5>
              <div class="card-body">
                <div class="row justify-content-between align-items-center mt-2">
                  <div class="col-sm-6">
                    <button class="btn btn-success " id="addNew">Add New Supplier</button>
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
    <div class="modal" tabindex="-1" id="supplierModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Supplier Registration</h5>
              </div>
              <div class="modal-body">
				<form id="supplierForm">
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
                        <input id="name" name="name" type="text" class="form-control p-3" placeholder="Enter Full Name..">
                    </div>
				    <div class="form-group">
                        <input id="email" name="email" type="email" class="form-control p-3" placeholder="Enter Email">
                    </div>
					<div class="form-group">
                        <input id="phone" name="phone" type="number" class="form-control p-3" placeholder="Enter Phone">
                    </div>
					<div class="form-group">
                        <input id="address" name="address" type="text" class="form-control p-3" placeholder="Enter Address">
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
<script src="../js/supplier.js"></script>


