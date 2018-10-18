/**
 * JS在线压缩工具  
 * https://www.css-js.com/
 */

/**
 * 计算商品效果页面的收藏加购比
 */
function jsShangPin() {
    var div = $("div.orderable-table");
    var divHeader = div.children("div.table-header");
    var divBody = div.children("div.table-body");
    var rows = divBody.children("div.row");
    rows.each(function () {
        var spans = $(this).children("span");
        var fangke = spans.eq(1);
        var jiagou = spans.eq(2);
        var shoucang = spans.eq(3);
        var fk = fangke.text();
        var jg = jiagou.text();
        var sc = shoucang.text();
        var reg = new RegExp(",", "");
        fk = Number(fk.replace(reg, ""));
        jg = Number(jg.replace(reg, ""));
        sc = Number(sc.replace(reg, ""));
        var js = (jg / fk) * 100;
        var t = '<span class="ch-span"><br>' + js.toFixed(1) + '%</span>';
        jiagou.append(t);
        js = ((sc + jg) / fk) * 100;
        t = '<span class="ch-span"><br>' + js.toFixed(1) + '%</span>';
        fangke.append(t);
        js = (sc / fk) * 100;
        t = '<span class="ch-span"><br>' + js.toFixed(1) + '%</span>';
        shoucang.append(t);
    });
}

/**
 * 一键勾选方法
 * @param {*} s1 第二个选项
 * @param {*} s2 第三个选项
 * @param {*} s3 第四个选项
 * @param {*} s4 第五个选项
 */
function gouxuan(s1, s2, s3, s4) {
    $("span.ch-span").remove();
    var dropdown = $("div.dropdown-index-picker");
    var spans = dropdown.find("span.checkbox");
    spans.each(function (i, item) {
        var checkbox = $(this);
        if (i != 0) {
            if (checkbox.hasClass("selected")) { checkbox.click(); }
        }
    });
    spans.each(function (i, item) {
        var checkbox = $(this);
        switch (i) {
            case s1:
                checkbox.click();
                break;
            case s2:
                checkbox.click();
                break;
            case s3:
                checkbox.click();
                break;
            case s4:
                checkbox.click();
                break;
        }
    });
}

/**
 * 计算单品分析页面的收藏加购比
 */
function jsDanPin() {
    var sourceNames = $("li.t-source-name ul.flow-source-table").children("ul").children("li"); //获取来源列对象
    var flows = $("li.t-flow ul.flow-source-table").children("ul").children("li"); //获取流量相关列对象
    var guides = $("li.t-guide ul.flow-source-table").children("ul").children("li"); //获取引导转化列对象
    sourceNames.each(function () {
        var i = $(this).index();
        var fangke = flows.eq(i).children("div").eq(0);
        var shoucang = guides.eq(i).children("div").eq(0);
        var jiagou = guides.eq(i).children("div").eq(1);
        var fk = fangke.text();
        var jg = jiagou.text();
        var sc = shoucang.text();
        var reg = new RegExp(",", "");
        fk = Number(fk.replace(reg, ""));
        jg = Number(jg.replace(reg, ""));
        sc = Number(sc.replace(reg, ""));
        var js = (jg / fk) * 100;
        var t = '<span class="ch-span">' + js.toFixed(1) + '%</span>';
        jiagou.append(t);
        js = ((sc + jg) / fk) * 100;
        t = '<span class="ch-span">' + js.toFixed(1) + '%</span>';
        fangke.append(t);
        js = (sc / fk) * 100;
        t = '<span class="ch-span">' + js.toFixed(1) + '%</span>';
        shoucang.append(t);
    });
}

/**
 * 拆分标题用来初始化商品ID
 */
var qnid = 0;
/**
 * 拆分标题
 */
