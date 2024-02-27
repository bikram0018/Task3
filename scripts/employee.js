document.addEventListener("DOMContentLoaded", function () {
    empdata=localStorage.getItem('newEmpData');
    empdata=JSON.parse(empdata);
    populateTable(empdata);
    setFilterValues();

    var showAddEmpMsg=JSON.parse(localStorage.getItem('showSuccessMessage'));
    var showUpdEmpMsg=JSON.parse(localStorage.getItem('showUpdateMessage'));
    if(showAddEmpMsg){
        showMessage('Employee Added Successfully');
        localStorage.setItem('showSuccessMessage',JSON.stringify(false));
    }
    if(showUpdEmpMsg){
        showMessage('Employee Updated Successfully');
        localStorage.setItem('showUpdateMessage',JSON.stringify(false));
    }

    function showMessage(msg){
        const box = document.getElementsByClassName('emp-success-popup')[0];
        box.getElementsByClassName('popup-text')[0].innerHTML=msg;
        box.style.display='block';
        document.getElementsByClassName('active-icon')[0].style.display='none';
        setTimeout(() => {
            box.style.display = 'none';
            document.getElementsByClassName('active-icon')[0].style.display='block';
        }, 2000);
    }
});

function populateTable(data) {
    const tableBody = document.getElementsByClassName('emp-details-table')[0];
    if(data.length!=0){
        document.getElementsByClassName('empty-table-popup')[0].style.display='none';
        data.forEach(employee => {
            const row = createTableRow(employee);
            tableBody.appendChild(row);
        });
    }
    else{
        document.getElementsByClassName('empty-table-popup')[0].style.display='block';
    }
}

function createTableRow(employee) {
    const row = document.createElement('tr');
    row.classList.add('hover-color');
    const bgColor = 'rgb(231,244,232)';
    const textColor = 'rgb(80,153,129)';
    const image = employee.profilePic ? employee.profilePic : "./images/user-icon.png";
    row.innerHTML = `
        <td><input type="checkbox" class="check_box_prop" onclick="allChecked()"></td>
        <td>
            <div class="emp-profile">
                <img src=${image} alt="user-icon" class="emp-icon-img">
                <div class="emp-name-mail">
                    <p class="emp-name">${employee.fname+' '+employee.lname}</p>
                    <p class="emp-mail text-grey-clr">${employee.email}</p>
                </div>
            </div> 
        </td>
        <td>${employee.location}</td>
        <td>${employee.dept}</td>
        <td>${employee.role}</td>
        <td>${employee.empno}</td>
        <td><p class="emp-status" style="background-color: ${bgColor}; color: ${textColor}">Active</p></td>
        <td>${employee.jdate}</td>
        <td class="dots pointer" onclick="editOptions()">···</td>
    `;
    return row;
}

function setFilterValues() {
    var status=['Active','Inactive'];
    var statusFilter=document.getElementsByClassName('status')[0];
    for (let i = 0; i < status.length; i++) {
        const opt = createOption(status[i]);
        statusFilter.appendChild(opt);
    }
    var loc=['Banglore','Chennai','Delhi','Hyderabad','Kerala','Tamilnadu'];
    loc.sort();
    const locationFilter = document.getElementsByClassName('location')[0];
    for (let i = 0; i < loc.length; i++) {
        const opt = createOption(loc[i]);
        locationFilter.appendChild(opt);
    }
    var dept=['HR','Finance','Administration','Marketing','Sales','IT','Accounting','Research','Production','Customer service','Purchasing','Distribution'];
    dept.sort();
    const departmentFilter = document.getElementsByClassName('department')[0];
    for (let i = 0; i < dept.length; i++) {
        const opt = createOption(dept[i]);
        departmentFilter.appendChild(opt);
    }
}

