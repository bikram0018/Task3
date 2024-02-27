function editEmpDetails(){
    var elements=document.getElementsByClassName('mandatory');
    var msg=document.getElementsByClassName("error-msg");
    var count=0;
    for(i=0;i<elements.length;i++){
        if(elements[i].value.length==0 || msg[i].style.visibility=='visible'){
            count+=1;
            msg[i].classList.add('msg-visible')
            elements[i].classList.add('msg-color-red');
        }
        else{
            msg[i].classList.remove('msg-visible');
            elements[i].classList.remove('msg-color-red');
        }
    }
    if(count==0){
        var empId=document.getElementsByClassName('emp-no')[0].value;
        var mail=document.getElementsByClassName('mail-id')[0].value;
        var data=JSON.parse(localStorage.getItem('newEmpData'));
        for(let i=0;i<data.length;i++){
            if(data[i].empno==empId || data[i].email==mail){
                data[i].empno=document.getElementsByClassName('emp-no')[0].value;
                data[i].fname=document.getElementsByClassName('first-name')[0].value;
                data[i].lname=document.getElementsByClassName('last-name')[0].value;
                data[i].email=document.getElementsByClassName('mail-id')[0].value;
                var jDate=new Date(document.getElementsByClassName('join-date')[0].value);
                data[i].jdate=`${jDate.getMonth()+1}/${jDate.getDate()}/${jDate.getFullYear()}`;
                data[i].location=document.getElementsByClassName('loc')[0].value;
                data[i].role=document.getElementsByClassName('job-title')[0].value;
                data[i].dept=document.getElementsByClassName('dept')[0].value;
                data[i].dob=document.getElementsByClassName('dob')[0].value;
                data[i].mobileNumber=document.getElementsByClassName('mobile-no')[0].value;
                data[i].profilePic=changeProfilepic() || data[i].profilePic;
                data=localStorage.setItem('newEmpData',JSON.stringify(data));
                localStorage.setItem('showUpdateMessage',JSON.stringify(true));
                window.location.href='Employee.html';
                break;
            }
        }
    }
}