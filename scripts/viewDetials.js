addEventListener("DOMContentLoaded",()=>{
    updateOptions();
    var fun=localStorage.getItem('viewDetails');
    fun=JSON.parse(fun);
    if(fun){
        localStorage.setItem('viewDetails',JSON.stringify(false));
        var row=localStorage.getItem('rowData');
        row=JSON.parse(row);
        document.getElementById('profile-pic').disabled=true;
        document.getElementsByClassName('first-name')[0].value=row.fName;
        document.getElementsByClassName('first-name')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('last-name')[0].value=row.lName;
        document.getElementsByClassName('last-name')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('emp-no')[0].value=row.empId;
        document.getElementsByClassName('emp-no')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('mail-id')[0].value=row.empMail;
        document.getElementsByClassName('mail-id')[0].setAttribute("readonly", "readonly");
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
        document.getElementsByClassName('join-date')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('emp-info-input')[2].value=row.dept;
        document.getElementsByClassName('emp-info-input')[2].disabled = true;
        document.getElementsByClassName('emp-info-input')[0].value=row.loc;
        document.getElementsByClassName('emp-info-input')[0].disabled = true;
        document.getElementsByClassName('emp-info-input')[1].value=row.role;
        document.getElementsByClassName('emp-info-input')[1].disabled = true;
        
        var data=localStorage.getItem('newEmpData');
        data=JSON.parse(data);
        if(data){
            data.forEach(employee => {
                if(row.empId==employee.empno){
                    document.getElementsByClassName('dob')[0].value=employee.dob;
                    document.getElementsByClassName('mobile-no')[0].value=employee.mobileNumber;
                }
            });
        }

        document.getElementsByClassName('dob')[0].readOnly = true;
        document.getElementsByClassName('mobile-no')[0].readOnly = true;



        var pics=localStorage.getItem('profilePic');
        pics=JSON.parse(pics);
        var data=localStorage.getItem('newEmpData');
        data=JSON.parse(data);
        for(i=0;i<data.length;i++){
            if(data[i].empno==row.empId){
                document.getElementsByClassName('large-user-icon')[0].src=pics[i];
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
                break;
            }
        }
        var ele=document.getElementsByClassName('add-emp-add-emp-btn')[0];
        ele.style.display='none';
        var ele=document.getElementsByClassName('add-emp-cancel-btn')[0];
        ele.style.marginRight="0px";
        document.getElementsByClassName('main-add-employee-text')[0].innerHTML='View Employee';
    }
});