const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('🚀 Запускаю браузер...');
  
  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'ru-RU',
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();

  // Маскировка
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    });
    window.chrome = {
      runtime: {}
    };
  });

  console.log('📄 Пробую загрузить сайт...');
  
  try {
    await page.goto('https://kosgos.ru/external/op_info.php', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    console.log('✅ Сайт загружен');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.log('⚠️ Ошибка загрузки:', error.message);
  }

  // Делаем скриншот для диагностики
  await page.screenshot({ path: 'screenshot.png' });
  console.log('📸 Скриншот сохранён в screenshot.png');

  console.log('🔍 Собираю данные...');
  
  // ИСПРАВЛЕННЫЙ КОД - ссылки ТОЛЬКО внутри текущей ячейки
  const data = await page.evaluate(() => {
    try {
      // Получаем все таблицы
      const tables = Array.from(document.querySelectorAll('table')).map(table => {
        // Получаем все строки таблицы
        const rows = Array.from(table.querySelectorAll('tr')).map(tr => {
          // Получаем все ячейки в строке (и th, и td)
          const cells = Array.from(tr.querySelectorAll('td, th')).map(cell => {
            // ВАЖНО: ищем ссылки ТОЛЬКО внутри текущей ячейки!
            const links = Array.from(cell.querySelectorAll('a')).map(a => ({
              text: a.innerText.trim(),
              href: a.href
            }));
            
            return {
              text: cell.innerText.trim(),
              tag: cell.tagName,
              colspan: cell.getAttribute('colspan') || '1',
              rowspan: cell.getAttribute('rowspan') || '1',
              links: links // Только ссылки из этой ячейки!
            };
          });
          
          return { cells: cells };
        }).filter(row => row.cells.length > 0);
        
        return { rows: rows };
      }).filter(table => table.rows.length > 0);
      
      return {
        title: document.title,
        url: window.location.href,
        tables: tables,
        // Дополнительная информация для диагностики
        pageInfo: {
          hasTables: document.querySelectorAll('table').length,
          bodyLength: document.body?.innerText?.length || 0
        }
      };
    } catch (error) {
      return {
        error: error.message,
        title: document.title,
        url: window.location.href
      };
    }
  });

  if (data.error) {
    console.log('❌ Ошибка при парсинге:', data.error);
  } else {
    console.log('📊 Результат:');
    console.log('Заголовок страницы:', data.title);
    console.log('URL:', data.url);
    console.log('Найдено таблиц:', data.pageInfo.hasTables);
    console.log('Таблиц с данными:', data.tables.length);
    
    // Выводим первую таблицу для проверки
    if (data.tables.length > 0 && data.tables[0].rows.length > 0) {
      console.log('\n📋 Пример первой строки первой таблицы:');
      const firstRow = data.tables[0].rows[0];
      firstRow.cells.forEach((cell, idx) => {
        console.log(`  Ячейка ${idx + 1}: ${cell.text.substring(0, 50)}...`);
        if (cell.links.length > 0) {
          console.log(`    Ссылки в ячейке: ${cell.links.length}`);
          cell.links.forEach(link => {
            console.log(`      - ${link.text} -> ${link.href}`);
          });
        }
      });
    }
  }

  // Сохраняем результат
  fs.writeFileSync('result.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('\n💾 Полный результат сохранён в result.json');
  
  // Сохраняем HTML для анализа
  const html = await page.content();
  fs.writeFileSync('page.html', html, 'utf8');
  console.log('💾 HTML сохранён в page.html');

  console.log('\n👀 Браузер закроется через 10 секунд...');
  await page.waitForTimeout(10000);
  
  await browser.close();
  console.log('👋 Готово!');
})();