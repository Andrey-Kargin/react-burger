# 🍔 React Stellar Burger

Интерактивный конструктор бургеров с Drag & Drop, модальными окнами и интеграцией с API. Проект создан в рамках обучения на Яндекс Практикуме.

<p align="left">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-2.x-764abc?logo=redux" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript" />
  <img src="https://img.shields.io/badge/Webpack-5-8dd6f9?logo=webpack" />
  <img src="https://img.shields.io/badge/Jest-29-C21325?logo=jest" />
  <img src="https://img.shields.io/badge/Cypress-14-00bcd4?logo=cypress" />
</p>

---

## ✨ Функциональность

- **Конструктор бургеров**: drag & drop ингредиентов, счётчики, подсчёт цены  
- **Модалки**: детали ингредиента, оформление заказа  
- **Аутентификация**: регистрация/логин/выход, защищённые маршруты `/profile`, обновление токена  
- **Восстановление доступа**: `/forgot-password` → `/reset-password` (защита прямого входа)  
- **Роутинг**: `react-router`, модальные маршруты `/ingredients/:id`, 404  
- **Интеграция с API**: получение ингредиентов, создание заказа, профиль пользователя  
- **Тестирование**: unit-тесты на **Jest**, e2e-сценарии в **Cypress**  
- **Деплой**: прод на **Nginx** (SPA + SSL), альтернативно **GitHub Pages**

---

## 🧰 Стек

- **React 18**, **React Router v6**
- **Redux Toolkit**, **Redux Thunk**
- **TypeScript**, **CSS Modules**, **Sass**
- **React DnD** (HTML5 backend)
- **Webpack 5**
- **Jest** (unit), **Cypress** (e2e)
- REST API: `https://norma.nomoreparties.space/api/`

---

## 🚀 Демо

- 🖥️ Продакшн (Nginx): **http://react.burgers.nomorepartiessbs.ru/**
- 📦 GitHub Pages: **https://andrey-kargin.github.io/react-burger/**

> На сервере включён SPA-роутинг и SSL (сертификат подключён). GH Pages настроен с поддержкой SPA через `404.html`.