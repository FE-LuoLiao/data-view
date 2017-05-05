var catTitleList = document.getElementsByClassName('cat-title-list')[0],
    list = catTitleList.getElementsByTagName('a');


catTitleList.addEventListener('click',catTitleHandler);


//改变样式
function catTitleHandler(event){

    var lastHeight = document.getElementsByClassName('cat-active-list')[0];
    if(lastHeight !== undefined){
        lastHeight.className = '';
    }
    event.target.className = 'cat-active-list';
}

 //function setStyle(event) {
// var lastHeight = document.getElementsByClassName('cat-active')[0];
// if (lastHeight !== undefined) {
//     lastHeight.className = '';
// }
// event.target.className = 'cat-active';
// }