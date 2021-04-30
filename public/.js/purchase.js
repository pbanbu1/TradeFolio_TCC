function validateStock() {
    var ticker = document.forms['stock']['ticker'].value;
    var quantity = document.forms['stock']['qty'].value;
    quantity = parseInt(quantity);
    if (quantity < 10 || quantity > 100) {
        alert("INVALID QUANTITY");
    } else {
        alert("Confirm " + ticker + " " + quantity + " ?");
        printData();
    }
}

function printData() {
    console.log("inside printData");

    var ticker = document.forms['stock']['ticker'].value;
    var quantity = document.forms['stock']['qty'].value;
    console.log(ticker, quantity);

    quantity = parseInt(quantity);

    document.getElementById("purchase_data").innerHTML = "<table class='table table-dark'><tr><th>Ticker</th><th>Quantity</th></tr><tr><td>" + ticker + "</td><td>" + quantity + " </td></tr></table>"

    txt_data = {"entry": {"ticker": ticker, "quantity": quantity}};
    console.log(txt_data);

    fetch("/purchase_onetime", {
      method: 'POST',
      body: JSON.stringify(txt_data)
    })
    .then(response => {
      if(response.status == 200){
          console.log("Staying on page");
        //window.location.href = "/index.html"
      } else {
        window.location.href = "/purchase.html"
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
