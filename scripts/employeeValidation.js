function empValidation(){
    if(document.getElementsByClassName('cancel-add-emp-btns')[0].getElementsByTagName('input')[1].value=='Save'){
        editEmpDetails();
    }
    else{
        var elements=document.getElementsByClassName('mandatory');
        var msg=document.getElementsByClassName("error-msg");
        var count=0;
        for(i=0;i<elements.length;i++){
            if(elements[i].value.length==0 || msg[i].style.visibility=='visible'){
                count+=1;
                msg[i].style.visibility='visible';
                elements[i].style.borderColor='red';
            }
            else{
                msg[i].style.visibility='hidden';
                elements[i].style.borderColor='black';
            }
        }
        if(document.getElementById('profile-pic').files.length>0){
            var ele=document.getElementsByClassName('input-img-edit')[0];
            ele.classList="img-edit";
            ele.innerHTML='Edit';
            ele.style.padding="0px 0px 0px 38%";
            var ele=document.getElementsByClassName('add-employee-container')[0];
            ele.style.flexDirection='row';
            ele.style.columnGap='1.5em';
            var ele=document.getElementsByClassName('img-holder')[0];
            ele.style.display='block';
            ele.style.width='8%';
        }
        if(count==0){
            var empId=document.getElementsByClassName('emp-no')[0];
            var fName=document.getElementsByClassName('first-name')[0];
            var lName=document.getElementsByClassName('last-name')[0];
            var mail=document.getElementsByClassName('mail-id')[0];
            var jDate=new Date(document.getElementsByClassName('join-date')[0].value);
            jDate=`${jDate.getMonth()+1}/${jDate.getDate()}/${jDate.getFullYear()}`;
            var location=document.getElementsByClassName('loc')[0];
            var role=document.getElementsByClassName('job-title')[0];
            var department=document.getElementsByClassName('dept')[0];
            var dob=document.getElementsByClassName('dob')[0];
            var mobileNumber=document.getElementsByClassName('mobile-no')[0];
            var pic=changeProfilepic();
            var obj=new Object();
            obj.profilePic=pic;
            obj.empno=empId.value;
            obj.fname=fName.value;
            obj.lname=lName.value;
            obj.email=mail.value;
            obj.jdate=jDate;
            obj.location=location.value;
            obj.role=role.value;
            obj.dept=department.value;
            obj.dob=dob.value;
            obj.mobileNumber=mobileNumber.value;
            var data=JSON.parse(localStorage.getItem('newEmpData')) || [];
            data.push(obj);
            localStorage.setItem('newEmpData',JSON.stringify(data));
            if(document.getElementsByClassName('cancel-add-emp-btns')[0].getElementsByTagName('input')[1].value=='Add Employee'){
                localStorage.setItem('showSuccessMessage',JSON.stringify(true));
            }
            else{
                localStorage.setItem('showUpdateMessage',JSON.stringify(true));
            }
            window.location.href='Employee.html';
        }
        else{
            const box = document.getElementsByClassName('emp-success-popup')[0];
            box.style.display='block';
            setTimeout(() => {
                box.style.display = 'none';
            }, 2000);
        }
    }
}

function unique(value){
    var data=localStorage.getItem('newEmpData');
    var rowData=localStorage.getItem('rowData');
    data=JSON.parse(data);
    rowData=JSON.parse(rowData);
    for(let i=0;i<data.length;i++){
        if(Object.values(data[i]).includes(value) && !Object.values(rowData).includes(value)){
            return true;
        }
    }
    return false;
}

function validateId(){
    var ele=document.getElementsByClassName('emp-no-container')[0];
    val=ele.getElementsByTagName('input')[0].value;
    var exp=/[A-Z0-9]{8}/;
    var uData=unique(val);
    if(val.length==0){
        showErrorMsg('This field is required!',ele);
    }
    else if(uData){
        showErrorMsg('Emp no already exists!',ele);
    }
    else if(!exp.test(val)){
        showErrorMsg('Enter Valid Emp no!',ele);
    }
    else{
        ele.getElementsByTagName('p')[0].style.visibility='hidden';
    }
}

function validateName(name){
    var ele=document.getElementsByClassName(name)[0];
    var val=ele.getElementsByTagName('input')[0].value;
    var exp=/[^A-Za-z]+/;
    if(val.length==0){
        showErrorMsg('This field is required!',ele);
    }
    else if(exp.test(val)){
        showErrorMsg('Enter Valid name!',ele);
    }
    else{
        ele.getElementsByTagName('p')[0].style.visibility='hidden';
    }
}

function validateMail(){
    var ele=document.getElementsByClassName('emp-mail-container')[0];
    val=ele.getElementsByTagName('input')[0].value;
    var exp= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var uData=unique(val);
    if(val.length==0){
        showErrorMsg('This field is required!',ele);
    }
    else if(uData){
        showErrorMsg('Email already exists!',ele);
    }
    else if(!exp.test(val)){
        showErrorMsg('Enter valid email!',ele);
    }
    else{
        ele.getElementsByTagName('p')[0].style.visibility='hidden';
    }
}

function validateMobileNumber(){
    var ele=document.getElementsByClassName('mobile-number-container')[0];
    val=ele.getElementsByTagName('input')[0].value;
    var exp=/[0-9]{10}/;
    len=val.length;
    if(len>0){
        if(len<10 || len>10){
            ele.getElementsByTagName('p')[0].style.visibility='visible';
        }
        else if(exp.test(val)){
            ele.getElementsByTagName('p')[0].style.visibility='hidden';
        }
        else{
            ele.getElementsByTagName('p')[0].style.visibility='visible';
        }
    }
}

