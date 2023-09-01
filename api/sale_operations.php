<?php
header("Content-Type: application/json");
include ("../db/db.php");

function read_all_customer_api($db){

	$message = array();
	$data = array();

	$query = "SELECT * FROM `customers`";
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

function read_single_customer_api ($db){

	$name = $_POST['name'];
	$data = array();
	$message = array();
	$query = "SELECT * FROM `customers` WHERE `name` = '$name' ";
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

function register_sale_api($db){

	extract($_POST);

	$message = array();

	$query = "CALL register_sale_sp('$customer_name','$customer_phone','$customer_address','$fuel_type'
	,'$tunk_number','$tunk_capacity','$litters','$price_per_litter','$total_price','$status')";

	$result = $db->query($query);

	if($result){
		$message = array('status' => true , 'data' => 'successfully registered');
	}else{
		$message = array('status' => false , 'data' => $db->error);
	}

	echo json_encode($message);

}

function update_sale_api($db){

	$id = $_POST['id'];

	extract($_POST);

	$message = array();

	$query = "CALL update_sale_sp('$id','$customer_name','$customer_phone','$customer_address','$fuel_type'
	,'$tunk_number','$tunk_capacity','$litters','$price_per_litter','$total_price','$status')";

	$result = $db->query($query);

	if($result){
		$message = array('status' => true , 'data' => 'successfully updated');
	}else{
		$message = array('status' => false , 'data' => $db->error);
	}

	echo json_encode($message);

}

function read_all_sale_api($db){

	$message = array();

	$data = array();

	$query = "SELECT * FROM sales";

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
function read_single_sale_api($db){

	$id = $_POST['id'];

	$message = array();

	$data = array();

	$query = "SELECT * FROM sales WHERE id = '$id' ";

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


function delete_sale_api($db){

	$id = $_POST['id'];

	$message = array();

	$query = "DELETE FROM sales WHERE `id` = '$id' ";

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