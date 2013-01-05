<?php
// home
require('layout.php');
?>
<script type="text/javascript">
           //alert('hello');
		   $("#thegame").css("background-image","url(rsc/playground.png)");
		   

	loadjscssfile('http://craftyjs.com/release/0.5.3/crafty-min.js','js');
	loadjscssfile('http://berberts.3owl.com/Game/modernizr.js','js');
	loadjscssfile('http://berberts.3owl.com/js/animate.min.css','css');
		   
	window.onload = function() {
       
  		$.get('Game/game.php?b=play', function(data) {
  			$("#thegame").html(data);
  		});
	}
 
 /*window.onload = function() {
       
	   var json_str = JSON.stringify({name:'bert4',state:'dead',dignity:-100,time:100,killer:'bert-mark.gif'}, null, 2);
  		$.post ("pedo.php?f=2", { pdata:json_str }, function (data_back) {
    alert (data_back);
});
	}*/
 
            </script>
