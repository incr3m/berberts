<?php

$st = '';
$dir = getcwd();
foreach(glob('*.*') as $filename){
	$xt = substr($filename,-3);
	if($xt == 'gif' || $xt == 'png'){
		$st .= $filename.':';
	}
}
echo $st;

?>