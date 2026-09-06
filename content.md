> MainCard 主視覺文案（greeting / role / tagline / cta / window.title）刻意保留英文，作為全站視覺語言；About / Home / Contact / Projects 的 PixelWindow 標題亦保留英文；其餘頁面隨 locale 切換。

| key 建議 | 原文 | 檔案位置 | 分類 A/B/C/D | 備註 |

| nav.home | 首頁 | NavBar | A |
| nav.about | 關於我 | NavBar | A |
| nav.projects | 我的作品 | NavBar | A |
| nav.contact | 聯絡我 | NavBar | A |
| nav.aria.navigateTo | 導航到{page}頁面 | NavBar | A | 插值，page用nav.\* |
| nav.aria.goTo | 前往{page} | NavBar | A | 同上 |

| home.avatar.alt | Cherry 的像素風頭像 | MainCard | A |
| theme.name.pinkBlue | 粉藍 | MainCard | A | 對應pink-blue theme id |
| theme.name.pinkPurple | 粉紫 | MainCard | A | 對應pink-purple theme id |
| home.aria.switchTheme | 切換到{themeName}主題 | MainCard | A | themeName來自上面 |
| home.title.switchTheme | 點擊切換主題 | MainCard | A |
| home.intro.greeting | Hi, I'm Cherry. | MainCard | B |
| home.intro.role | Frontend Developer | MainCard | B |
| home.intro.tagline | Building modern, accessible and interactive web experiences. | MainCard | B |
| home.cta.play | Press Play | MainCard | B | fixed-en ; clicked === false |
| home.cta.welcome | Welcome | MainCard | B | fixed-en ; clicked === true |
| home.window.title | Welcome to my world! | MainCard | B |

| about.window.title | About Cherry | About | B | fixed-en |
| about.intro.heading | 嗨！我是 Cherry 🍒 | About | A |
| about.intro.body | 你好，我是來自台灣的前端工程師，熱衷於打造兼具美感與良好使用體驗的網頁介面。我主要使用React、JavaScript、Tailwind CSS 與 Framer Motion 開發互動式網站，重視響應式設計、細節打磨與流暢的使用者體驗，並持續學習現代前端技術與設計思維。我喜歡將前端開發結合視覺設計，從像素藝術、復古遊戲介面到現代產品設計中汲取靈感，期望透過細膩的互動與設計，打造兼具功能性與溫度的數位體驗。✨ | About | A |
| about.skills.title | 技能狀態欄 | About | A |
| about.profile.title | 關於我的小檔案 | About | A |
| about.profile.interests | 興趣：看漫畫/動畫/遊戲直播、聽音樂 | About | A |
| about.profile.inspiration | 靈感來源：復古像素風 UI、粉色系 | About | A |
| about.profile.goal | 目前目標：製作habit dashboard | About | A |
| about.profile.aspiration | 期許自己能持續精進前端技術，打造兼具美感、互動性與使用者體驗的 Web 產品。 | About | A |
| about.contactPrompt | 有什麼想要問我的嗎？請到 {link} 頁面留言吧！💌 | About | A | 一個 key + 插值，link 複用 nav.contact |
| about.easterEgg.aria | 觸發愛心煙火彩蛋 | About | A |
| about.easterEgg.title | 點我看愛心煙火！ | About | A |

| contact.window.title | To: Cherry | Contact | B | fixed-en |

# labels

| contact.form.label.name | 你的姓名: | Contact | A |
| contact.form.label.email | 你的電子郵件地址: | Contact | A |
| contact.form.label.message | 訊息: | Contact | A |

# errors

| contact.form.errors.nameRequired | 請輸入姓名 | Contact | A | 空值 |
| contact.form.errors.emailRequired | 請輸入 Email | Contact | A | 空值 |
| contact.form.errors.emailInvalid | 請輸入有效的 Email | Contact | A | 格式錯誤 |
| contact.form.errors.messageRequired | 請輸入訊息 | Contact | A | 空值 |
| contact.form.errors.config | 伺服器配置錯誤，請稍後再試！ | Contact | A | env缺失 |
| contact.form.errors.submitFailed | 訊息傳送失敗，請再試一次。 | Contact | A | EmailJS catch |

# success

| contact.form.success.withName | {name}, Cherry 已收到你的訊息！<3 | Contact | A | （{name} 插值）；注意成功後 form 會被清空，目前 UI 幾乎走 withoutName |
| contact.form.success.withoutName | Cherry 已收到你的訊息！<3 | Contact | A | 無名字時 |
| contact.form.success.backupHint | 請檢查你的電子信箱以獲取訊息備份。 | Contact | A | 第二行 |

# links

| contact.link.gmail | Gmail/bubibuuu | Contact | B | fixed-en |
| contact.link.github | github/hihicherry | Contact | B | fixed-en |
| contact.link.gmailAria | 寄送電子郵件給 Cherry | Contact | A |
| contact.link.gmailTitle | 寄email給我 | Contact | A |
| contact.link.githubAria | 訪問 Cherry 的 GitHub 頁面 | Contact | A |
| contact.link.githubTitle | 拜訪我的GitHub | Contact | A |

# buttons

| contact.form.button.submit | 送出 | Contact | A |
| contact.form.button.clear | 清除 | Contact | A |

# a11y

| contact.form.aria.name | 請輸入你的姓名 | Contact | A |
| contact.form.aria.email | 請輸入你的電子郵件地址 | Contact | A |
| contact.form.aria.message | 請輸入你要傳送的訊息 | Contact | A |
| contact.form.aria.submit | 傳送表單 | Contact | A |
| contact.form.title.submit | 送出訊息 | Contact | A |
| contact.form.aria.clear | 清除聯繫表單 | Contact | A |
| contact.form.title.clear | 清除表單 | Contact | A |

| projects.window.title | Cherry's Projects | Projects | B | fixed-en |

| projects.items.movieSearch.title | 電影查詢網站 | Projects | A |
| projects.items.movieSearch.description | 一個使用 TypeScript 和 React 構建的現代化網站，支援查詢電影與電視劇資訊，並提供「加入我的最愛」功能，資料透過 LocalStorage 持久化儲存，確保類型安全與優質使用者體驗。 | Projects | A |
| projects.items.retroTodo.title | 復古待辦清單 | Projects | A |
| projects.items.retroTodo.description | 像素風待辦事項應用，支援拖放排序、本地儲存和響應式設計，融入愛心動畫提升互動性。 | Projects | A |

| projects.button.demo | Demo | Projects | B | fixed-en |
| projects.button.source | Source | Projects | B | fixed-en |
| projects.aria.viewDemo | 查看 {title} 的線上演示 | Projects | A | title來自各item |
| projects.title.viewDemo | 查看 {title} 演示 | Projects | A |
| projects.aria.viewSource | 查看 {title} 的原始碼 | Projects | A |
| projects.title.viewSource | 查看 {title} 原始碼 | Projects | A |

| projects.easterEgg.aria | 觸發愛心煙火彩蛋 | Projects | A |
| projects.easterEgg.title | 點我有驚喜！ | Projects | A |

| common.window.aria.openWindow | 開啟 {title} 視窗 | PixelWindow | A |
| common.window.title.openWindow | 開啟 {title} | PixelWindow | A |
| common.window.aria.closeWindow | 關閉 {title} 視窗 | PixelWindow | A |
| common.window.title.closeWindow | 關閉 {title} | PixelWindow | A |

# 備註

stable id：home | about | projects | contact
projects slug：movieSearch | retroTodo