function chaiFenBiaoTi() {
    if (qnid == 0) {
        var qObj = $("a.item-title");
        var q = qObj.text();
        var nidHref = qObj.attr("href");
        //var reg = /(?<=id=)\d{10,12}/g;
        var reg = /([^id=]+)\d{10,12}/g;
        // qnid = nidHref.match(/(?<=id=)\d{10,12}/g)[0];//根据商品链接提取商品ID
        qnid = reg.exec(nidHref)[0];//根据商品链接提取商品ID

        console.log(qnid);
        var url = "https://s.taobao.com/search?q=" + q + "&imgfile=&js=1&style=grid&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20170411&ie=utf8";
        // console.log(q);
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml',
                'User-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            },
            url: url,
            onerror: function (e) {
                console.error(e);
                toastMsg("数据获取出错！");
            },
            ontimeout: function (e) {
                console.error(e);
                toastMsg("数据获取超时！");
            },
            onload: function (response) {
                //加载成功处理数据
                var htmlText = response.responseText; //以文本获取html内容
                var s1Length = "g_page_config = ".length;
                var s2Length = ";     ".length;
                var s1 = htmlText.indexOf("g_page_config = ");
                var s2 = htmlText.indexOf("g_srp_loadCss()");
                var jsonText = htmlText.substring(s1 + s1Length, s2 - s2Length); //截取json数据
                var obj = JSON.parse(jsonText); //json字符串反序列
                obj = obj.mods.itemlist.data.auctions; //从json对象提取商品列表
                // console.log(obj);
                //提取标题并插入到文档
                for (var i in obj) {
                    if (obj[i].nid == qnid) {
                        //console.log(obj[i].title);
                        qObj.html(obj[i].title);
                    }
                }
                $("li.ch-btn2 a.ch-copy-btn").text("复制词根").attr("data-clipboard-text", titleList(q));//提取词根，并把内容绑定到复制按钮上

                toastMsg("拆分完成！");
            }

        });
    }
}


/**
 * 提取单品分析top10的数据
 */
function tiquTop10() {
    var top10Date = ""; //存储数据

    var sourceNames = $("li.t-source-name ul.flow-source-table").children("ul").children("li");//获取来源列对象
    var flows = $("li.t-flow ul.flow-source-table").children("ul").children("li"); //获取流量相关列对象
    console.log(sourceNames);
    sourceNames.each(function () {
        var i = $(this).index();
        var name = sourceNames.eq(i).text();
        var fangke = flows.eq(i).children("div").eq(0).text();
        top10Date += name + "\t" + fangke;
        if (i < (sourceNames.length - 1)) {
            top10Date += "\n";
        }
    });
    console.log(top10Date);
    $("li.ch-btn3 a.ch-copy-btn").attr("data-clipboard-text", top10Date);//提取词根，并把内容绑定到复制按钮上
}

/**
 * 拆分关键词，并返回值
 * @param {*} title 要对比的标题
 */
function titleList(title) {
    var titleRes = $("a.item-title span");
    var s = "";
    var s2 = "";
    // console.log(titleRes);
    titleRes.each(function () {
        // var i = $(this).index();
        //  console.log(i+":"+$(this).text());
        s += $(this).text();

        if (s2 != title) {
            s2 += $(this).text();
        } else {
            $(this).css("background-color", "red");//标识出标题中没有但是词根中有的关键词！
        }
        if ($(this).index() < (titleRes.length - 1)) {
            s += "\n";
        }

    });
    //console.log(s);
    return s;
}

/**
 * 拷贝方法
 */
function copy() {
    //console.log("copy方法初始化");
    //init
    var clipboard = new ClipboardJS('.ch-copy-btn');
    clipboard.on('success', function (e) {
        console.info(e.text + "\n -复制成功！");
        toastMsg("复制成功！在Excel表格中粘贴（Ctrl + V）一下就可以了哦！", 2000);
        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        console.info("复制失败！");
        toastMsg("复制失败！", 2000);
    });

}

