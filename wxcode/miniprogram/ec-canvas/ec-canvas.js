Component({
  properties: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },
    ec: {
      type: Object
    }
  },
  data: {
    isUseNewCanvas: false
  },
  ready: function () {
    if (!this.data.ec) {
      console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>');
      return;
    }
    if (!this.data.ec.onInit) {
      console.warn('组件需绑定 ec.onInit 函数，用于初始化图表');
      return;
    }
    this.init();
  },
  methods: {
    init: function (callback) {
      const version = wx.getSystemInfoSync().SDKVersion;
      const canUseNewCanvas = compareVersion(version, '2.9.0') >= 0;
      const forceUseOldCanvas = this.data.ec.forceUseOldCanvas;
      const isUseNewCanvas = canUseNewCanvas && !forceUseOldCanvas;
      this.setData({ isUseNewCanvas });

      if (forceUseOldCanvas && canUseNewCanvas) {
        console.warn('开发者强制使用旧canvas,建议使用新canvas');
      }

      if (isUseNewCanvas) {
        this.initByNewWay(callback);
      } else {
        const isValid = compareVersion(version, '1.9.91') >= 0;
        if (!isValid) {
          console.error('微信基础库版本过低，需大于等于 1.9.91。');
          return;
        }
        console.warn('建议将微信基础库调整大于等于2.9.0版本。升级后绘图将有更好性能');
        this.initByOldWay(callback);
      }
    },
    initByOldWay(callback) {
      const query = wx.createSelectorQuery().in(this);
      query.select('.ec-canvas').boundingClientRect((res) => {
        if (!res) {
          setTimeout(() => this.initByOldWay(callback), 100);
          return;
        }
        const canvasId = this.data.canvasId;
        const ctx = wx.createCanvasContext(canvasId, this);
        const canvas = new WxCanvas(ctx, canvasId, false, this);
        echarts.setCanvasCreator(() => canvas);
        const canvasDpr = wx.getSystemInfoSync().pixelRatio;
        const canvasWidth = res.width;
        const canvasHeight = res.height;
        canvas.width = canvasWidth * canvasDpr;
        canvas.height = canvasHeight * canvasDpr;
        const query2 = wx.createSelectorQuery().in(this);
        query2.select('.ec-canvas')
          .fields({ node: true, size: true })
          .exec((res2) => {
            const canvasNode = res2[0].node;
            canvasNode.width = canvasWidth * canvasDpr;
            canvasNode.height = canvasHeight * canvasDpr;
            const ctx = canvasNode.getContext('2d');
            const canvas = new WxCanvas(ctx, canvasId, true, this);
            echarts.setCanvasCreator(() => canvas);
            const chart = this.data.ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr);
            if (typeof callback === 'function') {
              callback(chart);
            }
          });
      }).exec();
    },
    initByNewWay(callback) {
      const query = wx.createSelectorQuery().in(this);
      query.select('.ec-canvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0]) {
            setTimeout(() => this.initByNewWay(callback), 100);
            return;
          }
          const canvasNode = res[0].node;
          this.canvasNode = canvasNode;
          const canvasDpr = wx.getSystemInfoSync().pixelRatio;
          const canvasWidth = res[0].width;
          const canvasHeight = res[0].height;
          const ctx = canvasNode.getContext('2d');
          const canvas = new WxCanvas(ctx, this.data.canvasId, true, this);
          echarts.setCanvasCreator(() => canvas);
          canvasNode.width = canvasWidth * canvasDpr;
          canvasNode.height = canvasHeight * canvasDpr;
          const chart = this.data.ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr);
          if (typeof callback === 'function') {
            callback(chart);
          }
        });
    },
    canvasToTempFilePath(opt) {
      if (this.data.isUseNewCanvas) {
        const query = wx.createSelectorQuery().in(this);
        query.select('.ec-canvas')
          .fields({ node: true, size: true })
          .exec((res) => {
            const canvasNode = res[0].node;
            opt.canvas = canvasNode;
            wx.canvasToTempFilePath(opt);
          });
      } else {
        opt.canvasId = this.data.canvasId;
        wx.canvasToTempFilePath(opt, this);
      }
    },
    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'start');
      }
    },
    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'change');
      }
    },
    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.chart.getZr().handler;
        handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'end');
      }
    }
  }
});

function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}

class WxCanvas {
  constructor(ctx, canvasId, isNew, component) {
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;
    this.isNew = isNew;
    if (isNew) {
      this.canvasNode = component.canvasNode;
    }
    this._initCanvas(ctx);
  }

  getContext(contextType) {
    if (contextType === '2d') {
      return this.ctx;
    }
  }

  // canvasToTempFilePath(opt) {
  //   if (this.isNew) {
  //     // 新版
  //     const query = wx.createSelectorQuery().in(this);
  //     query.select('.ec-canvas')
  //       .fields({ node: true, size: true })
  //       .exec((res) => {
  //         const canvasNode = res[0].node;
  //         opt.canvas = canvasNode;
  //         wx.canvasToTempFilePath(opt);
  //       });
  //   } else {
  //     // 旧版
  //     opt.canvasId = this.canvasId;
  //     wx.canvasToTempFilePath(opt, this);
  //   }
  // }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }

  _initCanvas(ctx) {
    if (!ctx) {
      ctx = wx.createCanvasContext(this.canvasId);
    }

    if (!ctx.draw) {
      ctx.draw = () => {
        console.warn('Context.draw is not implemented in node');
      };
    }
    this.ctx = ctx;
  }
} 