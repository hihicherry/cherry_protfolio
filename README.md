# Cherry Portfolio

個人作品集網站：復古像素風介面，展示自我介紹、精選專案與聯絡表單。

**線上預覽：** [https://hihicherry.github.io/cherry_protfolio](https://hihicherry.github.io/cherry_protfolio)

## 功能

- **Home**：像素風主視覺、主題切換（粉紫／粉藍）
- **About**：自我介紹、依分類上色的技能 chips、彩蛋互動
- **Projects**：專案卡片（Demo／Source）、技術標籤
- **Contact**：EmailJS 聯絡表單（送出狀態、錯誤提示）
- 全站共用粒子／愛心特效（`usePageEffects`）；支援 `prefers-reduced-motion` 減少動態
- GitHub Pages SPA：Router `basename` 對齊 Vite `base`，build 時複製 `404.html` 支援深連結重整

## 技術棧

| 類別 | 使用 |
|------|------|
| 框架 | React 19、Vite 6（漸進 TypeScript：`src/data`、ThemeContext） |
| 路由 | React Router 7 |
| 樣式 | Tailwind CSS 3、自訂像素風 CSS／動畫 |
| 狀態 | React Context（主題，TypeScript） |
| 聯絡 | EmailJS（`@emailjs/browser`） |
| 部署 | GitHub Actions → GitHub Pages（[Vite 官方流程](https://vitejs.dev/guide/static-deploy.html#github-pages)） |

> 本站動畫以 CSS 與自寫特效為主，未使用 Framer Motion。

## 專案結構（精簡）

```
src/
  data/           # 型別化內容資料（projects、skills、contact、theme）
  pages/          # Home、About、Projects、Contact
  components/     # PixelWindow、NavBar、PageParticles、PageHearts…
  contexts/       # ThemeContext（TS）
  hooks/          # usePageEffects、usePrefersReducedMotion
```

## 開始使用

### 需求

- Node.js（建議 LTS）
- npm

### 安裝與開發

```bash
npm install
npm run dev
```

### 環境變數

聯絡表單需設定 EmailJS 相關變數（參考專案根目錄 `.env`，勿將密鑰提交至 Git）：

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

### 常用指令

```bash
npm run dev       # 本機開發
npm run build     # 產出 dist，並複製 404.html
npm run preview   # 預覽正式建置
npm run lint      # ESLint（含 TypeScript 規則）
npm run typecheck # TypeScript 型別檢查（漸進：allowJs）
```

## 部署說明

- Vite `base` 設為 `/cherry_protfolio/`（對應 repo 名稱）
- `build` 會執行 `cp dist/index.html dist/404.html`，讓 GitHub Pages 深連結可回到 SPA
- 推送至 `main`（或於 Actions 手動觸發）會執行 `.github/workflows/deploy.yml` 自動建置並部署
- Repo 設定：Settings → Pages → Build and deployment → Source 選 **GitHub Actions**
- Contact 表單：於 Settings → Secrets and variables → Actions 新增
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

## 授權

私人作品集專案（`private`）。
