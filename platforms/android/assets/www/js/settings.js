/**
 * 
 */

function appSettings(){
	
}

function saveSettings(){
	//TODO
}
function readSettings(){
	//TODO
}

function initSettings(){
	appSettings.restURL= "Please Input URL";
	appSettings.username = "employee";
	appSettings.password = "employee";
	
	$("#URLBox").val(appSettings.restURL);
	$("#UserBox").val(appSettings.username);
	$("#PassBox").val(appSettings.password);
}

function update(){
	appSettings.restURL = $("#URLBox").val();
	appSettings.username = $("#UserBox").val();
	appSettings.password = $("#PassBox").val();
	alert("Settings Updated");
}