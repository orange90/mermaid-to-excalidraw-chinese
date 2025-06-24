# Mermaid to Excalidraw 部署指南

## 项目特色

本项目是 mermaid-to-excalidraw 的中文优化版本，特别支持**平方萌萌哒**中文手写字体，为您的图表提供更可爱的中文显示效果。

## 快速部署到 Vercel

### 方法一：CLI 部署（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel --prod
   ```

### 方法二：GitHub 集成部署

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "添加平方萌萌哒字体支持"
   git push origin main
   ```

2. **在 Vercel 中连接 GitHub 仓库**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "Import Project"
   - 选择您的 GitHub 仓库
   - Vercel 会自动检测 `vercel.json` 配置

## 字体配置

### 1. 获取平方萌萌哒字体

请从官方渠道获取 `PingFangMengMeng-2.ttf` 字体文件。

### 2. 字体安装

```bash
# 将字体文件放置到指定目录
cp /path/to/PingFangMengMeng-2.ttf playground/fonts/
```

### 3. 验证字体

确保文件名完全匹配：`playground/fonts/PingFangMengMeng-2.ttf`

### 4. 重新构建

```bash
npm run build:playground
```

## 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm start
   ```

3. **访问应用**
   打开 http://localhost:5173

## 部署配置说明

项目包含以下配置文件：

- `vercel.json` - Vercel 部署配置
- `vite.config.ts` - Vite 构建配置
- `playground/style.scss` - 字体样式定义

## 字体特性

- ✅ **平方萌萌哒字体**: 专为中文优化的可爱手写字体
- ✅ **自动回退**: 如果字体文件不存在，自动使用系统字体
- ✅ **性能优化**: 字体异步加载，不影响页面渲染
- ✅ **完美兼容**: 与 Excalidraw 手绘风格无缝融合

## 测试中文字体

部署完成后，您可以使用内置的"平方萌萌哒字体 - 中文支持"测试用例来验证字体效果。

## 注意事项

1. **字体版权**: 请确保您有使用平方萌萌哒字体的合法权限
2. **文件大小**: 字体文件会增加应用大小，但采用了延迟加载优化
3. **浏览器兼容**: 现代浏览器均支持 TTF 字体格式
4. **CDN 缓存**: Vercel 会自动缓存字体文件，提升加载速度

## 故障排除

### 字体没有生效
- 检查字体文件路径是否正确
- 确认文件名为 `PingFangMengMeng-2.ttf`
- 查看浏览器开发者工具的网络面板

### 构建失败
- 确保所有依赖已安装: `npm install`
- 检查 Node.js 版本兼容性
- 查看构建日志中的具体错误信息

### 部署问题
- 确认 Vercel 账户权限
- 检查 `vercel.json` 配置
- 查看 Vercel 部署日志

## 支持

如果遇到问题，请：
1. 查看本文档的故障排除部分
2. 检查 GitHub Issues
3. 提交新的 Issue 描述问题

---

享受使用平方萌萌哒字体创建可爱的中文图表吧！🎨✨ 