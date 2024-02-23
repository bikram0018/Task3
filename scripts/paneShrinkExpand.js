function paneShrink(){
    var ele=document.getElementsByClassName("left-pane")[0];
    ele.style.display='none';
    var ele=document.getElementsByClassName("left-pane-shrink")[0];
    ele.style.display='block';
    var rightPane=document.getElementsByClassName('right-pane')[0];
    rightPane.style.padding="0% 0% 0% 7%";
    rightPane.style.width="93%"
    localStorage.setItem('shrink',JSON.stringify(true));
}


function paneExpand(){
    var ele=document.getElementsByClassName("left-pane")[0];
    ele.style.display='';
    var ele=document.getElementsByClassName("left-pane-shrink")[0];
    ele.style.display='none';
    var rightPane=document.getElementsByClassName('right-pane')[0];
    rightPane.style.padding="0% 0% 0% 19.2%";
    localStorage.setItem('shrink',JSON.stringify(false));
}

