<?php
header("Content-Type: application/json");
include ('../db/db.php');

function generate_supplier_api ($db){
	$id = '';
	$message = array();
	$query = "SELECT * FROM supplier order by supplier.id desc limit 1";
	$result = $db->query($query);
	if($result){
		$new_rows = $result->num_rows;
		if($new_rows > 0){
			$rows = $result->fetch_assoc();
			$id = ++ $rows['id'];
		}else{
			$id = 'SPR001';
		}
	}else{
		$message = array("status" =>true , "data" => $db->error);
	}

	return $id;
	
}
function register_supplier_api ($db){

	$id = generate_supplier_api($db);

	extract($_POST);

	$message = array();

	$query = "CALL register_supplier_sp('$id','$name','$email','$phone','$address')";

	$result = $db->query($query);

	if($result){

		$message = array("status" => true , "data" => "successfully registered");

	}else{

		$message = array("status" => false , "data" => $db->error);

	}

	echo json_encode($message);

}

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

function delete_single_supplier_api ($db){

	$message = array();
	$id =$_POST['id'];
	$query = "DELETE FROM supplier WHERE id = '$id'";
	$result = $db->query($query);

	if($result){
		$message = array("status" => true , "data" => "successfully deleted");
	}else{
		$message = array("status" => false , "data" => $db->error);
	}

	echo json_encode($message);
}

function read_single_supplier_api ($db){

	$data = array();
	$message = array();
	$id =$_POST['id'];
	$query = "SELECT * FROM supplier WHERE id = '$id'";
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

function update_supplier_api ($db){

	$id = $_POST['id'];
	extract($_POST);

	$message = array();

	$query = "CALL update_supplier_sp('$id','$name','$email','$phone','$address')";

	$result = $db->query($query);

	if($result){

		$message = array("status" => true , "data" => "successfully updated");

	}else{

		$message = array("status" => false , "data" => $db->error);

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