function createOption(value) {
    const box = document.createElement('div');
    var chbox=document.createElement("input");
    chbox.type="checkbox";
    chbox.id=value;
    box.classList='option-flex';
    var para=document.createElement('label');
    para.innerHTML=value;
    para.setAttribute('for',value);
    para.classList='option-text';
    box.appendChild(para);
    box.appendChild(chbox);
    box.onclick=showHideResetApplyButtons;
    return box;
}

function allChecked(){
    var ele=document.getElementsByClassName('check_box_prop');
    var total=ele.length-1;
    var count=0;
    for(i=1;i<=total;i++){
        if(ele[i].checked){
            count+=1;
        }
    }
    if(count==total){
        ele[0].checked=true;
    }
    else{
        ele[0].checked=false;
    }
    if(count>0){
        document.getElementsByClassName('delete-btn')[0].style.backgroundColor='rgba(244,72,72)';
    }
    else{
        document.getElementsByClassName('delete-btn')[0].style.backgroundColor='';
    }
}

var row;
function editOptions(){
    var x=event.pageX;
    var y=event.pageY;
    var container=document.getElementsByClassName('edit-container')[0];
    container.classList="edit_container_visible";
    container.style.position='absolute';
    container.style.left=x-110;
    container.style.top=y;
    if(event.screenY>570){
        container.style.top=y+565-event.screenY;
    }
    row=event.target.parentNode;
}


function exportEmpInfo(){
    var data = document.getElementsByClassName('emp-details-table')[0];
    var excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
    XLSX.write(excelFile, {  type: 'base64',bookType: 'xlsx', bookSST: true });
    XLSX.writeFile(excelFile, 'ExportedFile:HTMLTableToExcel' + '.xlsx');
}


function goToAddEmployee(){
    window.location.href='Add_employee.html';
}


function clearFilter(){
    var fil=document.getElementsByClassName('filter-logo')[0];
    fil.src="./images/Interface/filter-black.svg";
    var empData=JSON.parse(localStorage.getItem('newEmpData'));
    removeTableData();
    populateTable(empData);
    document.getElementsByClassName('empty-table-popup')[0].style.display='none';
    var ele=document.getElementsByClassName('char-btn active');
    if(ele.length>0){
        ele[0].classList.remove('active');
    }
}

var prev='';
function filterEmployeesByAlphabet(char){
    var fil=document.getElementsByClassName('filter-logo')[0];
    fil.src="./images/Interface/filter.svg";
    if(prev!=char){
        var empData=filterEmployeesByAlphabetData(char);
        removeTableData();
        populateTable(empData);
        
        var ele=document.getElementsByClassName('char-btn');
        for(let i=0;i<ele.length;i++){
            if(ele[i].textContent==char){
                ele[i].classList.add('active');
                break;
            }
        }
    }
    var ele=document.getElementsByClassName('char-btn active');
    if(ele.length==1 && prev==char){
        ele[0].classList.remove("active");
        removeTableData();
        var empData=JSON.parse(localStorage.getItem('newEmpData'));
        fil.src="./images/Interface/filter-black.svg";
        document.getElementsByClassName('empty-table-popup')[0].style.display='none';
        populateTable(empData);
    }
    else{
        for(let i=0;i<ele.length;i++){
            if(ele[i].textContent!=char){
                ele[i].classList.remove("active");
            }
        }
    }
    prev=prev==char?'':char;
}

function removeTableData(){
    var empTable=document.getElementsByClassName('emp-details-table')[0];
    var len=empTable.rows.length;
    for(let i=1;i<len;i++){
        empTable.deleteRow(1);
    }
}

function filterEmployeesByAlphabetData(char){
    var empData=JSON.parse(localStorage.getItem('newEmpData'));
    return empData.filter((employee) => {
        return employee.fname.startsWith(char)
    });
}

