/**
 * 
 */

function getExpenses(){
	$.ajax({
		type: "GET",
		url: appSettings.restExpenseURL,
		dataType: "json",
		success : function(data){
			alert(data);
		}
	})
}