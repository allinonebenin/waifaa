<?php
 
    // specify your own database credentials
     $host = "localhost";
     $db_name = "waifaa_db";
     $username = "waifaa_user";
     $password = "Gf@@eryt3";
	 
 
        try{
            $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
            $conn->exec("set names utf8");
        }catch(PDOException $exception){
                die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));

        }
 
    function getData($db) {
   $stmt = $db->query("SELECT * FROM users");
   return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
 
//then much later
try {
  $num =  getData($conn);
  // $num = $stmt->rowCount();
   	    echo json_encode($num);

} catch(PDOException $ex) {
  
echo "hi";  //handle me.
}
?>