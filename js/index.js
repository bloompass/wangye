//三级导航效果
$(".b-l").find(".li1").mousemove(function(){
    $(this).find(".list2").css("display","block")
})
$(".b-l").find(".li1").mouseout(function(){
    $(this).find(".list2").css("display","none")
})
$(".list2").find(".li2").mousemove(function(){
    $(this).find(".list3").css("display","block")
})
$(".list2").find(".li2").mouseout(function(){
    $(this).find(".list3").css("display","none")
}) 

//选项卡
function Tab(){
    this.li = document.querySelectorAll(".bxx li")
    this.p = document.querySelectorAll(".ka .k-ul")

    this.index = 0;

    this.init()
}
Tab.prototype.init = function(){
    var that = this;
        for(var i=0;i<this.li.length;i++){
            this.li[i].index = i;
            this.li[i].className = "";
            this.p[i].style.display = "none";
            this.li[i].onmouseover = function(){
                that.changeIndex(this)
            }
            this.li[i].onmouseout = function(){
                for(var i=0;i<that.li.length;i++){
                    that.li[i].className = "";
                    that.p[i].style.display = "none";
    }
            }
        }
}
Tab.prototype.changeIndex = function(ele){
    this.index = ele.index;

    this.hide()
}
Tab.prototype.hide = function(){

    for(var i=0;i<this.li.length;i++){
        this.li[i].className = "";
        this.p[i].style.display = "none";
    }
    this.show()
}
Tab.prototype.show = function(){
    this.li[this.index].className = "te";
    this.p[this.index].style.display = "block";
}
new Tab();



//商品
function Goods(){
this.btn1 = document.getElementById("btn1")
this.cont = document.getElementById("cont")
this.url = "http://localhost/wangyi11/data/data.php"


this.type = "food"

this.load();
this.addEvent();
}
Goods.prototype.load = function(){
var that = this;
ajaxGet(this.url,function(res){
that.res = JSON.parse(res)
that.display();
},{
type:this.type
})
}
Goods.prototype.display = function(){
var str = "";
for(var i=0;i<this.res.length;i++){
str += `
<li>
    <div class="ge">
        <div class="imgbox1">
            <a href="detalis.html"><img src="${this.res[i].src}"></a>
        </div>
        <div class="jianjie">
            <div class="jian"><span>APP特惠</span></div>
            <h4>${this.res[i].name}</h4>
            <p>${this.res[i].price}</p>
            <div class="jie">
                <hr>
                <p>${this.res[i].show}</p>
            </div>
        </div>
    </div>
</li>`
}
this.cont.innerHTML = str;
}
Goods.prototype.addEvent = function(){
var that = this;
// this.btn1.onclick = function(){
// // 修改数据的类别
// that.type = "food";
// // 4.重复1和2
// that.load();
// }
}

new Goods()

//欢迎登录
class Index{
    constructor(){
        this.s1 = document.getElementById("s1");
        this.s2 = document.getElementById("s2");
        this.name = document.querySelector("#s2 .name");
        this.exit = document.getElementById("exit")
        this.getData()
        this.addEvent();
    }
    getData(){
        this.data = localStorage.getItem("data");
        // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
        if(this.data == null){
            this.data = [];
        }else{
            this.data = JSON.parse(this.data)
        }
        this.panduan()
    }
    panduan(){
        for(var i=0;i<this.data.length;i++){
            if(this.data[i].onoff == 1){
                this.s1.style.display = "none";
                this.s2.style.display = "block";
                this.name.innerHTML = this.data[i].user;
                this.successUser = this.data[i].user;
                return;
            }
        }
        this.s1.style.display = "block";
        this.s2.style.display = "none";
        this.name.innerHTML = "";
    }
    addEvent(){
        var that = this;
        this.exit.onclick = function(){
            if(that.successUser){
                for(var i=0;i<that.data.length;i++){
                    if(that.data[i].user === that.successUser){
                        that.data[i].onoff = 0;
                        localStorage.setItem("data",JSON.stringify(that.data))
                        that.panduan();
                    }
                }
            }
        }
    }
}

new Index();