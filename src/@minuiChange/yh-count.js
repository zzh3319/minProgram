"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    number: {
      type: [Number, String],
      value: 0,
      observer: function observer(newVal) {
        this.setData({
          number: parseInt(newVal, 10)
        });
      }
    },
    max: {
      type: [Number, String],
      value: 1,
      observer: function observer(newVal) {
        this.setData({
          max: parseInt(newVal, 10)
        });
      }
    },
    cartSkusCount: {
      type: [Number, String],
      value: 1,
      observer: function observer(newVal) {
        this.setData({
            cartSkusCount: parseInt(newVal, 10)
        });
      }
    },
    curCountValue: {
      type: [Number, String],
      value: 1,
      observer: function observer(newVal) {
        this.setData({
            curCountValue: parseInt(newVal, 10)
        });
      }
    },
    min: {
      type: [Number, String],
      value: 0,
      observer: function observer(newVal) {
        this.setData({
          min: parseInt(newVal, 10)
        });
      }
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  attached: function attached() { },
  methods: {
    addHandler: function addHandler(e) {
      var min = this.data.min;
      var max = this.data.max;
      var disabled = this.data.disabled;
      var count = this.data.curCountValue; //当前数量
      var cartSkusCount = this.data.cartSkusCount; //购物车最大数量
      if (max <= this.data.number || disabled) {
        if (max <= this.data.number) {
          this.triggerEvent('addHandle', {
            e: e,
            number: this.data.number,
            min: min,
            max: max,
            cartSkusCount: cartSkusCount,
            type: 'add',
            curCount: this.data.curCountValue
          });
        }
        return
      };
      ++this.data.curCountValue; //当前数量加1,点击事件自增
      if (this.data.curCountValue > cartSkusCount) {
       this.triggerEvent('addHandleTost', {
        e: e,
        number: this.data.number,
        min: min,
        max: max,
        cartSkusCount: cartSkusCount,
        type: 'add',
        curCount: this.data.curCountValue
      });
      } else {
        this.setData({
          number: ++this.data.number
        });
        this.triggerEvent('changenumber', {
          e: e,
          number: this.data.number,
          min: min,
          max: max,
          cartSkusCount: cartSkusCount,
          type: 'add',
          curCount: this.data.curCountValue //将改变后的变量传回父组件
        });
      }
    },
    minusHandler: function minusHandler(e) {
      var min = this.data.min;
      var max = this.data.max;
      var disabled = this.data.disabled;
      var cartSkusCount = this.data.cartSkusCount; //购物车最大数量
      if (min >= this.data.number || disabled) return;
      --this.data.curCountValue; //当前数量加1,点击事件自减
      this.setData({
        number: --this.data.number
      });
      this.triggerEvent('changenumber', {
        e: e,
        number: this.data.number,
        min: min,
        max: max,
        cartSkusCount: cartSkusCount,
        type: 'minus',
        curCount: this.data.curCountValue //将改变后的变量传回父组件
      });
    }
  }
});