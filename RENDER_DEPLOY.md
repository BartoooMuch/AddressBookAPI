# Render'a Deploy (EN KOLAY YOL)

Azure sizin için çok karmaşık oldu. Render çok daha basit! 💪

## Adımlar:

### 1. GitHub'a Push Yap

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/address-book-api.git
git push -u origin main
```

### 2. Render'a Kayıt Ol

1. https://render.com adresine gidin
2. "Get started for free" tıklayın
3. GitHub ile giriş yapın

### 3. Yeni Web Service Oluştur

1. "New" → "Web Service"
2. GitHub repo'nuzu seçin
3. Ayarlar:
   - **Name:** address-book-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
4. "Create Web Service" tıklayın

### 5 DAKİKA İÇİNDE HAZIR! 🚀

Render otomatik olarak deploy eder ve URL verir:
`https://address-book-api.onrender.com`

## Avantajları:

✅ Azure'dan çok daha kolay
✅ Ücretsiz plan
✅ Otomatik deploy
✅ GitHub bağlantısı ile otomatik güncelleme
✅ Sınırsız deploy

