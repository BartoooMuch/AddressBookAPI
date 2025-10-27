# Address Book API

Bu proje, adres defteri yönetimi için basit bir REST API'dir. Express.js framework'ü kullanılarak geliştirilmiştir.

## Özellikler

- ✅ Contact'ları listeleme (GET)
- ✅ Contact arama (GET with search query)
- ✅ Yeni contact ekleme (POST)
- ✅ Contact güncelleme (PUT)
- ✅ Contact silme (DELETE)
- 📚 Swagger documentation
- 💾 In-memory database
- 🔍 Arama fonksiyonu (isim, email, telefon, tag)

## Kurulum

### 1. Paketleri yükle

```bash
npm install
```

### 2. Sunucuyu başlat

```bash
npm start
```

veya development modu için:

```bash
npm run dev
```

## API Endpoints

Server başladıktan sonra aşağıdaki adreslere erişebilirsiniz:

- **Ana API:** `http://localhost:3000`
- **Contact API:** `http://localhost:3000/api/contacts`
- **Swagger Docs:** `http://localhost:3000/api-docs`
- **Health Check:** `http://localhost:3000/health`

## API Kullanım Örnekleri

### Tüm contact'ları getir

```bash
GET http://localhost:3000/api/contacts
```

### Search

```bash
GET http://localhost:3000/api/contacts?search=turing
```

### ID ile contact getir

```bash
GET http://localhost:3000/api/contacts/1
```

### Yeni contact ekle

```bash
POST http://localhost:3000/api/contacts
Content-Type: application/json

{
  "firstName": "Albert",
  "lastName": "Einstein",
  "email": "albert.einstein@physics.com",
  "phone": "+1-555-0105",
  "tag": "Work"
}
```

### Contact güncelle

```bash
PUT http://localhost:3000/api/contacts/1
Content-Type: application/json

{
  "firstName": "Alan",
  "lastName": "Turing",
  "email": "alan.turing@computing.com",
  "phone": "+1-555-0101",
  "tag": "Friend"
}
```

### Contact sil

```bash
DELETE http://localhost:3000/api/contacts/1
```

## Deployment

Bu API'yi aşağıdaki servislere deploy edebilirsiniz:

- **Render:** https://render.com
- **Railway:** https://railway.app
- **Heroku:** https://heroku.com
- **Vercel:** https://vercel.com

### Render'a Deploy

1. GitHub'a push edin
2. Render'a yeni bir Web Service oluşturun
3. Environment variable ekleyin: `PORT=3000`
4. Deploy edin!

## Teknolojiler

- Node.js
- Express.js
- Swagger UI Express
- swagger-jsdoc

## Lisans

ISC

