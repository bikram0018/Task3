function empValidation(){
    var elements=document.getElementsByClassName('mandatory');
    var msg=document.getElementsByClassName("error-msg");
    var count=0;
    var prevPic;
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
    if(document.getElementsByClassName('img-holder')[0].getElementsByTagName('label')[0].innerHTML=='Edit'){
        var data=localStorage.getItem('empData');
        var row=localStorage.getItem('rowData');
        var pics=localStorage.getItem('profilePic');
        pics=JSON.parse(pics);
        data=JSON.parse(data);
        row=JSON.parse(row);
        var done=true;
        for(j=0;j<data.length;j++){
            if(row.empId==data[j].emp_no){
                data.splice(j,1);
                localStorage.setItem('empData',JSON.stringify(data));
                done=false;
                break;
            }
        }
        if(done){
            var data=localStorage.getItem('newEmpData');
            data=JSON.parse(data);
            for(k=0;k<data.length;k++){
                if(row.empId==data[k].empno){
                    data.splice(k,1);
                    localStorage.setItem('newEmpData',JSON.stringify(data));
                    prevPic=pics[k];
                    pics.splice(k,1);
                    localStorage.setItem('profilePic',JSON.stringify(pics));
                    done=false;
                    break;
                }
            }
        }   
    }
    else if(document.getElementById('profile-pic').files.length>0){
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
    else{
        count+=1;
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
        var obj=new Object();
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
        var profilePic=JSON.parse(localStorage.getItem('profilePic')) || [];
        var temp=localStorage.getItem('tempProfilePic');
        if(temp!='null'){
            profilePic.push(temp);
        }
        else{
            profilePic.push(prevPic);
        }
        localStorage.setItem('profilePic',JSON.stringify(profilePic));
        if(document.getElementsByClassName('cancel-add-emp-btns')[0].getElementsByTagName('input')[1].value=='Add Employee'){
            localStorage.setItem('showSuccessMessage',JSON.stringify(true));
        }
        else{
            localStorage.setItem('showUpdateMessage',JSON.stringify(true));
        }
        localStorage.setItem('tempProfilePic','null');
        window.location.href='Employee.html';
        // const box = document.getElementsByClassName('emp-success-popup')[0];
        // box.style.display='block';
        // setTimeout(() => {
        //     box.style.display = 'none';
        //     window.location.href='Employee.html';
        //   }, 2000);
    }
    else{
        const box = document.getElementsByClassName('emp-success-popup')[0];
        box.style.display='block';
        setTimeout(() => {
            box.style.display = 'none';
          }, 2000);
    }
}



function validateId(){
    var ele=document.getElementsByClassName('emp-no-container')[0];
    val=ele.getElementsByTagName('input')[0].value;
    var exp=/[A-Z0-9]{8}/;
    if(val.length==0){
        para=ele.getElementsByTagName('p')[0];
        para.innerHTML='';
        image=document.createElement('img');
        image.src='./images/red-alert-icon.svg';
        image.classList='alert-icon';
        text=document.createTextNode('This field is required!');
        para.appendChild(image);
        para.appendChild(text);
        para.style.visibility='visible';
    }
    else if(!exp.test(val)){
        para=ele.getElementsByTagName('p')[0];
        para.innerHTML='';
        image=document.createElement('img');
        image.src='./images/red-alert-icon.svg';
        image.classList='alert-icon';
        text=document.createTextNode('Enter Valid Emp no!');
        para.appendChild(image);
        para.appendChild(text);
        para.style.visibility='visible';
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
        para=ele.getElementsByTagName('p')[0];
        para.innerHTML='';
        image=document.createElement('img');
        image.src='./images/red-alert-icon.svg';
        image.classList='alert-icon';
        text=document.createTextNode('This field is required!');
        para.appendChild(image);
        para.appendChild(text);
        para.style.visibility='visible';
    }
    else if(exp.test(val)){
        para=ele.getElementsByTagName('p')[0];
        para.innerHTML='';
        image=document.createElement('img');
        image.src='./images/red-alert-icon.svg';
        image.classList='alert-icon';
        text=document.createTextNode('Enter Valid name!');
        para.appendChild(image);
        para.appendChild(text);
        para.style.visibility='visible';
    }
    else{
        ele.getElementsByTagName('p')[0].style.visibility='hidden';
    }
}

function validateMail(){
    var ele=document.getElementsByClassName('emp-mail-container')[0];
    val=ele.getElementsByTagName('input')[0].value;
    var exp= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(val.length==0){
        para=ele.getElementsByTagName('p')[0];
        para.innerHTML='';
        image=document.createElement('img');
        image.src='./images/red-alert-icon.svg';
        image.classList='alert-icon';
        text=document.createTextNode('This field is required!');
        para.appendChild(image);
        para.appendChild(text);
        para.style.visibility='visible';
    }
    else if(!exp.test(val)){
        para=ele.getElementsByTagName('p')[0];
        para.innerHTML='';
        image=document.createElement('img');
        image.src='./images/red-alert-icon.svg';
        image.classList='alert-icon';
        text=document.createTextNode('Enter valid email!');
        para.appendChild(image);
        para.appendChild(text);
        para.style.visibility='visible';
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
    // exp=/^((0[1-9]|[1-9])|1[0-2])\/((0[1-9]|[1-9])|[12][0-9]|3[01])\/(19[5-9][0-9]|20([0-1][0-9]|2[0-4]))$/;
    // if(val.length==0){
    //     para=ele.getElementsByTagName('p')[0];
    //     para.innerHTML='';
    //     image=document.createElement('img');
    //     image.src='./images/red-alert-icon.svg';
    //     image.classList='alert-icon';
    //     text=document.createTextNode('This Field is Required!');
    //     para.appendChild(image);
    //     para.appendChild(text);
    //     para.style.visibility='visible';
    // }
    // else if(!exp.test(val)){
    //     para=ele.getElementsByTagName('p')[0];
    //     para.innerHTML='';
    //     image=document.createElement('img');
    //     image.src='./images/red-alert-icon.svg';
    //     image.classList='alert-icon';
    //     text=document.createTextNode('Enter Date in format MM/DD/YYYY');
    //     para.appendChild(image);
    //     para.appendChild(text);
    //     para.style.visibility='visible';
    // }
    // else{
    //     ele.getElementsByTagName('p')[0].style.visibility='hidden';
    // }
    if(val!='Invalid Date'){ 
        if(val>new Date()){
            para=ele.getElementsByTagName('p')[0];
            para.innerHTML='';
            image=document.createElement('img');
            image.src='./images/red-alert-icon.svg';
            image.classList='alert-icon';
            text=document.createTextNode('Enter Valid Date!');
            para.appendChild(image);
            para.appendChild(text);
            para.style.visibility='visible';
        }
        else{
            ele.getElementsByTagName('p')[0].style.visibility='hidden';
        }
    }
    else{
        para=ele.getElementsByTagName('p')[0];
        para.innerHTML='';
        image=document.createElement('img');
        image.src='./images/red-alert-icon.svg';
        image.classList='alert-icon';
        text=document.createTextNode('This field is required!');
        para.appendChild(image);
        para.appendChild(text);
        para.style.visibility='visible';
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

// function validateAll(){

//     var ele=document.getElementsByClassName('emp-no-container')[0];
//     val=ele.getElementsByTagName('input')[0].value;
//     var exp=/[A-Z0-9]{8}/;
//     if(!exp.test(val)){
//         ele.getElementsByTagName('p')[0].style.visibility='visible';
//     }
//     else{
//         ele.getElementsByTagName('p')[0].style.visibility='hidden';
//     }


//     // class name to be added to complete the code

//     // var ele=document.getElementsByClassName(name)[0];
//     // val=ele.getElementsByTagName('input')[0].value;
//     // var exp=/[^A-Za-z]+/;
//     // if(exp.test(val) || val.length==0){
//     //     ele.getElementsByTagName('p')[0].style.visibility='visible';
//     // }
//     // else{
//     //     ele.getElementsByTagName('p')[0].style.visibility='hidden';
//     // }

//     // var ele=document.getElementsByClassName(name)[0];
//     // val=ele.getElementsByTagName('input')[0].value;
//     // var exp=/[^A-Za-z]+/;
//     // if(exp.test(val) || val.length==0){
//     //     ele.getElementsByTagName('p')[0].style.visibility='visible';
//     // }
//     // else{
//     //     ele.getElementsByTagName('p')[0].style.visibility='hidden';
//     // }



//     var ele=document.getElementsByClassName('emp-mail-container')[0];
//     val=ele.getElementsByTagName('input')[0].value;
//     var exp= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if(!exp.test(val)){
//         ele.getElementsByTagName('p')[0].style.visibility='visible';
//     }
//     else{
//         ele.getElementsByTagName('p')[0].style.visibility='hidden';
//     }

//     var ele=document.getElementsByClassName('mobile-number-container')[0];
//     val=ele.getElementsByTagName('input')[0].value;
//     var exp=/[0-9]{10}/;
//     len=val.length;
//     if((exp.test(val)  && (len>10)) || (!exp.test(val))){
//         ele.getElementsByTagName('p')[0].style.visibility='visible';
//     }
//     else{
//         ele.getElementsByTagName('p')[0].style.visibility='hidden';
//     }
// }

function errorHidden(name){
    document.getElementsByClassName(name)[0].getElementsByTagName('p')[0].style.visibility='hidden';
}


function changeProfilepic(){
    var ele=document.getElementById('profile-pic');
    var empImg=document.getElementsByClassName('large-user-icon')[0];
    if(ele.files.length==1){
        const reader=new FileReader();
        reader.onload= ()=>{
            empImg.src=reader.result;
            localStorage.setItem('tempProfilePic',reader.result);
        }
        reader.readAsDataURL(ele.files[0]);
    }
}

function updateOptions(){
    var data1=localStorage.getItem('empData');
    var data2=localStorage.getItem('newEmpData');
    data1=JSON.parse(data1);
    data2=JSON.parse(data2);
    var done;
    var dept=document.getElementsByClassName('emp-info-input')[2];
    var loc=document.getElementsByClassName('emp-info-input')[0];
    var jTitle=document.getElementsByClassName('emp-info-input')[1];
    if(data1){
        data1.forEach(employee => {
            var ele=dept.getElementsByTagName('option');
            done=true;
            // document.write(employee.role+'<br>');
            for(i=0;i<ele.length;i++){
                if(ele[i].value==employee.department){
                    done=false;
                    break;
                }
            }
            if(done){
                dept.appendChild(createOption(employee.department));
            }

            var ele=loc.getElementsByTagName('option');
            done=true;
            for(i=0;i<ele.length;i++){
                if(ele[i].value==employee.location){
                    done=false;
                    break;
                }
            }
            if(done){
                loc.appendChild(createOption(employee.location));
            }

            var ele=jTitle.getElementsByTagName('option');
            done=true;
            for(i=0;i<ele.length;i++){
                if(ele[i].value==employee.role){
                    done=false;
                    break;
                }
            }
            if(done){
                jTitle.appendChild(createOption(employee.role));
            }
        });
    }
    if(data2){
        data2.forEach(employee => {
            var ele=dept.getElementsByTagName('option');
            done=true;
            for(i=0;i<ele.length;i++){
                if(ele[i].value==employee.dept){
                    done=false;
                    break;
                }
            }
            if(done){
                dept.appendChild(createOption(employee.dept));
            }

            var ele=loc.getElementsByTagName('option');
            done=true;
            for(i=0;i<ele.length;i++){
                if(ele[i].value==employee.location){
                    done=false;
                    break;
                }
            }
            if(done){
                loc.appendChild(createOption(employee.location));
            }

            var ele=jTitle.getElementsByTagName('option');
            done=true;
            for(i=0;i<ele.length;i++){
                if(ele[i].value==employee.role){
                    done=false;
                    break;
                }
            }
            if(done){
                jTitle.appendChild(createOption(employee.role));
            }
        });
    }
}

function createOption(value) {
    const opt = document.createElement("option");
    opt.innerHTML=value;
    opt.value=value;
    return opt;
}