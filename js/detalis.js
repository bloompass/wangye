
		


class More{
	constructor(){
		this.init();

	}
	init(){
		var that =this;
		$.ajax({
			type:"get",
			url:"./data/index.json",
			dataType:"json",
			success:function(res){ 
//				console.log(res)
              that.Display(res); 
                 
			}
		})

		
	}
	Display(res){
		this.res=res;
		console.log(res)
		var str="";
//		console.log(getCookie('id'))
		for(var i=0;i<this.res.length;i++){
			if(this.res[i].id==getCookie("id")){
				str+=`<div class="product-l">
					<div class="case s_box">
					<img src="${this.res[i].src}"/>
					<span></span>
					<p></p>
					
				</div>
				<div class="mirror b_box">
					<img src="${this.res[i].src}"/>
				</div>
				<ul>
						<li><a ><img src="${this.res[i].src1}"/></a></li>
						<li><a><img src="${this.res[i].src2}"/></a></li>
						<li><a><img src="${this.res[i].src3}"/></a></li>
				</ul>
			</div>
			<div class="product-r">
				<h1>${this.res[i].title}</h1>
				<h5>${this.res[i].title2}</h5>
				<div class="action">
					<span class="time">距离活动结束：</span>
				</div>
				<div class="pricefloor">
					<div class="price_wrap">
						<div class="new">
							<span class="money">¥</span>
							<b class="price">${this.res[i].price}</b>
						</div>
						<div class="old">
							${this.res[i].oldprice}
						</div>
					</div>
					<div class="specil">
						限时特惠
					</div>
				</div>
				<div class="onsale">
					<h3>优惠</h3>
					<div class="onsale1">
						<span class="icon_act">送积分</span>
						<span class="icon_text">${this.res[i].grade}</span>
					</div>
				</div>
				<div class="onsale2">
					<h3>领券</h3>
					<div class="onsale3">
						<span class="icon_act1">满0减30</span>
						<span class="icon_text1"><a href="#">领取</a></span>
					</div>
				</div>
				<div class="sku">
					<div class="skuColor">
						<h3>颜色</h3>
						<div class="skuList">
							<span class="option">
								<img class="colorimg" src="${this.res[i].src}"/>
								<span class="colorname">
									原色
								</span>
							</span>
						</div>
					</div>
					<div class="skuNum">
						
						<p>库存442(限购五件)</p>
					</div>
				</div>
				<div class="foot">
					<a href="ShopCar.html" class="car">加入购物车</a>
					<!--<a href="#" class="buy">立即购买</a>-->
				</div>
			</div>`;
			}
			
		}
		    
		$("#main").html(str);	
//		this.oSbox = $('.s_box')
		
		new Magnifier();
		var that =this;
		$(".car").on("click",function(){
//			console.log(1);
			var id = $.cookie("id");
					if($.cookie("product") == null){
						that.product = [{
							id:id,
							num:1
						}]
					}else{
						that.product = JSON.parse($.cookie("product"));
						that.onoff = true;
						that.product.forEach((v)=>{
							if(v.id == id){
								v.num++;
								that.onoff = false;
							}
						})
						if(that.onoff){
							that.product.push({
								id:id,
								num:1
							})
						}
					}
			setCookie("product",JSON.stringify(that.product))
		})
		
	}

}
 new More();

function Magnifier(){
			this.oSbox = document.querySelector(".s_box");
			console.log(this.oSbox)
			this.oPbox = this.oSbox.children[1];
			this.oBbox = document.querySelector(".b_box");
			this.oBimg = this.oBbox.children[0];
			this.select = $('.product-l').find('li');
//			console.log()
			this.addEvent();
			this.Select();
		}
		Magnifier.prototype.addEvent = function(){
			var that = this;
			this.oSbox.onmouseover = function(){
				that.show();
			}
			this.oSbox.onmouseout = function(){
				that.hide();
			}
		}
		Magnifier.prototype.show = function(){
			this.oPbox.style.display="block";
			this.oBbox.style.display="block";
			this.addMove()
		}
		Magnifier.prototype.hide = function(){
			this.oPbox.style.display="none";
			this.oBbox.style.display="none";
		}
		Magnifier.prototype.addMove = function(){
			var that = this;
			this.oSbox.onmousemove = function(eve){
				var e = eve||window.event
				that.pBoxMove(e);
			}
		}
		Magnifier.prototype.pBoxMove = function(e){
			
			 this.l = e.offsetX -this.oPbox.offsetWidth/2;
			 this.t = e.offsetY -this.oPbox.offsetHeight/2;
			 if(this.l<0)this.l=0;
			 if(this.t<0)this.t=0;
			 if(this.l>this.oSbox.offsetWidth-this.oPbox.offsetWidth){
			 	this.l=this.oSbox.offsetWidth-this.oPbox.offsetWidth;
			 }
			 if(this.t>this.oSbox.offsetHeight-this.oPbox.offsetHeight){
			 	this.t=this.oSbox.offsetHeight-this.oPbox.offsetHeight ;
			 }
			 this.oPbox.style.left = this.l+"px";
			 this.oPbox.style.top = this.t+"px";
			 this.x = this.l/(this.oSbox.offsetWidth-this.oPbox.offsetWidth);
			 this.y = this.t/(this.oSbox.offsetHeight-this.oPbox.offsetHeight);
			 this.Move();
		}
		Magnifier.prototype.Move = function(){
			this.oBimg.style.left = -(this.oBimg.offsetWidth-this.oBbox.offsetWidth)*this.x+"px";
			this.oBimg.style.top = -(this.oBimg.offsetHeight-this.oBbox.offsetHeight)*this.y+"px";
		}
		Magnifier.prototype.Select = function(){
			let that = this
//			console.log(this.select)
			for(let i=0;i<this.select.length;i++){
//			console.log(this.select[i])
				this.select[i].onclick=function(){
//					console.log(that.select[i])
					that.Switchpic(that.select[i])
				}
			}
		}
		Magnifier.prototype.Switchpic = function(a){
			
//			$(a).on('click',function(){
			this.sss= $(a).find('img').attr('src')
			
//			this.oSbox.setAttribute('src',this.sss)
			$('.s_box').find('img').attr({'src':this.sss})
		    $('.b_box').find('img').attr({'src':this.sss})
//				console.log($('.s_box'))
//				$('.s_box').attr('src',$(a).find('img').attr('src'))
////			})
//			console.log($(a).find('img').attr('src'))
//			$('').getAttribute('src')

//         document.getElementsByClassName("s_box")=a.src
//         document.getElementsByClassName("b_box")=a.src
		}
