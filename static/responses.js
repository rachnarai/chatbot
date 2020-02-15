
var orders = {}
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

        outputArea.append(`<div class="scrolling-wrapper">
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/Veg_Extravaganz.jpg" alt="" class="card__image">
            <div class="card__content">
                <input type="checkbox" id="test1" class="checkbox" name="item"/>
                <label for="test1">Veg Extravaganza</label>

                <div class="card__price">
                    <div class="card__amount">₹100<span class="card__details">Best Price</span></div>
                </div>
            </div>
        </div>
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/Margherit.jpg" alt="" class="card__image">
            <div class="card__content">
                <input type="checkbox" id="test2" class="checkbox" name="item"/>
                <label for="test2">Margherita</label>

                <div class="card__price">
                    <div class="card__amount">₹100<span class="card__details">Original and the best.</span></div>
                </div>
            </div>
        </div>
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/Farmhouse.jpg" alt="" class="card__image">
            <div class="card__content">

                <input type="checkbox" id="test4" class="checkbox" name="item"/>
                <label for="test4">Farm House</label>

                <div class="card__price">
                    <div class="card__amount">₹100 <span class="card__details">A Veggie Delight.</span></div>
                </div>
            </div>
        </div>
        <div class="card">
            <img src="https://www.dominos.co.in/files/items/IndianTandooriPaneer.jpg" alt="" class="card__image">
            <div class="card__content">

                <input type="checkbox" id="test4" class="checkbox" name="item"/>
                <label for="test4">Indian Tandoori Paneer</label>

                <div class="card__price">
                    <div class="card__amount">₹100
                        <span class="card__details">
                            Tandoori Paneer.
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <input type="button" class="btn btn-3" value="Order">
    </div>`);


        $(".btn-3").click(function () {

            let details = [];
            $.each($("input[name='item']:checked"), function () {

                let pizzaType = $(this).next("label").text()
                let siblings = $(this).siblings();
                let pizzaPrice = $(siblings[1].lastElementChild).clone().children().remove().end().text();
                var pizzaDetails = {}
                pizzaDetails["pizzaType"] = pizzaType;
                pizzaDetails["pizzaPrice"] = pizzaPrice;

                details.push(pizzaDetails)    //Pushing the selected orders into array.

            });
            let timestamp = new Date().getUTCMilliseconds();
            orders.orderId = timestamp;
            orders.orders = details;

            $.get("/get", { msg: "Order now" }).then(getResponse);
        });

}
function deliveryDetails(deliveryAddress) {

    console.log("------IN DELIVERY DETAILS------")
    orders.addressLocation = deliveryAddress;   // Adding the House Address.
    console.log(orders);

        $.ajax({
            url: '/insertDb',
            data: JSON.stringify(orders),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                console.log("----IN AJAXX-----")
                console.log(data)

                $.get("/get", { msg: "Valid" }).then(getResponse);
            },
            error: function (error) {
                console.log(error);
            }
        });

}
function msgString() {
    console.log("Promises are working!")

}




