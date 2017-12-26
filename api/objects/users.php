<?php
header("Access-Control-Allow-Origin: *");
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    	  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	function getData() {
   $stmt = $this->conn->query("SELECT * FROM users");
   
   return $stmt;
}
	/*function read(){
 WHERE Country='Mexico'
    // select all query
      $stmt = $this->conn->$query = "SELECT * FROM users" ;
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}*/
}
?>