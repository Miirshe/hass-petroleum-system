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
             <h2 class="pageheader-title">Purchase Form</h2>
             <div class="page-breadcrumb">
                 <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">HASS -> Petroleum System / </a></li>
                         <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Form</a></li>
                         <li class="breadcrumb-item active" aria-current="page">Purchase Form</li>
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
	  <form id="purchaseForm">
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
				<div class="row">
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">supplier_name</label>
							<select name="supplier_name" id="supplier_name" class="form-control" style="color:black; padding:25.5px 20px;">
							</select>
                        </div>
					</div>
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">supplier_phone</label>
                            <input id="supplier_phone" name="supplier_phone" type="number" class="form-control p-3" disabled>
                        </div>
					</div>
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">supplier_address</label>
                            <input id="supplier_address" name="supplier_address" type="text" class="form-control p-3" disabled>
                        </div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">fuel_type</label>
							<select name="fuel_type" id="fuel_type" class="form-control" style="color:black; padding:25.5px 20px;">
							</select>
                        </div>
					</div>
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">tunk_number</label>
                            <input id="tunk_number" name="tunk_number" type="text" class="form-control p-3" disabled>
                        </div>
					</div>
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">tunk_capacity</label>
                            <input id="tunk_capacity" name="tunk_capacity" type="text" class="form-control p-3" disabled>
                        </div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-4">
					    <div class="form-group">
                        <label for="" class="form-label" style="font-size: 18px ">litters</label>
                        <input id="litters" name="litters" type="number" class="form-control p-3">
                        </div>
					</div>
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">price_per_litter</label>
                            <input id="price_per_litter" name="price_per_litter" type="double" class="form-control p-3" disabled>
                        </div>
					</div>
					<div class="col-sm-4">
					    <div class="form-group">
                            <label for="" class="form-label" style="font-size: 18px ">total_price</label>
                            <input id="total_price" name="total_price" type="double" class="form-control p-3" disabled>
                        </div>
					</div>
				</div>
				<div class="row">
                <div class="col-sm-4">
					 <div class="form-group">
                       <label for="" class="form-label" style="font-size: 18px ">status</label>
						<select name="status" id="status" class="form-control" style="color:black; padding:25.5px 20px;">
                            <option value="approved">approved</option>
                            <option value="pending">pending</option>
						</select>
                     </div>
				</div>
				</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">Back</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
		</form>
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
<script src="../js/add_edit_purchase.js"></script>


