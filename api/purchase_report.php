<?php
header('content-type : application/json');

include('../db/db.php');

function purchase_report_api($db){

	$data = array();

	$message = array();

	extract($_POST);

	$query = "CALL purchase_reports_sp('$s_name','$from','$to')";

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

function fetch_single_s_name_api($db){

	$data = array();

	$message = array();

	$query = "SELECT s_name FROM purchase";

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

if(isset($_POST['action'])){

	$action = $_POST['action'];

	$action($db);

}else{

	echo 'action not found'.$db->error;

}

?>