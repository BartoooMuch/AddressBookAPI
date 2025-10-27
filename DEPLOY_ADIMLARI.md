# Azure Web App'e Deploy Adımları

Web app oluşturuldu! Şimdi kodu deploy edelim.

## Seçenek 1: Visual Studio Code Azure Extension (EN KOLAY)

### VS Code'da Azure Extension Kur
1. VS Code'da Extensions (Ctrl+Shift+X)
2. "Azure App Service" arat
3. Microsoft'un yayınladığı extension'ı kur

### Deploy
1. Sol tarafta Azure ikonu tıkla
2. Sign in (Azure portal ile aynı hesap)
3. WEB APP'inizin altında "Deploy" butonuna tıkla
4. Proje klasörünü seç
5. Deploy!

---

## Seçenek 2: Deployment Center (GitHub ile)

### GitHub'a Push
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI/address-book-api.git
git push -u origin main
```

### Azure Portal
1. Azure Portal → Web App'iniz
2. Sol menüden "Deployment Center" tıkla
3. Source: GitHub seç
4. Organization, Repository, Branch seç
5. "Save" tıkla

Azure otomatik deploy eder! Her push'ta yeniden deploy olur.

---

## Seçenek 3: Local Git (Terminal ile)

### Azure Portal
1. Web App → Deployment Center
2. "Local Git" seç
3. "Save" tıkla

### Git URL al
Deployment Center'da "Local Git Clone URI" kopyala

### Terminal
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add azure <KOPYALADIGINIZ_URL>
git push azure master
```

---

## Hangi yöntemi seçiyorsunuz?
- VS Code + Azure Extension (En kolay) ✅
- GitHub (Otomatik deploy) ✅
- Local Git + Terminal

