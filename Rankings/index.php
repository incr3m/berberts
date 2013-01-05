
<?php 
require('../layout.php');
?>
<script type="text/javascript">
           //alert('hello');
		   
		   $("#thegame").css("background-image","url(../rsc/psyground.png)");
		   $("#thegame").css("background-repeat","no-repeat");
		   $("#thegame").css("background-position","center");
		   $("#thegame").css("padding-top","200px");
		   $("#thegame").css("overflow","auto");
		   $("#thegame").css("overflow-x","hidden");
		   
		   
		   
		   $("#thegame").html('<table id="excelDataTable" style="color:black;background-color:rgba(255,255,255,0.7);width:90%;margin-left:5%; margin-right:5%;font-size:24px" border="1"></table>');
		   
		 window.onload = function() {
       
	   var json_str = JSON.stringify({name:'bert2',state:'dead',dignity:-100,time:100,killer:'bert-mark.gif'}, null, 2);
  		$.post ("../pedo.php?f=2", { pdata:json_str }, function (data_back) {
    //result = $.toJSON(data_back);
	//alert(data_back);
	var jsons = data_back.split(' ');
	//alert(jsons.length);
	var r = new Array(jsons.length);
	for(var ixx = 0;ixx<jsons.length;ixx++){
		r[ixx] = $.parseJSON(jsons[ixx]);
	}
	buildHtmlTable(r);
});
	}
	

// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(result) {
    var columns = addAllColumnHeaders(result);

    for (var i = 0 ; i < result.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
			if(result[i][columns[colIndex]]){
            var cellValue = result[i][columns[colIndex]];
			}
            else{ cellValue = ""; }

			if(colIndex==4){
			var klr = $('<img>').attr('src','../'+cellValue);			
            row$.append($('<td/>').append(klr));
			}
			else
            row$.append($('<td/>').html(cellValue));
        }
        $("#excelDataTable").append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(myList)
{
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $("#excelDataTable").append(headerTr$);

    return columnSet;
}
	
		 
            </script>