<?php
header("content-type : application/json");

include ("../db/db.php");

function sale_report_api($db){

	extract($_POST);
	$data = array();
	$message = array();

	$query = "CALL sale_reports_sp('$c_name','$from', '$to')";
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

function fetc_sale_of_c_name ($db){

	$data = array();
	$message = array();
	$query = "SELECT c_name From sales";
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
	echo "Action Not Found".$db->error;
}

?>