# 📘 MoodDiaryBot

Telegram бот для отслеживания настроения, созданный на основе Grammy.js и PostgreSQL который помогает вести дневник эмоций.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Grammy](https://img.shields.io/badge/Grammy-1.37-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

## ✨ Возможности

- 📊 **Ежедневное записи настроения** 
- 🏷️ **Категоризация активностей** 
- 💾 **История записей** 
- 📱 **Удобный интерфейс** 
- 🔒 **Конфиденциальность**

## 🛠️ Технологии

- **Backend**: Node.js + Grammy.js
- **База данных**: PostgreSQL
- **Сессии**: @grammyjs/storage-free
- **Меню**: @grammyjs/menu
- **Диалоги**: @grammyjs/conversations

## 🚀 Быстрый старт

### 1. Клонирование и установка
```
git clone https://github.com/quantumlgm/mood-diary-bot
cd mood-diary-bot
npm install 
```
### 2. Настройка окружения

Создайте файл `.env` в корне проекта:

```
BOT_KEY=your_telegram_bot_token_here
DB_USER_NAME=your_db_username
DB_HOST=localhost
DB_DATABASE=mooddiary
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### 3. Инициализация базы данных

```
npm run created-table
```

### 4. Запуск
```
npm run nodemon
```

## 🎮 Использование

### Основные команды:

- `/start` - Запустить бота и показать приветствие
- `/menu` - Открыть главное меню
- `/help` - Открыть меню помощи
- `/create` - Создать новую запись о настроении
- `/history` - Просмотреть историю записей

### Процесс создания записи:

1. **Выбор настроения**: 😣 🙁 😐 🙂 😃  
2. **Выбор активностей** по категориям:  
   - 🏖️ Отдых и забота о себе  
   - 💼 Работа и учеба  
   - 👥 Общение и социум  
3. **Выбор эмоций**:  
   - ❤️ Эмоции любви 
   - 😊 Эмоции радости 
   - 😠 Эмоции злости 
4. **Комментарий дня** - свободная заметка
5. **Подтверждение** сохранения записи

## 📁 Структура проекта
```
src/
├── modules/
│   ├── keyboards.js          # Клавиатуры
│   ├── commands.js           # Команды
│   ├── handlers.js           # Обработчики
│   ├── text-templates.js     # Текстовые шаблоны
│   └── commands-menu.js      # Меню команд
├── db-operations/
│   ├── db.js                 # Подключение к БД
│   ├── request-templates.js  # SQL запросы
│   └── created-table.js      # Создание таблицы
├── main-menu.js              # Меню
├── create-note.js            # Создания записи
└── index.js                  # Запуск бота
```

## 🌐 Развертывание

### Локальная разработка

1. Установите PostgreSQL  
2. Создайте базу данных  
3. Настройте `.env` файл  
4. Запустите миграции: `npm run created-table`  
5. Запустите бота: `npm run nodemon`

### Production окружение

Рекомендуемые платформы:  
- **Heroku** с PostgreSQL аддоном  

## 📞 Поддержка

Если у вас есть вопросы или предложения:  
- Создайте [Issue](https://github.com/quantumlgm/mood-diary-bot/issues)  
- Напишите в Telegram: [@quantumlgm](https://t.me/quantumlgm)  
---
⭐ Если проект вам понравился, не забудьте поставить звезду!
