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
        $request = json_decode($postdata); // get user data
		$fname = $request->fnames;
		$lname = $request->lnames;
		$email = $request->emails;
		$adresse = $request->adresses;
        	$phone = $request->phones;
		$passwds = $request->passwds;
		$salt = _create_salt();
		$hash = create_hash($passwds, $salt);

        	// verify if the username already exist

		$records = $db->prepare("SELECT username FROM users WHERE username = :username ");
		$records->bindParam(':username', $phone, PDO::PARAM_STR);
		$records->execute();
		$results = $records->fetch(PDO::FETCH_ASSOC);	

		// if the result is not empty, this means that the username is already used	

		if($results!=""){
			echo "used";		
			
		}
		else{ // if the username doesn't exist
			$records = $db->prepare("INSERT INTO users (username, fname, lname, salt, hash, email, address) VALUES (?,?,?,?,?,?,?)");
			$records->bindParam(1, $phone);
			$records->bindParam(2, $fname);
			$records->bindParam(3, $lname);
			$records->bindParam(4, $salt);
			$records->bindParam(5, $hash);
			$records->bindParam(6, $email);
			$records->bindParam(7, $adresse);
			$records->execute();
			
			if($records== true){ // if  insert commande worked succefully
					
				echo "true";
			}
			else{ // if insert commande doesn't work
				echo "false" ;

			}
			

		}
      
    }
    else {
        echo "Not called properly with username parameter!";
    }
?>