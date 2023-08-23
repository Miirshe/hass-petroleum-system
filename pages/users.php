<?php

include './header.php';
include './navbar.php';
include './sidebar.php';
?>

<style>
    #imageshow{
        width: 160px;
        height: 160px;
        background-size: cover;
        border-radius: 100%;
        border: 2px solid gray;
        margin-bottom: 20px;
    }
</style>
<div class="dashboard-wrapper">
<div class="container-fluid  dashboard-content">
<div class="row">
     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
         <div class="page-header">
             <h2 class="pageheader-title">Users Table</h2>
             <div class="page-breadcrumb">
                 <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">HASS -> Petroleum System / </a></li>
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Tables</a></li>
                         <li class="breadcrumb-item active" aria-current="page">users Table</li>
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
              <h5 class="card-header">Users Table</h5>
              <div class="card-body">
                <div class="row justify-content-between align-items-center mt-2">
                  <div class="col-sm-6">
                    <button class="btn btn-success " id="addNew">Add New User</button>
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
    <div class="modal" tabindex="-1" id="userModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">User Registration</h5>
              </div>
              <div class="modal-body">
				<form id="userForm">
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
                        <input id="username" name="username" type="text" class="form-control p-3" placeholder="Enter Username..">
                    </div>
				    <div class="form-group">
                        <input id="email" name="email" type="email" class="form-control p-3" placeholder="Enter Email">
                    </div>
				    <div class="form-group">
					<label for="rollType" class="col-form-label">select rollType</label>
						<select name="rollType" id="rollType" class="form-control p-3 text-black ">
							<option value="admin">admin</option>
							<option value="user">user</option>
						</select>
                    </div>
					<div class="form-group">
                        <input id="phone" name="phone" type="number" class="form-control p-3" placeholder="Enter Phone">
                    </div>
					<div class="form-group">
                        <input id="password" name="password" type="password" class="form-control p-3" placeholder="Enter Password">
                    </div>
					<div class="form-group">
                        <input id="image" name="image" type="file" class="form-control p-3">
                    </div>
                    <div class="row">
                         <div class="col-sm-3"></div>
                         <div class="col-sm-4">
                             <img id="imageshow"/>
                         </div>
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
<script src="../js/users.js"></script>


