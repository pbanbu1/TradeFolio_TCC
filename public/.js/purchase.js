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

const getStock = async ticker=>{
	console.log("Getting data");
  	const request = await fetch('https://cors-anywhere.herokuapp.com/https://stocksapi.herokuapp.com/stock',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'ticker': ticker,
            'type': 'daily'
        })
    })
    const data = await request.json()
    console.log(data);
    return data;
}

//getStock('AAPL');

// To Do: display data from mongodb, login page
function printData() {
    console.log("inside printData");

    var ticker = document.forms['stock']['ticker'].value;
    var quantity = document.forms['stock']['qty'].value;
    console.log(ticker, quantity);

    quantity = parseInt(quantity);
    // document.getElementById("purchase_data").innerHTML = "<table class='table table-light'><tr><th>Ticker</th><th>Quantity</th></tr><tr><td>" + ticker + "</td><td>" + quantity + " </td></tr></table>"

    txt_data = {"ticker": ticker, "quantity": quantity};
    console.log(txt_data);

    fetch("/purchase_onetime", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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

    fetchData();
}

function fetchData() {
    fetch("/fetch_data", {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);

    num_entries = data.entry.length;

    //CODE TO GENERATE ENTRIES
    entries_report = "<table class='table table-light'><tr><th>Ticker</th><th>Quantity</th><th>Most recent price</th></tr>";

    console.log(JSON.stringify(data.entry))
    for (i = num_entries - 1; i >= 0; i--) {

        console.log(data.entry[i])
            // var dt = new Date(data.entries[i].ticker)
            console.log("TRYING FOR "+i)

            entries_report += "<tr><td>"
                           + data.entry[i].ticker
                           + "</td><td>"
                           + data.entry[i].quantity
                           + "</td><td>"
                           + getStock(data.entry[i].ticker)
                           + "</td></tr>";
      }
      entries_report += "</table>";

      document.getElementById("purchase_data").innerHTML = entries_report;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
