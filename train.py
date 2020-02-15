
from chatterbot.trainers import ListTrainer
from chatterbot import ChatBot
trainer = ListTrainer(chatbot)

trainer.train([
    "Hi there!",
    "Hello",
])

trainer.train([
    "Greetings!",
    "Hello",
])