# Cloudflare Turnstile 配置指南

本文档介绍如何为 OptVerse 申请表单配置 Cloudflare Turnstile 人机验证。

## 什么是 Cloudflare Turnstile

Cloudflare Turnstile 是一个免费、隐私友好的人机验证服务，相比传统验证码有以下优势：

- ✅ **100% 免费** - 无限请求，无费率限制
- ✅ **极佳用户体验** - 大多数情况下完全隐形，无需用户点击或识别图片
- ✅ **隐私友好** - 不追踪用户，比 Google reCAPTCHA 更符合隐私要求
- ✅ **高可靠性** - Cloudflare 基础设施，99.99% 可用性

## 步骤 1: 获取 Cloudflare 账号和 Site Key

### 1.1 注册/登录 Cloudflare

1. 访问 [Cloudflare 官网](https://www.cloudflare.com/)
2. 点击 **Sign Up** 注册免费账号，或直接登录已有账号

> 注意：**不需要**将你的域名 `mysticlt.github.io` 托管到 Cloudflare 也可以使用 Turnstile。

### 1.2 创建 Turnstile 站点

1. 登录后，在控制台找到 **Turnstile**（如果找不到，在搜索框搜索 "Turnstile"）
2. 点击 **Add site** 添加新站点

3. 填写站点信息：
   - **Site name**: `mysticlt.github.io`（或任意名称方便识别）
   - **Domain**: 输入 `mysticlt.github.io`
   - **Widget mode**: 选择 **Managed**（推荐，自动适应场景）
   - 勾选 **I'm not a robot** 验证
   - 点击 **Create**

4. 创建成功后，你会看到两个密钥：
   - **Site Key**（站点密钥）- 这个需要放到前端代码中，可以公开
   - **Secret Key**（密钥）- 这个需要保密，仅配置在 formsubmit.co 后台

### 1.3 复制 Site Key

复制得到的 **Site Key**，它看起来像这样：
```
你的 Site Key 在这里，类似：0x4AAAAAAAZzzzzzzzzzzzz
```

## 步骤 2: 更新代码中的 Site Key

打开 `src/views/OptVerseApplication.vue` 文件，找到第约 206 行：

```javascript
// Cloudflare Turnstile Configuration
const turnstileSiteKey = 'YOUR_SITE_KEY_FROM_CLOUDFLARE' // User replaces this after getting key
```

将 `YOUR_SITE_KEY_FROM_CLOUDFLARE` 替换为你刚才复制的实际 Site Key。

例如：
```javascript
const turnstileSiteKey = '0x4AAAAAAAZzzzzzzzzzzzz'
```

保存文件。

## 步骤 3: 在 formsubmit.co 配置 Secret Key

1. 登录 [formsubmit.co](https://formsubmit.co/) 控制面板
2. 找到你的表单（目标邮箱是 optverse@huawei.com）
3. 进入表单设置页面
4. 找到 **SPAM PROTECTION** 部分
5. 开启 **Cloudflare Turnstile** 选项
6. 在 **Cloudflare Secret Key** 输入框中，粘贴你从 Cloudflare 得到的 **Secret Key**
7. 保存设置

> ⚠️ 重要安全提示：**Secret Key** 永远不要提交到代码仓库，也不要公开暴露，只需要配置在 formsubmit.co 后台即可。

## 步骤 4: 重新构建和部署

```bash
# 重新构建
npm run build

# 提交更改（如果你更新了 Site Key 在代码中）
git add src/views/OptVerseApplication.vue
git commit -m "update: add actual Cloudflare Turnstile site key"

# 推送到 GitHub，部署到 GitHub Pages
git push
```

## 步骤 5: 验证

部署完成后，打开网站：https://mysticlt.github.io/

检查：

1. ✅ 在申请表单底部，"人机验证" 区域应该正常加载出 Turnstile 小部件
2. ✅ 在未完成验证时，"提交申请" 按钮保持禁用状态
3. ✅ Turnstile 自动完成验证后（大部分情况是隐形的），按钮变为可点击
4. ✅ 提交表单后，formsubmit.co 会自动验证 Turnstile 响应，垃圾提交会被拦截

## 故障排查

### Turnstile 显示 "Invalid site key"

- 检查你的 Site Key 是否正确复制，没有多余空格
- 检查在 Cloudflare 中添加的域名是否正确匹配 `mysticlt.github.io`

### 表单提交后没有收到邮件

- 检查 formsubmit.co 是否正确配置了 Secret Key
- 检查垃圾邮件文件夹，可能被误判为垃圾邮件
- 在 formsubmit.co 仪表盘查看提交日志，确认是否被 Turnstile 拦截

### 开发环境本地测试问题

- Cloudflare Turnstile 默认允许 `localhost` 用于开发测试，不需要额外配置
- 如果使用其他端口，确保在 Cloudflare 中添加了允许的域名

## 安全说明

- **Site Key** 可以安全放在客户端代码中，即使暴露也不会有安全问题
- **Secret Key** 必须保密，仅用于 formsubmit.co 服务器端验证
- 本项目保留了原有的 honeypot 隐藏字段作为第二层防护
- formsubmit.co 会自动完成服务器端验证，确保只有通过验证的提交才能送达
