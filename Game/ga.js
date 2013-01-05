

var achClass = {"width":"100%","opacity":"0","height":"0","background-color":"white","margin-bottom":"5px","padding":"5px"};

var arobjs = new Array();

$("#gachieve").css({"overflow":"scroll","overflow-x": "hidden","padding":"10px","font-size":'15px',"color":"black","background-color":"black","border-color":"#39A7B3"});

function Achievement(vname,img,digval){
		this.name = vname;	
		var q = 1;
		this.content = $('<div/>').css(achClass);
		this.digvalue = digval;	
		this.content.html('<img width="100" height="50" src="'+img+'" style="float:left;margin-right:10px"/><h4>'+this.name+' x'+q+' D:'+this.digvalue+'</h4>');
		
		this.incr3m = function(){
			q++;
			this.content[0].children[1].innerHTML = this.name+' x'+q+' D:'+this.digvalue;
		}
	this.vanish =  function(){			
		$(this.content).animate({
    		opacity: 0.25,
    		height: 0
  		}, 1000, function() {
	  $(this).remove();
  });
	}
	this.addTo = function(obj){
		$(obj).prepend(this.content);
		$(this.content).animate({
			opacity:1,
			height: 50
		}, 1000);			
	}
}

function AchievementPanel(arr){
	var dignity = 0;
	
	this.init = function(){
	dignity = 0;
	$("#gachieve").empty();
	$('#dignity').html('0');
	arr = new Array();
	};
	this.getDignity = function(){
	return dignity;
	};
	this.addDignity = function(n){
		
		var dtmp = dignity;
		dignity+=n;
		var dger =  $('#dignity').get(0);
		if(dtmp>0&&dignity<=0)
			dger.style.color = "red";
		else if(dtmp<=0&&dignity>0)
			dger.style.color = "yellowgreen";
		
		$(dger).html(dignity);
	};
	this.reg = function(name,img){
		var dup = 0;
		switch(name){
		case 'Dignity-W':
		dup = 1;
		break;
		case 'Dignity-Y':
		dup = 5;
		break;
		case 'Dignity-G':
		dup = 10;
		break;
		case 'Dignity-R':
		dup = 25;
		break;
		case 'berbert-1':
		dup = -5;
		break;
		case 'berbert-2':
		dup = -10;
		break;
		case 'berbert-3':
		dup = -15;
		break;
		case 'berbert-4':
		dup = -20;
		break;
		case 'berbert-5':
		dup = -25;
		break;
		case 'bertmaster':
		dup = -35;
		break;
		case 'bertlegend':
		dup = -50;		
		}
		
		
		this.addDignity(dup);
		if(arr[name]){
			arr[name].incr3m();
		}
		else{
		arr[name] = new Achievement(name,img,dup);		
		arr[name].addTo($("#gachieve"));
		}
				
	};
}

var MyAchiever = new AchievementPanel(arobjs);


