var myChart = echarts.init(document.getElementsByClassName('first-content-left')[0]);

var  airAllData;  // 保存所有空气质量数据
//地图的option
var optionTop = {
    backgroundColor: '#404a59',
    title: {
        text: '全国主要城市空气质量',
        subtext: 'data from PM25.in',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['pm2.5'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: {
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: function (val) {
            return val[2] / 10;
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#ddb926'
            }
        }
    }
};

//第一部分ajax请求
function getDetailData(url, callback) {
    //  TODO
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


//调用函数
getDetailData('./data/china.json', function (data) {

     // console.log(data);
    var obtainContent = JSON.parse(data.response);
    echarts.registerMap('china', obtainContent);

    //ajax请求数据
    getDetailData('./data/air-quality.json', function (data) {
        airAllData = JSON.parse(data.response);//获取所有数据
        //console.log(airAllData);
        var array = [];
        var airData = JSON.parse(data.response);
        for (var i = 0; i < airData.length; i++) {
            array.push({
                name: airData[i].area,
                value: [80 + Math.random() * 50, 20 + Math.random() * 35, airData[i].aqi]
            });
        }
        optionTop.series.data = array;
        myChart.setOption(optionTop);
    });
});





