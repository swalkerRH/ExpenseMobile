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
	appSettings.restExpenseURL = appSettings.restURL + "/rest/expense";
	appSettings.restImageURL = appSettings.restURL + "/rest/image";
	
	$("#URLBox").val(appSettings.restURL);
	$("#UserBox").val(appSettings.username);
	$("#PassBox").val(appSettings.password);
}

function update(){
	appSettings.restURL = $("#URLBox").val();
	appSettings.username = $("#UserBox").val();
	appSettings.password = $("#PassBox").val();
	appSettings.restExpenseURL = appSettings.restURL + "/rest/expense";
	appSettings.restImageURL = appSettings.restURL + "/rest/image";
	
	alert("Settings Updated");
}