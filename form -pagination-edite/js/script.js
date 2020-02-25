var myArrayObject = [];
var start = 0;
var end = 4;
var alphaExp, emailExp, numericExpression;

function onformSubmit() {
    var formData = {};
    formData = readFormData();
    // if validation is true then
    if (formValidation()) {
        insertNewRecord(formData);
        myArrayObject.push(formData);
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
    console.log(data)
    if (data.name && data.email && data.phone !== undefined) {
        var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length)

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);

        cell1.innerHTML = '<input type="checkbox" name="" value="" />';
        cell2.innerHTML = data.name;
        cell3.innerHTML = data.email;
        cell4.innerHTML = data.phone;

        function radioValue() {
            if (document.getElementById("male").checked) {
                var male = document.getElementById("male").value;
                cell5.innerHTML = data.male;
            } else if (document.getElementById("female").checked) {
                var female = document.getElementById("female").value;
                cell5.innerHTML = data.female;
            }
        }
        radioValue()
        cell6.innerHTML = `<a href="javascript:void(0)" onClick="onDelete(this)">Delete</a>`
    } else {
        alert("please fill the Form First")
    }
}

function onDelete(td) {
    // if(confirm('are you sure you want to delete')){
    var td = event.target.parentNode;
    var tr = td.parentNode;
    var tdtr = tr.parentNode.removeChild(tr);
    // }
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
//containning errors 

var objError = {};
var errorContain = [];
function pushArray(key,str) {
  //  console.log(key) // myName
  //  console.log(str)  // *Name is required
     // var objError = {};
     // var errorContain = [];
      objError[key] = str;
     // if (str) {
      // errorContain.push(objError);
     // errorContain.push(key);
     // }
}
// pushArray();
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
        // element = document.getElementById(id);
        // document.getElementsByClassName('formerror')[0].innerText = error;
        check = false;
        return false;
    }
}
// Function that checks whether an user entered valid email address or not and displays alert message on wrong email address format.
function emailValidation(inputtext, error, id) {
    // var emailExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    var emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((([a-zA-Z]+\.)+[a-zA-Z]{2,}))$/igm;
    // var emailExp= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

function test(obj, obj1, obj2) {
   // debugger;
  // console.log(obj.parentNode.id);
  // console.log(obj)
    //console.log(obj.placeholder) //name
    //console.log(obj.value)  // rizwan
  debugger
    if(obj.value.length == 0) {
      // console.log("value is zero")
       pushArray("myName", `*${obj.placeholder} is required`); // Name
       pushArray("emailAddress", `*${obj1.placeholder} is required`); 
       pushArray("phoneNum", `*${obj2.placeholder} is required`); 
    }
     else if(obj.value.length <= 3 || obj.value.length >=15 ) {
       pushArray("myName", `*${obj.placeholder} character must be between 4 to 15`); // Name
    }
     else if (obj.value.length !== null || obj1.value.length !== null 
             || obj2.value.length !== null) {

                 delete objError[key]; 
    }

   else if(obj2.value.length < 10 || obj2.value.length > 10 ) {
       pushArray("phoneNum", `*${obj2.placeholder} number is not valid`); // Name
    }
  // if(returncheck1) { pushArray(`* For ${obj.placeholder} please use alphabets only`); }
  if(Object.keys(objError).length > 0) {
    // console.log(`${obj.name}`)
    // seterrors(`${obj.parentNode.id}`, errorContain[0][Object.keys(errorContain[0])[0]]);  
    seterrors(`${obj.parentNode.id}`,objError.myName);  
    seterrors(`${obj1.parentNode.id}`,objError.emailAddress);  
    seterrors(`${obj2.parentNode.id}`,objError.phoneNum);  
  }
  // console.log(errorContain)
  errorContain=[];
}

function formValidation() {
    var returnval = true;
    clearerrors();
    // Make quick references to our fields.
    var firstName = document.getElementById('name');
    // console.log(firstName.value)
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    // let key = 'firstName';

    test(firstName, email, phone);
  
        // debugger;
         returncheck1 = inputAlphabet(firstName.value, "* For your name please use alphabets only", "Name");
         returncheck2 = emailValidation(email.value, "* Please enter a valid email address", "Email");
         returncheck3 = phoneValidation(phone.value, " * Required your valid contact number", "Phone");
         if (returncheck1 && returncheck2 && returncheck3) returnval = true;
         else returnval = false;
    // }
    return returnval;

}
//---pagination ---
var current_page = 1;
var records_per_page = 4;

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    page_span.innerHTML = page + "/" + numPages();
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
} //232