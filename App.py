from flask import Flask, render_template, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer
from flask import redirect, url_for, session
from flask import jsonify

app = Flask(__name__)

english_bot = ChatBot("Chatterbot", storage_adapter="chatterbot.storage.SQLStorageAdapter")
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



@app.route("/")
def home():
    return render_template("index.html")

#Getting the User Response.
@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    print("-----------"+userText)       #User Input
    return str(english_bot.get_response(userText))   #order now

#Getting the desired order details.

@app.route("/insertDb", methods=['GET', 'POST'])
def insertDb():
    data = request.json
    print(data)

    return jsonify(status="success")


if __name__ == "__main__":
    app.run()