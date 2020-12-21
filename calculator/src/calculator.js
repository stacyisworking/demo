var view = "",lastOpe = "";
var num1 = 0,num2 = 0,count = 0;

var reset = function(){
	num1 = 0,num2 = 0,count = 0;
	view = "",lastOpe = "";
	$(".display").text("0");
	fitSize(6);
}

var fitSize = function(n){
// 除小数点外自适应支持9个数字
	$(".display").css("font-size",45 - (n - 6) * 5 + "px");
	$(".display").css("padding-top",40 + (n - 6) * 5 + "px");

}

reset();

var show = function () {
	$(".display").text(view);
}

// 点击数字按钮瞬间改变背景色
$(".number").mousedown(function(){
	$(this).addClass("clickNumber");
}).mouseup(function(){
	$(this).removeClass("clickNumber");
});

$(".firstRow").mousedown(function(){
	$(this).addClass("clickFirstRow");
}).mouseup(function(){
	$(this).removeClass("clickFirstRow");
});

$(".number").click(function(){
	if($(".operator").hasClass("clickOperator")){
		$(".operator").removeClass("clickOperator");
	}

	if (lastOpe == "=") {
		reset();
	}
	var noPoint = view.length;
	if (this.innerText == "." || view.indexOf(".") != -1) {
		noPoint--;
	}
	if (noPoint < 9 ){	
		var number = this.innerText;
		//小数点只有一个
		if (number == "." && view.indexOf(".") != -1) {
			number = "";
		}		
		if (Number(view) == 0 && view.indexOf(".") == -1) {
			//小数点前补0，其他时候0不可作为首位
			if (number == ".") {
				view = "0" + number;
			}else {
				view = number;
			}
		}else {
			view += number;	
			noPoint++;	    
		}
		noPoint == 7 ? fitSize(7) : noPoint == 8 ? fitSize(8) : noPoint == 9 ? fitSize(9):"";
		if (count == 0) {
			num1 = Number(view);
		}else if (count > 0) {
			num2 = Number(view);
		}
	}	
	show();
});

$(".ac").click(function(){
	reset();
});

$(".delete").click(function(){
	// 处理当view为0时，substring方法报错
	view = view.substring(0,view.length-1);
	show();	

});

$(".per").click(function(){
	view = Number(view) / 100  + "";
	if (view == "0") {
		view = "";
		$(".display").text("0");
	}else {
		show();
	}  
});

$(".operator").click(function(){
	// 运算符只有一个被改变为选中样式
	if($(".operator").hasClass("clickOperator")){
		$(".operator").removeClass("clickOperator");
		$(".divide").children().attr('fill','#FFF');
	}
	$(this).addClass("clickOperator");
	// 特殊处理除号svg样式变更
	if(this.name == "divide"){
		$(".divide").children().attr('fill','#FF8800');
	}
	count++;
	var currentOpe = this.innerText;
	if (count == 1) {
		lastOpe = currentOpe;
	}
	if (count > 1) {
		switch(currentOpe) {
			case "+":
				view = num1 + num2;
				break;
			case "--":
				view = num1 - num2;
				break;
			case "X":
			    view = num1 * num2;
			    break;
			case "/":
			    view = num1 / num2;
			    break;
			case "=":
				switch(lastOpe) {
					case "+":
						view = num1 + num2;
						break;
					case "--":
						view = num1 - num2;
						break;
					case "X":
					    view = num1 * num2;
					    break;
					case "/":
					    view = num1 / num2;
					    break;
					case "=" :
					    break;
				}
				show();
				num1 = Number(view);
				num2 = 0;
				lastOpe = currentOpe;
			default :
				break;
		}
	}
	show();
	view = "";
})