function resetFilter(){
    var ele=document.getElementsByClassName('char-btn active');
    var data=JSON.parse(localStorage.getItem('newEmpData'));
    if(ele.length>0){
        data=filterEmployeesByAlphabetData(ele[0].textContent);
    }
    removeTableData();
    populateTable(data);

    var ele=document.getElementsByClassName('filter-logo-container')[0];
    ele=ele.getElementsByTagName("input");
    for(i=0;i<ele.length;i++){
        ele[i].checked=false;
    }
    document.getElementsByClassName('reset-btn')[0].disabled=true;
    document.getElementsByClassName('reset-btn')[0].classList.remove('normal-opacity');
    document.getElementsByClassName('apply-btn')[0].disabled=true;
    document.getElementsByClassName('apply-btn')[0].classList.add('normal-opacity');
    var ele=document.getElementsByClassName('opt-count');
    for(k=0;k<ele.length;k++){
        ele[k].innerHTML='';
    }
}

function showHideResetApplyButtons(){
    var totalCount=0;
    var ele=document.getElementsByClassName('dropdown');
    for(i=0;i<ele.length;i++){
        var count=0;
        var inpBox=ele[i].getElementsByTagName('input');
        for(j=0;j<inpBox.length;j++){
            if(inpBox[j].checked){
                totalCount+=1;
                count+=1;
            }
        }
        if(count>0){
            var optCount=ele[i].getElementsByClassName('opt-count')[0];
            optCount.innerHTML=`(${count})`;
        }
        else{
            var optCount=ele[i].getElementsByClassName('opt-count')[0];
            optCount.innerHTML='';
        }
    }
    var btn1=document.getElementsByClassName('reset-btn')[0];
    var btn2=document.getElementsByClassName('apply-btn')[0]; 
    if(totalCount>0){
        btn1.disabled=false;
        btn1.classList.add('normal-opacity');
        btn2.disabled=false;
        btn2.classList.add('normal-opacity');
    }
    else{
        btn1.classList.remove('normal-opacity');
        btn1.disabled=true;
        btn2.classList.remove('normal-opacity');
        btn2.disabled=true;
        var ele=document.getElementsByClassName('char-btn active');
        var data=JSON.parse(localStorage.getItem('newEmpData'));
        if(ele.length>0){
            data=filterEmployeesByAlphabetData(ele[0].textContent);
        }
        removeTableData();
        populateTable(data);
    }
}

function filterSearch(){     
    var filterData=JSON.parse(localStorage.getItem('newEmpData'));
    removeTableData();
    var btn=document.getElementsByClassName('char-btn Active');
    if(btn.length>0){
        filterData=filterEmployeesByAlphabetData(btn[0].textContent);
    }

    filterData=statusFilter(filterData);
    filterData=locationFilter(filterData);
    filterData=departmentFilter(filterData);
    populateTable(filterData);
}

function statusFilter(filterData){
    var status_=document.getElementsByClassName('status')[0];
    s1=status_.getElementsByTagName("input");
    t1=status_.getElementsByTagName("label");
    let status=[],count=0;
    for(let i=0;i<s1.length;i++){
        if(s1[i].checked){
            status.push(t1[i].innerHTML);
            count+=1;
        }
    }
    if(count>0){
        return filterData.filter((employee)=>{
            // return status.includes(employee.status);
            return status.includes('Active');
        })
    }
    else{
        return filterData;
    }
}

function locationFilter(filterData){
    var loc=document.getElementsByClassName('location')[0];
    s1=loc.getElementsByTagName("input");
    t1=loc.getElementsByTagName("label");
    let location=[],count=0;
    for(let i=0;i<s1.length;i++){
        if(s1[i].checked){
            location.push(t1[i].innerHTML);
            count+=1;
        }
    }
    if(count>0){
        return filterData.filter((employee)=>{
            return location.includes(employee.location)
        })
    }
    else{
        return filterData;
    }
}

function departmentFilter(filterData){
    var dept=document.getElementsByClassName('department')[0];
    s1=dept.getElementsByTagName("input");
    t1=dept.getElementsByTagName("label");
    let department=[],count=0;
    for(let i=0;i<s1.length;i++){
        if(s1[i].checked){
            department.push(t1[i].innerHTML);
            count+=1;
        }
    }
    if(count>0){
        return filterData.filter((employee)=>{
            return department.includes(employee.dept);
        })
    }
    else{
        return filterData;
    }
}

