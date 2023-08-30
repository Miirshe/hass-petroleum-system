<?php
header("Content-Type: application/json");
include ("../db/db.php");

function read_all_supplier_api($db){

	$message = array();
	$data = array();

	$query = "SELECT * FROM `supplier`";
	$result = $db->query($query);
	
	if($result){

		while($row = $result->fetch_assoc()){

			$data []= $row;

		}

		$message = array("status" => true , "data" => $data);

	}else{

		$message = array("status" => false , "data" => $db->error);

	}

	echo json_encode($message);
}

function read_single_supplier_api ($db){

	$name = $_POST['name'];
	$data = array();
	$message = array();
	$query = "SELECT * FROM `supplier` WHERE `name` = '$name' ";
	$result = $db->query($query);

	if($result){
		while($row = $result->fetch_assoc()){

			$data []= $row;

		}

		$message = array("status" => true , "data" => $data);

	}else{

		$message = array("status" => false , "data" => $db->error);

	}

	echo json_encode($message);
}

function read_all_fuel_api($db){

	$message = array();

	$data = array();

	$query = "SELECT * FROM fuel";

	$result = $db->query($query);

	if($result){
		
		while($row = $result->fetch_assoc()){

			$data []= $row;

		}

		$message = array('status' => true , 'data' => $data);
		
	}else{

		$message = array('status' => false , 'data' => $db->error);

	}

	echo json_encode($message);

}

function read_single_fuel_api($db){


	$message = array();

	$data = array();

	$fuel_type = $_POST['fuel_type'];


	$query = "SELECT * FROM fuel WHERE  `fuel_type` = '$fuel_type' ";

	$result = $db->query($query);

	if($result){
		
		while($row = $result->fetch_assoc()){

			$data []= $row;

		}

		$message = array('status' => true , 'data' => $data);
		
	}else{

		$message = array('status' => false , 'data' => $db->error);

	}

	echo json_encode($message);

}

function register_purchase_api($db){

	extract($_POST);

	$message = array();

	$query = "CALL register_purchase_sp('$supplier_name','$supplier_phone','$supplier_address','$fuel_type'
	,'$tunk_number','$tunk_capacity','$litters','$price_per_litter','$total_price','$status')";

	$result = $db->query($query);

	if($result){
		$message = array('status' => true , 'data' => 'successfully registered');
	}else{
		$message = array('status' => false , 'data' => $db->error);
	}

	echo json_encode($message);

}

function update_purchase_api($db){

	$id = $_POST['id'];

	extract($_POST);

	$message = array();

	$query = "CALL update_purchase_sp('$id','$supplier_name','$supplier_phone','$supplier_address','$fuel_type'
	,'$tunk_number','$tunk_capacity','$litters','$price_per_litter','$total_price','$status')";

	$result = $db->query($query);

	if($result){
		$message = array('status' => true , 'data' => 'successfully registered');
	}else{
		$message = array('status' => false , 'data' => $db->error);
	}

	echo json_encode($message);

}

function read_all_purchase_api($db){

	$message = array();

	$data = array();

	$query = "SELECT * FROM purchase";

	$result = $db->query($query);

	if($result){

		while($row = $result->fetch_assoc()){
			$data []= $row;
		}

		$message = array('status' => true , 'data' => $data);
		
	}else{

		$message = array('status' => false , 'data' => $db->error);
		
	}

	echo json_encode($message);

}
function read_single_purchase_api($db){

	$id = $_POST['id'];

	$message = array();

	$data = array();

	$query = "SELECT * FROM purchase WHERE id = '$id' ";

	$result = $db->query($query);

	if($result){

		while($row = $result->fetch_assoc()){
			$data []= $row;
		}

		$message = array('status' => true , 'data' => $data);
		
	}else{

		$message = array('status' => false , 'data' => $db->error);

	}

	echo json_encode($message);

}


function delete_purchase_api($db){

	$id = $_POST['id'];

	$message = array();

	$query = "DELETE FROM purchase WHERE `id` = '$id' ";

	$result = $db->query($query);

	if($result){
		$message = array('status' => true , 'data' => 'successfully deleted');
	}else{
		$message = array('status' => false , 'data' => $db->error);
	}

	echo json_encode($message);

}

if(isset($_POST['action'])){
	$action = $_POST['action'];
	$action($db);
}else{
	echo 'Action Not Found'.$db->error;
}
?>