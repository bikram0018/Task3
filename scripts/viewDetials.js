addEventListener("DOMContentLoaded",()=>{
    updateOptions();
    var fun=localStorage.getItem('runFuntion');
    fun=JSON.parse(fun);
    if(fun){
        localStorage.setItem('runFuntion',JSON.stringify(false));
        displayEmpDetails();
        var ele=document.getElementsByClassName('add-emp-add-emp-btn')[0];
        ele.classList='add-emp-save-btn';
        ele.value='Save';
        ele.classList.add('pointer');
        document.getElementsByClassName('main-add-employee-text')[0].innerHTML='Update Employee';
    }

    var fun=localStorage.getItem('viewDetails');
    fun=JSON.parse(fun);
    if(fun){
        localStorage.setItem('viewDetails',JSON.stringify(false));
        displayEmpDetails();
        document.getElementById('profile-pic').disabled=true;
        document.getElementsByClassName('first-name')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('last-name')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('emp-no')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('mail-id')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('join-date')[0].setAttribute("readonly", "readonly");
        document.getElementsByClassName('emp-info-input')[2].disabled = true;
        document.getElementsByClassName('emp-info-input')[0].disabled = true;
        document.getElementsByClassName('emp-info-input')[1].disabled = true;
        document.getElementsByClassName('dob')[0].readOnly = true;
        document.getElementsByClassName('mobile-no')[0].readOnly = true;
        var ele=document.getElementsByClassName('add-emp-add-emp-btn')[0];
        ele.style.display='none';
        var ele=document.getElementsByClassName('add-emp-cancel-btn')[0];
        ele.style.marginRight="0px";
        document.getElementsByClassName('main-add-employee-text')[0].innerHTML='View Employee';
    }
}); 