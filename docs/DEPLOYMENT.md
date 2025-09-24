# 部署指南

## 🚀 部署选项

### 1. Vercel 部署 (推荐)

#### 步骤 1: 准备项目

```bash
# 确保项目可以正常构建
pnpm build
```

#### 步骤 2: 连接 Vercel

1. 访问 [Vercel](https://vercel.com/)
2. 使用 GitHub 账号登录
3. 导入你的仓库
4. 配置环境变量：
   ```
   VITE_FAPIG_APP_KEY=your_api_key_here
   ```

#### 步骤 3: 自动部署

- Vercel 会自动检测到 Vite 项目
- 每次推送到 main 分支都会自动部署
- 支持预览部署 (Pull Request)

### 2. Netlify 部署

#### 步骤 1: 构建配置

创建 `netlify.toml` 文件：

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 步骤 2: 环境变量

在 Netlify 控制台设置：

```
VITE_FAPIG_APP_KEY=your_api_key_here
```

### 3. GitHub Pages 部署

#### 步骤 1: 安装 gh-pages

```bash
pnpm add -D gh-pages
```

#### 步骤 2: 配置 package.json

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/personality-test"
}
```

#### 步骤 3: 部署

```bash
pnpm build
pnpm deploy
```

### 4. 自托管部署

#### 使用 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 使用 Apache

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/dist

    <Directory /path/to/dist>
        AllowOverride All
        Require all granted
    </Directory>

    # SPA 路由支持
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
```

## 🔧 环境配置

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 生产环境

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📊 性能优化

### 1. 构建优化

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['axios', 'lodash-es'],
        },
      },
    },
  },
});
```

### 2. 资源优化

- 启用 gzip 压缩
- 配置 CDN 加速
- 优化图片资源
- 使用 WebP 格式

### 3. 缓存策略

```typescript
// 设置适当的缓存头
const cacheHeaders = {
  'Cache-Control': 'public, max-age=31536000',
  ETag: 'strong',
};
```

## 🔒 安全配置

### 1. HTTPS 配置

- 使用 Let's Encrypt 免费证书
- 配置 HTTP 到 HTTPS 重定向
- 设置 HSTS 头

### 2. 环境变量安全

- 不要在代码中硬编码 API 密钥
- 使用环境变量管理敏感信息
- 定期轮换 API 密钥

### 3. 内容安全策略

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';"
/>
```

## 📈 监控和分析

### 1. 性能监控

- 使用 Google Analytics
- 配置 Web Vitals 监控
- 设置错误追踪

### 2. 用户分析

- 页面访问统计
- 用户行为分析
- 转化率跟踪

## 🚨 故障排除

### 常见问题

#### 1. 构建失败

```bash
# 清理缓存
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 2. 路由问题

确保服务器配置了 SPA 路由支持：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### 3. API 请求失败

检查：

- API 密钥是否正确
- 网络连接是否正常
- CORS 配置是否正确

### 调试技巧

```bash
# 查看构建详情
pnpm build --debug

# 分析包大小
pnpm build --analyze
```

## 📝 部署检查清单

- [ ] 环境变量配置正确
- [ ] 构建成功无错误
- [ ] 路由功能正常
- [ ] API 接口可访问
- [ ] 移动端适配正常
- [ ] 性能指标达标
- [ ] 安全配置完整
- [ ] 监控系统就绪
