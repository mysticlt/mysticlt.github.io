<template>
  <div class="optv-container">
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-inner">
        <div class="hero-brand">
          <span class="brand-label">Huawei</span>
          <h1 class="brand-name">OptVerse</h1>
        </div>
        <div class="language-switcher">
          <router-link to="/en" class="lang-link">English</router-link>
        </div>
        <h2 class="hero-title">欢迎试用华为天筹求解器！</h2>
        <p class="hero-description">
          天筹数学优化求解器（Huawei OptVerse Solver）是一款由华为公司研发的高性能数学优化求解器，支持线性规划 (LP)、混合整数线性规划 (MILP) 、二次规划 (QP) 、二次锥规划（SOCP）、一般非线性规划（NLP）及约束规划（CP）等大规模复杂问题求解。天筹求解器社区版本目前支持Linux操作系统和提供Python、C++ SDK，我们将持续拓展天筹求解器支持的平台，并推出更多面向数学优化问题求解领域的工具，敬请期待。
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <!-- Introduction Card -->
      <section class="intro-section">
        <div class="container">
          <div class="intro-card">
            <h2 class="intro-title">获取免费学术license</h2>
            <p class="intro-text">
              天筹求解器现面向学术用户提供长期免费试用license。请您填写如下申请表格，我们将对您的信息进行审核，审核通过后我们将向您发送免费的学术授权许可。学术授权许可默认有效期为1年，到期后可以重新申请。为了保证申请过程的顺畅，请您准确填写申请信息，并使用有效的学术邮箱。
            </p>
            <p class="intro-contact">
              申请和使用过程中遇到任何问题，可随时通过 <a href="mailto:optverse@huawei.com">optverse@huawei.com</a> 与我们联系！
            </p>
          </div>
        </div>
      </section>

      <!-- Application Form -->
      <section class="form-section">
        <div class="container">
          <form @submit.prevent="handleSubmit" class="application-form">
            <!-- Personal Information -->
            <div class="form-section-block">
              <div class="section-header">
                <span class="section-number">1</span>
                <h3 class="section-title">个人信息</h3>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="fullName">姓名 <span class="required">*</span></label>
                  <input type="text" id="fullName" v-model="form.name" placeholder="请输入您的姓名" required>
                </div>
                <div class="form-group">
                  <label for="email">邮箱 <span class="required">*</span></label>
                  <input type="email" id="email" v-model="form.email" placeholder="请输入有效的学术邮箱" required>
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="organization">学校/科研机构 <span class="required">*</span></label>
                  <input type="text" id="organization" v-model="form.organization" placeholder="请填写完整机构名称" required>
                </div>
                <div class="form-group">
                  <label for="position">职位 <span class="required">*</span></label>
                  <select id="position" v-model="form.position" required>
                    <option value="" disabled>请选择</option>
                    <option value="undergraduate">本科生</option>
                    <option value="master">硕士研究生</option>
                    <option value="phd">博士研究生</option>
                    <option value="postdoc">博士后</option>
                    <option value="faculty">教师/研究员</option>
                    <option value="other">其他</option>
                  </select>
                </div>
              </div>

              <div class="form-group full-width">
                <label for="purpose">申请用途&应用场景 <span class="required">*</span></label>
                <textarea id="purpose" v-model="form.purpose" placeholder="请简述您的研究方向以及天筹求解器的具体应用场景" required rows="4"></textarea>
              </div>
            </div>

            <!-- Installation Information -->
            <div class="form-section-block">
              <div class="section-header">
                <span class="section-number">2</span>
                <h3 class="section-title">安装信息</h3>
              </div>

              <div class="form-group">
                <label>操作系统 <span class="required">*</span></label>
                <p class="field-hint">请保证操作系统glibc版本 &gt;= 2.33</p>
                <div class="option-grid">
                  <label v-for="os in osOptions" :key="os.value" class="option-card"
                    :class="{ active: form.os === os.value }">
                    <input type="radio" :value="os.value" v-model="form.os" required>
                    <span class="option-text">{{ os.label }}</span>
                  </label>
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="username">用户账号名 <span class="required">*</span></label>
                  <input type="text" id="username" v-model="form.username" placeholder="系统用户名，运行 whoami 获取" required>
                </div>
                <div class="form-group">
                  <label for="macAddress">MAC地址 <span class="required">*</span></label>
                  <input type="text" id="macAddress" v-model="form.macAddress" placeholder="例如: 00:1a:2b:3c:4d:5e" required>
                </div>
              </div>
            </div>

            <!-- Confirmation & Submit -->
            <div class="form-section-block last">
              <div class="section-header">
                <span class="section-number">3</span>
                <h3 class="section-title">确认申请</h3>
              </div>

              <!-- Cloudflare Turnstile -->
              <div class="captcha-wrapper">
                <label>
                  人机验证 <span class="required">*</span>
                </label>
                <div
                  class="cf-turnstile"
                  :data-sitekey="turnstileSiteKey"
                  data-callback="onTurnstileCallback"
                  data-theme="light"
                ></div>
                <span v-if="turnstile.error" class="error-message">请完成人机验证</span>
              </div>

              <!-- Agreement -->
              <label class="agreement-checkbox">
                <input type="checkbox" v-model="form.agreement" required>
                <span class="check-indicator"></span>
                <span class="agreement-text">
                  我已阅读并接受 <a @click.prevent="showModal = 'eula'">最终用户许可协议</a>
                </span>
              </label>

              <!-- Status Message -->
              <div v-if="submitStatus" :class="['status-message', submitStatus.type]">
                {{ submitStatus.message }}
              </div>

              <!-- Submit Button -->
              <button type="submit" class="submit-button" :disabled="isSubmitting || !isFormValid">
                <span v-if="isSubmitting">提交中...</span>
                <span v-else>提交申请</span>
              </button>
            </div>

            <!-- Honeypot for spam protection -->
            <input type="text" name="website" style="display: none;" tabindex="-1" autocomplete="off">
          </form>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>© 2026 Huawei OptVerse</p>
          <p><a href="mailto:optverse@huawei.com">optverse@huawei.com</a></p>
        </div>
      </div>
    </footer>

    <!-- Modal for EULA -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = null">
      <div class="modal-content">
        <h3>最终用户许可协议</h3>
        <p>
          本最终用户许可协议（"本协议"）是您（个人或法人实体）与华为公司之间关于使用天筹（OptVerse）数学优化求解器软件（"本软件"）的法律协议。您下载、安装、复制或使用本软件，即表示您同意接受本协议条款的约束。如果您不同意本协议的条款，请不要下载或使用本软件。
        </p>
        <p>
          <strong>1. 许可授予</strong><br>
          华为授予您非排他性、不可转让、不可再许可的许可，允许您在学术研究、教学和非商业用途中使用本软件。商业使用需要单独获取商业授权。
        </p>
        <p>
          <strong>2. 知识产权</strong><br>
          本软件的所有知识产权归华为公司所有。您不得移除、遮挡或篡改本软件中的任何专有标识、商标或版权声明。
        </p>
        <p>
          <strong>3. 使用限制</strong><br>
          您不得：（1）对本软件进行反向工程、反编译或反汇编；（2）修改、改编、翻译或创建本软件的衍生作品；（3）将本软件用于商业目的；（4）分发、出租、租赁或转让本软件。
        </p>
        <p>
          <strong>4. 免责声明</strong><br>
          本软件按"原样"提供，不提供任何明示或暗示的保证。华为不对本软件的适用性、准确性或可靠性作任何承诺。在任何情况下，华为不对因使用本软件产生的任何损害承担责任。
        </p>
        <p>
          <strong>5. 终止</strong><br>
          如果您违反本协议的任何条款，华为有权立即终止本许可。终止后，您必须停止使用并销毁本软件的所有副本。
        </p>
        <button class="modal-close" @click="showModal = null">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'