function deleteEmpData(value){
    var data=JSON.parse(localStorage.getItem('newEmpData'));
    for(let k=0;k<data.length;k++){
        if(data[k].empno==value){
            data.splice(k,1);
            localStorage.setItem('newEmpData',JSON.stringify(data));
            break;
        }
    }
}

function deleteRows(){
    var empTable=document.getElementsByClassName("emp-details-table")[0];
    var len=empTable.rows.length;
    var count=1;
    var checkBox=document.getElementsByClassName('check_box_prop');
    for(i=1;i<len;i++){
        var dis=empTable.getElementsByTagName('tr')[count].hidden;
        if(checkBox[count].checked && !dis){
            var val=empTable.getElementsByTagName('tr')[count].getElementsByTagName('td')[5].innerHTML;
            deleteEmpData(val);
            empTable.deleteRow(count);
        }
        else{
            count+=1;
        }
    }
    var btn=document.getElementsByClassName('delete-btn')[0];
    btn.style.color='';
    btn.style.backgroundColor='';
    document.getElementsByClassName('delete-popup-container')[0].style.display='none';
    var box=document.getElementsByClassName('success-del-msg-container')[0];
    box.style.display='block';
    setTimeout(() => {
        box.style.display = 'none';
    }, 1500);
}

function deleteEmpData(){
    storeRowDetails();
    var row=localStorage.getItem('rowData');
    row=JSON.parse(row);
    var empTable=document.getElementsByClassName("emp-details-table")[0];
    var len=empTable.rows.length;
    var done=false;
    for(i=1;i<len;i++){
        var val=empTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[5].innerHTML;
        if(val==row.empId){
            deleteEmpData(val);
            done=true;
        }
        if(done){
            empTable.deleteRow(i);
            break;
        }
    }
    document.getElementsByClassName('edit-container-visible')[0].style.display='none';
}

function checkBoxChecker(){
    var chck=document.getElementsByClassName('check_box_prop');
    for(i=1;i<chck.length;i++){
        chck[i].checked=chck[0].checked;
    }
    document.getElementsByClassName('delete-btn')[0].style.backgroundColor = chck[0].checked ? 'rgba(244,72,72)' : '';
}

var flag=-1;
function sortEmpData(ind,parameter,compare){
    var empTable=document.getElementsByClassName("emp-details-table")[0];
    var tableRows=empTable.rows;
    var len=tableRows.length;
    var doAgain=true;
    var first,second;
    switch(ind){
        case 1:
            while(doAgain){
                doAgain=false;
                for(let i=1;i<len-1;i++){
                    first=tableRows[i].getElementsByClassName(parameter)[0].textContent.toLowerCase();
                    second=tableRows[i+1].getElementsByClassName(parameter)[0].textContent.toLowerCase();
                    if(flag==compare){
                        if(first<second){
                            doAgain=true;
                            tableRows[i].parentNode.insertBefore(tableRows[i+1],tableRows[i]);
                        }
                    }
                    else{
                        if(first>second){
                            doAgain=true;
                            tableRows[i].parentNode.insertBefore(tableRows[i+1],tableRows[i]);
                        }
                    }
                }
            }
        break;
        case 2:
            while(doAgain){
                doAgain=false;
                for(let i=1;i<len-1;i++){
                    first=tableRows[i].getElementsByTagName('td')[parameter].textContent.toLowerCase();
                    second=tableRows[i+1].getElementsByTagName('td')[parameter].textContent.toLowerCase();
                    if(flag==compare){
                        if(first<second){
                            doAgain=true;
                            tableRows[i].parentNode.insertBefore(tableRows[i+1],tableRows[i]);
                        }
                    }
                    else{
                        if(first>second){
                            doAgain=true;
                            tableRows[i].parentNode.insertBefore(tableRows[i+1],tableRows[i]);
                        }
                    }
                }
            }
        break;
        case 3:
            while(doAgain){
                doAgain=false;
                for(let i=1;i<len-1;i++){
                    first=tableRows[i].getElementsByTagName('td')[parameter].textContent;
                    second=tableRows[i+1].getElementsByTagName('td')[parameter].textContent;
                    first=new Date(first);
                    second=new Date(second);
                    if(flag==compare){
                        if(first<second){
                            doAgain=true;
                            tableRows[i].parentNode.insertBefore(tableRows[i+1],tableRows[i]);
                        }
                    }
                    else{
                        if(first>second){
                            doAgain=true;
                            tableRows[i].parentNode.insertBefore(tableRows[i+1],tableRows[i]);
                        }
                    }
                }
            }
        break;
    }
    flag=flag==compare?-1:compare;
}


