from urllib.request import urlopen
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import psycopg2


# Получаем данные со страницы с информацией о танке
def clear_text(url):
    # получаем исходный код страницы
    inner_html_code = str(urlopen(url).read(), 'utf-8')
    # отправляем исходный код страницы на обработку в библиотеку
    inner_soup = BeautifulSoup(inner_html_code, 'html.parser')
    # получаем данные
    text = inner_soup.find('div', {'class': 'content-markdown'}).find('p').get_text()
    name = inner_soup.find('div', {'class': 'game-unit_name'}).get_text().replace('\xa0', ' ').lstrip('◔␙␠␗▃▅▄▄▂▄▀▄◊')
    img = inner_soup.find('img', {'class': 'game-unit_template-image'})

    # получаем ссылку на картинку
    if img:
        img = img['src']
    else:
        img = inner_soup.find('a', {'class': 'game-unit_cover-item'})['href']


    inner_soup = inner_soup.find('div', {'id': 'specification'})
    lst_blocks = inner_soup.find_all('div', {'class': 'block mb-3'})

    lst_values = lst_blocks[0].find_all('span', {'class': 'game-unit_chars-value'})
    hull_armor = lst_values[0].get_text().strip()
    turret_armor = lst_values[1].get_text().strip()
    crew = lst_values[3].get_text().strip()

    mobility = ''
    for i in lst_blocks[1].find_all('span', {'class': 'game-unit_chars-value'}):
        if i.find('span', {'class': 'show-char-rb'}) is not None:
            mobility += i.find('span', {'class': 'show-char-rb'}).get_text().strip()
        elif i.find('span', {'class': 'show-char-rb-mod-ref'}) is not None:
            mobility += i.find('span', {'class': 'show-char-rb-mod-ref'}).get_text().strip()
        else:
            mobility += i.get_text().strip()
        mobility += ' / '

    mobility = mobility.rstrip(' /т')

    inner_soup = inner_soup.find('table', {'class': 'game-unit_belt-list'})
    armament = inner_soup.find_all('td')[3].get_text()

    return (name, text, img, hull_armor, turret_armor, crew, mobility, armament)

# создание файлов с танками и сохранение данных в базу данных
def create_data_base(urls, country):
    """
    Функция получает:

    название танка (tank_text),
    информацию о танке (text),
    ссылку на картинку (img),
    бронирование корпуса (hull_armor) в формате: лоб / борт / корма,
    бронирование башни (turret_armor) в формате: лоб / борт / корма,
    экипаж (crew),
    данные о подвижности (mobility) в формате:
    максимальная скорость вперед / максимальная скорость назад / удельная мощность / мощносит двигателя / масса,
    бронепробитие основным снарядом на 100 метрах (armament)

    из функции clear_text().

    Далее идет закоментированный блок кода, который отвечает за создание файлов с танками.
    Если нужно создать файлы с танками, то создаем вручную папку data_base в корне проекта и в этой папке создаем папки
    с названиями стран и убираем коментарии у блока кода.

    После закоментированного блока кода можно сохранять данные(Переменные tank_name, text, img) в базу данных.

    :param urls: Список всех ссылок, которые ведут на страницы с информацией о каждом танке
    :param country: Название нации
    :return: Ничего не возращает
    """

    # перебираем ссылки, которые ведут на страницы с информацией о танках
    for url in urls:
        tank_name, text, img, hull_armor, turret_armor, crew, mobility, armament = clear_text(url)

        # try:
        #     with open(f'data_base/{country}/{tank_name}.txt', 'w') as file:
        #         file.write(text)
        # except OSError:
        #     print("Не удалось добавить танк: ", tank_name)

        # здесь можно сохранять данные в базу


        # Параметры подключения

        # Параметры подключения


        # Подключение к базе данных
        try:
            print("Успешное подключение к базе данных")
            # Устанавливаем соединение
            conn_params = {
                'dbname': 'tanks',
                'user': 'postgres',
                'password': 'admin',
                'host': 'localhost',  # или IP-адрес сервера
                'port': 5432          # порт по умолчанию для PostgreSQL
            }
            pdo = psycopg2.connect(**conn_params)

            # Создаем курсор
            cursor = pdo.cursor()
            #SQL-запрос для вставки данных
            sql = "INSERT INTO tanks (nametank, images_url, team, description, hull_armor, tower_armor, mobility) VALUES (%s,%s,%s,%s,%s,%s,%s)"

            # Данные для вставки
            data = (tank_name, img, crew, text, hull_armor, turret_armor, mobility)

            # Выполняем запрос
            cursor.execute(sql,data)

            # Фиксируем изменения в базе данных
            pdo.commit()

            # Пример выполнения SELECT-запроса для проверки данных
            cursor.execute("SELECT id,nametank,images_url FROM tanks")
            result = cursor.fetchall()
            src = []
            # Выводим результаты
            for row in result:
                src = row
            print(src)


        except psycopg2.Error as e:
            print(f"Ошибка подключения к базе данных: {e}")
            break


# получаем ссылки, которые ведут на страницы с информацией о танках
def get_all_url(soup, country):
    # находим раздел с танками определенной нации по атрибуту(нации)
    s = soup.find(attrs={'data-tree-id': country})

    # тут будут все найденные адреса
    urls = []

    lst_rank = s.find_all('tr', {'class': 'wt-tree_rank'})
    # перебираем все теги ссылок, которые есть в разделе до 5 ранга
    for i in range(4):
        s = lst_rank[i]
        for tag in s.select('td:has(a)'):
            # создаем полный путь до страницы
            url = 'https://wiki.warthunder.ru/' + tag.find('a')['href']
            if url not in urls:
                urls.append(url)

    return urls


# теги
# 'usa', 'germany', 'ussr', 'britain', 'japan', 'china', 'italy', 'france', 'sweden', 'israel'
countries_attrs = ['ussr']

# нации для папок
# 'США', 'Германия', 'СССР', 'Великобритания', 'Япония', 'Китай', 'Италия', 'Франция', 'Швеция', 'Израиль',
countries = ['СССР']

# получаем исходный код страницы
html_code = str(urlopen('https://wiki.warthunder.ru/ground').read(), 'utf-8')
# отправляем исходный код страницы на обработку в библиотеку
soup = BeautifulSoup(html_code, 'html.parser')


for country_attr, country in zip(countries_attrs, countries):
    urls = get_all_url(soup, country_attr)
    create_data_base(urls, country)