const form = ref({
  name: '',
  email: '',
  organization: '',
  position: '',
  purpose: '',
  os: '',
  username: '',
  macAddress: '',
  agreement: false
})

const osOptions = [
  { value: 'linux-x86', label: 'Linux x86' },
  { value: 'linux-arm', label: 'Linux ARM' }
]

const isSubmitting = ref(false)
const submitStatus = ref(null)
const showModal = ref(null)

// Cloudflare Turnstile Configuration
const turnstileSiteKey = 'YOUR_SITE_KEY_FROM_CLOUDFLARE' // User replaces this after getting key

const turnstile = reactive({
  token: null,
  verified: false,
  error: false
})

// Turnstile verification callback
const onTurnstileCallback = (token) => {
  if (token) {
    turnstile.token = token
    turnstile.verified = true
    turnstile.error = false
  } else {
    turnstile.token = null
    turnstile.verified = false
    turnstile.error = true
  }
}

// Expose callback to global scope for Turnstile
window.onTurnstileCallback = onTurnstileCallback

const isFormValid = computed(() => {
  return form.value.name &&
    form.value.email &&
    form.value.organization &&
    form.value.position &&
    form.value.purpose &&
    form.value.os &&
    form.value.username &&
    form.value.macAddress &&
    form.value.agreement &&
    turnstile.verified
})

