

function getResponse(data) {

    outputArea.append(`
                <div class='user-message'>
                <div class='message'>
                ${data}
                </div>
                </div>`);
    // Checking Pizza Requests.
    if (data.includes("pizza") || data.includes("Pizza")) {
        checkOrder(data)
    }

}

function checkOrder(data) {

    outputArea.append(`
        <div class="scrolling-wrapper">
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/Veg_Extravaganz.jpg" alt="" class="card__image">
            <div class="card__content">
                <input type="checkbox" id="test1" class="checkbox" name="item" price=100 />
                <label for="test1">Veg Extravaganza</label>

                <div class="card__price">
                    <div class="card__amount">₹100<span class="card__details">Best Price</span></div>
                </div>
            </div>
        </div>
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/Margherit.jpg" alt="" class="card__image">
            <div class="card__content">
                <input type="checkbox" id="test2" class="checkbox" name="item" price=100 />
                <label for="test2">Margherita</label>

                <div class="card__price">
                    <div class="card__amount">₹100<span class="card__details">Original and the best.</span></div>
                </div>
            </div>
        </div>
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/Farmhouse.jpg" alt="" class="card__image">
            <div class="card__content">

                <input type="checkbox" id="test4" class="checkbox" name="item" price=100 />
                <label for="test4">Farm House</label>

                <div class="card__price">
                    <div class="card__amount">₹100 <span class="card__details">A Veggie Delight.</span></div>
                </div>
            </div>
        </div>
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/IndianTandooriPaneer.jpg" alt="" class="card__image">
            <div class="card__content">

                <input type="checkbox" id="test4" class="checkbox" name="item" price=100 />
                <label for="test4">Indian Tandoori Paneer</label>

                <div class="card__price">
                    <div class="card__amount">₹125
                        <span class="card__details">
                            Tandoori Paneer.
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <input type="button" class="btn btn-3" value="Order">
    </div>
        `);
function ask_question(item, index) {
  document.getElementById("demo").innerHTML += index + ":" + item + "<br>";
  retun
}
var orders = {}

    $(".btn-3").click(function () {


        $.each($("input[name='item']:checked"), function () {

            let pizzaType = $(this).next("label").text()
            let pizzaPrice = $(this).attr("price")

            orders["pizzaType"] = pizzaType;
            orders["pizzaPrice"] = pizzaPrice;

        });
        var messageList = ["Name?", "Mail?", "Mobile?", "Your order will reach fast to your door steps. Where do you want us to deliver?"]
        fruits.forEach(myFunction);


        $.ajax({
            url: '/order',
            data: JSON.stringify(orders),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                console.log("----IN AJAXX-----")
                console.log(data)

                if (data.status == "Failed") {
                    message = "Sorry, We couldn't process your order at this moment."
                }
                else {
                    message = "Your order is placed and your Order ID is " + data.order_id
                }
                outputArea.append(`
                <div class='user-message'>
                <div class='message'>
                ` + message +
                    `
                <a href="/track?order_id=${data.order_id}"> track order</a> 
                </div>
                </div>`)
                 for (let i = 0 ; i < messageList.length; i++) {

                     deliveryDetails(messageList[i],i)
                }

            },
            error: function (error) {
                console.log(error);
            }
        });

    });

}
function deliveryDetails(message,i) {


    let keys = ["cname", "cmail", "cmobile", "caddress"]
    let dbStr = {}

    outputArea.append(`
     <div class='user-message'>
     <div class='message'>]
     ` + message + ` 
      </div>
      </div>`).then($(".input-form").on("submit", function (e) {

        dbStr[keys[i]] = $("#textInput").val();
        $.ajax({
            url: '/insertDb',
            data: JSON.stringify(dbStr),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                console.log("----IN AJAXX-----")
                console.log(data)

            },
            error: function (error) {
                console.log(error);
            }
        });
    }));


}
// function ajax(dbStr) {
//     $.ajax({
//         url: '/insertDb',
//         data: JSON.stringify(dbStr),
//         type: 'POST',
//         contentType: 'application/json;charset=UTF-8',
//         success: function (data) {
//             console.log("----IN AJAXX-----")
//             console.log(data)
//
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });
//
//
// }



