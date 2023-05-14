function keyTab(event,idStart,idEnd, check) {
    const idFocus = event.target.id;
    if(check && idFocus == idStart){
        event.preventDefault();
        document.getElementById(idEnd).focus();
    }
    else if(idFocus == idEnd && !check){
        event.preventDefault();
        document.getElementById(idStart).focus();
    }
}
export {keyTab}; 