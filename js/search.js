//搜索
function Search(options){
    // 解析参数
    this.url = options.url;
    this.ul = options.ul;
    this.txt = options.txt;
    // 绑定事件
    this.addEvent()
}
Search.prototype.addEvent = function(){
    var that = this;
    this.txt.onkeyup = function(){          //键盘抬起
        // 获取内容
        that.value = this.value
        // 请求数据
        that.load()
    }
}
Search.prototype.load = function(){
    var that = this;
    jsonp(this.url,function(res){
        // console.log(res)
        // 保存数据
        that.res = res.s;
        // 渲染页面
        that.display()
    },{   
        // jsonp的使用方式
        column:"cb",
        cb:"jagdsau",
        // 百度的搜索字段名
        wd:this.value
    })
}
Search.prototype.display = function(){
    var str = "";
    for(var i=0;i<this.res.length;i++){
        str += `<li>${this.res[i]}</li>`
    }
    this.ul.innerHTML = str;
}


new Search({
    url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
    ul:document.getElementsByClassName("search")[0],
    txt:document.getElementById("search").children[0]
})