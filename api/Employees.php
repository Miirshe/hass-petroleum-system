<?php

header("Content-type: application/json");

include '../db/db.php';


function generate_id ($db){

	$id = "";
	$data = array();

	$query = "SELECT * FROM employees order by  employees.id DESC limit 1";

	$result = $db->query($query);

	if($result){

		$num_rows = $result->num_rows;

		if($num_rows > 0){

			$row = $result->fetch_assoc();

			$id = ++ $row['id'];

		}else{

			$id = 'EMP001';
		}
	}else{
		$data = array("status" => false , "data" => $db->error);
	}

	return $id;
}

function register_employee_api($db){

	$id = generate_id($db);

	$message = array();
	

	extract($_POST);


	$query = "CALL register_employee_sp('$id','$name','$email','$phone','$position')";

	$result = $db->query($query);

	if($result){

		$message = array('status' =>true , "data" => 'successfully registered');
	}else{

		$message = array('status' =>false , "data" => $db->error);

	}

	echo json_encode($message);
}


function fetch_employees_api($db){

	$data = array();
	$message = array();

	$query = "SELECT * FROM employees";

	$result = $db->query($query);

	if($result){
		while( $row = $result->fetch_assoc()){

			$data []= $row; 
		}

		$message = array('status' => true , 'data' => $data);

	}else{

		$message = array('status' => false , 'data' => $db->error);

	}

	echo json_encode($message);

}

function delete_employee_info_api ($db){

	$message = array();

	$id = $_POST['id'];

	$query = "DELETE FROM employees WHERE id = '$id' ";

	$result = $db->query($query);

	if($result){

		$message = array('status' => true , 'data' => 'successfully deleted');

	}else{

		$message = array('status' => false , 'data' => $db->error);

	}


	echo json_encode($message);
}

function fetch_single_employee_api($db){
	$id = $_POST['id'];

	$data = array();

	$message = array();

	$query = "SELECT * FROM employees WHERE id = '$id' ";

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

function update_employee_api($db){
	
	$message = array();

	$id = $_POST['id'];

	extract($_POST);



	$query = "CALL update_employee_sp('$id','$name','$email','$phone','$position')";

	$result = $db->query($query);

	if($result){

		$message = array("status" => true , "data" => "successfully Updated ");

	}else{

		$message = array("status" => false , "data" => $db->error);

	}

	echo json_encode($message);


}


if(isset($_POST['action'])){

	$action = $_POST['action'];
	$action($db);

}else{

	echo 'Action Not Founded '.$db->error;
}

?>