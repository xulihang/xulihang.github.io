
// hlavna adresa userscriptu: http://www.smnd.sk/girlgenius/gg_translation.user.js

// @description    Nacita preklady a po prechode mysou ponad bublinu zobrazi preklad.
// @copyright     original OOTS script: cache.slovakia, free to use or modify, only show my nick as part of licence
// @copyright     modified by Anino (anino(at)smnd.sk), original OOTS translation script changed for Girl Genius
// @copyright     modified by Tomi (tomi.belan(at)gmail.com): use JSONP instead of XHR to support Opera, Chrome etc

// v userscripte iba do stranky injectnem <script> s vhodnym src,
// v ktorom je samotna hlavna cast programu (tj tento subor). tym sice pridem o vyhody
// sandboxovania, a musim zdielat namespace s povodnymi skriptami co
// boli na tej stranke (teraz tam asi nie su skoro ziadne),
// ale pojde mi JSONP. v Opere, kde nie su gm_* funkcie, je JSONP v podstate
// jediny poriadny sposob, ako tahat data z inych domen.



//premenna pre datum prekladu
//Original: var stripDate = window.location.href.substring(47,55);
//nezistujem ju z mena stranky, ale z mena suboru, pretoze najnovsi strip na stranke nema datum
var stripDate = "";

//doba cakania okna so spravou
var messageWait = 10;

//obrazok stripu, aby sme mu mohli priradit mapu
var stripImg = false;

//body element
var body = document.getElementsByTagName("body")[0];

var msgError = "Nepodarilo sa načítať preklad.";
var msgHint = "Prechádzajte myšou ponad bubliny s textom.";
var msgClose = "Kliknutím zatvorte, alebo počkajte " + messageWait + " sekúnd.";
var msgTranslator = "Preklad: ";

tempX = 0;
tempY = 0;
visibleArea = null;

function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

function getMouseXY(e) {
	var s = getScrollXY();
	e = e || window.event;
	tempX = e.pageX || (e.clientX+s[0]);
	tempY = e.pageY || (e.clientY+s[1]);
	if (tempX < 0){tempX = 0}
	if (tempY < 0){tempY = 0}
	return true;
}
function showTranslation(areaNumber, data){
	var translation = document.getElementById('translation');
	translation.style.left = tempX + 15 + "px";
	translation.style.top = tempY + "px";
	if(visibleArea == areaNumber) return;
	visibleArea = areaNumber;
	translation.innerHTML = data.text;
	//translation.style.padding = '5px';
	translation.style.background = data.background || 'white';
        translation.style.color = (data.color||'black');
	translation.style.border = '2px solid ' + (data.color||'black');
	translation.style.fontSize = (data.fontSize ? data.fontSize+'pt' : '12pt');
	translation.style.fontWeight = data.fontWeight || 'normal';
	translation.style.visibility = 'visible';
}
function hideTranslation(){
	var translation = document.getElementById('translation');
	translation.style.visibility='hidden';
	visibleArea = null;
}


function niceSlovakDate()
{
	dni = ["Nedeľa","Pondelok","Utorok","Streda","Štvrtok","Piatok","Sobota"];
	mesiace = ["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra"];
	meskonst = [0,3,3,6,1,4,6,2,5,0,3,5];
	century = parseInt(stripDate.substring(0,2),10);
	year = parseInt(stripDate.substring(2,4),10);
	wholeyear = parseInt(stripDate.substring(0,4),10);
	month = parseInt(stripDate.substring(4,6),10);
	day = parseInt(stripDate.substring(6,8),10);
	diw = 2*(3 - (century % 4)) + year + Math.floor(year/4) + meskonst[month - 1] + day;
	if (((wholeyear % 400 == 0) || ((wholeyear % 4 == 0) && (wholeyear % 100 != 0))) && (month < 3))
		diw -= 1;
	diw %= 7;
	return dni[diw] + ", " + parseInt(day) + ". " + mesiace[month - 1] + " " + wholeyear;
}

