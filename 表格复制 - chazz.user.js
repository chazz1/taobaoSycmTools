// ==UserScript==
// @name:zh      表格复制 - chazz
// @name         taobao sycm tools - chazz
// @namespace    https://github.com/chazz1/taobaoSycmTools
// @version      0.0.2
// @description   表格复制
// @icon          https://img.alicdn.com/tps/i1/TB1.OB5HpXXXXbyXpXXFArBHXXX-48-48.ico
// @author       chazz <chazzcfb@163.com>
// @match        *://sycm.taobao.com/*

// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js

// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText

// @connect     s.taobao.com
// ==/UserScript==

(function () {
    'use strict';
    /**
 * 拷贝方法
 */
    function copy() {
        //console.log("copy方法初始化");
        //init
        var clipboard = new ClipboardJS('#ch-bang');
        clipboard.on('success', function (e) {
            console.info(e.text + "\n -复制成功！");

            e.clearSelection();
        });
        clipboard.on('error', function (e) {
            console.info("复制失败！");

        });

    }

    $(document).ready(function(){

        $("body").append('<div style="position: fixed;min-width: 100px;z-index: 9999999999;padding: 10px;bottom: 500px;right: 25px;" id="ch-box"><button style="color:#fff;width:100px;line-height:50px;background: #5C53E6;font-size:18px;" id="ch-bang" value=0>提取数据</button></div>');
        $("#ch-bang").click(function() {
            var btnval = $("#ch-bang").val();//获取按钮状态0位提取数据，1为复制数据
            if(btnval==0){
                //提取最后一行数据，然后点复制按钮
                var trobj = $(".el-table__body-wrapper table tbody").children("tr")
                var tdobj = trobj.eq(29).children("td");
                var txts = tdobj.eq(4).text() + "\t" +  tdobj.eq(5).text()+ "\t" +  tdobj.eq(6).text()+ "\t" +  tdobj.eq(7).text()+ "\t" +  tdobj.eq(8).text()+ "\t" +  tdobj.eq(9).text();
                console.log(txts);
                $("#ch-bang").attr("data-clipboard-text", txts).text("复制数据").val(1);
            }else{
                $("#ch-bang").text("提取数据").val(0);
            }

            //双击表格可以提取任意行数据，然后点复制按钮
            $(".el-table__body-wrapper tr").dblclick(function () {
                $("#ch-bang").val(1);
                var obj = $(this).children("td");
                var txts2 = obj.eq(4).text() + "\t" +  obj.eq(5).text()+ "\t" +  obj.eq(6).text()+ "\t" +  obj.eq(7).text()+ "\t" +  obj.eq(8).text()+ "\t" +  obj.eq(9).text();
                $("#ch-bang").attr("data-clipboard-text", txts2).text("复制数据");
            });

            copy();
        } )

    });




})();