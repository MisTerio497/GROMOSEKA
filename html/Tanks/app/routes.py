from flask import Blueprint, request, render_template, jsonify
import json

bp = Blueprint('tanks', __name__)

# Загрузка данных о танках (примерная реализация)
@bp.route('/tanks', methods=['GET', 'POST'])
def tank_details():
    if request.method == 'POST':
        try:
            # Получаем данные из JSON запроса
            tank_data = request.get_json()
            
            if not tank_data:
                return jsonify({"error": "No data provided"}), 400
            
            # Здесь можно добавить валидацию данных
            if 'nametank' not in tank_data:
                return jsonify({"error": "Invalid tank data"}), 400
            
            # Для демонстрации просто рендерим шаблон с полученными данными
            return render_template('tank.html', tank=tank_data)
            
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    elif request.method == 'GET':
        # Обработка GET запроса (если нужно)
        # Можно вернуть форму или перенаправить
        return render_template('tank_search.html')