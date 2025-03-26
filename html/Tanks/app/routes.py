from flask import render_template
from app import app
import json
import os

# Функция загрузки данных из JSON-файла
def load_tanks_data():
    # Убедимся, что путь к tanks.json указан правильно
    json_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tanks.json')

    if not os.path.exists(json_path):
        raise FileNotFoundError(f"Файл {json_path} не найден")

    with open(json_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    return data['tanks']

# Удаляем дублирующийся маршрут, если он уже есть
if 'tank_details' in app.view_functions:
    app.view_functions.pop('tank_details')

@app.route('/tanks/<int:tank_id>')
def tank_details(tank_id):
    tanks = load_tanks_data()
    tank = next((tank for tank in tanks if tank['id'] == tank_id), None)

    if not tank:
        return "Танк не найден", 404

    return render_template('tank.html', tank=tank)