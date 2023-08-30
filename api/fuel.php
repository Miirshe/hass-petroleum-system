<?php

header("Content-Type: application/json");

include ("../db/db.php");

function register_fuel_api($db){

	$message = array();

	extract($_POST);

	$query = "CALL register_fuel_sp('$tunk_number','$tunk_capacity','$fuel_type','$price_per_litter')";

	$result = $db->query($query);

	if($result){
		$message = array('status' => true , 'data' => 'successfully registered');
	}else{
		$message = array('status' => false , 'data' => $db->error);
	}

	echo json_encode($message);
}
function update_fuel_api($db){

	$message = array();

	$id = $_POST['id'];

	extract($_POST);

	$query = "CALL update_fuel_sp('$id','$tunk_number','$tunk_capacity','$fuel_type','$price_per_litter')";

	$result = $db->query($query);

	if($result){
		$message = array('status' => true , 'data' => 'successfully updated');
	}else{
		$message = array('status' => false , 'data' => $db->error);
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

	$id = $_POST['id'];


	$query = "SELECT * FROM fuel WHERE  id = '$id' ";

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

function delete_single_fuel_api($db){

	$id = $_POST['id'];

	$message = array();

	$query = "DELETE FROM fuel WHERE id = '$id' " ;

	$result = $db->query($query);

	if($result){

		$message = array('status' => true , 'data' => 'successfull deleted');

	}else{

		$message = array('status' => false , 'data' => $db->error);

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