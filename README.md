# Emolog — Telegram bot for tracking

A Telegram bot for tracking daily moods and emotions, built with Grammy.js and PostgreSQL. It helps users maintain a consistent emotional journal through an intuitive chat interface.

## Features
* **Daily Logging**: Quick mood entry with emoji scales.
* **Activity Tracking**: Categorize what influenced your mood (Self-care, Work, Social).
* **Emotion Tagging**: Detailed mapping of specific feelings (Joy, Anger, Love).
* **Entry History**: Review past logs to identify emotional patterns.
* **Custom Notes**: Add free-text comments to any entry.

## Tech Stack
* **Runtime**: Node.js 18+
* **Framework**: Grammy.js
* **Database**: PostgreSQL
* **State Management**: @grammyjs/conversations & @grammyjs/storage-free

## Getting Started

### 1. Installation
```bash
git clone [https://github.com/quantumlgm/mood-diary-bot](https://github.com/quantumlgm/mood-diary-bot)
cd mood-diary-bot
npm install
```
### 2. Environment Setup
Create a .env file in the root directory and fill in your credentials:
```bash
BOT_KEY=your_telegram_bot_token
DB_USER_NAME=your_db_username
DB_HOST=localhost
DB_DATABASE=mooddiary
DB_PASSWORD=your_db_password
DB_PORT=5432
```
### 3. Database Initialization
Run the following command to set up the required tables:

```bash
npm run created-table
```
### 4. Development
Launch the bot with nodemon for auto-reloading:

```bash
npm run nodemon
```
##Bot Commands
* /start - Initialize the bot and welcome message.

* /menu - Open the main navigation menu.

* /create - Start a new mood entry.

* /history - View previous logs.

* /help - Support and command overview.

## Project Structure
* src/modules/ — Handlers, keyboards, and command logic.

* src/db-operations/ — Database connection and SQL templates.

* src/create-note.js — Conversation flow for new entries.

* src/index.js — Main entry point.

## Deployment
The bot is ready for local deployment or hosting on platforms like Heroku (with the PostgreSQL add-on). Ensure all environment variables are correctly set in your production settings.

## Contact
* Issues: GitHub Issues

* Developer: @quantumlgm
