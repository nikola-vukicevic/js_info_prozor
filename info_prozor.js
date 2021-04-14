/* -------------------------------------------------------------------------- */
/* PODEŠAVANJA                                                                
/* -------------------------------------------------------------------------- */
/*
  - idProzora       - id pod kojim će se info prozor pojaviti u HTML-u / DOM-u
                      (CSS se poklapa sa podrazumevanim id-om)
  - lokacijaProzora - id elementa kome će info prozor biti pridodat
  - tajmer_g1       - vreme za koje, posle klika za otvaranje, opacity
                    prozora poraste od 0 do 100%
  - tajmer_g2       - vreme (računajući od trenutka otvaranja), posle koga
                    prozor počinje da bledi
  - tajmer_g3       - vreme (računajući od trenutka otvaranja), posle koga
                    nestaje
  
  Vremena su izražena u milisekundama


  |      pojava     |              trajanje               |    zatvaranje    |
  |-----------------|-------------------------------------|------------------|
  | -- tajmer_g1 -- |
  | ---------------------  tajmer_g2 -------------------- |
  | ------------------------------- tajmer_g3 ------------------------------ |


/* -------------------------------------------------------------------------- */

var idProzora          = "info_prozor";
var lokacijaProzora    = "wrapper";
var prozor_otvoren     = false;
var prozor_opacity     = 0;
var dostignuti_opacity = 0;
var tajmer_prozor      = 0;
var interval           = 20;
var tajmer_g1          = 4000;
var tajmer_g2          = 12000;
var tajmer_g3          = 16000;
var tajmer_pokrenut;
var ocitavanje_opacity;

/* -------------------------------------------------------------------------- */
/* TEKST U PROZORU
/* -------------------------------------------------------------------------- */

var napomena_prozor_string =

`<h2>INFO</h2>
	<h3>Lakše je uz prečice:</h3>
	<ul>
		<li>(<b>numPad +</b>)  uvećanje teksta</li>
		<li>(<b>numPad -</b>)  umanjivanje teksta</li>
		<li>(<b>numPad *</b>)  početni zoom</li>
		<li>(<b>ESC</b>) - zatvaranje Info prozora</li>
	</ul>
	<div id='${idProzora}_iks' onclick='PokretanjeZatvaranja()'>×</div>`;

/* -------------------------------------------------------------------------- */
/* FUNKCIJE
/* -------------------------------------------------------------------------- */

function OtvaranjeProzora() {

	let idZaKacenjeProzora       = document.getElementById(lokacijaProzora);

	if(!prozor_otvoren) {
		let infoProzor           = document.createElement("div");
		infoProzor.setAttribute("id", idProzora);
		infoProzor.innerHTML     = napomena_prozor_string;
		idZaKacenjeProzora.appendChild(infoProzor);

		infoProzor.style.opacity = 0;
		tajmer_pokrenut          = setTimeout(Zatvaranje, tajmer_g3);
		ocitavanje_opacity       = setInterval(OcitavanjeTajmera, interval);
		prozor_otvoren           = true;
	}
	else {
		alert("Prozor je vec otvoren");
	}
}

function PokretanjeZatvaranja() {
	if(prozor_otvoren && tajmer_prozor < tajmer_g2) {
		tajmer_prozor = tajmer_g2;
	}
	else {
		Zatvaranje();
		//alert("Sta biste tacno hteli da zatvorite? :D");
	}
}

function Zatvaranje() {
	let infoProzor = document.getElementById(idProzora);

	if(prozor_otvoren) {
		infoProzor.remove();
		prozor_otvoren       = false;
		tajmer_prozor        = 0;
		prozor_opacity       = 0;
		clearTimeout(tajmer_pokrenut);
		clearInterval(ocitavanje_opacity);
		//IspisPodataka();
	}
}

function OcitavanjeTajmera() {
	let infoProzor = document.getElementById(idProzora);
	
	if(tajmer_prozor < tajmer_g3) {
		if(tajmer_prozor < tajmer_g1) {
			prozor_opacity     = tajmer_prozor / tajmer_g1;
			dostignuti_opacity = prozor_opacity;
		}
		else {
			if(tajmer_prozor > tajmer_g2) {
				prozor_opacity  = dostignuti_opacity * (1 - (tajmer_prozor - tajmer_g2) / (tajmer_g3 - tajmer_g2));
			}
			else {
				prozor_opacity = 1;
			}
		}

		infoProzor.style.opacity = prozor_opacity;
		tajmer_prozor           += interval;		
		//IspisPodataka();
	}
	else {
		Zatvaranje();
	}
}

function IspisPodataka() {
	document.getElementById("oznaka_prozor_otvoren").innerHTML     = prozor_otvoren;
	document.getElementById("oznaka_prozor_opacity").innerHTML     = Math.round(prozor_opacity * 100) / 100;
	document.getElementById("oznaka_tajmer_prozor").innerHTML      = tajmer_prozor + "ms";
	document.getElementById("oznaka_interval").innerHTML           = interval;
	document.getElementById("oznaka_tajmer_g1").innerHTML          = tajmer_g1 / 1000 + "s";
	document.getElementById("oznaka_tajmer_g2").innerHTML          = tajmer_g2 / 1000 + "s";
	document.getElementById("oznaka_tajmer_g3").innerHTML          = tajmer_g3 / 1000 + "s";
	document.getElementById("oznaka_tajmer_pokrenut").innerHTML    = tajmer_pokrenut;
	document.getElementById("oznaka_ocitavanje_opacity").innerHTML = ocitavanje_opacity;
}

