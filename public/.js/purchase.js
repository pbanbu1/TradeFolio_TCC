function validateStock() {
    var ticker = document.forms['stock']['ticker'].value;
    var quantity = document.forms['stock']['qty'].value;
    quantity = parseInt(quantity);
    if(quantity < 10 || quantity > 100){
        alert("INVALID QUANTITY");
    }else{
        alert("Confirm " + ticker + " " + quantity + " ?" );
        printData();
    }
}

function printData() {
    var ticker = document.forms['stock']['ticker'].value;
    var quantity = document.forms['stock']['qty'].value;
    quantity = parseInt(quantity);

    document.getElementById("purchase_data").innerHTML = "<table><tr><th>Ticker</th><th>Quantity</th></tr><tr><td>" + ticker + "</td><td>" + quantity + " </td></tr></table>"
}
