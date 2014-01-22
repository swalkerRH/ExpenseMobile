/**
 * 
 */

function updateView(data){
	var refreshButton = $("#refreshButton");
	$("#expenseList").empty();
	var categories = [];
	for(var i=0; i<data.length;i++){
		var expense = data[i];
		var listId = expense.expenseCategory.name + 'List';
		if($.inArray(expense.expenseCategory.name, categories) === -1){
			categories.push(expense.expenseCategory.name)
			var divId =  expense.expenseCategory.name + 'Div';
			var collapsableDiv ='<div data-role="collapsible" data-inset="false" data-theme="b" id="' + divId +'" ></div>';
			var divHeader = '<h2>' +  expense.expenseCategory.name + '</h2>';
			var listView = '<ul data-role="listview" id="'+ listId +'"></ul>';
			$("#expenseList").append(collapsableDiv);
			$("#"+divId).append(divHeader);
			$("#"+divId).append(listView);
			$("#"+listId).append(makeExpenseElement(expense));
		} else {
			$("#"+listId).append(makeExpenseElement(expense));
		}
	}
	$("#expenseList").append(refreshButton);
	$("#expenseList").trigger("create");
}

function makeExpenseElement(expense){
	var li = $("<li>");
	var element = $("<a>", {href:"#expensePanel"});
	element.text(expense.description)
	element.click(setValuesFunction(expense));
	li.append(element);
	return li;
	
}

function setValuesFunction(expense){
	function setValues(){
		$("#expenseName").text(expense.description)
		$("#expenseCost").text("Cost: " + expense.cost);
		$("#expenseDate").text("Date: " + expense.entered);
		$("#expensePanel").trigger("updatelayout");
	}
	return setValues;
}

function getExpenses(){
	$.ajax(
	{
		type: "POST",
		url: appSettings.restExpenseURL,
		data: JSON.stringify(appSettings.userJson),
		contentType: "application/json",
		mimeType: "application/json",
		success : updateView,
		error: function(req, status, thrown){
			alert("Getting Expenses Failed. Check Settings: " + req.getResponseHeader());
		},
		complete: function(xhr, status){
			//alert(status);
		},
		traditional: true
	}
	);
}