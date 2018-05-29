import wepy from 'wepy';
export default {
  "link-Handle": function (linkType = required('linkType'), linkUrl = required('linkUrl')) {
    linkType = parseInt(linkType);
    let linkUrlArr = linkUrl.split("/");
    let paramId = linkUrlArr[linkUrlArr.length - 1].slice(0, -3);
    let urlSearch;
    switch (linkType) {
      case 0:
        let indexReg = /^(\/pages\/index)/; // 首页
        let findReg = /^(\/pages\/find)/; // 发现    
        // tab页面
        if (findReg.test(linkUrl) || indexReg.test(linkUrl)) {
          wepy.switchTab({
            url: linkUrl
          });
        } else {
          wepy.navigateTo({
            url: linkUrl
          });
        }
        break;
      case 1:
        wepy.navigateTo({
          url: `/pages/goodsDetail?commodityNo=${paramId}`
        });
        break;
      case 2:
        wepy.navigateTo({
          url: `/mphome/pages/findDetail?articleId=${paramId}`
        });
        break;
      case 3:
        urlSearch = linkUrl.split("?")[1];
        paramId = urlSearch.split("=")[1]
        wepy.navigateTo({
          url: `/mphome/pages/goodsList?brand_no=${paramId}`
        });
        break;
      case 4:
        urlSearch = linkUrl.split("?")[1];
        paramId = urlSearch.split("=")[1]
        wepy.navigateTo({
          url: `/mphome/pages/goodsList?cat_id=${paramId}`
        });
        break;
      case 5:
        break;
      case 6:
        wepy.navigateTo({
          url: `/mphome/pages/topic?topicId=${paramId}`
        });
        break;
      case 7:
        break;
      case 8:
        break;
      default:
        break;
    }
  },
  "good-link": function (linkNo) {
    wepy.navigateTo({
      url: `/pages/goodsDetail?commodityNo=${linkNo}`
    });
  },
  'return-top': function () {
    wepy.pageScrollTo({
      scrollTop: 0,
      duration: 400
    });
  },
  'updateRender': function (sort, key, data) {
    this.render[sort].widgetsContent.list[key]['data'] = data;
    this.$apply()
  }
};
function required(name) {
  throw new Error(`Missing parameter ${name}`)
}