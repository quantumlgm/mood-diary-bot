<div align="center">

<h1>Emolog</h1>

**Телеграм-бот для отслеживания ежедневного настроения и эмоций**

[![Grammy.js](https://img.shields.io/badge/Framework-Grammy.js-4A90E2?style=flat-square&logo=telegram&logoColor=white)](https://grammy.dev/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<p align="center">
    Инструмент для создания регулярного дневника эмоций. Контейнеризированное приложение с пошаговыми сценариями диалогов, категоризацией активностей и детальной аналитикой эмоциональных паттернов.
</p>

</div>

## Особенности
* **Ежедневное логирование**: Быстрый ввод настроения с помощью шкал из эмодзи.
* **Отслеживание активности**: Категоризация того, что повлияло на ваше настроение (Забота о себе, Работа, Общение).
* **Тегирование эмоций**: Детальное сопоставление конкретных чувств (Радость, Гнев, Любовь).
* **История записей**: Просмотр прошлых логов для выявления эмоциональных паттернов..
* **Кастомные заметки**: Добавление текстовых комментариев к любой записи.

## Стек технологий
* **Среда выполнения**: Node.js 18+
* **Фреймворк**: Grammy.js
* **База данных**: PostgreSQL
* **Управление состоянием**: @grammyjs/conversations & @grammyjs/storage-free

## С чего начать

### 1. Установка
```bash
git clone [https://github.com/quantumlgm/mood-diary-bot](https://github.com/quantumlgm/mood-diary-bot)
cd mood-diary-bot
npm install
```

### 2. Настройка окружения
Создайте файл .env в корневой директории и заполните ваши данные: токен телеграм-бота, имя пользователя базы данных, хост, название базы данных, пароль и порт.
```bash
BOT_KEY=your_telegram_bot_token
DB_USER_NAME=your_db_username
DB_HOST=localhost
DB_DATABASE=mooddiary
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### 3. Инициализация базы данных
```bash
npm run created-table
```

### 4. Разработка
Запустите бота с помощью nodemon
```bash
npm run nodemon
```

## Команды бота
* /start - Инициализация бота и приветственное сообщение.
* /menu - Открыть главное навигационное меню.
* /create - Начать новую запись настроения.
* /history - Посмотреть предыдущие логи.
* /help - Поддержка и обзор команд.

## Структура проекта
* src/modules/ - Хендлеры, клавиатуры и логика команд.
* src/db-operations/ - Подключение к базе данных и SQL-шаблоны.
* src/create-note.js - Сценарий диалога (flow) для создания новых записей.
* src/index.js - Главная точка входа в приложение.

## Развертывание
Бот готов к локальному развертыванию или хостингу на платформах вроде Heroku (с надстройкой PostgreSQL). Убедитесь, что все переменные окружения правильно заданы в ваших продакшн-настройках.

## Контакты
Проблемы и баги: GitHub Issues
Разработчик: @quantumlgm
