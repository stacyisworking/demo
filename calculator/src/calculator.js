var view = "",lastOpe = "";
var num1 = 0,num2 = 0,count = 0;
$(".number").click(function(){
	if (lastOpe == "=") {
		num1 = 0,num2 = 0,count = 0;
		view = "",lastOpe = "";
	}
	var number = this.innerText;
	view += number;
	if (count == 0) {
		num1 = Number(view);
	}else if (count > 0) {
		num2 = Number(view);
	}
	$(".display").text(view);
});

$(".ac").click(function(){
	view = "";
	count = 0;
	num1 = 0,num2 = 0,count = 0;
	$(".display").text(view);
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
			case "-":
				view = num1 + num2;
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
					case "-":
						view = num1 + num2;
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
			default :
				break;
		}
	}
	$(".display").text(view);
	view = "";
})