


//	Switch the currently displayed <ul>
function showUl (direction) {
    var current      = uls[ uls.active ],
        nextPosition = (direction == 'next')    ? uls.active + 1     : uls.active - 1,
        nextPosition = (nextPosition < 0)       ? uls.length - 1     : nextPosition,
        nextPosition = uls.active = (nextPosition >= uls.length) ? 0 : nextPosition,
        next         = uls[nextPosition];
    
    current.classList.remove('show');
    
//     for (var i in current) {
// 
//         switch (i) {
//             case 'innerText':
//             case 'outerText':
//             case 'innerHTML':
//             case 'outerHTML':
//             case 'textContent':
//                 continue;
//                 
//             default:
//                 if (typeof current[i] != 'function') {
//                     console.log( 'current.' + i + ' = ' + current[i] )
//                 }
//         }        
//     }
    
    next.classList.add('show');
}

//	Called to show even target
function page(event){
    showUl(event.target.id);
}

//	Keyboard listeners
function pageWithKeys(event){
  var   next =
            event.keyCode ===   39 ||
            event.keyCode ===   40 ||
            event.keyCode ===   32,
        previous =
            event.keyCode === 37 ||
            event.keyCode === 38,
        noModifier = event.altKey !== true && event.metaKey !== true;
    if (previous && noModifier){
        showUl('previous');
    }
    if (next && noModifier){
        showUl('next');
    }
}


uls         = document.getElementsByTagName('ul');
links       = document.getElementsByTagName('a');
uls.active  = 0;

//	Attach click listeners
for(i = 0; i < links.length; i++){
    links[i].addEventListener('click', page, false);
    
    // remove jarring "jump to top" behavior
    links[i].removeAttribute('href')   
}

//	Attach keyboard listeners
window.addEventListener('keydown', pageWithKeys, false);