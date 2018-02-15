var attempt = 3;
var listeudid = ["Azerty/12345678"];

function checkin() {
	var username = document.getElementById("username").value;
	var udid = document.getElementById("udid").value;
	if (udid.includes(listeudid)) { 
		window.location.replace("http://www.google.fr")
	} 
	else{
	attempt --;// Decrementing by one.
	alert("You have left "+attempt+" attempt;");
	// Disabling fields after 3 attempts.
	if( attempt == 0){
	document.getElementById("username").disabled = true;
	document.getElementById("udid").disabled = true;
	document.getElementById("submit").disabled = true;
	return false;

}
}
}