function validateJoinDate(){
    var ele=document.getElementsByClassName('join-date-container')[0];
    val=new Date(ele.getElementsByTagName('input')[0].value);
    if(val!='Invalid Date'){ 
        if(val>new Date()){
            showErrorMsg('Enter Valid Date!',ele);
        }
        else{
            ele.getElementsByTagName('p')[0].style.visibility='hidden';
        }
    }
    else{
        showErrorMsg('This field is required!',ele);
    }
}

function validateDob(){
    var ele=document.getElementsByClassName('birth-date-container')[0];
    val=new Date(ele.getElementsByTagName('input')[0].value);
    if(val!='Invalid Date'){ 
        var year=val.getFullYear();
        if(year>2020 || year <1900){
            ele.getElementsByTagName('p')[0].style.visibility='visible';
        }
        else{
            ele.getElementsByTagName('p')[0].style.visibility='hidden';
        }
    }
}

function showErrorMsg(errorMsg,ele){
    para=ele.getElementsByTagName('p')[0];
    para.innerHTML='';
    image=document.createElement('img');
    image.src='./images/red-alert-icon.svg';
    image.classList='alert-icon';
    text=document.createTextNode(errorMsg);
    para.appendChild(image);
    para.appendChild(text);
    para.style.visibility='visible';
}

function errorHidden(name){
    document.getElementsByClassName(name)[0].getElementsByTagName('p')[0].style.visibility='hidden';
    document.getElementsByClassName(name)[0].getElementsByTagName('input')[0].style.borderColor='black';
}

function changeProfilepic(){
    var ele=document.getElementById('profile-pic');
    var empImg=document.getElementsByClassName('large-user-icon')[0];
    if(ele.files.length==1){
        const reader=new FileReader();
        reader.onload= ()=>{
            empImg.src=reader.result;
        }
        reader.readAsDataURL(ele.files[0]);
    }
    if(empImg.src.includes('user-icon.png')){
        return null;
    }
    return empImg.src;
}

function showSelectOptions(){
    var dept=document.getElementsByClassName('emp-info-input')[2];
    var loc=document.getElementsByClassName('emp-info-input')[0];
    var jTitle=document.getElementsByClassName('emp-info-input')[1];
    var department=['HR','Finance','Administration','Marketing','Sales','IT','Accounting','Research','Production','Customer service','Purchasing','Distribution'];
    department.sort();
    for(let i=0;i<department.length;i++){
        dept.appendChild(createOption(department[i]));
    }

    var location=['Banglore','Chennai','Delhi','Hyderabad','Kerala','Tamilnadu'];
    location.sort();
    for(let i=0;i<location.length;i++){
        loc.appendChild(createOption(location[i]));
    }

    var roles=["Marketing Manager","Account Executive","Assistant Manager","Business Analyst","Manager","Administrator","Ceo","Executive","Product Manager","Project Manager","Receptionist","Accountant","Bookkeeper","Finance Manager","Marketing Specialist","Officer","President"];
    roles.sort();
    for(let i=0;i<roles.length;i++){
        jTitle.appendChild(createOption(roles[i]));
    }
}

function createOption(value) {
    const opt = document.createElement("option");
    opt.innerHTML=value;
    opt.value=value;
    return opt;
}


function displayEmpDetails(){
    var row=localStorage.getItem('rowData');
    row=JSON.parse(row);
    document.getElementsByClassName('first-name')[0].value=row.fName;
    document.getElementsByClassName('last-name')[0].value=row.lName;
    document.getElementsByClassName('emp-no')[0].value=row.empId;
    document.getElementsByClassName('mail-id')[0].value=row.empMail;
    let dt=row.jDate;
    dt=dt.split('/');
    month=dt[0];
    if(month.length==1){
        month='0'+month;
    }
    date=dt[1];
    if(date.length==1){
        date='0'+date;
    }
    year=dt[2];
    dt=`${year}-${month}-${date}`;
    document.getElementsByClassName('join-date')[0].value=dt;
    document.getElementsByClassName('emp-info-input')[2].value=row.dept;
    document.getElementsByClassName('emp-info-input')[0].value=row.loc;
    document.getElementsByClassName('emp-info-input')[1].value=row.role;
    var data=localStorage.getItem('newEmpData');
    data=JSON.parse(data);
    done=false;
    if(data){
        for(let i=0;i<data.length;i++){
            if(row.empId==data[i].empno){
                document.getElementsByClassName('dob')[0].value=data[i].dob;
                document.getElementsByClassName('mobile-no')[0].value=data[i].mobileNumber;
                if(data[i].profilePic){
                    document.getElementsByClassName('large-user-icon')[0].src=data[i].profilePic;
                    var ele=document.getElementsByClassName('input-img-edit')[0];
                    ele.classList="img-edit";
                    ele.innerHTML='Edit';
                    ele.style.padding="0px 0px 0px 38%";
                    var ele=document.getElementsByClassName('add-employee-container')[0];
                    ele.style.flexDirection='row';
                    ele.style.columnGap='1.5em';
                    var ele=document.getElementsByClassName('img-holder')[0];
                    ele.style.display='block';
                    ele.style.width='8%';
                }
                break;
            }
        }
    }
}