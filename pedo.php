<?php


$res = '';
$ff = $_GET['f'];

$mysqli = new mysqli("mysql.3owl.com","u465886630_bert","dwa10p",'u465886630_pedobert');

   if(mysqli_connect_errno()) {
      echo "Connection Failed: " . mysqli_connect_errno();
      exit();
   }
 
  
if($ff == '1'){
		$data_back = json_decode (stripslashes($_REQUEST['pdata']), true);
	//var json_str = JSON.stringify({name:'bert',dignity:30,state:'alive',time:100,killer:'bert1.gif'}, null, 2);
	$preparedStatement = $mysqli->prepare('INSERT INTO player (Name,State,Dignity,Time,Killer) VALUES (?,?,?,?,?)');
	$preparedStatement->bind_param("ssiis",$data_back['name'],$data_back['state'],$data_back['dignity'],$data_back['time'],$data_back['killer']);
	
	$preparedStatement->execute();
	echo $preparedStatement->affected_rows;
	
}
else if($ff=='2'){
	$preparedStatement = $mysqli->prepare('SELECT * FROM player');
	
	$preparedStatement->execute();
	//$objs = array();
	$preparedStatement->bind_result($id,$name,$state,$dignity,$time,$killer);
	while($preparedStatement->fetch()){
	$item = array('name'=>$name,'state'=>$state,'dignity'=>$dignity,'time'=>$time,'killer'=>$killer);
	//printf('%s,%s,%d,%d,%s',$name,$state,$dignity,$time,$killer);
	//array_push($objs,$item);
	echo json_encode($item).' ';
	}
	//echo $preparedStatement->affected_rows;
	//echo json_encode($objs);
}










// some code

$mysqli -> close();
 //??? how can I access to properties?
?>