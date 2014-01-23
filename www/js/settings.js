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
	appSettings.restURL= "http://192.168.1.3:8080/jboss-expenses";
	appSettings.username = "employee";
	appSettings.password = "employee";
	appSettings.restExpenseURL = appSettings.restURL + "/rest/expense/";
	appSettings.restImageURL = appSettings.restURL + "/rest/image/";
	appSettings.restCategoryURL = appSettings.restURL + "/rest/category/"
	constructUserJson();
	
	$("#URLBox").val(appSettings.restURL);
	$("#UserBox").val(appSettings.username);
	$("#PassBox").val(appSettings.password);
}

function update(){
	appSettings.restURL = $("#URLBox").val();
	appSettings.username = $("#UserBox").val();
	appSettings.password = $("#PassBox").val();
	appSettings.restExpenseURL = appSettings.restURL + "/rest/expense/";
	appSettings.restImageURL = appSettings.restURL + "/rest/image/";
	appSettings.restCategoryURL = appSettings.restURL + "/rest/category/";
	constructUserJson();
	
	alert("Settings Updated");
}

function constructUserJson(){
	appSettings.userJson = {
			username : appSettings.username,
			password : appSettings.password
	};
}