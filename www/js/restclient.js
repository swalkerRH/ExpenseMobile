/**
 * 
 */

function updateView(data) {
	var refreshButton = $("#refreshButton");
	$("#expenseList").empty();
	var categories = [];
	// display Expenses
	for (var i = 0; i < data.length; i++) {
		var expense = data[i];
		var listId = expense.expenseCategory.name + 'List';
		if ($.inArray(expense.expenseCategory.name, categories) === -1) {
			categories.push(expense.expenseCategory.name)
			var divId = expense.expenseCategory.name + 'Div';
			var collapsableDiv = '<div data-role="collapsible" data-collapsed-icon="carat-r" data-expanded-icon="carat-d" data-inset="false" data-theme="b" id="'
					+ divId + '" ></div>';
			var divHeader = '<h2>' + expense.expenseCategory.name + '</h2>';
			var listView = '<ul data-role="listview" id="' + listId + '"></ul>';
			$("#expenseList").append(collapsableDiv);
			$("#" + divId).append(divHeader);
			$("#" + divId).append(listView);
			$("#" + listId).append(makeExpenseElement(expense));
		} else {
			$("#" + listId).append(makeExpenseElement(expense));
		}
	}
	// display Categories in new expense
	var newExpenseCat = $("#newExpenseCategories");
	newExpenseCat.empty();
	for (var j = 0; j < categories.length; j++) {
		var cat = categories[j];
		var checkHtml = '<input name="radio-choice-v-2" id="' + cat
				+ 'Radio" type="radio"/><label for="' + cat + 'Radio">' + cat
				+ '</label>';
		newExpenseCat.append(checkHtml);
	}
	$("#newExpenseCategories").trigger("create");
	$("#newExpenseCategories").trigger("updatelayout");
	$("#newExpensePanel").trigger("updatelayout");
	$("#expenseList").trigger("create");
}

function makeExpenseElement(expense) {
	var li = $("<li>");
	var element = $("<a>", {
		href : "#expensePanel"
	});
	element.text(expense.description)
	element.click(setValuesFunction(expense));
	li.append(element);
	return li;

}

function setValuesFunction(expense) {
	function setValues() {
		$("#expenseName").text(expense.description)
		$("#expenseCost").text("Cost: $" + Number(expense.cost).toFixed(2));
		$("#expenseDate").text("Date: " + expense.entered);
		$("#expensePanel").trigger("updatelayout");
	}
	return setValues;
}

function getExpenses() {
	$.ajax({
		type : "POST",
		url : appSettings.restExpenseURL,
		data : JSON.stringify(appSettings.userJson),
		contentType : "application/json",
		mimeType : "application/json",
		success : updateView,
		error : function(req, status, thrown) {
			alert("Getting Expenses Failed. Check Settings: "
					+ req.getResponseHeader());
		},
		complete : function(xhr, status) {
			// alert(status);
		},
		traditional : true
	});
}
/*
 * needs to be in the form of user : { username: name, password: password},
 * expense: {description: desc, cost: cost, category: category}
 */
function addExpense() {
	var cost = $("#newExpenseCost").val();
	var desc = $("#newExpenseDesc").val();
	var catId = $('input[type="radio"]:checked', "#newExpenseCategories").attr(
			"id");
	var cat = catId.substring(catId.length - 5, -1);
	alert(cost + " " + desc + " " + cat);
	if (cat === "") {
		alert("You must specify a Category");
		return;
	} else if (cost === "") {
		alert("You must specify a Cost");
		return;
	} else if (desc === "") {
		alert("You must specify a Description");
		return;
	}
	
	var jsonObject = {};
	jsonObject.user = appSettings.userJson;
	jsonObject.expense = {};
	jsonObject.expense.cost = cost;
	jsonObject.expense.description = desc;
	jsonObject.expense.category = cat;

	$.ajax({
		type : "POST",
		url : appSettings.restExpenseURL + "create/",
		data : JSON.stringify(jsonObject),
		contentType : "application/json",
		mimeType : "application/json",
		success : function(data) {
			alert("Successfully added expense");
		},
		error : function(req, status, thrown) {
			alert("Adding Expense Failed. Check Settings: "
					+ req.getResponseHeader());
		},
		complete : function(xhr, status) {
			alert(status);
		}
	});
	getExpenses();
}