function hideEditOption(){
    var container=document.getElementsByClassName('edit_container_visible')[0];
    container.classList="edit-container";
}


var count=0;
document.addEventListener('click', function handleClickOutsideBox(event) {
    const box = document.getElementsByClassName('edit_container_visible')[0];
    const dot=document.getElementsByClassName('dots');
    if(count && (!(box.contains(event.target)))){
        box.classList="edit-container";
        count=0;
    }
    else{
        for(i=0;i<dot.length;i++){
            if(event.target.contains(dot[i])){
                count=1;
                break;
            }
        }
    }
});


function displayDropDown(index){
    var ele=document.getElementsByClassName('select-options');
    for(i=0;i<ele.length;i++){
        if(i!=index){
            makeInvisible(ele[i]);
        }
    }
    ele=ele[index];
    if(ele.style.display=="" || ele.style.display=='none'){
        ele.style.display='block';
    }
    else{
        ele.style.display='none';
    }

}
function makeInvisible(element){
    element.style.display='none';
}


document.addEventListener('click', function handleClickdropdown(event) {
    const box = document.getElementsByClassName('dropdown');
    var done=0;
    for(i=0;i<box.length;i++){
        if(box[i].contains(event.target)){
            done+=1
        }
    }
    if(done==0){
        ele=document.getElementsByClassName('select-options');
        for(i=0;i<ele.length;i++){
            ele[i].style.display='none';
        }
    }
});

function editEmp(){
    var data=true;
    localStorage.setItem('editEmpDetails',JSON.stringify(data));
    storeRowDetails();
    window.location.href='Add_employee.html';
}

function viewEmp(){
    localStorage.setItem('viewDetails',JSON.stringify(true));
    storeRowDetails();
    window.location.href='Add_employee.html';
}

function storeRowDetails(){
    var obj=new Object();
    var empId=row.getElementsByTagName('td')[5].innerHTML;
    var eName=row.getElementsByClassName('emp-name')[0].innerHTML;
    var empMail=row.getElementsByClassName('emp-mail')[0].innerHTML;
    var jDate=row.getElementsByTagName('td')[7].innerHTML;
    var empName=eName.split(" ");
    var dept=row.getElementsByTagName('td')[3].innerHTML;
    var loc=row.getElementsByTagName('td')[2].innerHTML;
    var role=row.getElementsByTagName('td')[4].innerHTML;
    obj.empId=empId;
    obj.fName=empName[0];
    obj.lName=empName[1];
    obj.empMail=empMail;
    obj.jDate=jDate;
    obj.dept= dept;
    obj.loc= loc;
    obj.role= role;
    localStorage.setItem('rowData',JSON.stringify(obj));
}

function showDeletePopup(){
    var ele=document.getElementsByClassName('delete-popup-container')[0];
    if(document.getElementsByClassName('delete-btn')[0].style.backgroundColor=='rgb(244, 72, 72)'){
        ele.style.display='block';
    }
}
function hidePopUp(){
    document.getElementsByClassName('delete-popup-container')[0].style.display='none';
}