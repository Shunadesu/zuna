# Vercel Deployment Guide

Hướng dẫn deploy frontend lên Vercel với proxy configuration.

## 📋 Prerequisites

- Vercel account (free tier available)
- Backend đã deploy và có URL
- GitHub repository (optional, recommended)

## 🚀 Deployment Steps

### Option 1: Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd frontend
vercel
```

4. **Follow prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## ⚙️ Configuration

### 1. Update `vercel.json`

Edit `vercel.json` and replace backend URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-domain.com/api/:path*"
    }
  ]
}
```

**Example:**
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.zunaweb.com/api/:path*"
    }
  ]
}
```

### 2. Environment Variables (Optional)

If you want to use direct API calls instead of proxy:

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-domain.com/api`
   - **Environment**: Production, Preview, Development

### 3. Build Settings

Vercel auto-detects Vite, but you can verify:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔄 How Proxy Works

### Development
```
Frontend (localhost:3000) 
  → Direct API call 
  → Backend (localhost:7777/api)
```

### Production (Vercel)
```
Frontend (your-app.vercel.app)
  → /api/* requests
  → Vercel Proxy
  → Backend (your-backend-domain.com/api)
```

### Benefits

✅ **No CORS issues** - Proxy handles CORS  
✅ **Simplified API calls** - Use `/api` instead of full URL  
✅ **Better security** - Hide backend URL  
✅ **Faster** - Vercel CDN caching  

## 📝 API Usage

The frontend automatically detects environment:

```javascript
// Development
baseURL: 'http://localhost:7777/api'

// Production (Vercel)
baseURL: '/api'  // Uses proxy
```

## 🔍 Testing

After deployment:

1. Visit your Vercel URL
2. Open browser DevTools → Network tab
3. Check API calls - they should go to `/api/*`
4. Verify responses are coming from backend

## 🐛 Troubleshooting

### Proxy not working?

1. Check `vercel.json` syntax
2. Verify backend URL is correct
3. Ensure backend allows requests from Vercel domain
4. Check Vercel deployment logs

### CORS errors?

- Backend CORS is already configured to allow all origins
- If still issues, check backend logs

### Build fails?

- Check `package.json` scripts
- Verify all dependencies are installed
- Check Vercel build logs

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Rewrites](https://vercel.com/docs/concepts/project-configuration/rewrites)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html#vercel)

