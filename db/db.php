<?php

$db = new mysqli("localhost","root","","petroleum_system");
if($db->connect_error){
	echo "Error Occured db : " . $db->error;
}
?>