import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);

  const option = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
      axisLine: {
        lineStyle: {
          color: '#CCCCCC'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#999999'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 10,
        color: '#999999'
      },
      splitLine: {
        lineStyle: {
          color: '#EEEEEE'
        }
      }
    },
    series: [{
      data: [5, 15, 25, 40, 60, 80, 70, 30],
      type: 'bar',
      itemStyle: {
        color: '#9DE355'
      },
      barWidth: '60%'
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
}); 