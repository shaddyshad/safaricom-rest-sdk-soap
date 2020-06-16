<?php	

include "config.php";

$serverName = "https://pesamobie.pagekite.me,1433"; 
$connectionInfo = array( "Database"=> "MSPSDB", "UID"=>"excalibur", "PWD"=>"90293269");
$conn = sqlsrv_connect($serverName, $connectionInfo);
if( $conn )  
{  
     echo "Connection established.\n";  
}  
else  
{  
     echo "Connection could not be established.\n";  
     die( print_r( sqlsrv_errors(), true));  
}  
?>