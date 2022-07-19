<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, origin");
require_once 'pdoconfig.php';
    ini_set("display_errors",1);
    error_reporting(E_ALL); 

    $post_body = file_get_contents('php://input');
    $post_body = json_decode($post_body);
    $post_body = (array) $post_body;
    // var_dump ($post_body['first_name_id']);
    // die();
    $url = $post_body["url"];
    
    if($url == null){
        echo 'server problem';
        die();
    }
    
    
    $title = $post_body["title"];
    $form_id = $post_body["form_id"];
    $form_class = $post_body["form_class"];
    $email_id = $post_body["email_id"];
    $email_class = $post_body["email_class"];
    $first_name_id = $post_body["first_name_id"];
    $first_name_class = $post_body["first_name_class"];
    $last_name_id = $post_body["last_name_id"];
    $last_name_class = $post_body["last_name_class"];
    $full_name_id = $post_body["full_name_id"];
    $full_name_class = $post_body["full_name_class"];
    $phone_id = $post_body["phone_id"];
    $phone_class = $post_body["phone_class"];
    $confirm_email_id = $post_body["confirm_email_id"];
    $confirm_email_class = $post_body["confirm_email_class"];
    $checkboxes = json_encode($post_body["checkboxes"]);
   
    
    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    };

    $sql = "INSERT INTO newsletters (url, title, form_id, form_class, email_field_id, email_field_class, first_name_id, first_name_class, last_name_id, last_name_class, full_name_id, full_name_class, phone_id, phone_class, confirm_email_id, confirm_email_class, checkboxes)
    VALUES ('$url', '$title', '$form_id', '$form_class', '$email_id', '$email_class', '$first_name_id', '$first_name_class', '$last_name_id', '$last_name_class', '$full_name_id', '$full_name_class', '$phone_id', '$phone_class', '$confirm_email_id', '$confirm_email_class', '$checkboxes')";
    
    $result = $conn->query($sql);
    if ($result) {
        echo "New record created successfully";
    } else {
        echo "Error: <br>" . $conn->error;
    }

