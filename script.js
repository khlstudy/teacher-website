document.addEventListener('DOMContentLoaded', () => {
  const allNodes = [];

  // Рекурсивний обхід DOM з фільтрацією порожніх текстових вузлів
  function traverse(node) {
    if (node) {
      // Пропускаємо порожні текстові вузли
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
        return;
      }

      allNodes.push(node);
      node = node.firstChild;
      while (node) {
        traverse(node);
        node = node.nextSibling;
      }
    }
  }

  // Обходимо DOM, починаючи з body
  traverse(document.body);

  let currentIndex = 0;

  // Функція для показу інформації про вузол і обробки дій користувача
  function showNodeContent(index, callbackNext, callbackBack) {
    if (index < 0 || index >= allNodes.length) {
      alert('Помилка навігації.');
      return;
    }

    const node = allNodes[index];
    let content = '';
    let classInfo = '';
    let parentTag = '';

    // Обробка вузлів
    if (node.nodeType === Node.ELEMENT_NODE) {
      content = `<${node.tagName.toLowerCase()}>`;
      classInfo = node.className ? ` (класи: ${node.className})` : '';
    } else if (node.nodeType === Node.TEXT_NODE) {
      const trimmedText = node.textContent.trim();
      content = `Текстовий вузол: "${trimmedText}"`;
      if (node.parentNode && node.parentNode.nodeType === Node.ELEMENT_NODE) {
        parentTag = ` (всередині: <${node.parentNode.tagName.toLowerCase()}>)`;
      }
    } else {
      content = `Вузол типу: ${node.nodeName}`;
    }

    // Формуємо повідомлення для користувача
    let message = `Вміст вузла: ${content}${classInfo}${parentTag}\n\n`;

    if (index === 0) {
      message += 'Просунутися до наступного вузла? (Так/Ні)';
    } else if (index === allNodes.length - 1) {
      message += 'Повернутися назад або вийти? (Назад/Вийти)';
    } else {
      message += 'Пройти далі чи повернутися? (Далі/Назад)';
    }

    const userChoice = prompt(message);

    if (userChoice === null) {
      return; // Якщо користувач закрив вікно, завершити
    }

    // Логіка навігації
    if (index === 0) {
      if (userChoice.toLowerCase() === 'так') {
        callbackNext();
      } else {
        alert('Завершення роботи.');
      }
    } else if (index === allNodes.length - 1) {
      if (userChoice.toLowerCase() === 'назад') {
        callbackBack();
      } else {
        alert('Завершення роботи.');
      }
    } else {
      if (userChoice.toLowerCase() === 'далі') {
        callbackNext();
      } else if (userChoice.toLowerCase() === 'назад') {
        callbackBack();
      } else {
        alert('Невідома команда. Завершення роботи.');
      }
    }
  }

  // Функція для управління навігацією
  function navigate(index) {
    showNodeContent(
      index,
      () => {
        if (index < allNodes.length - 1) {
          navigate(index + 1);
        } else {
          alert('Досягнуто кінця DOM-дерева.');
        }
      },
      () => {
        if (index > 0) {
          navigate(index - 1);
        } else {
          alert('Ви вже на початковому вузлі.');
        }
      }
    );
  }

  // Початок навігації
  navigate(currentIndex);
});
