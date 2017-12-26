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
	
    $postdata = file_get_contents("php://input"); // GET USER DATA
    if (isset($postdata)) {
        $request = json_decode($postdata);
		
        $id = $request->id;
		
		
echo($state);
		// udpate the user status			
			$records = $db->prepare("UPDATE `users` SET active='y' WHERE id=:id" );
			
			$records->bindParam(':id', $id);
			$records->execute();
		//if update is completed succefuly
			if($records== true){
					
				echo "true";
			}
		//if update is not completed succefuly
			else{
				echo "false" ;

			}
			

		      
    }
    else {
        echo "Not called properly with username parameter!";
    }
?>