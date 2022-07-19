<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, origin");
require_once 'pdoconfig.php';
    ini_set("display_errors",1);
    error_reporting(E_ALL); 

    $post_body = file_get_contents('php://input');
    $post_body = json_decode($post_body);
    $post_body = (array) $post_body;
    // var_dump ($post_body);
    // die();
    // $url = $post_body["url"];
    
    // if($url == null){
    //     echo 'server problem';
    //     die();
    // }
    
    
    $email = $post_body["email"];
    $first_name = $post_body["first_name"];
    $last_name = $post_body["last_name"];
   
   
    
    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    };

   
    $sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $result = $conn->query($sql);
   
    if($result->lengths != 'null'){
        // echo 'asd';
         $id = '2';
         $sql = "SELECT * FROM newsletters";
         $result = $conn->query($sql);
         echo json_encode($result->fetch_assoc());
         die();
    }
    
    $sql = "INSERT INTO users (email, first_name, last_name)
    VALUES ('$email', '$first_name', '$last_name')";
    
    $result = $conn->query($sql);
    if ($result) {
        echo "New record created successfully";
    } else {
        echo "Error: <br>" . $conn->error;
    }

