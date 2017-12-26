<?php
// for connecting to the database.
// for more information: https://www.codeofaninja.com/2017/02/create-simple-rest-api-in-php.html 
header("Access-Control-Allow-Origin: *");
class Database{
 
    // specify your own database credentials
	 private $host = "localhost";
     private $db_name = "waifaa_db";
     private $username = "waifaa_user";
     private $password = "Gf@@eryt3";
	 public $conn ;
	 
  public function getConnection(){
        try{
            $conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $conn->exec("set names utf8");
        }catch(PDOException $exception){
                die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
				

        }
		return $conn;
  }
   
}
?>