const handleSubmit = async () => {
  // Check honeypot
  const honeypot = document.querySelector('input[name="website"]')?.value
  if (honeypot) {
    console.log('Bot detected')
    return
  }

  if (!isFormValid.value) {
    submitStatus.value = {
      type: 'error',
      message: '请填写所有必填项并完成人机验证'
    }
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('email', form.value.email)
  formData.append('organization', form.value.organization)
  formData.append('position', form.value.position)
  formData.append('purpose', form.value.purpose)
  formData.append('os', form.value.os)
  formData.append('username', form.value.username)
  formData.append('macAddress', form.value.macAddress)
  formData.append('agreement', form.value.agreement ? 'Yes' : 'No')
  formData.append('cf-turnstile-response', turnstile.token)

  const baseUrl = 'https://mysticlt.github.io/'
  formData.append('_next', `${baseUrl}/Thanks.html`)

  try {
    const response = await fetch('https://formsubmit.co/83a9b4c656c79f8ce712d8441b194823', {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    })

    if (response.ok || response.status === 302) {
      submitStatus.value = {
        type: 'success',
        message: '感谢您的申请，我们会在一周内审核并联系您'
      }

      // Reset form
      form.value = {
        name: '',
        email: '',
        organization: '',
        position: '',
        purpose: '',
        os: '',
        username: '',
        macAddress: '',
        agreement: false
      }
      // Reset Turnstile
      if (window.turnstile) {
        window.turnstile.reset()
      }
      turnstile.token = null
      turnstile.verified = false
      turnstile.error = false
    } else {
      let errorMsg = '提交失败，请稍后重试'
      try {
        const errData = await response.json()
        if (errData.message) errorMsg = errData.message
      } catch (e) {}
      throw new Error(errorMsg)
    }
  } catch (error) {
    console.error('Submit error:', error)
    if (error.message === "Failed to fetch") {
      submitStatus.value = {
        type: 'success',
        message: '感谢您的申请，我们会在一周内审核并联系您'
      }
    } else {
      submitStatus.value = {
        type: 'error',
        message: error.message || '网络错误，请重试'
      }
    }
  } finally {
    isSubmitting.value = false
  }
}

// Initialize
onMounted(() => {
})
</script>

<style scoped>
/* Refined Corporate Minimalism - Huawei OptVerse */
.optv-container {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  min-height: 100vh;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Header */
.hero {
  background: var(--color-hero-bg);
  color: var(--color-hero-text);
  padding: 80px 0 72px;
}

.hero-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-brand {
  margin-bottom: 40px;
}

.brand-label {
  display: block;
  font-size: 12px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 8px;
}

.brand-name {
  font-family: 'Lora', Georgia, serif;
  font-size: 64px;
  font-weight: 400;
  letter-spacing: -0.03em;
  margin: 0;
}

/* Language Switcher */
.language-switcher {
  text-align: right;
  margin-bottom: 24px;
}

.lang-link {
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  color: var(--color-hero-text);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  opacity: 0.9;
}

.lang-link:hover {
  background: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

.hero-title {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}

.hero-description {
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.8;
  font-weight: 300;
}

/* Intro Section */
.intro-section {
  padding: 64px 0 0;
}

.intro-card {
  background: var(--color-bg-soft);
  border-radius: 8px;
  padding: 40px;
  border: 1px solid var(--color-border);
}

.intro-title {
  font-family: 'Lora', Georgia, serif;
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #1A1A1A;
}

.intro-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 16px;
}

.intro-text strong {
  color: var(--color-text);
  font-weight: 500;
}

.intro-contact {
  font-size: 15px;
  margin: 0;
  opacity: 0.75;
}

.intro-contact a {
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: opacity 0.2s;
}

.intro-contact a:hover {
  opacity: 0.7;
}

/* Form Section */
.form-section {
  padding: 64px 0 100px;
}

.application-form {
  width: 100%;
}

.form-section-block {
  margin-bottom: 56px;
  padding-bottom: 56px;
  border-bottom: 1px solid var(--color-border);
}

.form-section-block.last {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
}

.section-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-text-muted);
  border-radius: 50%;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.7;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0;
  opacity: 0.8;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-bottom: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.85;
}

.field-hint {
  font-size: 13px;
  opacity: 0.6;
  margin: 0;
}

.required {
  color: var(--color-error);
  font-weight: 400;
}

