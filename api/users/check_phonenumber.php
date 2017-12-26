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
    if (isset($postdata)) { // get user data
        $request = json_decode($postdata);
        $username = $request->username;
			
        		//check if username existe
			$records = $db->prepare("SELECT id FROM users WHERE username = :username ");
			$records->bindParam(':username', $username, PDO::PARAM_STR);
			$records->execute();
			$results = $records->fetch(PDO::FETCH_ASSOC);	
			
			if(count($results) > 0){ // if resulte is not empty
					
					echo "true" ;
			}
			else{ //if not
				echo "false" ;

			}
       
    }
    else {
        echo "Not called properly with username parameter!";
    }
?>