function addMessage(msg1, msg2, msg3){
	msg1 = decodeURIComponent(msg1);
	msg2 = decodeURIComponent(msg2);
	msg3 = decodeURIComponent(msg3);
	var msgDiv = document.createElement('div');
	msgDiv.id = "sprava";
	msgDiv.style.cursor="default";
	msgDiv.setAttribute("onclick","this.style.visibility='hidden';");
	var innerData = "";
	innerData += "<span id=\"velky\">" +	msg1 + "</span>";
	if (msg2 != "" && msg2 != "undefined"){
		innerData += "<br/><br/>" + msg2;
	}
	if (msg3 != "" && msg3 != "undefined"){
		innerData += "<br/><br/>" + msg3;
	}
	innerData += "<br/><br/>" + decodeURIComponent(msgHint) + "<br/>" + decodeURIComponent(msgClose);
	msgDiv.innerHTML=innerData;
	body.appendChild(msgDiv);
	setTimeout("document.getElementById('sprava').style.visibility='hidden';", messageWait * 1000);
}


//funkcia na injecnutie dat do stranky
function addTranslation(data){
	//mapa bublin
	if(data == undefined) {
	      addMessage(msgError + "<br />Zatiaľ ešte neexistuje.");
	      return;
	}
	var transMap = document.createElement('map');
	transMap.name = "transMap";
	var dataArray = data.data;
	//prebehneme cyklicky data a vytvorime area parametre obsahujuce aj text prekladu
	for(i=0;i<dataArray.length;i++){
		var transArea = document.createElement('area');
		transArea.shape = dataArray[i]["shape"];
		transArea.coords = dataArray[i]["coordinates"];
		transArea.areaNumber = i;
		transArea.onmousemove = function () {
		  showTranslation(this.areaNumber, dataArray[this.areaNumber]);
		};
		transArea.onmouseout = hideTranslation;
		transMap.appendChild(transArea);
	}

	//nastavime obrazku mapu a pripojime mu ju
	stripImg.setAttribute("usemap", "#transMap", 0);
	document.body.appendChild(transMap);

	//nacitame CSS pre bubliny a spravu
	var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = "myCSS";
        link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://www.smnd.sk/girlgenius/translator.css';
	link.media = 'all';
	head.appendChild(link);
	
	//div pre prekladove bubliny
	var transDiv = document.createElement('div');
	transDiv.id = "translation";
	body.appendChild(transDiv);

	document.onmousemove = getMouseXY;

	//zobrazenie spravy
	addMessage(data.part + ". diel<br />" + data.title + "<br />" +
		   "Strana: " + data.page + "<br />",
		   niceSlovakDate() + "<br />" +
	           msgTranslator + data.translator, 
		   "Preklad načítaný: " + dataArray.length + 
		      (dataArray.length == 1 ? " bublina." : (dataArray.length >= 2 && dataArray.length <= 4 ? " bubliny." : " bublín.")));
}


function loadTranslation(){
  //najdeme si vsetky obrazky
  var imgs = document.getElementsByTagName("img");
	
  //teraz najdeme prvy, ktory ma obrazok na www.girlgeniusonline.com/ggmain/strips/ggmain - to je samotny strip
  for(i = 0; i < imgs.length; i++){
    if(imgs[i].src.indexOf("www.girlgeniusonline.com/ggmain/strips/ggmain") != -1){
      stripImg = imgs[i];
      stripDate = imgs[i].src.substring(52,60);
      break;
    }
  }
	
  //ak sa nenasiel, prerusime proces
  if (!stripImg) return false;

  // nacitame preklad cez jsonp
  // TODO zistit ako to vyzera s tym onerror
  var scriptElem = document.createElement("script");
  scriptElem.src = "https://www.smnd.sk/girlgenius/getjsonp.php?callback=addTranslation&file=translation/"+stripDate+".txt";
  document.body.appendChild(scriptElem);
  // nacitame subchapters udaje
  var scriptElem = document.createElement("script");
  scriptElem.src = "https://www.smnd.sk/girlgenius/translation/subchapters.js";
  document.body.appendChild(scriptElem);
}

loadTranslation();

