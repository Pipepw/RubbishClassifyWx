var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
  data: {
    keywrod: '',
    searchStatus: false,
    rubbishesList: [],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSort: 'name',
    currentSortType: 'default',
    currentSortOrder: 'desc',
    filterCategory: [],
    defaultKeyword: {},
    hotKeyword: [],
    page: 1,
    limit: 20,
    categoryId: 0,
    rubbishName: "巴旦木壳",
    rubbishKind: "餐厨垃圾",
    explainHead: "解释",
    explainBody: "餐厨垃圾是指易腐的生物质废弃物，包括剩菜、果壳、绿植、碎骨以及日常食品等",
    suggestionHead: "投放建议",
    suggestionBody: "纯流质如奶粥汤酒等可直接导入下水道，有包装物的餐厨垃圾应将包装物取出后分类投放",
    rubbishImage: "../../static/images/recyc1.png"
  },
  //事件处理函数
  closeSearch: function() {
    wx.navigateBack()
  },
  clearKeyword: function() {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },
  onLoad: function() {

    this.getSearchKeyword();
  },

  getSearchKeyword() {
    let that = this;
    util.request(api.SearchIndex).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          // historyKeyword: res.data.historyKeywordList,
          // defaultKeyword: res.data.defaultKeyword,
          // hotKeyword: res.data.hotKeywordList
        });
      }
    });
  },

  inputChange: function(e) {
    this.setData({
      keyword: e.detail.value,  //获取输入的值到keyword中，然后我应该把数组展示出来
      searchStatus: false
    });

    if (e.detail.value) {
      this.getHelpKeyword();
    }
  },
  getHelpKeyword: function() {
    let that = this;
    // util.request(api.SearchHelper, {
    //   keyword: that.data.keyword
    // }).then(function(res) {
    //   if (res.errno === 0) {
    //     that.setData({
    //       helpKeyword: res.data
    //     });
    //   }
    // });
  },
  inputFocus: function() {
    this.setData({
      searchStatus: false,
      rubbishesList: []
    });

    if (this.data.keyword) {
      this.getHelpKeyword();
    }
  },
  clearHistory: function() {
    this.setData({
      historyKeyword: []
    })

    // util.request(api.SearchClearHistory, {}, 'POST')
    //   .then(function(res) {
    //     console.log('清除成功');
    //   });
  },
  getrubbishesList: function() {
    // let that = this;
    // util.request(api.rubbishesList, {
    //   keyword: that.data.keyword,
    //   page: that.data.page,
    //   limit: that.data.limit,
    //   sort: that.data.currentSort,
    //   order: that.data.currentSortOrder,
    //   categoryId: that.data.categoryId
    // }).then(function(res) {
    //   if (res.errno === 0) {
    //     that.setData({
    //       searchStatus: true,
    //       categoryFilter: false,
    //       rubbishesList: res.data.list,
    //       filterCategory: res.data.filterCategoryList
    //     });
      // }

      //重新获取关键词
      // that.getSearchKeyword();
    // });
  },
  onKeywordTap: function(event) {

    this.getSearchResult(event.target.dataset.keyword);

  },
  getSearchResult(keyword) {
    if (keyword === '') {
      keyword = this.data.defaultKeyword.keyword;
    }
    this.setData({
      keyword: keyword,
      page: 1,
      categoryId: 0,
      rubbishesList: []
    });

    this.getrubbishesList();
  },
  onKeywordConfirm(event) { //确认搜索之后在这里，参数是我确定的值
    this.getSearchResult(event.detail.value);
  }
})