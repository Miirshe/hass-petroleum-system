<?php
header('Content-type: application/json');
include ('../db/db.php');

function register_category_api($db){

	$message = array();

	extract($_POST);

	$query = "INSERT INTO `categories`(`name`, `icon`, `role`) VALUES ('$name','$icon','$role')";

	$result = $db->query($query);

	if($result){

		$message = array('status' => true , "data" => 'successfully registered');

	}else{

		$message = array('status' => false , "data" => $db->error);

	}

	echo json_encode($message);

}

function read_all_categories_api($db){

	$data = array();

	$message = array();

	$query = "SELECT * FROM categories";

	$result = $db->query($query);

	if($result){

		while($row = $result->fetch_assoc()){

			$data []= $row;

		}

		$message = array('status' => true , "data" => $data);

	}
	else{

		$message = array('status' => false , "data" => $db->error);

	}

	echo json_encode($message);

}
function read_category_api($db){

	$id = $_POST['id'];

	$data = array();

	$message = array();

	$query = "SELECT * FROM `categories` WHERE `id` = '$id'";

	$result = $db->query($query);

	if($result){

		while($row = $result->fetch_assoc()){

			$data []= $row;

		}

		$message = array('status' => true , "data" => $data);

	}
	else{

		$message = array('status' => false , "data" => $db->error);

	}

	echo json_encode($message);

}


function update_category_api($db){

	$message = array();

	$id = $_POST['id'];

	extract($_POST);

	$query = "UPDATE `categories` SET `name`='$name',`icon`='$icon',`role`='$role' WHERE `id` = '$id'";

	$result = $db->query($query);

	if($result){

		$message = array('status' => true , 'data' => 'successfully updated');

	}else{

		$message = array('status' => false , 'data' => $db->error);

	}

	echo json_encode($message);

}



function delete_category_api($db){

	$id = $_POST['id'];

	$message = array();

	$query = "DELETE FROM `categories` WHERE `id` = '$id'";

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

	echo "Not Found ".$db->error;

}

?>