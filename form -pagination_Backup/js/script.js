var myArrayObject = [];
var alphaExp, emailExp, numericExpression;

function onformSubmit() {
    var formData = {};
    formData = readFormData();
    // if validation is true then
    if (formValidation()) {
        formData.id = Number(myArrayObject.length)+1;
        insertNewRecord(formData);
        myArrayObject.push({
            id: Number(myArrayObject.length)+1,
            email: formData.email,
            female: formData.female,
            male:formData.male,
            name: formData.name,
            phone: formData.phone 
            });
        updatePaginationFooter()
        // changePage(1)
    }

}
var formData1 = {};

function readFormData() {
    formData1["name"] = document.getElementById("name").value;
    formData1["email"] = document.getElementById("email").value;
    formData1["phone"] = document.getElementById("phone").value;
    formData1["male"] = document.getElementById("male").value;
    formData1["female"] = document.getElementById("female").value;

    return formData1;
}

function insertNewRecord(data) {

    if (data.name && data.email && data.phone !== undefined) {

        if(myArrayObject.length < 3){

        var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length)

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);

        cell1.innerHTML = '<input type="checkbox" name="" value="" />';
        cell2.innerHTML = '#'+(Number(myArrayObject.length)+1);
        cell3.innerHTML = data.name;
        cell4.innerHTML = data.email;
        cell5.innerHTML = data.phone;

        (function radioValue() {
            if (document.getElementById("male").checked) {
                var male = document.getElementById("male").value;
                cell6.innerHTML = data.male;
            } else if (document.getElementById("female").checked) {
                var female = document.getElementById("female").value;
                cell6.innerHTML = data.female;
            }
        }())
        // radioValue()
        cell7.innerHTML = `<a href="javascript:void(0)" onClick="onDelete(this)">Delete</a>`
    
         }

        } else {
        alert("please fill the Form First")
    }
}

function ReInsertNewRecord(data) {

        var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length)

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);

        cell1.innerHTML = '<input type="checkbox" name="" value="" />';
        cell2.innerHTML = '#'+data.id;
        cell3.innerHTML = data.name;
        cell4.innerHTML = data.email;
        cell5.innerHTML = data.phone;

        function radioValue() {
            if (document.getElementById("male").checked) {
                var male = document.getElementById("male").value;
                cell6.innerHTML = data.male;
            } else if (document.getElementById("female").checked) {
                var female = document.getElementById("female").value;
                cell6.innerHTML = data.female;
            }
        }
        radioValue()
        cell7.innerHTML = `<a href="javascript:void(0)" onClick="onDelete(this)">Delete</a>`
    
}

function onDelete(td) {
    var td = event.target.parentNode;
    var tr = td.parentNode;
    var tdtr = tr.parentNode.removeChild(tr);
}

function CheckUncheckAll(chkAll) {
    var rows = document.getElementById("employeeList").rows;
    for (var i = 1; i < rows.length; i++) {
        var rowofTable = rows[i].getElementsByTagName("INPUT")[0].checked = chkAll.checked;
    }
}

function chkDeletMaster(data) {
    var rows = document.getElementById("employeeList").rows;
    //Execute loop on all rows excluding the Header row.
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].getElementsByTagName("INPUT")[0].checked == true) {
            rows[i--].remove()
        }
    }
}
//----------form Validation--------------
function clearerrors() {
    var errors = document.getElementsByClassName('formerror');
    for (let item of errors) {
        item.innerHTML = "";
    }
}

function seterror(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function seterrors(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

var check = true;

function inputAlphabet(inputtext, error, id) {

    var alphaExp = /^[a-zA-Z]{2,32}$/;
    if (alphaExp.test(inputtext)) {
        return true;
    } else {
        element = document.getElementById(id);
        document.getElementsByClassName('formerror')[0].innerText = error;
        check = false;
        return false;
    }
}
// Function that checks whether an user entered valid email address or not and displays alert message on wrong email address format.
function emailValidation(inputtext, error, id) {
    var emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((([a-zA-Z]+\.)+[a-zA-Z]{2,}))$/igm;
    if (emailExp.test(inputtext)) {
        return true;
    } else {
        element = document.getElementById(id);
        element.getElementsByClassName('formerror')[0].innerHTML = error;
        check = false;
        return false;
    }
}
// Function that checks whether input text is numeric or not.
function phoneValidation(inputtext, error, id) {
    var numericExpression = /^[0-9]{10}$/;
    if (numericExpression.test(inputtext)) {
        return true;
    } else {
        element = document.getElementById(id);
        element.getElementsByClassName('formerror')[0].innerHTML = error;
        check = false;
        return false;
    }
    if (!check) {
        return false;
    }
}

function formValidation() {
    var returnval = true;
    clearerrors();
    var firstName = document.getElementById('name');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    // To check empty form fields.
    if (firstName.value.length == 0 || email.value.length == 0 || phone.value.length == 0) {
        seterror("Name", "*Name is required");
        seterror("Email", "*Email is required");
        seterror("Phone", "*Phone number is required");
        returnval = false;
    } else if (firstName.value.length <= 3 || firstName.value.length >= 15) {
        returncheck1 = seterrors("Name", "* User name must be between 4 to 15 characters");
        returnval = false;
    } else if (phone.value.length < 10 || phone.value.length > 10) {
        returncheck1 = seterrors("Phone", "* Phone number must be in 10 characters");
        returnval = false;
    } else {
        returncheck1 = inputAlphabet(firstName.value, "* For your name please use alphabets only", "Name");
        returncheck2 = emailValidation(email.value, "* Please enter a valid email address", "Email");
        returncheck3 = phoneValidation(phone.value, " * Required your valid contact number", "Phone");
        if (returncheck1 && returncheck2 && returncheck3) returnval = true;
        else returnval = false;
    }
    return returnval;
}

var current_page = 1;
var records_per_page = 3 ;
//---pagination ---
 var start = 0  // 4 * 1
 var end = 3;
 var paginatedItems = myArrayObject.slice(start, end);

function prevPage() {
    if (current_page > 1) {
        changePage(current_page--);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        changePage(current_page++);
    }
}

var page_span = document.getElementById("page");
page_span.innerHTML = 1 + "/" + 1

function updatePaginationFooter(){
  if (page < 1) page = current_page;
  if (page > numPages()) page = numPages();
  page_span.innerHTML = current_page + "/" + numPages()
}

function changePage(page) {

    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var paginatedItems = myArrayObject.slice(((current_page-1)*records_per_page), numRecords());
    paginatedItems = paginatedItems.slice(0,records_per_page);
    resetTable();
    for (var i = 0; i<paginatedItems.length; i++) {
       ReInsertNewRecord(paginatedItems[i])
    } 
    updatePaginationFooter();
}

function resetTable(){
 document.getElementsByTagName('tbody')[1].innerHTML = "";
}

function numRecords() {
    return Math.ceil(myArrayObject.length);
}

function numPages() {
    return Math.ceil(myArrayObject.length / records_per_page);
}
window.onload = function () {
    changePage(1);
};
//---------- sorting in javascript-----
th = document.getElementsByTagName('th');
for (let c = 0; c < th.length; c++) {
    th[c].addEventListener('click', item(c))
}

function item(c) {
    return function () {
        sortTable(c)
    }
}

function sortTable(c) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("employeeList");
    switching = true;
    /*Make a loop that will continue until no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[c];
            y = rows[i + 1].getElementsByTagName("TD")[c];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}