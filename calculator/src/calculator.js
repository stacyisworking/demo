var view = "",lastOpe = "";
var num1 = 0,num2 = 0,count = 0;

var reset = function(){
	num1 = 0,num2 = 0,count = 0;
	view = "",lastOpe = "";
	$(".display").text("0");
	fitSize(6);
}

var fitSize = function(n){
	// var tmp = typeof(n) == "number" ? n: Number(n);
	if (view.indexOf(".") != -1) {
		n--;
	}
	$(".display").css("font-size",45 - (n - 6) * 5 + "px");
	$(".display").css("padding-top",40 + (n - 6) * 5 + "px");

}

reset();

var show = function () {
	$(".display").text(view);
}

$(".number").click(function(){
	if (lastOpe == "=") {
		reset();
	}
	if (view.length < 9 ){	
		var number = this.innerText;
		if (number == "." && view.indexOf(".") != -1) {
			number = "";
		}
		if (Number(view) == 0 && Number(number) == 0 && view.indexOf(".") == -1) {
			view = number;
		}else view += number;		    
		
		view.length == 7 ? fitSize(7) : view.length == 8 ? fitSize(8) : view.length == 9 ? fitSize(9):"";
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
	view = view.substring(0,view.length-1);
	show();
});

$(".per").click(function(){
    view = Number(view) / 100;
    show();
});

$(".operator").click(function(){
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