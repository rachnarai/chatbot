from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer
from flask import redirect, url_for, session
from flask import jsonify

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mychatbot.db'
db = SQLAlchemy(app)

english_bot = ChatBot(
    "Chatterbot", storage_adapter="chatterbot.storage.SQLStorageAdapter")
trainer = ChatterBotCorpusTrainer(english_bot)
trainer.train("chatterbot.corpus.english")

trainer = ListTrainer(english_bot)

trainer.train([
    "Hi!",
    "Hello",
    "How are you?",
    "I'm good.",
    "That's good to hear.",
    "Thank you.",
    "Have a great day!",
    "Thanks."

])
trainer.train([
    "Nothing much. I want to eat a Pizza.",
    "Choose a Pizza from the list.",

])
trainer.train([
    "Pizza",
    "Choose a Pizza from the list.",
])
trainer.train([
    "I want to order a Pizza.",
    "Choose a Pizza from the list.",
    "Thanks",
    "Have a great day!",
    "Valid",
    "Your order will reach you soon shortly.",
    "Thanks",
    "Have a great day!"

])
trainer.train([
    "Order now",
    "Your order will reach fast to your door steps. Where Do you want us to deliver?",
    "Thanks",

])


class Customer(db.Model):
    cid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cname = db.Column(db.String(250), nullable=False)
    cmail = db.Column(db.String(250), unique=True, nullable=False)
    cmobile = db.Column(db.Integer, unique=True, nullable=False)
    caddress = db.Column(db.String(250), nullable=False)
    cpassword = db.Column(db.String(250), nullable=False)
    date_created = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())


class Orders(db.Model):
    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cid = db.Column(db.Integer, db.ForeignKey('customer.cid'), nullable=False)
    items = db.Column(db.String(250), nullable=False)
    tprice = db.Column(db.Integer, nullable=False)
    ostatus = db.Column(db.String(20), nullable=False)
    date_created = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())


db.create_all()


@app.route("/")
def home():
    return render_template("index.html")

# Getting the User Response.
@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    if "pizza" in userText:
        list_pizza = [{
            "id": "1",
            "name": "aaaa",
            "desc": 111,
            "price": 100
        }]
    # print("-----------"+userText)       #User Input
    return str(english_bot.get_response(userText))  # order now

# Getting the desired order details.


@app.route("/insertDb", methods=['GET', 'POST'])
def insertDb():
    data = request.json
    print(data)

    return jsonify(status="success")


@app.route("/order", methods=['POST'])
def order():
    data = request.json
    ostatus = "order placed"
    items = " ".join([pizza.get("pizzaType")
                      for pizza in data.get("orders", [])])
    price = sum([int(pizza.get("pizzaPrice", 0))
                 for pizza in data.get("orders", [])])
    orders = Orders(cid=1, items=items, tprice=price, ostatus=ostatus)

    if orders:
        db.session.add(orders)
        db.session.commit()
        return jsonify(status="success", order_id=orders.order_id)
    return jsonify(status="Failed")


@app.route("/track", methods=['GET', 'POST'])
def track_order():
    order_statuses = [
        "order placed", "cooking", "ready", "dispatched", "on the way", "delivered"
    ]
    order_id = request.args.get('order_id')
    message = ""
    import random
    order_status = random.choice(order_statuses)
    myorders = Orders.query.filter(order_id == order_id)
    if myorders.count() < 1:
        message = "No Order found with order id {}".format(order_id)
    else:
        order_status = myorders.first().ostatus

    return render_template("track_order.html", order_id=order_id, order_statuses=order_statuses, my_order=order_status, message=message)


if __name__ == "__main__":
    app.run()
