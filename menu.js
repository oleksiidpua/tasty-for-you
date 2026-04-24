// ============================================================
//  МЕНЮ КАФЕ "TASTY FOR YOU"
// ============================================================
//  Як редагувати:
//    • Змінити ціну  → знайди страву, зміни число після price:
//    • Додати страву → скопіюй блок { name:..., price:... } і заміни дані
//    • Додати фото   → поклади файл у папку Files/ і вкажи назву після photo:
//    • Видалити страву → видали або закоментуй її рядки (// перед рядком)
// ============================================================

const MENU = [

  // ═══════════════════════════════════════════════
  //  ПІЦА / PIZZA
  // ═══════════════════════════════════════════════
  {
    id: "pizza",
    category: { uk: "🍕 Піца", en: "🍕 Pizza" },
    categoryPhoto: "Files/Піца.jpeg",
    items: [
      {
        name: { uk: "Піца 270 г", en: "Pizza 270g" },
        price: 80,
        note: { uk: "+ коробка 5 грн.", en: "+ box 5 UAH" },
        photo: null
      },
      {
        name: { uk: "Піца 630 г", en: "Pizza 630g" },
        price: 190,
        note: { uk: "+ коробка 10 грн.", en: "+ box 10 UAH" },
        photo: null
      }
    ],
    extras: {
      label: { uk: "Начинки на вибір (замовлення по телефону):", en: "Toppings of your choice (order by phone):" },
      list: {
        uk: ["Сир моцарела", "Баварські ковбаски", "Шинка", "Курка гриль", "Салямі", "Гриби шампіньйони", "Помідор", "Перець болгарський", "Маслини", "Оливки", "Кукурудза"],
        en: ["Mozzarella", "Bavarian sausages", "Ham", "Grilled chicken", "Salami", "Champignon mushrooms", "Tomato", "Bell pepper", "Black olives", "Green olives", "Corn"]
      }
    }
  },

  // ═══════════════════════════════════════════════
  //  ШАУРМА / SHAWARMA
  // ═══════════════════════════════════════════════
  {
    id: "shawarma",
    category: { uk: "🥙 Шаурма", en: "🥙 Shawarma" },
    categoryPhoto: "Files/Шаурма.jpeg",
    description: { uk: "Лаваш, соус, курка, капуста, морква по-корейськи, помідор", en: "Lavash, sauce, chicken, cabbage, Korean carrot, tomato" },
    items: [
      { name: { uk: "Шаурма звичайна  340 г", en: "Regular Shawarma  340g" }, price: 95,  photo: null },
      { name: { uk: "Шаурма середня   430 г", en: "Medium Shawarma  430g" }, price: 115, photo: null },
      { name: { uk: "Шаурма велика    530 г", en: "Large Shawarma   530g" }, price: 135, photo: null }
    ]
  },

  // ═══════════════════════════════════════════════
  //  ПАНІНІ / PANINI
  // ═══════════════════════════════════════════════
  {
    id: "panini",
    category: { uk: "🥪 Паніні", en: "🥪 Panini" },
    categoryPhoto: "Files/Паніні.jpeg",
    items: [
      { name: { uk: "Паніні з куркою",               en: "Panini with chicken"         }, price: 90, photo: null },
      { name: { uk: "Паніні з шинкою",               en: "Panini with ham"             }, price: 90, photo: null },
      { name: { uk: "Паніні з баварською ковбаскою", en: "Panini with Bavarian sausage"}, price: 90, photo: null }
    ]
  },

  // ═══════════════════════════════════════════════
  //  ХОТ-ДОГ / HOT DOG
  // ═══════════════════════════════════════════════
  {
    id: "hotdog",
    category: { uk: "🌭 Хот-дог", en: "🌭 Hot Dog" },
    categoryPhoto: "Files/Хот-дог французьский.jpeg",
    items: [
      {
        name:  { uk: "Французький хот-дог", en: "French Hot Dog" },
        price: 65,
        note:  { uk: "Молочна або копчена ковбаска", en: "Milk or smoked sausage" },
        photo: null
      },
      {
        name:  { uk: "Класичний хот-дог", en: "Classic Hot Dog" },
        price: 75,
        note:  { uk: "Ковбаска, капуста, морква по-корейськи", en: "Sausage, cabbage, Korean carrot" },
        photo: null
      }
    ]
  },

  // ═══════════════════════════════════════════════
  //  БАГЕТА / BAGUETTE
  // ═══════════════════════════════════════════════
  {
    id: "baguette",
    category: { uk: "🥖 Багета", en: "🥖 Baguette" },
    categoryPhoto: null,
    items: [
      {
        name:  { uk: "Багета з куркою", en: "Baguette with chicken" },
        price: 65,
        note:  { uk: "Багет, соус, курка, моцарела, помідор, морква по-корейськи", en: "Baguette, sauce, chicken, mozzarella, tomato, Korean carrot" },
        photo: null
      },
      {
        name:  { uk: "Багета з шинкою", en: "Baguette with ham" },
        price: 65,
        note:  { uk: "Багет, соус, шинка, моцарела, помідор", en: "Baguette, sauce, ham, mozzarella, tomato" },
        photo: null
      }
    ]
  },

  // ═══════════════════════════════════════════════
  //  БУРГЕР / BURGER
  // ═══════════════════════════════════════════════
  {
    id: "burger",
    category: { uk: "🍔 Бургер", en: "🍔 Burger" },
    categoryPhoto: "Files/Бургер в лаваші.jpeg",
    items: [
      {
        name:  { uk: "Бургер", en: "Burger" },
        price: 90,
        note:  { uk: "Булка, соус, куряча котлета, сир, помідор, маринований огірок, листя салату", en: "Bun, sauce, chicken patty, cheese, tomato, pickles, lettuce" },
        photo: null
      },
      {
        name:  { uk: "Бургер в лаваші", en: "Burger in Lavash" },
        price: 90,
        note:  { uk: "Тортилья, соус, куряча котлета, сир, помідор, огірок, листя салату", en: "Tortilla, sauce, chicken patty, cheese, tomato, cucumber, lettuce" },
        photo: "Files/Бургер в лаваші.jpeg"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  //  САЛАТИ / SALADS
  // ═══════════════════════════════════════════════
  {
    id: "salads",
    category: { uk: "🥗 Салати", en: "🥗 Salads" },
    categoryPhoto: null,
    items: [
      { name: { uk: "Віденський",          en: "Viennese"   }, price: null, note: { uk: "100 г – 38 грн. | Шинка, яйце, помідор, сир, салат, часниковий соус, сухарики",       en: "100g – 38 UAH | Ham, egg, tomato, cheese, lettuce, garlic sauce, croutons"      }, photo: null },
      { name: { uk: "Венський",            en: "Vienna"     }, price: null, note: { uk: "100 г – 38 грн. | Капуста, морква, шинка, горошок, салат, майонез",                   en: "100g – 38 UAH | Cabbage, carrot, ham, peas, lettuce, mayo"                       }, photo: null },
      { name: { uk: "Крабовий",            en: "Crab"       }, price: null, note: { uk: "100 г – 38 грн. | Крабові палички, яйце, кукурудза, зелена цибуля, майонез",          en: "100g – 38 UAH | Crab sticks, egg, corn, green onion, mayo"                       }, photo: null },
      { name: { uk: "Цезар",              en: "Caesar"     }, price: null, note: { uk: "100 г – 38 грн. | Курка, помідор, яйце, салат, часниковий соус, сир, сухарики",        en: "100g – 38 UAH | Chicken, tomato, egg, lettuce, garlic sauce, cheese, croutons"   }, photo: null },
      { name: { uk: "Ананас",              en: "Pineapple"  }, price: null, note: { uk: "100 г – 38 грн. | Курка, майонез, кукурудза, ананас, сир",                           en: "100g – 38 UAH | Chicken, mayo, corn, pineapple, cheese"                          }, photo: null },
      { name: { uk: "Екзотика",            en: "Exotic"     }, price: null, note: { uk: "100 г – 38 грн. | Курка, кукурудза, помідор, оливки, сир, майонез",                  en: "100g – 38 UAH | Chicken, corn, tomato, olives, cheese, mayo"                     }, photo: null },
      { name: { uk: "Свіжість",            en: "Freshness"  }, price: null, note: { uk: "100 г – 38 грн. | Капуста, огірок, салямі, кукурудза, майонез",                      en: "100g – 38 UAH | Cabbage, cucumber, salami, corn, mayo"                           }, photo: null },
      { name: { uk: "Салат з капусти",     en: "Cabbage"    }, price: null, note: { uk: "200 г – 45 грн. | Свіжа капуста, огірок, кріп, олія",                               en: "200g – 45 UAH | Fresh cabbage, cucumber, dill, oil"                             }, photo: null },
      { name: { uk: "Морква по-корейськи", en: "Korean Carrot"}, price: null, note: { uk: "200 г – 45 грн.",                                                                   en: "200g – 45 UAH"                                                                  }, photo: null }
    ]
  },

  // ═══════════════════════════════════════════════
  //  ПЕРШІ СТРАВИ / SOUPS
  // ═══════════════════════════════════════════════
  {
    id: "soups",
    category: { uk: "🍲 Перші страви", en: "🍲 Soups" },
    categoryPhoto: null,
    extras: {
      label: { uk: "Грінка до салату та перших страв – 5 грн.", en: "Crouton (for salad / soup) – 5 UAH" },
      list: null
    },
    items: [
      { name: { uk: "Суп з куркою  420 г",       en: "Chicken Soup  420g"     }, price: 55, note: { uk: "Курячий бульйон, м'ясо курки, вермішель, картопля, кріп", en: "Chicken broth, chicken, vermicelli, potato, dill" }, photo: null },
      { name: { uk: "Червоний борщ  420 г",       en: "Red Borscht  420g"      }, price: 70, note: null,                                                                                                                          photo: null },
      { name: { uk: "Солянка м'ясна  420 г",      en: "Meat Solyanka  420g"    }, price: 80, note: { uk: "Бульйон, 4 види ковбасок, картопля, кріп, маслини, лимон",  en: "Broth, 4 types of sausage, potato, dill, olives, lemon" }, photo: null },
      { name: { uk: "Курячий бульйон з яйцем 420 г", en: "Chicken Broth with Egg 420g" }, price: 35, note: null,                                                                                                                  photo: null }
    ]
  },

  // ═══════════════════════════════════════════════
  //  ГАРЯЧІ НАПОЇ / HOT DRINKS
  // ═══════════════════════════════════════════════
  {
    id: "hot-drinks",
    category: { uk: "☕ Гарячі напої", en: "☕ Hot Drinks" },
    categoryPhoto: null,
    items: [
      { name: { uk: "Еспресо",                  en: "Espresso"              }, price: 30, photo: null },
      { name: { uk: "Подвійне еспресо",          en: "Double Espresso"       }, price: 40, photo: null },
      { name: { uk: "Американо",                 en: "Americano"             }, price: 34, photo: null },
      { name: { uk: "Американо з молоком",       en: "Americano with Milk"   }, price: 38, photo: null },
      { name: { uk: "Капучино",                  en: "Cappuccino"            }, price: 58, photo: null },
      { name: { uk: "Лате 350 мл",              en: "Latte 350ml"           }, price: 55, photo: null },
      { name: { uk: "Лате 450 мл",              en: "Latte 450ml"           }, price: 68, photo: null },
      { name: { uk: "Флет-вайт",                en: "Flat White"            }, price: 60, photo: null },
      { name: { uk: "Чай (фільтр)",             en: "Tea (filter bag)"      }, price: 28, photo: null },
      { name: { uk: "Чай натуральний рідкий",    en: "Natural Leaf Tea"      }, price: 55, photo: null },
      { name: { uk: "Какао з маршмелоу",         en: "Cocoa with Marshmallow"}, price: 44, photo: null },
      { name: { uk: "Круасан з шоколадною начинкою", en: "Chocolate Croissant" }, price: 18, photo: null }
    ]
  },

  // ═══════════════════════════════════════════════
  //  ХОЛОДНІ НАПОЇ / COLD DRINKS
  // ═══════════════════════════════════════════════
  {
    id: "cold-drinks",
    category: { uk: "🧋 Холодні напої", en: "🧋 Cold Drinks" },
    categoryPhoto: null,
    items: [
      { name: { uk: "Айс-Лате",              en: "Iced Latte"          }, price: 60, photo: null },
      { name: { uk: "Фрапе",                 en: "Frappe"              }, price: 60, photo: null },
      { name: { uk: "Молочний коктейль",     en: "Milkshake"           }, price: 50, photo: null },
      { name: { uk: "Махіто",                en: "Mojito"              }, price: 50, photo: null },
      { name: { uk: "Капуорандж (Джміль)",   en: "Capuorange (Bumblebee)" }, price: 60, photo: null },
      { name: { uk: "Еспресо-тонік",         en: "Espresso Tonic"      }, price: 60, photo: null }
    ]
  },

  // ═══════════════════════════════════════════════
  //  ТІСТО ТА ОСНОВИ / DOUGH  (попереднє замовлення)
  // ═══════════════════════════════════════════════
  {
    id: "dough",
    category: { uk: "🫓 Тісто та основи", en: "🫓 Dough & Bases" },
    categoryPhoto: null,
    categoryNote: { uk: "⚠️ Попереднє замовлення", en: "⚠️ Pre-order only" },
    items: [
      { name: { uk: "Тісто для піци 1 кг",  en: "Pizza dough 1kg"  }, price: 95, photo: null },
      { name: { uk: "Основа для піци 30 см", en: "Pizza base 30cm"  }, price: 45, photo: null }
    ]
  }

];