/* Input Elements */
input[type="text"],
input[type="email"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 15px;
  background: #FFFFFF;
  transition: all 0.2s ease;
  font-family: inherit;
  color: var(--color-text);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(38, 38, 38, 0.08);
  background: #FFFFFE;
}

input::placeholder,
textarea::placeholder {
  color: #A09E9A;
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='%23666' d='M0 0h12L6 7z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

/* Option Cards for OS Selection */
.option-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 12px;
}

.option-card {
  cursor: pointer;
  padding: 20px 24px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all 0.2s ease;
  background: #FFFFFF;
  text-align: center;
}

.option-card input {
  display: none;
}

.option-text {
  font-size: 15px;
  opacity: 0.75;
  font-weight: 400;
}

.option-card:hover {
  border-color: #999;
  transform: translateY(-1px);
}

.option-card.active {
  border-color: var(--color-border-focus);
  background: var(--color-hero-bg);
  color: var(--color-hero-text);
}

.option-card.active .option-text {
  opacity: 1;
}

/* Captcha */
.captcha-wrapper {
  margin-bottom: 32px;
}

.captcha-wrapper label {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.captcha-question {
  background: var(--color-bg-soft);
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.captcha-refresh {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.2s;
  font-family: inherit;
}

.captcha-refresh:hover {
  background: var(--color-bg-soft);
  border-color: #A09E9A;
}

.captcha-wrapper input {
  width: 160px;
}

/* Cloudflare Turnstile */
.cf-turnstile {
  margin-top: 12px;
}

.error-message {
  color: var(--color-error);
  font-size: 13px;
  margin-top: 8px;
  display: inline-block;
}

/* Agreement Checkbox */
.agreement-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 32px;
}

.agreement-checkbox input {
  display: none;
}

.check-indicator {
  width: 20px;
  height: 20px;
  border: 1px solid #C0BDB8;
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: 3px;
  transition: all 0.2s ease;
}

.agreement-checkbox input:checked + .check-indicator {
  background: var(--color-hero-bg);
  border-color: var(--color-hero-bg);
}

.agreement-checkbox input:checked + .check-indicator::after {
  content: '✓';
  color: #FFFFFF;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 1;
}

.agreement-text {
  opacity: 0.75;
}

.agreement-text a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.agreement-text a:hover {
  opacity: 0.7;
}

/* Status Message */
.status-message {
  font-size: 14px;
  padding: 18px;
  border-left: 3px solid;
  border-radius: 0 3px 3px 0;
  margin-bottom: 32px;
}

.status-message.success {
  border-color: var(--color-success);
  background: #F1F8F5;
  color: var(--color-success);
}

.status-message.error {
  border-color: var(--color-error);
  background: #FFF5F5;
  color: var(--color-error);
}

/* Submit Button */
.submit-button {
  background: var(--color-hero-bg);
  color: var(--color-hero-text);
  border: none;
  padding: 16px 56px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.submit-button:hover:not(:disabled) {
  background: #000000;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
}

/* Footer */
.footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-soft);
  padding: 40px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  opacity: 0.6;
}

.footer-content a {
  color: var(--color-accent);
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(38, 38, 38, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out forwards;
}

.modal-content {
  background: var(--color-bg);
  max-width: 640px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 48px;
  border-radius: 6px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content h3 {
  font-family: 'Lora', Georgia, serif;
  font-size: 26px;
  font-weight: 400;
  margin-bottom: 24px;
  color: #1A1A1A;
}

.modal-content p {
  font-size: 15px;
  line-height: 1.8;
  opacity: 0.75;
  margin-bottom: 20px;
}

.modal-close {
  background: var(--color-hero-bg);
  color: var(--color-hero-text);
  border: none;
  padding: 14px 36px;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  border-radius: 4px;
  margin-top: 16px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #000000;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 60px 0 48px;
  }

  .brand-name {
    font-size: 48px;
  }

  .hero-title {
    font-size: 22px;
  }

  .intro-card {
    padding: 28px 24px;
  }

  .intro-title {
    font-size: 26px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .option-grid {
    grid-template-columns: 1fr;
  }

  .form-section {
    padding: 48px 0 60px;
  }

  .form-section-block {
    margin-bottom: 40px;
    padding-bottom: 40px;
  }

  .footer-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .modal-content {
    padding: 32px 24px;
  }
}

@media (max-width: 480px) {
  .brand-name {
    font-size: 40px;
  }

  .hero-description {
    font-size: 15px;
  }

  .captcha-wrapper label {
    flex-direction: column;
    align-items: flex-start;
  }

  .captcha-question {
    margin-left: 0;
  }
}
</style>
