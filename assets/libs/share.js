$(function () {
    //配置分享显示的相关信息
    //只需要修改 ***** 的相关内容
    var wxOption = {
      title: '习近平邀请你视频通话', //标题 *********
      link: location.href, //连接 *********
      imgUrl: 'https://h5.cctvnews.cctv.com/szdh2023/fx.png',
      desc: '点击接听', //分享时显示的描述 *********
    };
    var appId = 'wxed0f712040b969bf'; //appid *********
    $.ajax({
      url: 'https://h5share.cctvnews.cctv.com/api/wx/jsapisignature', //接口地址 *********
      data: { appId: appId, url: wxOption.link },
      dataType: 'json',
      type: 'get',
      success: function (res) {
        if (res.statusCode == 200) {
          var data = res.data;
          wx.config({
            debug: false, //
            appId: appId, // 必填，公众号的唯一标识
            timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: [
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
            ], // 必填，需要使用的JS接口列表
          });
          wx.ready(function () {
            wx.onMenuShareTimeline({
              title: wxOption.title, // 分享标题
              link: wxOption.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: wxOption.imgUrl, // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
              },
            });
            wx.updateAppMessageShareData({
              title: wxOption.title, // 分享标题
              link: wxOption.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: wxOption.imgUrl, // 分享图标
              desc: wxOption.desc, // 分享描述
              success: function () {
                // 设置成功
              },
            });
            wx.updateTimelineShareData({
              title: wxOption.title, // 分享标题
              link: wxOption.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: wxOption.imgUrl, // 分享图标
              success: function () {
                // 设置成功
              },
            });
          });
          wx.error(function (res) {
            console.log(res);
          });
        } else {
          console.log(res);
        }
      },
    });
  });
  