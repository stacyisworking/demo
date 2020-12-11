var view = "",lastOpe = "";
var num1 = 0,num2 = 0,count = 0;

var reset=function(){
	num1 = 0,num2 = 0,count = 0;
	view = "",lastOpe = "";
	fitSize(6);
}

var fitSize = function(n){
	// var tmp = typeof(n) == "number" ? n: Number(n);
	$(".display").css("font-size",45 - (n - 6) * 5 + "px");
	$(".display").css("padding-top",40 + (n - 6) * 5 + "px");

}

$(".number").click(function(){
	if (lastOpe == "=") {
		reset();
	}
	if (view.length < 9){	
		var number = this.innerText;
		view += number;
		view.length == 7 ? fitSize(7) : view.length == 8 ? fitSize(8) : view.length == 9 ? fitSize(9):"";
		if (count == 0) {
			num1 = Number(view);
		}else if (count > 0) {
			num2 = Number(view);
		}
	}	
	$(".display").text(view);
});

$(".ac").click(function(){
	reset();
	$(".display").text(view);
});

$(".delete").click(function(){
	view = view.substring(0,view.length-1);
	$(".display").text(view);
});

$(".lastcol").click(function(){
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
				$(".display").text(view);
				num1 = Number(view);
				num2 = 0;
				lastOpe = currentOpe;
			default :
				break;
		}
	}
	$(".display").text(view);
	view = "";
})