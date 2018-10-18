// ==UserScript==
// @name:zh      淘宝生意参谋工具箱 - chazz
// @name         taobao sycm tools - chazz
// @namespace    https://github.com/chazz1/taobaoSycmTools
// @version      0.0.7
// @description  淘宝生意参谋工具箱
// @icon          https://img.alicdn.com/tps/i1/TB1.OB5HpXXXXbyXpXXFArBHXXX-48-48.ico
// @author       chazz <chazzcfb@163.com>
// @match        *://sycm.taobao.com/*
// @match        *://subway.simba.taobao.com*

// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/2.0.1/clipboard.min.js
// @require      https://raw.githubusercontent.com/chazz1/taobaoSycmTools/master/helper.min.js?v=201810061
// @resource     ui https://raw.githubusercontent.com/chazz1/taobaoSycmTools/master/helper.css?v=201810061

// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText

// @connect     s.taobao.com
// ==/UserScript==

(function () {
    'use strict';
    var pathname = window.location.pathname; //获取地址
    if (pathname == "/") {
        pathname = window.location.hash;
    }
    console.log(pathname);
    var ui = GM_getResourceText('ui');//获取样式资源
    GM_addStyle(ui);//注入样式
    if (pathname == "/bda/items/effect/item_effect.htm") {
        var btn1 = '<div class="ui-switch btn-group-switch"><ul class="ui-switch-menu"><li class="ui-switch-item ui-routable-item ch-btn hidden"><a href="JavaScript:;">计算收藏加购率</a></li><li class="ui-switch-item ui-routable-item ch-btn2"><a href="JavaScript:;">看人气</a></li><li class="ui-switch-item ui-routable-item ch-btn3"><a href="JavaScript:;">看价值</a></li></ul></div>';
        $(".operation").prepend(btn1);
        /*商品效果 */
        $("li.ch-btn2").click(function () {
            if ($(".ch-btn").hasClass("hidden")) {
                $(".ch-btn").removeClass("hidden");
            }
            gouxuan(4, 5, 20, 21);
        });
        $("li.ch-btn3").click(function () {
            if (!$(".ch-btn").hasClass("hidden")) {
                $(".ch-btn").addClass("hidden");
            }
            gouxuan(3, 10, 14, 15);
        });
        $("li.ch-btn").click(function () {
            $("span.ch-span").remove()
            jsShangPin();
        });
    }
    if (pathname == "/bda/items/itemanaly/item_analy.htm") {
        /*单品分析 */
        var btn2 = '<li class="ui-switch-item ui-routable-item ch-btn3"><a href="JavaScript:;"  class="ch-copy-btn">复制数据</a></li><li class="ui-switch-item ui-routable-item ch-btn"><a href="JavaScript:;">计算</a></li><li class="ui-switch-item ui-routable-item ch-btn2"><a href="JavaScript:;" class="ch-copy-btn">拆分词根</a></li>';
        $(".btn-group-switch .ui-switch-menu").prepend(btn2);

        $("li.ch-btn").click(function () {
            $("span.ch-span").remove()
            jsDanPin();
        });
        $("li.ch-btn2").click(function () {
            chaiFenBiaoTi();
        });
        $("li.ch-btn3").click(function () {
            tiquTop10();
        });


        copy(); //绑定复制按钮
    }
    if (pathname == "/mc/mq/search_analyze") {
        //搜索词拷贝        
        var btn4 = '<button type="button" class="ant-btn oui-canary-btn ant-btn-sm ch-copy-btn" id="ch-get-relatedword-btn" style="margin-right: 5px;" ><span>提取关键词</span></button>';
        //页面载入3秒后插入按钮
        setTimeout(function () {
            $(".oui-date-picker .oui-date-picker-particle-button").prepend(btn4);
            //绑定按钮事件
            $("#ch-get-relatedword-btn").click(function () {
                getRelatedWord();                
            });

            copy(); //绑定复制按钮
        }, 3000);

    }

    if (pathname.indexOf("manage/campaign/detail") != -1) {
        //改变直通车时间控件位置
        setTimeout(function () {
            $(".detail-date-picker").css("right","1000px");
        }, 4000);
    }

})();