
if(!!Modernizr.csstransition)
alert("your browser is updated. please update your browser for better performance");



if(!Modernizr.audio){
alert('your browser does not support audio.');
}

var Dh = 400,Dw = 500;
var gSpeed = 200;
var bgSpeed = 300;
var gFlag = false;
var gStarted= false;
var psydead = false;
var psyhp = 10;
var playerdata = {state:'alive'};


(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preloadImage = function(img) {
    /*var args_len = arguments.length;
    for (var i = args_len; i--;) {*/
      var cacheImage = document.createElement('img');
      cacheImage.src = img;
      cache.push(cacheImage);
    //}
  }
})(jQuery);

Crafty.extend({
	  keyboardDispatch: function (e) {
		e.key = e.keyCode || e.which;
		if (e.type === "keydown") {
			if (Crafty.keydown[e.key] !== true) {
				Crafty.keydown[e.key] = true;
				Crafty.trigger("KeyDown", e);
			}
		} else if (e.type === "keyup") {
			delete Crafty.keydown[e.key];
			Crafty.trigger("KeyUp", e);
		}

		if(Crafty.inputElementActive()) return; 
		if(Crafty.selected && !(e.key == 8 || e.key >= 112 && e.key <= 135)) {
			if(e.stopPropagation) e.stopPropagation();
                        else e.cancelBubble = true;

			if(e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			return false;
		}
	},
	inputElementActive: function () {
		return (document.activeElement.tagName == 'INPUT');
	}
	});

Crafty.init(Dw, Dh);
		
		
Crafty.background('rgb(0,0,0)');

var audio = new Audio();



//audio.play();
//components

Crafty.c("SideGround",{
	init: function(){
		this.requires('2D, DOM, Tween');
	},
	sideGround: function(dx,img,isflip){
		//this.append('<img src="grumpy-cat.jpg" style="width:100%;height:100%">');
		this.css('background-image', 'url('+img+')');
		//this.image('grumpy-cat.jpg');
		this.attr({x:dx,y:Dh-5,w:100,h:Dh});
		if(isflip!==undefined)
		if(isflip== true)
		this.flip('X');
		//this._element.style.backgroundPosition = "0px 0px";
		return this;
	},
	/*goUpp: function(){
		$(this._element).css('background-position-y',"0px");
		
           $(this._element).animate({
    		'background-position-y': '-'+this.h+'px'
  		}, 3000,this.goUpp); 
        
		
	},*/
	goRun: function(speed,backup){
		var bkuppd = false;
		this.bind('EnterFrame',function(){
			
				/*if(this.bkuppd == false ){
				
				this.bkuppd = true;
				}
				//alert(this.y);
				else*/
				if(this.y<0-this.h+1){
					this.destroy();
					/*;Crafty.e("SideGround")
					.sideGround(Dh+5).goUp();*/				
				}
				else if( backup!== undefined && this.y<0){
					if(bkuppd == false){				
						backup();
						bkuppd = true;
					}
				}
			
			
		});
		this.tween({y:0-Dh},speed);
		return this;
	}
});

Crafty.c("BGWorker",{
	init: function(){
		
	},
	createBg: function(){
		var that = this;
		Crafty.e("SideGround")
				.sideGround(0,'Game/trees.gif',true).goRun(bgSpeed,function(){
						that.createBg();
					});
		Crafty.e("SideGround")
				.sideGround(Dw-100,'Game/trees.gif').goRun(bgSpeed);
		return this;
	},
	bGWorker: function(){
		//this.image('grumpy-cat.jpg');
		this.createBg();
		return this;
	}
	
});
	

	
Crafty.c("Psy",{
	_pos: 2,
	_life: 10,
	init: function(){
		this.requires('Multiway, 2D, DOM, Keyboard, Collision');
	},
	undress: function(st){
		switch(st){
		case 'bra':
		this.css('background-image', 'url(Game/panty.gif),url(Game/bertcat.gif)');
		break;
		case 'panty':
		this.css('background-image', 'url(Game/bertcat.gif)');
		}
	},
	psy: function(x1,y1,hp){
		this._life = hp;
		$('#hp').html(hp);
		this.attr({x:13+100*2,y:10,z:10,w:75,h:75});
		this.css('background-image', 'url(Game/bra.gif),url(Game/panty.gif),url(Game/bertcat.gif)');
		this.collision(new Crafty.polygon([0,30],[0,75],[75,75],[75,30]));
		this.bind('KeyDown', function (e) {
		if(e.key == Crafty.keys['LEFT_ARROW']) {
      		this._pos--;
    	} else if (e.key == Crafty.keys['RIGHT_ARROW']) {
    		this._pos++;
		}
		if(this._pos>3)
			this._pos=3;
		else if(this._pos<1)
			this._pos=1;
			
		this.jumpTo(this._pos);
			 });
			
		var evt = jQuery.Event("BertHit"); 
		this.onHit('Evader',function(o){
			//e.destroy();
			for(var i = 0;i<o.length;i++){
				
				if(o[i].obj.wasHit==false){
						MyAchiever.reg(o[i].obj.name,o[i].obj.imgurl);
						o[i].obj.wasHit=true;
						if(o[i].obj.has('GetMe')){		
							o[i].obj.destroy();	
						}
						else{
							$(this._element).trigger(evt,o[i].obj.imgurl);
							this.visible = false;
							var d = this;
							setTimeout(function(){ d.visible = true;},200);
						}
							
				}
				
			}
			
		});
		return this;
	},
	jumpTo: function(posi){
		this.attr({x:13+100*posi});
	}
});

Crafty.c("ImgSpriter",{
	init: function(){
		this.requires('2D, DOM');
		
	},
	setup: function(imgurl,color){
		this.origin("center");
		this.attr({rotation:25});
		//this.attr('rotation',45);
		this.css('background-image','url('+imgurl+')');	
		this.css('background-repeat','no-repeat');	
		//this.css('background-attachment','fixed');	
		this.css('background-position','center');
		if(color)
		this.css('background-color',color);
		
		
		/*this.bind('EnterFrame',function(){
			
			});*/
		var dat = this;
		function repeat(){
		dat.timeout(function(){
			if(this.rotation === 25)
				this.rotation = -25;
			else
				this.rotation = 25;
			
			repeat();
		},400);
		}
		repeat();
	}
});

Crafty.c("UpMover",{
	init: function(){
		this.requires('2D, DOM, Tween');		
	},
	wasHit: false,
	isLeft: true,
	goUp: function(speed){
		this.bind('EnterFrame',function(){
			if(this.y<0-Dh){
				this.destroy();
				//$(this).remove();
				//alert(this.y);
			}
		});
		this.tween({y:-1-Dh},speed);
		return this;
	},
	flip: function(){
	}
});

Crafty.c("RoadLine",{
	init: function(){
		this.requires('UpMover, Color');
	},
	roadLine: function(){
		this.color('white').attr({x:250,y:Dh,z:1,w:10,h:40});
		return this;
	}
});

Crafty.c("Evader",{
	init: function(){
		this.requires('UpMover, ImgSpriter, Collision');
	},
	name: 'noname',
	imgurl: '',
	evader: function(col,name,imgurl){
		this.attr({x:13+100*col,y:Dh,z:5,w:75,h:75});
		this.imgurl = imgurl;
		this.collision(new Crafty.polygon([0,20],[0,30],[75,30],[75,20]));
		this.setup(imgurl);
		this.name = name;
		return this;
	}
});

Crafty.c("GetMe",{
	init: function(){
		this.requires('Evader');
	},
	getMe: function(col,name,imgurl){
		if(name);
		this.name = name;
		this.attr({x:13+100*col,y:Dh,z:5,w:75,h:75});		
		this.collision(new Crafty.polygon([0,0],[0,75],[75,75],[75,0]));
		this.imgurl = imgurl;
		this.setup(imgurl);
		return this;
	}
});


var looper;
Crafty.scene('pre',function(){

$('#dignity').empty();
$('#hp').empty();


looper = new Audio('Game/looper.wav'); 
looper.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
looper.play();
Crafty.e('BGWorker').bGWorker();

var title = Crafty.e('2D, DOM, Image')
	.image('Game/title.gif')
	.attr({x:105,y:10});
var cat = Crafty.e('2D, DOM')
	.css({'background-image':'url(Game/bra.gif),url(Game/panty.gif),url(Game/bertcat.gif)','background-size':'100%'})
	.attr({w:75,h:75,x:110,y:170});
	
Crafty.e("2D, DOM, Text")
		.attr({w:200, x: 190, y: 180 })
		.text('"Outlive the berberts')
		.textColor('#ffffff', 1)
		.css({'font-size':'15px','font-family':'Courier New'});
Crafty.e("2D, DOM, Text").attr({w:300, x: 190, y: 210 }).text(' Regain your dignity."').textColor('#ffffff', 1)
		.css({'font-size':'15px','font-family':'Courier New'});
	
	
	
	Crafty.e("2D, DOM, Text")
		.attr({w:200, x: 110, y: 370 })
		.text('music: on')
		.textColor('#FF0000', 1)
		.css({'font-size':'20px','font-family':'Courier New'});
		
var playbtn = Crafty.e("2D, DOM, Text")
		.attr({w:200, x: 190, y: 300 })
		.origin('center')
		.text('START')
		.textColor('#ffffff', 1)
		.css({'font-size':'40px','font-family':'Courier New','cursor':'pointer'});
	
	
$(playbtn._element).bind('click',function(){
	Crafty.scene('pregangnam');
	});
$(playbtn._element).hover(function(){
	//alert('dfdf');
	playbtn.attr({x:155 ,y:290})
		.css('font-size','60px');
	},function(){
	playbtn.attr({x:190,y:300})
		.css('font-size','40px');	
		});
		
		
(function blinker(){
	title.visible = false;
	title.timeout(function(){title.visible=true;title.timeout(blinker,750);},200);
})();


},function(){looper.pause();looper = null});


Crafty.scene("pregangnam", function(){

gSpeed = 200;
bgSpeed = 300;
gFlag = false;
gStarted= false;
psydead = false;
psyhp = 10;
playerdata = {state:'alive'};
MyAchiever.init();

var msg = 'LOADING...';

audio.src = (Modernizr.audio && Modernizr.audio.mp3) ? 'http://www.fileden.com/files/2012/12/27/3380499/theweak.mp3':
            (Modernizr.audio && Modernizr.audio.ogg) ? 'http://www.fileden.com/files/2012/12/27/3380499/theweak.ogg' :msg = 'Unable to play audio.';

/*var imgs = ['Game/bert1.gif',
			'Game/bert-arn.gif',
			'Game/bertcat.gif',
			'Game/bert-jp.gif',
			'Game/bert-mark.gif',
			'Game/bert-paul.gif',
			'Game/bert-rhio.gif',
			'Game/bert-vince,gif'
			
			];*/
			
			
var ld = Crafty.e("2D, DOM, Text").attr({w:300, x: 185, y: 180 }).text(msg).textColor('#ffffff', 1)
		.css({'font-size':'30px','font-family':'Courier New'});
		
var strr = '';
  $.get('Game/imgs.php', function(data) {
  //$('.result').html(data);
  strr = data;
  datagot();
});

function datagot(){
var ea = strr.split(':');
//alert(ea.length+">>>"+strr);

for(var ix = 0;ix<ea.length;ix++){

$.preloadImage('Game/'+ea[ix]);
ld.text('LOADING..'+ea[ix]);

}


audio.load;
audio.play();




$(audio).bind('play',function(){
		if(gStarted===true&&psydead===false)Crafty.pause();	
	});
$(audio).bind('pause',function(){if(gStarted===true&&psydead===false)Crafty.pause();});

$(function(){
    var audioReady = function(){
		$('#printer').html(audio.readyState);
		ld.text('LOADING..'+audio.readyState);
        if (audio.readyState!==0) {
			if(gStarted==false){
				gStarted=true;
				Crafty.scene('gangnam');
			}
            $('#printer').html("it's ready!");
        } else {
            setTimeout(audioReady, 250);
        }
    }
    audioReady();
})
}
});

Crafty.scene('gangnam',playGangnam);



Crafty.scene('postgangnam',function(){
	
	var imge;
	var gr8;
	if(playerdata.state==='dead'){
		imge = 'Game/enddead.png';
		gr8 = 'CONDOLENCES!';
		Crafty.e("2D, DOM, Text").attr({w:200, x: 350, y: 50 }).text('Last hit by:').textColor('#ffffff', 1)
		.css({'font-size':'16px','font-family':'Courier New'});
		Crafty.e('2D, DOM, Image')
		.image(playerdata.suspect)
		.attr({x:375,y:70})
	}
	else{
		imge = 'Game/endalive.png';
		gr8 = 'CONGRATULATIONS!';
		
		
	}
	var logo = Crafty.e('2D, DOM, Image')
	.image(imge)
	.attr({h:200,w:200,x:155,y:70})
	.origin('center');
	
	Crafty.e("2D, DOM, Text").attr({w:700, x: 10, y: 90 }).text('Dignity:'+MyAchiever.getDignity()).textColor('#42ed39', 1)
		.css({'font-size':'20px','font-family':'Courier New'});
	Crafty.e("2D, DOM, Text").attr({w:700, x: 10, y: 120 }).text('Time:'+(audio.currentTime | 0)).textColor('#00ffff', 1)
		.css({'font-size':'20px','font-family':'Courier New'});
	
	Crafty.e("2D, DOM, Text").attr({w:700, x: 80, y: 10 }).text(gr8).textColor('#ffffff', 1)
		.css({'font-size':'36px','font-family':'Courier New'});
	var lbl1 = Crafty.e("2D, DOM, Text").attr({w:700, x: 90, y: 270 }).text('Enter your name:').textColor('#FF00FF', 1)
		.css({'font-size':'30px','font-family':'Courier New'});
	
	var lbl2 = Crafty.e('2D, DOM, HTML')
	.attr({h:40,w:400,x:90,y:300})
	.append('<input id="usrname"type="text" style="float:left;height:40px;width:250px;font-size:30px"/>'+
	'<input id="oksubmit" type="button" value="OK" style="margin:3px;height:40px;width:60px;font-size:30px"/>');
	
	$('#oksubmit').click(function(e) {
		//Crafty.scene('pre');
		var n = $('#usrname').val();
		if(n==''||n===''||n==null){
			n='no-name';
		}
       /* alert(n+','+MyAchiever.getDignity()+','+(audio.currentTime|0)+','+playerdata.state+','+playerdata.suspect);*/
		
		 var json_str = JSON.stringify({name:n,state:playerdata.state,dignity:MyAchiever.getDignity(),time:(audio.currentTime|0),killer:playerdata.suspect}, null, 2);
  		$.post ("pedo.php?f=1", { pdata:json_str }, function (data_back) {
    	
		if(data_back=='1'||data_back==='1'){
			alert ('done.');
		}
		else{
		alert(data_back);
		}
		});
		
		lbl1.visible = false;
		lbl2.visible = false;
		
		var rebtn = Crafty.e("2D, DOM, Text")
		.attr({w:200, x: 185, y: 300 })
		.origin('center')
		.text('REPLAY')
		.textColor('#ffffff', 1)
		.css({'font-size':'40px','font-family':'Courier New','cursor':'pointer'});
	
	
$(rebtn._element).bind('click',function(){
	Crafty.scene('pre');
	});
	
$(rebtn._element).hover(function(){
	//alert('dfdf');
	rebtn.attr({x:150 ,y:290})
		.css('font-size','60px');
	},function(){
	rebtn.attr({x:185,y:300})
		.css('font-size','40px');	
		});
		
	});
	

(function rr(){	
	logo.rotation = 15;
	logo.timeout(function(){
		logo.rotation = -15;
		logo.timeout(rr,500);
	},500);
})();


	});


$(document).ready(function(e) {
    
	Crafty.scene('pre');
});
	


function playGangnam(){

	function makeEvader(v1,v2){
		var i = 0;
		if(v2===undefined){
			if(v1.obj.length>1)
				i = Crafty.math.randomInt(0,v1.obj.length-1);
			if(v1.type === 'Evader')
				return Crafty.e('Evader').evader(Crafty.math.randomInt(1,3),v1.obj[i].name,v1.obj[i].imgurl);
								
			else
				return Crafty.e('GetMe').getMe(Crafty.math.randomInt(1,3),v1.obj[i].name,v1.obj[i].imgurl);
			
		}
		else{
			if(gFlag==true){
				

				gFlag = false;
				if(v2.obj.length>1)
					i = Crafty.math.randomInt(0,v2.obj.length-1);
				return Crafty.e('Evader').evader(Crafty.math.randomInt(1,3),v2.obj[i].name,v2.obj[i].imgurl);
			}
			else{
				gFlag = true;
				if(v1.obj.length>1)
					i = Crafty.math.randomInt(0,v1.obj.length-1);
				return Crafty.e('GetMe').getMe(Crafty.math.randomInt(1,3),v1.obj[i].name,v1.obj[i].imgurl);
			}
		}
	
	}

	var perSec = function(){
		if(!Crafty.isPaused()){
			var t = 550;
			var ctime = audio.currentTime;			
			Crafty.e("RoadLine").roadLine().goUp(bgSpeed);
				var floorc = ctime | 0;
			$('#printer').html(floorc);
			if(ctime>6){
				var randEnmy;
				var speeed = gSpeed;
				switch(floorc){
					case 6:
						speeed -= 75;
						t = 4500;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-W',imgurl:'Game/virginity-w.gif'},
													{name:'Dignity-Y',imgurl:'Game/virginity-y.gif'},
													{name:'Dignity-R',imgurl:'Game/virginity-r.gif'},
													{name:'Dignity-G',imgurl:'Game/virginity-g.gif'}
													]
												}
												);
						break;
					case 10:
						speeed -= 75;
						t = 2500;
						randEnmy = makeEvader(	{
												type:'Evader',
												obj:[
													{name:'berbert-1',imgurl:'Game/bert-vince.gif'},
													{name:'berbert-2',imgurl:'Game/bert-paul.gif'},
													{name:'berbert-3',imgurl:'Game/bert-mark.gif'},
													{name:'berbert-4',imgurl:'Game/bert-rhio.gif'},
													{name:'berbert-5',imgurl:'Game/bert-jp.gif'}
													]															
												}
												);
						
						break;
					case 13:
					case 14:
					case 27:
					case 28:
					case 29:
					case 42:
					case 43:
					case 44:
					case 80:
					case 81:
					case 82:
					case 109:
					case 110:
					case 111:
					case 124:
					case 125:
					case 126:
					case 162:
					case 163:
					case 164:
						//tentententenententen
						speeed -= 115;	
						t = 250;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-W',imgurl:'Game/virginity-w.gif'},
													{name:'Dignity-Y',imgurl:'Game/virginity-y.gif'}
													]
												}
												);
					break;
					case 45:
					case 46:
					case 48:
					case 49:
					case 51:
					case 52:
					case 53:
					case 54:
					case 58:
					case 59:
					case 112:
					case 113:
					case 114:
					case 115:
					case 116:
					case 117:
					case 118:
					case 119:
					case 120:
					case 121:
					case 122:
					case 123:					
					case 186:					
					case 187:					
					case 188:					
					case 189:					
					case 190:					
					case 191:
						speeed -= 70;	
						t = 400;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-Y',imgurl:'Game/virginity-y.gif'}
													]
												},
												{
												type:'Evader',
												obj:[
													{name:'berbert-1',imgurl:'Game/bert-vince.gif'},
													{name:'berbert-2',imgurl:'Game/bert-paul.gif'},
													{name:'bertmaster',imgurl:'Game/bert1.gif'},
													]															
												}
												);
					break;
					case 47:
					case 50:
					case 55:
					case 57:
						speeed -= 120;	
						t = 400;
						randEnmy = makeEvader(	{
												type:'Evader',
												obj:[
													{name:'berbert-1',imgurl:'Game/bert-vince.gif'},
													{name:'berbert-2',imgurl:'Game/bert-paul.gif'},
													{name:'berbert-3',imgurl:'Game/bert-mark.gif'},
													{name:'berbert-4',imgurl:'Game/bert-rhio.gif'},
													{name:'berbert-5',imgurl:'Game/bert-jp.gif'}
													]															
												}												
												);
					break;
					case 60:
					case 61:
					case 62:					
					case 85:
					case 206:
					case 166:
					case 167:
					speeed -= 120;	
						t = 200;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-G',imgurl:'Game/virginity-g.gif'},
													]
												}	,
												{
												type:'Evader',
												obj:[
													{name:'berbert-1',imgurl:'Game/bert-vince.gif'},
													{name:'berbert-2',imgurl:'Game/bert-paul.gif'},
													{name:'berbert-3',imgurl:'Game/bert-mark.gif'},
													{name:'berbert-4',imgurl:'Game/bert-rhio.gif'},
													{name:'berbert-5',imgurl:'Game/bert-jp.gif'}
													]															
												}											
												);
						break;
											
					case 127://bago
					case 128:
					case 129:
					case 131:
					case 133:
					case 134:
					case 135:
					case 136:
					case 137:
					case 139:
					case 140:					
					case 141:					
					case 177:
					case 178:	
					speeed -= 120;	
						t = 400;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-G',imgurl:'Game/virginity-g.gif'},
													]
												},
												{
												type:'Evader',
												obj:[
													{name:'berbert-1',imgurl:'Game/bert-vince.gif'},
													{name:'berbert-2',imgurl:'Game/bert-paul.gif'},
													{name:'berbert-3',imgurl:'Game/bert-mark.gif'},
													{name:'berbert-4',imgurl:'Game/bert-rhio.gif'},
													{name:'berbert-5',imgurl:'Game/bert-jp.gif'}
													]															
												}
												);
						break;
						
					case 63:
					case 64:
					case 83:
					case 84:
					case 89:
					case 90:
					case 91:					
					case 92:					
					case 144:				
					case 145:
					case 165:					
					case 172:
					case 173:					
					case 192:
					case 204:
					case 205:
					speeed -= 160;	
						t = 150;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-R',imgurl:'Game/virginity-r.gif'}
													]
												}
												);
						break;
					case 65:
					speeed -= 160;	
						t = 3000;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-R',imgurl:'Game/virginity-r.gif'}
													]
												}
												);
						break;					
					case 146:
					speeed -= 160;	
						t = 4000;
						randEnmy = makeEvader(	{
												type:'Evader',
												obj:[
													{name:'bertlegend',imgurl:'Game/bert-arn.gif'},
													]															
												}
												);
						break;
					case 193:
					speeed -= 170;
							t = 1200;
						randEnmy = makeEvader(	{
												type:'Evader',
												obj:[
													{name:'bertmaster',imgurl:'Game/bert1.gif'},
													]															
												}
												);
							break;
					case 210:
					case 211:
					speeed -= 170;	
						t = 90;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-R',imgurl:'Game/virginity-r.gif'}
													]
												}
												);
						break;
					case 194:
						return 300;
					case 212:
						speeed -= 0;	
						t = 90;
						randEnmy = makeEvader(	{
												type:'Evader',
												obj:[
													{name:'bertmaster',imgurl:'Game/bert1.gif'},
													{name:'bertlegend',imgurl:'Game/bert-arn.gif'}
													]															
												}
												);
						randEnmy.goUp(speeed);
						return 'end';
						//break;
					case 86:
					case 87:
					case 88:
					case 93:
					case 94:
					case 95:
					case 96:
					case 130:
					case 132:
					case 138:					
					case 142:					
					case 143:
					case 168:
					case 169:
					case 170:
					case 171:					
					case 174:
					case 175:					
					case 176:					
					case 195:					
					case 196:
					case 207:
					case 208:
					case 209:
					speeed -= 160;	
						t = 500;
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-G',imgurl:'Game/virginity-g.gif'}
													]
												},
												{
												type:'Evader',
												obj:[
													{name:'bertmaster',imgurl:'Game/bert1.gif'},
													{name:'bertlegend',imgurl:'Game/bert-arn.gif'}
													]															
												}												
												);
						break;
					default:
					if((ctime>67&&ctime<95)||(ctime>149&&ctime<179))
					
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-R',imgurl:'Game/virginity-r.gif'},
													{name:'Dignity-G',imgurl:'Game/virginity-g.gif'}
													]
												},
												{
												type:'Evader',
												obj:[
													{name:'bertlegend',imgurl:'Game/bert-arn.gif'},
													]															
												}
												);
					else if(ctime>200)
					randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-R',imgurl:'Game/virginity-r.gif'},
													]
												},
												{
												type:'Evader',
												obj:[
													{name:'berbert-1',imgurl:'Game/bert-vince.gif'},
													{name:'berbert-2',imgurl:'Game/bert-paul.gif'},
													{name:'berbert-3',imgurl:'Game/bert-mark.gif'},
													{name:'berbert-4',imgurl:'Game/bert-rhio.gif'},
													{name:'berbert-5',imgurl:'Game/bert-jp.gif'}
													]															
												}
												);
					
					else
						randEnmy = makeEvader(	{
												type:'GetMe',
												obj:[
													{name:'Dignity-W',imgurl:'Game/virginity-w.gif'}
													]
												},
												{
												type:'Evader',
												obj:[
													{name:'berbert-3',imgurl:'Game/bert-mark.gif'},
													{name:'berbert-4',imgurl:'Game/bert-rhio.gif'},
													{name:'berbert-5',imgurl:'Game/bert-jp.gif'}
													]															
												}
												);
						
				
				}			
				randEnmy.goUp(speeed);
				
			}
			return t;
		}
		return 550;
	}
Crafty.e("BGWorker, Timer").bGWorker();
var psyy = Crafty.e("Psy").psy(50,50,psyhp);
$(psyy._element).bind('BertHit',function(e,b){
	
	if(psydead==false){
	psyy._life--;
	switch(psyy._life){
	case 7:
	psyy.undress('bra');
	break;
	case 3:
	psyy.undress('panty');
	break;
	case 0:
	
	playerdata.suspect = b;
	playerdata.state = 'dead';
	psydead = true;
	break;
	
	}
	
	$('#hp').html(psyy._life);
	}
	});
var timer; // current timeout id to clear
var time; // dynamic interval

(function repeat() {
    time = perSec();
	if(time === 'end'||psydead===true){	
	$(psyy._element).animate({top: -20-psyy.h+'px'},2000,function(){
		$(audio).unbind('canplaythrough');
		$(audio).unbind('play');
		$(audio).unbind('pause');
		audio.pause();
		Crafty.scene('postgangnam');});
	return;
	}
    timer = setTimeout(repeat, time);
})();		
}
// JavaScript Document