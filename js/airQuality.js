var catTitleList = document.getElementsByClassName('cat-title-list')[0],
    catAnotherTitleList = document.getElementsByClassName('cat-another-title-list')[0],
    displayContent = document.getElementsByClassName('display-content')[0],
    obtainContent,
    obtainContentQuality,
    list = catTitleList.getElementsByTagName('a');


catTitleList.addEventListener('click',catTitleHandler);
catAnotherTitleList.addEventListener('click',catAnotherTitleHandler);
// displayContent.addEventListener('click',displayHandler);


//改变样式
function catTitleHandler(event){
    var lastHeight = document.getElementsByClassName('cat-active-list')[0];

    if(lastHeight !== undefined){
        lastHeight.className = '';
    }
    event.target.className = 'cat-active-list';

    clickDetailChanges();
}
//bottom block changes style
function catAnotherTitleHandler(event){
    var bottomHeight = document.getElementsByClassName('last-content-head')[0];
    if(bottomHeight !== undefined){
        bottomHeight.className = '';
    }
    event.target.className = 'last-content-head';
}
//获取存储数据
function clickDetailChanges(){
    var obtainP = document.getElementsByClassName('air-details-content')[0];
    var obtainH = document.getElementsByClassName('air-title-content')[0];
    var index = event.target.dataset['index']-0;
    // debugger;
    obtainH.innerHTML = obtainContent.title[index];
    obtainP.innerHTML = obtainContent.content[index];

    // console.log(obtainContent)
    getChartsData(index);


}

//得到地图的数据
function getChartsData(index) {
    var cats = ['aqi', 'pm2_5', 'pm10','co','no2','o3','so2'];
    var array = [];
    for (var i = 0; i < airAllData.length; i++) {
        array.push({
            name: airAllData[i].area,
            value: [80 + Math.random() * 50, 20 + Math.random() * 35, airAllData[i][cats[index]]]//自己粗略估计经纬度
        });
    }

    optionTop.series.data = array;
    myChart.setOption(optionTop);
}

//topMiddle的数据
function getChartsTopMiddleData(){

}


//ajax获取数据P标签
function getDetailData(url,callback) {
    //  TODO
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp);
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
//调用函数
getDetailData('./data/air-detail.json',function(data){
    obtainContent = JSON.parse(data.response);
    var obtainP = document.getElementsByClassName('air-details-content')[0];
    var obtainH = document.getElementsByClassName('air-title-content')[0];
    obtainH.innerHTML = obtainContent.title[0];
    obtainP.innerHTML = obtainContent.content[0];
});


