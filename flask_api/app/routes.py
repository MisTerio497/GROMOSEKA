from flask import render_template, url_for
from app import app
import json
import os

@app.route('/')
def main_page():
    return render_template("index.html")
