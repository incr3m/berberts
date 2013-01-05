<?php
$v1 = $_GET['b'];
if($v1 == "play"){
echo '<style>
div.hder{	
font-family:"Lucida Console", Monaco, monospace;
font-style:normal;
font-size:25px;
height:25px;
color:#CCCCCC;
padding-top:20px;
padding-bottom:10px;
padding-left:30px;
padding-right:55px;
}
div.fotr{	
font-family:"Lucida Console", Monaco, monospace;
font-style:normal;
font-size:30px;
height:100px;
padding-top:5px;
padding-left:30px;
padding-right:100px;
color:#00FF99;
}
#gamer{
margin-left:20px;
margin-right:20px;
}

#gengine {
	border-color:black;
	background:#999999;
	width:500px;
	height:400px;
	border:15px;
	border-style:solid;
}
#gachieve {
	border-color:#95754A;
	background:#993333;
	float:right;
	width:300px;
	height:400px;
	border:15px;
	border-style:solid;
}
</style>
<div class="hder">
<span>The Adventures of Pedobert</span> <span style="float:right;color:red">Achievements</span></div>
<div id="gamer">
<div id="gachieve"><script type="text/javascript" src="Game/ga.js"></script>
</div>
<div id="gengine"><div id="cr-stage"><script type="text/javascript" src="Game/ge.js"></script></div></div>
</div>
<div class="fotr">
<span>Dignity:<span id="dignity" style="color:white">000</span></span><span style="margin-left:60px">Lives:<span id="hp" style="color:white">0:00</span></span><span style="margin-left:45px">Time:<span id="printer"></span></span></div>';
}
?>