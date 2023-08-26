<?php
header("content-type: application/json");
include ('../db/db.php');

function generate_id($db){
	$id = '';
	$message = array();
	$query = "SELECT * FROM customers ORDER BY customers.id DESC LIMIT 1";
	$result = $db->query($query);
	if($result){
		$num_rows = $result->num_rows;
		if($num_rows > 0){
			$rows = $result->fetch_assoc();
			$id = ++ $rows['id'];
		}else{
			$id = 'CSR001';
		}
	}else{
		$message = array("status" => false , "data" => $db->error);
	}

	return $id;
}

function update_customer_api($db){

	$message = array();
	$id = $_POST['id'];
	extract($_POST);
	$query = "CALL update_customer_sp ('$id','$name','$email','$phone','$address')";
	$result = $db->query($query);
	if($result){
		$message = array("status" => true, "data" => "successfully Updated");
	}else{
		$message = array("status" => false, "data" => $db->error);
	}

	echo json_encode($message);

}
function register_customer_api($db){

	$message = array();
	$id = generate_id($db);
	extract($_POST);
	$query = "CALL register_customer_sp ('$id','$name','$email','$phone','$address')";
	$result = $db->query($query);
	if($result){
		$message = array("status" => true, "data" => "successfully registered");
	}else{
		$message = array("status" => false, "data" => $db->error);
	}

	echo json_encode($message);

}
function read_all_customers_api($db){
	$data = array();
	$message = array();
	$query = "SELECT * FROM customers";
	$result = $db->query($query);
	if($result){
		while($row = $result->fetch_assoc()){
			$data []= $row;
		}
		$message = array("status" => true, "data" => $data);
	}else{
		$message = array("status" => false, "data" => $db->error);
	}

	echo json_encode($message);
}

function read_single_customers_api($db){
	$id = $_POST['id'];
	$data = array();
	$message = array();
	$query = "SELECT * FROM customers WHERE id = '$id' ";
	$result = $db->query($query);
	if($result){
		while($row = $result->fetch_assoc()){
			$data []= $row;
		}
		$message = array("status" => true, "data" => $data);
	}else{
		$message = array("status" => false, "data" => $db->error);
	}

	echo json_encode($message);
}
function delete_customers_api($db){

	$id = $_POST['id'];
	$message = array();
	$query = "DELETE FROM customers WHERE id = '$id' ";
	$result = $db->query($query);
	if($result){
		$message = array("status" => true, "data" => "Successfully deleted");
	}else{
		$message = array("status" => false, "data" => $db->error);
	}

	echo json_encode($message);
}

if(isset($_POST['action'])){
	$action = $_POST['action'];
	$action($db);
}else{
	echo "Action Not Found".$db->error;
}

?>