<?php
	header("Access-Control-Allow-Origin: * ");
    //http://stackoverflow.com/questions/18382740/cors-not-working-php
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: * ");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']} ");

        exit(0);
    }


    //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
	// include database and object files
	include_once '../config/database.php';
	include_once '../objects/users.php';
	include_once 'function.php';
	
	// instantiate database and user object
	$database = new Database();
	$db = $database->getConnection();
	
    $postdata = file_get_contents("php://input");
    if (isset($postdata)) {
        $request = json_decode($postdata); // get  user data
		$id = $request->id;
		

        	
		// get the membership id of the user  actual active membership 

					
		$records = $db->prepare(" SELECT mid FROM user_memberships WHERE uid = :uid and active='1'");
		$records->bindParam(':uid', $id);		
		$records->execute();
		$results = $records->fetch(PDO::FETCH_ASSOC);
		
			// using the membership id, get the membership details

		$records = $db->prepare(" SELECT * FROM memberships WHERE id = :id");
		$records->bindParam(':id', $results['mid']);		
		$records->execute();
		$results = $records->fetch(PDO::FETCH_ASSOC);
		echo json_encode($results); // return the result
		
			

		
      
    }
    else {
        echo "Not called properly with username parameter!";
    }
?>