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
    text = inner_soup.find('div', {'class': 'content-markdown'})
    text = inner_soup.find('p')
    name = inner_soup.find('div', {'class': 'game-unit_name'})
    img = inner_soup.find('img', {'class': 'game-unit_template-image'})

    # получаем ссылку на картинку
    if img:
        img = img['src']
    else:
        img = inner_soup.find('a', {'class': 'game-unit_cover-item'})['href']

    return (name.get_text(), text.get_text(), img)

# создание файлов с танками и сохранение данных в базу данных
def create_data_base(urls, country):
    """
    Функция получает название танка(переменная tank_text), информацию о танке(переменная text) и
    ссылку на картинку(переменная img) из функции clear_text().

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
        tank_name, text, img = clear_text(url)
        tank_name = tank_name.replace('/', '-').replace('"', '').replace('\xa0', ' ').lstrip('◔␙␠␗▃▅▄▄▂▄▀▄◊')

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
            # Устанавливаем соединение
            conn_params = {
                'dbname': 'postgres',
                'user': 'postgres',
                'password': 'admin',
                'host': 'localhost',  # или IP-адрес сервера
                'port': 5432          # порт по умолчанию для PostgreSQL
            }
            pdo = psycopg2.connect(**conn_params)

            # Создаем курсор
            cursor = pdo.cursor()
            # SQL-запрос для вставки данных
            sql = "INSERT INTO tanks (nametank, image_url) VALUES (%s, %s)"

            # Данные для вставки
            data = (tank_name, img)

            # Выполняем запрос
            cursor.execute(sql, data)

            # Фиксируем изменения в базе данных
            pdo.commit()

            # Пример выполнения SELECT-запроса для проверки данных
            cursor.execute("SELECT * FROM tanks")
            result = cursor.fetchall()
            src = []
            # Выводим результаты
            for row in result:
                src = row
            print(src)


        except psycopg2.Error as e:
            print(f"Ошибка подключения к базе данных: {e}")
# получаем ссылки, которые ведут на страницы с информацией о танках
def get_all_url(soup, country):
    # находим раздел с танками определенной нации по атрибуту(нации)
    s = soup.find(attrs={'data-tree-id': country})

    # тут будут все найденные адреса
    urls = []

    # перебираем все теги ссылок, которые есть в разделе
    for tag in s.select('td:has(a)'):
        # создаем полный путь до страницы
        url = 'https://wiki.warthunder.ru/' + tag.find('a')['href']
        if url not in urls:
            urls.append(url)

    return urls


# теги
countries_attrs = ['ussr']

# нации для папок
countries = ['СССР']

# получаем исходный код страницы
html_code = str(urlopen('https://wiki.warthunder.ru/ground').read(), 'utf-8')
# отправляем исходный код страницы на обработку в библиотеку
soup = BeautifulSoup(html_code, 'html.parser')


for country_attr, country in zip(countries_attrs, countries):
    urls = get_all_url(soup, country_attr)
    create_data_base(urls, country)
