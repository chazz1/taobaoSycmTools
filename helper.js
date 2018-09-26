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