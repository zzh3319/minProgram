import wepy from 'wepy'

export default class GTools extends wepy.mixin {
  customFunction = {
    onReachBottomHandler (_that) {
            // zzh
      let lastModuleDataObj = _that.lastModuleDataObj;
      let pageNum = _that.pageNum;
      let onePageContentNum = _that.onePageContentNum;
      let allPageContentNum = _that.allPageContentNum;

      if (!lastModuleDataObj) {
        return false;
        console.log('不用下拉加载数据');
      }

      if (pageNum === allPageContentNum) {
        return false;
      }
      _that.pageNum = ++pageNum;
      console.log(pageNum);
      _that.lastModuleDataList = _that.lastModuleDataList.concat(
                lastModuleDataObj.widgetsContent.list.slice(
                    (pageNum - 1) * onePageContentNum,
                    pageNum * onePageContentNum
                )
            );
      if (pageNum === allPageContentNum) {
        _that.hasMoreData = false;
      }
      _that.$apply();
    },
    pagingHandler (data, _that) {
            // zzh
      let length = data.length;
      let lastModule = data[length - 1] ;// 此处为什么要取最后一个???
      let moduleContentContorlNum = _that.moduleContentContorlNum;
      let onePageContentNum = _that.onePageContentNum;
      let lastModuleDataObj = null;
      let allPageContentNum = 0;
      let lastModuleLength;
            // 防止widgetsContent.list的数据不是数组导致报错页面全部空白的容错处理
      try {
        if (
                    Object.prototype.toString.call(
                        lastModule.widgetsContent.list
                    ) === '[object Array]'
                ) {
          if (lastModule.widgetsContent.list.length === 0) {
            lastModuleLength = 0;
          } else {
            lastModuleLength = lastModule.widgetsContent.list.length;
          }
        } else {
          lastModuleLength = 0;
          throw '装修页面参数widgetsContent中的list的类型不是数组类型'
        }
      } catch (error) {
        console.error(error)
      }
            // let lastModuleLength = lastModule.widgetsContent.list.length
      if (
                lastModule.type === 'goods1' &&
                lastModuleLength > moduleContentContorlNum
            ) {
        let pageNum = _that.pageNum;
        lastModuleDataObj = data.pop(); // 同时会改变原数组
        _that.allPageContentNum = Math.ceil(
                    lastModuleLength / onePageContentNum
                )
        _that.lastModuleDataObj = lastModuleDataObj;
        _that.lastModuleDataList = lastModuleDataObj.widgetsContent.list.slice(
                    (pageNum - 1) * onePageContentNum,
                    pageNum * onePageContentNum
                );
      }
            // zzh
    },
        // 设置上一页面value
    setPrevPage (data = {}) {
      let pages = getCurrentPages();// 当前页面
      let prevPage = pages[pages.length - 2] ;// 上一页面
      if (!prevPage) return
      prevPage.setData(data);
      wepy.navigateBack({
        delta: 1
      })
    },
        // 获取openid
    getOpenId () {
      try {
        const keyName = 'openid'
        const openid = wepy.getStorageSync(keyName)
        if (openid) {
          return openid
        } else {
          console.log('没有获取到openid,请重新登录');
        }
      } catch (e) {
        this.toast('获取openid错误');
      }
    },
        // 弹窗配置
    async toast (
            title = '获取数据错误',
            arg = {
              icon: 'none',
              duration: 1000
            }
        ) {
      let toastOption = Object.assign(
        {
          title
        },
                arg
            )
      const toast = await wepy.showToast(toastOption);
      toastOption = null;
      return toast;
    },
    async showModal (content = '网络错误', arg = {}) {
      let option = Object.assign(
        {
          content
        },
                arg
            )
      const modal = await wepy.showModal(option);
      option = null;
      return modal;
    },
        // 请求函数
    async fetchData (
            url = '',
            data = {},
            arg = {
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              fail: err => {
                this.toast()
              },
              header: {
                'content-type': 'application/json'
              }
            },
            opt = {
              isShowLoad: true
            }
        ) {
      const openId = this.getOpenId()

      data.openId = openId // 每次请求都要openId
            // data.openId = "oBPQT0Y1DtODbjvJDM5TuFiJ0XAc";//每次请求都要openId
      let requestObject = Object.assign(
        {
          url,
          data
        },
                arg
            )
      if (opt.isShowLoad) {
        wepy.showLoading({
          title: '加载中'
        })
      }
      const promise = await wepy.request(requestObject)
      requestObject = null
      if (opt.isShowLoad) {
        wepy.hideLoading()
      }
      if (!promise) {
        this.showModal()
        return false
      }
      return promise.data
    },
        // 获取当前url
    getCurrentPageUrl () {
      var pages = getCurrentPages() // 获取加载的页面
      var currentPage = pages[pages.length - 1] // 获取当前页面的对象
      var url = currentPage.route // 当前页面url
      return url
    },

    getCurrentPageUrlWithArgs () {
      var pages = getCurrentPages() // 获取加载的页面
      var currentPage = pages[pages.length - 1] // 获取当前页面的对象
      var url = currentPage.route // 当前页面url
      var options = currentPage.options // 如果要获取url中所带的参数可以查看options

            // 拼接url的参数
      var urlWithArgs = url + '?'
      for (var key in options) {
        let value = options[key]
        urlWithArgs += key + '=' + value + '&'
      }
      urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
      return urlWithArgs
    }
  }
}
