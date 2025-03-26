from flask import Flask

app = Flask(__name__)

def create_app():
    app = Flask(__name__)
    
    # Регистрируем blueprint с маршрутами
    from . import routes
    app.register_blueprint(routes.bp)
    
    return app