var myChart = echarts.init(document.getElementsByClassName('first-content-left')[0]);
     myChartTopMiddle = echarts.init(document.getElementsByClassName('top-middle-content-bottom')[0]);
var airAllData;  // 保存所有空气质量数据
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

var optionTopMiddle = {
    title: {
        text: '浏览器占比变化',
        subtext: '纯属虚构',
        x:'right',
        y:'bottom'
    },
    tooltip: {
        trigger: 'item',
        backgroundColor : 'rgba(0,0,250,0.2)'
    },
    legend: {
        data: (function (){
            var list = [];
            for (var i = 1; i <=28; i++) {
                list.push(i + 2000 + '');
            }
            return list;
        })()
    },
    visualMap: {
        color: ['red', 'yellow']
    },
    radar: {
        indicator : [
            { text: 'IE8-', max: 400},
            { text: 'IE9+', max: 400},
            { text: 'Safari', max: 400},
            { text: 'Firefox', max: 400},
            { text: 'Chrome', max: 400}
        ]
    },
    series : (function (){
        var series = [];
        for (var i = 1; i <= 28; i++) {
            series.push({
                name:'浏览器（数据纯属虚构）',
                type: 'radar',
                symbol: 'none',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width:1
                        }
                    },
                    emphasis : {
                        areaStyle: {color:'rgba(0,250,0,0.3)'}
                    }
                },
                data:[
                    {
                        value:[
                            (40 - i) * 10,
                            (38 - i) * 4 + 60,
                            i * 5 + 10,
                            i * 9,
                            i * i /2
                        ],
                        name: i + 2000 + ''
                    }
                ]
            });
        }
        return series;
    })()
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
        airAllData = JSON.parse(data.response);
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





