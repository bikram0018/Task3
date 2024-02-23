addEventListener("DOMContentLoaded",()=>{
    var shrink=JSON.parse(localStorage.getItem('shrink'));
    if(shrink){
        paneShrink();
    }
});
