




document.addEventListener("DOMContentLoaded", kreiramoZadatke); //sami dogadjaji su vezani za document, pa povezujemo ovaj osluskivac
 
function kreiramoZadatke(){
	let zadaci;
	if(localStorage.getItem("zadaci") === null) {
		zadaci = [];
	} else {
		zadaci = JSON.parse(localStorage.getItem('zadaci'));
	} 
	zadaci.forEach( function(zadatak) { //kreiranje liste potencijalnih zadataka
		let li = document.createElement("li");
		li.className = "skup-zadataka";
		li.appendChild(document.createTextNode(zadatak));
		let link = document.createElement("a");
		link.innerHTML = "<i class = 'fa fa-minus-circle'></i>"
		li.appendChild(link);
		listaZadataka.appendChild(li);
	});
}

let unosZadatka = document.querySelector("#zadatak");
let form = document.querySelector("#forma");
form.addEventListener("submit", function dodajZadatak(e) {
	e.preventDefault() //prevencija da se forma submituje nakon klika na  dugme ako --> nismo uneli nista u polje
	if(unosZadatka.value === ''){
		alert("You must add new task!") // --  nismo uneli ništa u polje
	}//prethodni primer moze da se uradi i na drugaciji nacin, dodavanjem return false u okviru funkcije (govori funkciji da treba da se prekine izvrsavanje, a samim tim nece doci do reakcije na dogadjaj)
	let li = document.createElement("li"); 
	li.className = "skup-zadataka";
	li.appendChild(document.createTextNode(unosZadatka.value));
	let link = document.createElement("a");
	link.innerHTML = "<i class = 'fa fa-minus-circle'></i>";
	li.appendChild(link);
	listaZadataka.appendChild(li);
	dodajUStorage(unosZadatka.value);
});
	

let listaZadataka = document.querySelector(".lista-zadataka"); //ovde se sakupljaju zadaci koje unosimo 
listaZadataka.addEventListener("click", function brisiZadatak(e){
	if(e.target.classList.contains('fa-minus-circle')){
		if(confirm('Do you want to delete task?')){
			e.target.parentElement.parentElement.remove();
			brisiSveIzStorage(e.target.parentElement.parentElement); //brisanje iz localStorage
		}
	}
});

let dugmeIzbrisi = document.querySelector(".izbrisi-zadatke");
dugmeIzbrisi.addEventListener("click", function brisiSveZadatke(e) {
	if(confirm('Do you want to delete all tasks?'));
	while(listaZadataka.firstChild){
		listaZadataka.removeChild(listaZadataka.firstChild);
	}
	brisiSveIzStorage();
});

	
function brisiSveIzStorage(){
	localStorage.clear();
}

function dodajUStorage(zadatak){ //skladistenje u local storage
	let zadaci;
	if(localStorage.getItem('zadaci') === null){
		zadaci = [];
	}else{
		zadaci = JSON.parse(localStorage.getItem("zadaci"));
	}
	zadaci.push(zadatak);
	localStorage.setItem('zadaci', JSON.stringify(zadaci))  //sve sto unesemo, bice sacuvano u localStorage
}

function brisiSveIzStorage(y){ //brisanje iz Local Storage
	if(localStorage.getItem("zadaci")=== null){
		zadaci = [];
	}else{
		zadaci = JSON.parse(localStorage.getItem("zadaci"));
	}
	zadaci.forEach( function(zadatak, i) {
		if(y.textContent === zadatak){
			zadaci.splice(i, 1);
		}
	});
	localStorage.setItem('zadaci', JSON.stringify(zadaci));
}

let filter = document.querySelector("#filter");
filter.addEventListener("keyup", function pretragaZadataka(e){ //filtriranje zadataka
let n = e.target.value.toLowerCase();
	let items = listaZadataka.getElementsByTagName("li");
	Array.from(items).forEach( function(element) {
		let x = element.firstChild.textContent;
		if(x.toLowerCase().indexOf(n) != -1){
			element.style.display = "flex";
		}else{
			element.style.display = "none";
		}
	})
});















