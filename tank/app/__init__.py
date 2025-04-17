from flask import Flask

app = Flask(__name__)

# Импортируем маршруты один раз
from app import routes
