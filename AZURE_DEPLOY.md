# Azure'a Manuel Deploy Adımları

## ⚠️ ÖNEMLİ: Azure'da Bölge Kısıtlaması Hatası

Eğer "InvalidTemplateDeployment" hatası alıyorsanız:
- Aboneliğiniz West Europe'da kaynak oluşturmayı engelliyor
- ÇÖZÜM: Farklı bir bölge seçin (East US, Southeast Asia, vb.)

## 1. Azure CLI Kurulumu

Azure CLI'yi kurun (eğer yüklü değilse):

**Windows için:**
```powershell
# Chocolatey ile
choco install azure-cli

# veya MSI installer ile
# https://aka.ms/installazurecliwindows adresinden indirin
```

## 2. Azure'a Giriş Yap

```powershell
az login
```

Tarayıcı açılacak, Microsoft hesabınızla giriş yapın.

## 3. Azure App Service Oluştur

```powershell
# Resource group oluştur
az group create --name addressbook-rg --location westeurope

# App Service plan oluştur (ücretsiz tier)
az appservice plan create --name addressbook-plan --resource-group addressbook-rg --sku FREE --is-linux

# Web app oluştur
az webapp create --resource-group addressbook-rg --plan addressbook-plan --name addressbook-api --runtime "NODE:22-lts"
```

**ÖNEMLİ:** `addressbook-api` yerine kendi benzersiz isminizi yazın (Azure'da benzersiz olmalı).

## 4. Web App Ayarlarını Yap

```powershell
# Node.js versiyonunu ayarla
az webapp config appsettings set --resource-group addressbook-rg --name addressbook-api --settings WEBSITE_NODE_DEFAULT_VERSION="~22"

# Port ayarını yap (Azure otomatik PORT env variable set eder)
az webapp config appsettings set --resource-group addressbook-rg --name addressbook-api --settings PORT=8080

# Start command ekle
az webapp config set --resource-group addressbook-rg --name addressbook-api --startup-file "node server.js"
```

## 5. Deploy Et

```powershell
# Deploy için ZIP oluştur
npm run build  # veya compress-all

# Manuel ZIP oluştur
# node_modules hariç tüm dosyaları ZIP'leyin
# ZIP dosyasını şu şekilde deploy edin:

az webapp deployment source config-zip --resource-group addressbook-rg --name addressbook-api --src deploy.zip
```

**VEYA daha kolay yöntem:**

```powershell
# Local Git kullanarak
az webapp deployment source config-local-git --name addressbook-api --resource-group addressbook-rg

# Git URL'ini alın ve:
git remote add azure <URL>
git push azure main
```

## 6. Logları İzle

```powershell
az webapp log tail --resource-group addressbook-rg --name addressbook-api
```

## Alternatif: GitHub ile Deploy

### GitHub Repository Oluştur

```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADI/address-book-api.git
git push -u origin main
```

### Azure Portal'dan GitHub Connection

1. Azure Portal'a gidin (portal.azure.com)
2. Web App'inizi seçin
3. "Deployment Center" sekmesine tıklayın
4. "GitHub" seçin
5. Repository'nizi seçin
6. Main branch'i seçin
7. Save'e tıklayın

Azure otomatik olarak her push'ta deploy edecek!

## Test

Deploy tamamlandıktan sonra:

```
https://addressbook-api.azurewebsites.net
```

Sizin özel domain adresiniz `https://<webapp-name>.azurewebsites.net` formatında olacak.

## Troubleshooting

Eğer uygulama çalışmazsa:

```powershell
# Logları kontrol et
az webapp log download --resource-group addressbook-rg --name addressbook-api --log-file log.zip

# Uygulama ayarlarını kontrol et
az webapp config appsettings list --resource-group addressbook-rg --name addressbook-api
```

