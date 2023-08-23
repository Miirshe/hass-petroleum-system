<?php
header("Content-type: application/json");
include "../db/db.php";

function generate_user_id($db){

	$id = '';
	$data =array();

	$query = "SELECT * FROM users order by  users.id DESC limit 1";

	$result = $db->query($query);

	if($result){
		$num_rows = $result->num_rows;

		if($num_rows > 0 ){

			$rows = $result->fetch_assoc();

			$id = ++ $rows['id'];

		}else{

			$id = 'USR001';

		}
	}else{

		$data = array("status" => false, "data" => $db->error);

	}

	return $id;

}

function register_user_api($db){

	$id = generate_user_id($db);
	extract($_POST);
	$data = array();
	$error_array = array();

	$file_name = $_FILES['image']['name'];
	$file_type = $_FILES['image']['type'];
	$file_size = $_FILES['image']['size'];
	$allowed_file_types = ['image/jpg', 'image/png', 'image/jpeg'];
	$max_file_size = 5*1024*1024;
	$image = $id.'.png';
	if(in_array($file_type,$allowed_file_types)){
		if($file_size > $max_file_size){
			$error_array []= $file_size/1024/1024 . 'Must be less than ' . $max_file_size/1024/1024 . "MB";
		}
	}else{
		$error_array []= "This file is not uploaded".$file_type;
	}
	if(count($error_array) <= 0){

		$query = "CALL register_users_sp('$id','$username','$email','$rollType','$phone','$password','$image')";
		$result = $db->query($query);
		if($result){
			move_uploaded_file($_FILES['image']['tmp_name'],'../uploads/'.$image);
			$data = array("status" => true , "data" => 'successfully user registered');
		}else{
			$data = array("status" => false , "data" => $db->error);
		}
	}else{
		$data = array("status" => false , "data" => $error_array);
	}

	echo json_encode($data);
}

function fecth_users_info_api($db){

	$data = array();

	$message = array();

	$query = "SELECT * FROM `users`";

	$result = $db->query($query);

	if($result){

		while($row = $result->fetch_assoc()){

			$data []= $row;

		}

		$message = array("status" => true , "data" => $data );

	}else{

		$message = array("status" => true , "data" => $db->error);

	}

	echo json_encode($message);
}

function delete_user_info_api($db){

	$data = array();

	$id = $_POST['id'];

	$query = "DELETE FROM `users` WHERE `id` = '$id' ";

	$result = $db->query($query);

	if($result){

		$data = array("status" => true , "data" => "successfully deleted ✔️✔️✔️☑️");

	}else{

		$data = array("status" => false , "data" => $db->error);

	}

	echo json_encode($data);
}

function fetch_single_user_info_api($db){

	$data = array();
	$message = array();

	$id = $_POST['id'];

	$query = "SELECT * FROM `users` WHERE `id` = '$id' ";

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

function update_user_api($db){

	extract(($_POST));

	$id = $_POST['id'];

	$data = array();

	$error_array = array();

	if(!empty($_FILES['image']['tmp_name'])){

		$file_name = $_FILES['image']['name'];
		$file_type = $_FILES['image']['type'];
		$file_size = $_FILES['image']['size'];
	
		
		$allowed_file_type = ['image/jpg','image/jpeg','image/png'];
		
		$max_size = 5*1024*1024;

		$image = $id.'.png';
	
	
		if(in_array($file_type , $allowed_file_type)){
	
			if($file_size > $max_size){
				$error_array []= $file_size/1024/1024 ." MB Max File Size must be less than " .$max_size/1024/1024 . "MB"; 
			}
		}else{
			$error_array []= "This File is Not Allowed" .$file_type; 
		}
		if(count($error_array) <= 0){
			$query = "CALL update_user_with_image('$id','$username','$email','$rollType','$phone',MD5('$password'),'$image')";
			$result = $db->query($query);
	
			if($result){
				move_uploaded_file($_FILES['image']['tmp_name'],'../uploads/'.$image);
				$data = array("status" => true , "data" => 'succssfully updated user with an image');
	
			}else{
	
				$data = array("status" => false , "data" => $db->error);
	
			}
		}else{
			$data = array("status" => false , "data" => $error_array);
		}
	}else{

		$query = "CALL update_user_without_image('$id','$username','$email','$rollType','$phone',MD5('$password'))";
		$result = $db->query($query);

		if($result){

			$data = array("status" => true , "data" => 'succssfully updated user');

		}else{

			$data = array("status" => false , "data" => $db->error);

		}

	}

	echo json_encode($data);
}

if(isset($_POST['action'])){

	$action = $_POST['action'];
	$action($db);
}else{
	echo "Action Not Found : ".$db->error;
}

?>