/**
 * 自定义模拟toast弹框
 * @param {*} msg 消息内容
 * @param {*} duration 显示时间，毫秒，可不填，默认3000毫秒
 */
function toastMsg(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;left: 0;right: 0;top: 40%;margin:0 auto;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
    document.body.appendChild(m);
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () { document.body.removeChild(m) }, d * 1000);
    }, duration);
}
/**
 * 提取
 */
var keyword = "0";
/**
 * 获取关键词
 */
function getRelatedWord() {
    if (keyword == "0") {
        keyword = $("input.ant-input").val();
        if (keyword != "") {
            var res = "";
            var dataText = $("div.oui-date-picker-current-date").text();
            var regText = /\d{4}-\d{2}-\d{2}/;
            var arr = dataText.split("~");
            var datas = regText.exec(arr[0]);
            if (arr.length > 1) {
                // datas += "%7C"+regText.exec(arr[1]);
                toastMsg("目前仅支持按日提取数据，请不要选周，月，7天，30天！");
            } else {
                datas += "%7C" + regText.exec(arr[0]);
                console.log(datas);

                // keyword = encodeURI(encodeURI(keyword));//中文转为UTF-8
                console.log(keyword);
                var url = "https://sycm.taobao.com/mc/searchword/relatedWord.json?dateRange=" +
                    datas
                    + "&dateType=day&pageSize=10&page=1&order=desc&orderBy=seIpvUvHits&keyword=" +
                    keyword
                    + "&device=0&indexCode=seIpvUvHits%2CsePvIndex%2CclickRate%2CclickHits%2CclickHot";
                console.log(url);

                GM_xmlhttpRequest({
                    method: "GET",
                    headers: {

                    },
                    url: url,
                    onerror: function (e) {
                        console.error(e);
                        toastMsg("数据获取出错！");
                    },
                    ontimeout: function (e) {
                        console.error(e);
                        toastMsg("数据获取超时！");
                    },
                    onload: function (response) {
                        //加载成功处理数据
                        var jsonText = response.responseText; //以文本获取html内容
                        // var jsonText = htmlText; //截取json数据
                        var obj = JSON.parse(jsonText); //json字符串反序列
                        //obj = obj.mods.itemlist.data.auctions; //从json对象提取商品列表
                        console.log(obj.data);
                        var data = obj.data;
                        for (var i in data) {
                            // console.log(i + "-" + data[i].keyword);
                            res += data[i].keyword + "\t" 
                                + data[i].seIpvUvHits + "\t" 
                                + data[i].sePvIndex + "\t" 
                                + data[i].clickRate + "\t" 
                                +data[i].clickHits + "\t"
                                +data[i].clickHot + "\t"
                                +data[i].tradeIndex + "\t"
                                +data[i].payConvRate + "\t"
                                +data[i].onlineGoodsCnt + "\t"
                                +data[i].tmClickRatio + "\t"
                                +data[i].p4pAmt + "\t"
                                +data[i].spvRatio + "\t"
                                ;
                            res +="\n";
                        }
                        /*
                        keyword: "西装套装女" 
                        seIpvUvHits: 14408  搜索人气
                        sePvIndex: 37804  搜索热度
                        clickRate: 1.3357 点击率
                        clickHits: 10978 点击人气
                        clickHot: 44584 点击热度
                        tradeIndex: 84585   交易指数
                        payConvRate: 0.1404  支付转化率
                        onlineGoodsCnt: 4988581   在线商品数
                        tmClickRatio: 0.5594  商城点击占比
                        p4pAmt: 2.0942555525089115   直通车参考价
                        spvRatio: 13296    未知
                        */

                        $(".ch-copy-btn").text("复制数据").attr("data-clipboard-text", res);//提取词根，并把内容绑定到复制按钮上
                        toastMsg("提取完成，请点击复制按钮复制数据！");
                    }

                });

            }
        }else{
            toastMsg("先选择搜索词，进入搜索分析哦！");
            keyword = "0";
        }
    }
}