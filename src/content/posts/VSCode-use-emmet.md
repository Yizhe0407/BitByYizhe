---
title: "VSCode 使用 Emmet 自動展開教學"
description: "完整介紹如何在 VSCode 中設定和使用 Emmet 自動展開功能，包含啟用方法、常用縮寫語法、進階技巧與常見問題解決方案，讓前端開發效率翻倍提升。"
tags: ["vscode"]
date: "2025-08-24"
author: "Yizhe"
---

Emmet 是前端工程師必備利器，能讓你快速輸入縮寫、一鍵展開成完整 HTML/CSS 代碼。只要善用 Emmet，開發效率翻倍！

---

## 一、什麼是 Emmet？

Emmet 能幫你用簡短語法，快速生成複雜的 HTML、CSS 結構。例如輸入
```
div.text-xl
```
然後按 Tab 鍵，就能展開成
```
<div class="text-xl"></div>
```
省去大量手動輸入重複標籤。

---

## 二、如何在 VSCode 啟用 Emmet 自動展開

### 步驟一：確認 Emmet 內建

VSCode 已經內建 Emmet，不需要另外安裝，只要在 .html 或 .css 檔案就能用。

### 步驟二：設定展開鍵（Tab）

新版 VSCode 需要手動設定 Emmet 用 Tab 鍵展開：

1. 按下 `Ctrl + Shift + P` 打開命令選擇器
2. 輸入 `Open Settings (JSON)`，選擇「設定 (JSON)」進入設定檔
3. 加入下列設定：
   ```
   "emmet.triggerExpansionOnTab": true
   ```

### 步驟三：讓 JS/TS 也支援 Emmet

如果你是在 .js/.jsx/.ts/.tsx 檔案使用 Emmet，需加以下設定：
```
"emmet.includeLanguages": {
  "javascript": "javascriptreact",
  "typescript": "typescriptreact"
}
```
這樣在 JavaScript/TypeScript 中也能自動展開 Emmet。

---

## 三、常用 Emmet 縮寫語法

- div → <div></div>
- ul>li*3 → 建立 3 個 list 元素
- div#myId → 建立有 id 屬性的 div
- div.red.big → 建立有兩個 class 的 div
- input[disabled] → 有 disabled 屬性的 input
- a{點我} → <a>點我</a>

---

## 四、進階技巧&常見問題

- **Emmet 只在支援的語言模式生效**（如 HTML、CSS、JSX），
- **如果 Tab 沒反應？** 請確認上述的設定已加，並重啟 VSCode。
- **如果還是不行？** 可以將 `settings.json` 內容清空重設，重啟 VSCode。

---

## 五、常見 FAQ

**Q**：如何打開 settings.json？

**A**：按 Ctrl + Shift + P，輸入 Open Settings (JSON)，選擇後即可編輯。

**Q**：Emmet 可以用在 React (className) 嗎？

**Ａ**：Emmet 展開預設是 class，需用自訂 Snippet 實現 className。
