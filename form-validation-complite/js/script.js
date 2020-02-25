
var myArrayObject = [];
var start = 0;
var end = 4;
var alphaExp, emailExp, numericExpression;
function myReset() {
    document.getElementById("myForm").reset();
    return false;
  }
function onformSubmit() {
  // debugger
    var formData = {};
    formData = readFormData();
    // if validation is true then
    // if (formValidation()) {
        insertNewRecord(formData);
        myArrayObject.push(formData);
    // }
    myReset();
}
console.log(myArrayObject);
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
          // debugger
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
// debugger
  var isName = false;
  var isMail = false;
  var isPhone = false;
  function check(){
    // debugger
    if( isName && isMail && isPhone ){
      return true;
    }else{
      // alert('Failed');
      return false;
    }
  }
 function myReset() {
    document.getElementById("myForm").reset();
    return true;
  }
/* event listener */
document.getElementById("name").addEventListener('keyup', checkName);
document.getElementById("email").addEventListener('keyup', checkEmail);
document.getElementById("phone").addEventListener('keyup', phoneNumber);

/* function */

function checkName(){

   if(this.value.length == 0){
      isName = false;
      document.getElementById("nameError").innerHTML = 'Name feild is required'; 
   }
   else if(this.value.length <= 3 || this.value.length >= 15){
      isName = false;
      document.getElementById("nameError").innerHTML = 'Name must be between 3 to 15 charactor'; 
   }
   else if (this.value != ''){
    var letters = /^[A-Za-z]+$/;
      if(this.value.match(letters) == null){
        isName = false;
        document.getElementById("nameError").innerHTML = 'Name must be alphabets charactor only';
      }else{
        isName = true;
        document.getElementById("nameError").innerHTML = '';
      }
   }
   EnableDiableSubmitButton();
}

function checkEmail(){
 // debugger
   if(this.value.length == 0){
      isMail = false;
      document.getElementById("emailError").innerHTML = 'Email feild is required'; 
   }
   
   else if (this.value != ''){
        // debugger  
      var emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((([a-zA-Z]+\.)+[a-zA-Z]{2,}))$/igm;
      console.log(this.value,this.value.match(emailExp));
      if(this.value.match(emailExp) == null){
        isMail = false;
        document.getElementById("emailError").innerHTML = 'Email is not valid';
       }  
       else{
         if(!checkEmailExistence()) {
            document.getElementById("emailError").innerHTML = 'This email id is already taken by another user';
         } else {
           isMail = true;
           document.getElementById("emailError").innerHTML = '';
         }
      }
   } 
   function checkEmailExistence() {
    // debugger;
      let emailchk = true;
      for (var i=0; i < myArrayObject.length; i++) {
               var inputValue = document.getElementById("email").value;
            if (myArrayObject[i].email === inputValue) {
             document.getElementById("emailError").innerHTML = 'This email id is already taken by another user';
             isMail = false;
             emailchk = false;
             }
          }
       return emailchk;  
   }
   EnableDiableSubmitButton();
}
 
function phoneNumber(){
   if(this.value.length == 0){
      isName = false;
      document.getElementById("phoneError").innerHTML = 'Phone number is required'; 
   }
   else if(this.value.length < 10 || this.value.length > 10){
      isPhone = false;
      document.getElementById("phoneError").innerHTML = 'Phone number is not valid '; 
   }
   else if (this.value != ''){
     var numericExpression = /^[0-9]{10}$/;
      if(this.value.match(numericExpression) == null){
        isPhone = false;
        document.getElementById("phoneError").innerHTML = 'Phone number is not valid';
      }else{
        isPhone = true;
        document.getElementById("phoneError").innerHTML = '';
      }
   }
   EnableDiableSubmitButton();
}


function EnableDiableSubmitButton(){
  // debugger
  bt = document.getElementById('submit');
  // if(isName && isMail
  if(isName && isMail && isPhone)
    bt.disabled = false;
  else 
    bt.disabled = true;
}

EnableDiableSubmitButton();
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


