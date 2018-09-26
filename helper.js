/*商品效果方法 */
$("li.ch-btn2").click(function(){
    if($(".ch-btn").hasClass("hidden")){
        $(".ch-btn").removeClass("hidden");
    }
    gouxuan(4,5,20,21);
});
$("li.ch-btn3").click(function(){
    if(!$(".ch-btn").hasClass("hidden")){
        $(".ch-btn").addClass("hidden");
    }
    gouxuan(3,10,14,15);
});
$("li.ch-btn").click(function(){
    $("span.ch-span").remove() 
    var div = $("div.orderable-table");
    var divHeader= div.children("div.table-header");
    var divBody= div.children("div.table-body");
    var rows = divBody.children("div.row");
    rows.each(function(){
        var spans = $(this).children("span");
        var fangke = spans.eq(1); 
        var jiagou = spans.eq(2); 
        var shoucang = spans.eq(3);
        var fk = fangke.text();
        var jg = jiagou.text();
        var sc = shoucang.text();
        var reg = new RegExp(",",""); 
        fk = Number(fk.replace(reg,"")); 
        jg = Number(jg.replace(reg,""));
        sc = Number(sc.replace(reg,""));
        var js = (jg/fk)*100;  
        var t = '<span class="ch-span" style="color: #f00;font-size:6px;"><br>'+js.toFixed(1)+'%</span>';
        jiagou.append(t); 
        js = ((sc+jg)/fk)*100;  
        t = '<span class="ch-span" style="color: #f00;font-size:6px;"><br>'+js.toFixed(1)+'%</span>';
        fangke.append(t); 
        js = (sc/fk)*100;  
        t = '<span class="ch-span" style="color: #f00;font-size:6px;"><br>'+js.toFixed(1)+'%</span>';
        shoucang.append(t); 
    });
});
/**
 * 一键勾选方法
 * @param {*} s1 第二个选项
 * @param {*} s2 第三个选项
 * @param {*} s3 第四个选项
 * @param {*} s4 第五个选项
 */
function gouxuan(s1,s2,s3,s4){
    $("span.ch-span").remove() 
    var dropdown=$("div.dropdown-index-picker");
    var spans = dropdown.find("span.checkbox");
    spans.each(function(i,item){
        var checkbox=$(this);
        if(i!=0){
            if(checkbox.hasClass("selected")){checkbox.click();}
        }
    });
    spans.each(function(i,item){
        var checkbox=$(this);
        switch(i){
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