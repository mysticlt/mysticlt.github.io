<template>
  <div class="optv-stitch">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-label">OptVerse</div>
        <h1 class="hero-title">高性能数学规划求解器</h1>
        <p class="hero-desc">
          专注于解决大规模线性规划 (LP)、混合整数线性规划 (MILP) 、二次规划 (QP) 、二次锥规划（SOCP）、一般非线性规划（NLP）及约束规划（CP）等复杂问题
        </p>
        <div class="hero-meta">
          <!-- <span>Windows · Linux · MacOS</span> -->
          <span>Linux</span>
          <span class="divider">|</span>
          <span>Python · C/C++</span>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main">
      <!-- Features -->
      <section class="features">
        <div class="section-inner">
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-num">01</span>
              <div class="feature-content">
                <h3>全功能求解器</h3>
                <p>LP、MIP、QP、SOCP、NLP、CP 全覆盖，支持连续与整数变量</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-num">02</span>
              <div class="feature-content">
                <!-- <h3>跨平台支持</h3> -->
                <h3>平台支持</h3>
                <p>Linux原生支持，含 ARM 架构版本</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-num">03</span>
              <div class="feature-content">
                <h3>多语言接口</h3>
                <p>Python、C/C++</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Application Form -->
      <section class="form-section" id="apply">
        <div class="section-inner">
          <div class="form-header">
            <span class="form-label">License Application</span>
            <h2 class="form-title">学术许可证申请</h2>
            <p class="form-desc">填写以下信息，我们将在 2 个工作日内发送安装包与许可证文件至您的邮箱。</p>
          </div>

          <form @submit.prevent="handleSubmit" class="form">
            <!-- Personal Info -->
            <div class="form-block">
              <div class="block-title">
                <span class="block-num">1</span>
                <span>个人信息</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="name">姓名 <span class="required">*</span></label>
                  <input type="text" id="name" v-model="form.name" placeholder="您的真实姓名" required>
                </div>
                <div class="form-group">
                  <label for="email">学术邮箱 <span class="required">*</span></label>
                  <input type="email" id="email" v-model="form.email" placeholder="name@university.edu.cn" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="organization">学校/机构 <span class="required">*</span></label>
                  <input type="text" id="organization" v-model="form.organization" placeholder="完整机构名称" required>
                </div>
                <div class="form-group">
                  <label for="position">身份 <span class="required">*</span></label>
                  <select id="position" v-model="form.position" required>
                    <option value="" disabled>请选择</option>
                    <option value="undergrad">本科生</option>
                    <option value="master">硕士研究生</option>
                    <option value="phd">博士研究生</option>
                    <option value="postdoc">博士后</option>
                    <option value="faculty">教师/研究员</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <!-- 隐藏字段 -->
                <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
              </div>

              <div class="form-group full">
                <label for="reason">申请用途 <span class="required">*</span></label>
                <textarea id="reason" v-model="form.reason" placeholder="简述您的研究方向及 OptVerse 的具体应用场景（如课程教学、论文研究、实验室项目等）"
                  required rows="3"></textarea>
              </div>
            </div>

            <!-- Technical Info -->
            <div class="form-block">
              <div class="block-title">
                <span class="block-num">2</span>
                <span>技术信息</span>
              </div>

              <div class="form-group">
                <label>操作系统 <span class="required">*</span></label>
                <div class="os-options">
                  <label v-for="os in osOptions" :key="os.value" class="os-label"
                    :class="{ active: form.os === os.value }">
                    <input type="radio" :value="os.value" v-model="form.os" required>
                    <span class="os-name">{{ os.label }}</span>
                  </label>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="username">
                    计算机用户名 <span class="required">*</span>
                    <span class="hint" @click="toggleHelp">(?)</span>
                  </label>
                  <input type="text" id="username" v-model="form.username" placeholder="运行 whoami 或 echo %USERNAME% 的结果"
                    required>
                  <div class="help-text" v-if="showHelp">
                    Windows: 在 CMD 中运行 echo %USERNAME% 或 whoami（取 \ 后的部分）<br>
                    Mac/Linux: 在终端运行 whoami
                  </div>
                </div>
                <!-- <div class="form-group">
                  <label>编程接口（可多选）</label>
                  <div class="api-options">
                    <label v-for="api in apiOptions" :key="api.value" class="api-label"
                      :class="{ active: form.apis.includes(api.value) }">
                      <input type="checkbox" :value="api.value" v-model="form.apis">
                      <span>{{ api.label }}</span>
                    </label>
                  </div>
                </div> -->
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>编程接口（可多选）</label>
                  <div class="api-options">
                    <label v-for="api in apiOptions" :key="api.value" class="api-label"
                      :class="{ active: form.apis.includes(api.value) }">
                      <input type="checkbox" :value="api.value" v-model="form.apis">
                      <span>{{ api.label }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit -->
            <div class="form-block submit-block">
              <label class="agreement">
                <input type="checkbox" v-model="form.agreement" required>
                <span class="check-icon"></span>
                <span class="agreement-text">
                  我已阅读并接受 <a @click.prevent="showEULA = true">最终用户许可协议</a> 与 <a
                    @click.prevent="showPrivacy = true">隐私政策</a>
                </span>
              </label>
              <!-- 验证码区域 -->
              <div v-if="isFormValid" class="form-group captcha-group">
                <label>
                  验证码 <span class="required">*</span>
                  <span class="captcha-question">{{ captcha.num1 }} + {{ captcha.num2 }} = ?</span>
                  <button type="button" class="refresh-btn" @click="refreshCaptcha" title="换一题">↻</button>
                </label>
                <input type="number" v-model="captcha.userAnswer" placeholder="请输入答案" required @input="validateCaptcha">
                <span v-if="captcha.error" class="error-msg">答案错误</span>
              </div>
              <!-- 提交 -->
              <button type="submit" class="submit-btn" :disabled="isSubmitting || !isFormValid">
                <span v-if="isSubmitting">提交中...</span>
                <span v-else>提交申请 →</span>
              </button>

              <div v-if="submitStatus" :class="['status', submitStatus.type]">
                {{ submitStatus.message }}
              </div>
            </div>
          </form>
        </div>
      </section>

      <!-- Contact -->
      <!-- <section class="contact">
        <div class="section-inner">
          <div class="contact-grid">
            <a href="mailto:xxxx@huawei" class="contact-item">
              <span class="contact-label">商务</span>
              <span class="contact-val">xxxx@huawei</span>
            </a>
            <a href="mailto:xxxx@huawei" class="contact-item">
              <span class="contact-label">支持</span>
              <span class="contact-val">xxxx@huawei</span>
            </a>
            <div class="contact-item">
              <span class="contact-label">电话</span>
              <span class="contact-val">xxx-xxx-xxxx</span>
            </div>
            <a href="https://github.com/Huawei-OptVerse-Solver" target="_blank" class="contact-item">
              <span class="contact-label">官网</span>
              <span class="contact-val">Huawei-OptVerse-Solver</span>
            </a>
          </div>
        </div>
      </section> -->
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <p>©2026 OptVerse</p>
        <!-- <p>京公网安备 11010102005511号 | 苏ICP备17008061号</p> -->
      </div>
    </footer>

    <!-- Modals -->
    <div v-if="showEULA" class="modal" @click.self="showEULA = false">
      <div class="modal-content">
        <h3>最终用户许可协议</h3>
        <p>OptVerse 最终用户许可协议内容...</p>
        <button @click="showEULA = false">关闭</button>
      </div>
    </div>

    <div v-if="showPrivacy" class="modal" @click.self="showPrivacy = false">
      <div class="modal-content">
        <h3>隐私政策</h3>
        <p>我们收集的信息仅用于提供 OptVerse 许可证和技术支持...</p>
        <button @click="showPrivacy = false">关闭</button>
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
  reason: '',
  os: '',
  username: '',
  apis: [],
  agreement: false
})

const osOptions = [
  // { value: 'windows', label: 'Windows' },
  // { value: 'macos', label: 'MacOS' },
  { value: 'linux', label: 'Linux x86' },
  { value: 'linux-arm', label: 'Linux ARM' }
]

const apiOptions = [
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C/C++' },
]

const isSubmitting = ref(false)
const submitStatus = ref(null)
const showEULA = ref(false)
const showPrivacy = ref(false)
const showHelp = ref(false)


const isFormValid = computed(() => {
  return form.value.name &&
    form.value.email &&
    form.value.organization &&
    form.value.position &&
    form.value.reason &&
    form.value.os &&
    form.value.username &&
    form.value.agreement
})

const toggleHelp = () => {
  showHelp.value = !showHelp.value
}

// 验证码状态
const captcha = reactive({
  num1: 0,
  num2: 0,
  userAnswer: '',
  error: false,
  validated: false
})

// 生成新验证码
const refreshCaptcha = () => {
  captcha.num1 = Math.floor(Math.random() * 10) + 1  // 1-10
  captcha.num2 = Math.floor(Math.random() * 10) + 1  // 1-10
  captcha.userAnswer = ''
  captcha.error = false
  captcha.validated = false
}

// 验证答案
const validateCaptcha = () => {
  const correct = captcha.num1 + captcha.num2
  const userVal = parseInt(captcha.userAnswer)

  if (captcha.userAnswer === '') {
    captcha.error = false
    captcha.validated = false
    return
  }

  captcha.error = userVal !== correct
  captcha.validated = userVal === correct
}

const handleSubmit = async () => {
  // 检查 honeypot 字段
  if (form.value.website) {
    console.log('robot detected')
    return
  }

  if (!isFormValid.value) {
    submitStatus.value = {
      type: 'error',
      message: '请填写所有必填项'
    }
    return
  }

  // 验证验证码
  if (!captcha.validated) {
    submitStatus.value = { type: 'error', message: '请正确填写验证码' }
    refreshCaptcha()
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  // 创建 FormData 对象
  const formData = new FormData()

  // 添加所有字段
  formData.append('name', form.value.name)
  formData.append('email', form.value.email)
  formData.append('organization', form.value.organization)
  formData.append('position', form.value.position)
  formData.append('reason', form.value.reason)
  formData.append('os', form.value.os)
  formData.append('username', form.value.username)
  formData.append('trialType', 'academic')

  // 处理数组：apis[] 或逗号分隔
  if (form.value.apis.length > 0) {
    // 方式1：逗号分隔字符串
    formData.append('apis', form.value.apis.join(', '))
  }

  const baseUrl = 'https://mysticlt.github.io/'

  // 布尔值转字符串
  formData.append('agreement', form.value.agreement ? 'Yes' : 'No')

  // // 可选：自定义跳转（JSON 提交时无效，需要页面跳转才有效）
  formData.append('_next', `${baseUrl}/Thanks.html`)
  formData.append('_captcha', 'false')

  try {
    const response = await fetch('https://formsubmit.co/83a9b4c656c79f8ce712d8441b194823', {
      method: 'POST',
      // 注意：不要手动设置 Content-Type，fetch 会自动处理 multipart/form-data
      body: formData,
      redirect: 'follow'
    });

    // 200-299 是标准成功，302 是 Formsubmit 的重定向成功（邮件已发）
    if (response.ok || response.status === 302) {
      submitStatus.value = {
        type: 'success',
        message: '感谢您的申请，我们会尽快审核并联系您'
      };

      // 重置表单
      form.value = {
        name: '',
        email: '',
        organization: '',
        position: '',
        reason: '',
        os: '',
        username: '',
        apis: [],
        agreement: false
      }

    } else {
      // 只有当状态码既不是 2xx 也不是 302 时，才认为是真正的失败
      // 尝试获取错误详情
      let errorMsg = '提交失败';
      try {
        const errData = await response.json();
        if (errData.message) errorMsg = errData.message;
      } catch (e) {
        // 如果解析失败，使用默认消息
      }
      throw new Error(errorMsg);
    }

  } catch (error) {
    console.error('提交出错:', error); // 打印错误以便调试
    if (error.message === "Failed to fetch") {
      submitStatus.value = {
        type: 'success',
        message: '感谢您的申请，我们会尽快审核并联系您'
      };
    } else {
      submitStatus.value = {
        type: 'error',
        message: error.message || '网络错误，请重试'
      };
    }
  } finally {
    isSubmitting.value = false;
  }
}

// 初始化
onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
/* Refined Minimalism - Clean Professional Design */
.optv-stitch {
  font-family: 'Manrope', -apple-system, sans-serif;
  color: #2D2D2D;
  background: #FCFBF9;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.optv-stitch * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Layout Container */
.optv-stitch .section-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Banner - Charcoal background, elegant serif headline */
.optv-stitch .hero {
  background: #262626;
  color: #FAFAF8;
  padding: 120px 0 100px;
}

.optv-stitch .hero-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
}

.optv-stitch .hero-label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  opacity: 0.7;
  margin-bottom: 28px;
  font-weight: 400;
}

.optv-stitch .hero-title {
  font-family: 'Lora', Georgia, serif;
  font-size: 52px;
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 36px;
  letter-spacing: -0.02em;
}

.optv-stitch .hero-desc {
  font-size: 18px;
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 44px;
  max-width: 600px;
  font-weight: 300;
}

.optv-stitch .hero-meta {
  font-size: 14px;
  opacity: 0.6;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  letter-spacing: 0.02em;
}

.optv-stitch .hero-meta .divider {
  opacity: 0.3;
}

/* Features - Clean list with subtle hierarchy */
.optv-stitch .features {
  padding: 88px 0;
  border-bottom: 1px solid #E8E6E1;
}

.optv-stitch .feature-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.optv-stitch .feature-item {
  display: flex;
  gap: 32px;
  padding: 36px 0;
  border-bottom: 1px solid #F0EDE8;
  transition: transform 0.2s ease;
}

.optv-stitch .feature-item:hover {
  transform: translateX(4px);
}

.optv-stitch .feature-item:last-child {
  border-bottom: none;
}

.optv-stitch .feature-num {
  font-size: 13px;
  font-weight: 500;
  opacity: 0.35;
  min-width: 28px;
  padding-top: 6px;
  letter-spacing: 0.05em;
}

.optv-stitch .feature-content h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  color: #1A1A1A;
}

.optv-stitch .feature-content p {
  font-size: 15px;
  opacity: 0.65;
  line-height: 1.7;
}

/* Form Section */
.optv-stitch .form-section {
  padding: 100px 0 120px;
}

.optv-stitch .form-header {
  margin-bottom: 68px;
}

.optv-stitch .form-label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.5;
  margin-bottom: 18px;
  display: block;
  font-weight: 500;
}

.optv-stitch .form-title {
  font-family: 'Lora', Georgia, serif;
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 18px;
  letter-spacing: -0.02em;
  color: #1A1A1A;
}

.optv-stitch .form-desc {
  font-size: 17px;
  opacity: 0.65;
  line-height: 1.6;
}

/* Form Blocks */
.optv-stitch .form-block {
  margin-bottom: 64px;
  border-bottom: 1px solid #E8E6E1;
  padding-bottom: 64px;
}

.optv-stitch .form-block:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.optv-stitch .block-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 40px;
  opacity: 0.5;
}

.optv-stitch .block-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid currentColor;
  border-radius: 50%;
  font-size: 12px;
}

/* Form Elements */
.optv-stitch .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-bottom: 28px;
}

.optv-stitch .form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.optv-stitch .form-group.full {
  grid-column: 1 / -1;
}

.optv-stitch label {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 6px;
}

.optv-stitch .required {
  color: #B85C5C;
  font-weight: 400;
}

.optv-stitch .hint {
  margin-left: auto;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
  font-weight: 400;
}

.optv-stitch .hint:hover {
  opacity: 0.9;
}

.optv-stitch input[type="text"],
.optv-stitch input[type="email"],
.optv-stitch select,
.optv-stitch textarea {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid #D3D0CB;
  border-radius: 4px;
  font-size: 15px;
  background: #FFFFFF;
  transition: all 0.2s ease;
  font-family: inherit;
  color: #2D2D2D;
}

.optv-stitch input:focus,
.optv-stitch select:focus,
.optv-stitch textarea:focus {
  outline: none;
  border-color: #262626;
  box-shadow: 0 0 0 3px rgba(38, 38, 38, 0.08);
  background: #FFFFFE;
}

.optv-stitch input::placeholder,
.optv-stitch textarea::placeholder {
  color: #A09E9A;
}

.optv-stitch select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='%23666' d='M0 0h12L6 7z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-color: #FFFFFF;
}

.optv-stitch textarea {
  resize: vertical;
  min-height: 108px;
}

/* OS Options */
.optv-stitch .os-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.optv-stitch .os-label {
  cursor: pointer;
  padding: 16px 28px;
  border: 1px solid #D3D0CB;
  border-radius: 4px;
  transition: all 0.2s ease;
  background: #FFFFFF;
}

.optv-stitch .os-label input {
  display: none;
}

.optv-stitch .os-name {
  font-size: 14px;
  opacity: 0.75;
}

.optv-stitch .os-label:hover {
  border-color: #888;
  transform: translateY(-1px);
}

.optv-stitch .os-label.active {
  border-color: #262626;
  background: #262626;
  color: #FAFAF8;
}

.optv-stitch .os-label.active .os-name {
  opacity: 1;
}

/* API Options */
.optv-stitch .api-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.optv-stitch .api-label {
  cursor: pointer;
  padding: 12px 20px;
  border: 1px solid #D3D0CB;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: #FFFFFF;
}

.optv-stitch .api-label input {
  display: none;
}

.optv-stitch .api-label:hover {
  border-color: #888;
  transform: translateY(-1px);
}

.optv-stitch .api-label.active {
  border-color: #262626;
  background: #262626;
  color: #FAFAF8;
}

/* Help Text */
.optv-stitch .help-text {
  font-size: 13px;
  opacity: 0.65;
  margin-top: 10px;
  line-height: 1.6;
  padding: 14px 16px;
  background: #F5F3F0;
  border-left: 3px solid #262626;
  border-radius: 0 3px 3px 0;
}

/* Submit Block */
.optv-stitch .submit-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

.optv-stitch .agreement {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.6;
}

.optv-stitch .agreement input {
  display: none;
}

.optv-stitch .check-icon {
  width: 20px;
  height: 20px;
  border: 1px solid #C0BDB8;
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s ease;
}

.optv-stitch .agreement input:checked + .check-icon {
  background: #262626;
  border-color: #262626;
}

.optv-stitch .agreement input:checked + .check-icon::after {
  content: '✓';
  color: #FFFFFF;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 1;
}

.optv-stitch .agreement-text {
  opacity: 0.7;
}

.optv-stitch .agreement-text a {
  color: #262626;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.optv-stitch .agreement-text a:hover {
  opacity: 0.7;
}

.optv-stitch .submit-btn {
  background: #262626;
  color: #FAFAF8;
  border: none;
  padding: 16px 52px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.captcha-group {
  margin: 24px 0;
  width: 100%;
}

.captcha-question {
  display: inline-block;
  background: #F5F3F0;
  padding: 6px 14px;
  border-radius: 4px;
  font-weight: 500;
  color: #2D2D2D;
  margin: 0 10px;
}

.refresh-btn {
  background: #FFFFFF;
  border: 1px solid #D3D0CB;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: #F5F3F0;
  border-color: #A09E9A;
}

.captcha-group input {
  width: 140px;
  margin-top: 12px;
}

.error-msg {
  color: #C84646;
  font-size: 13px;
  margin-left: 10px;
}

.optv-stitch .submit-btn:hover:not(:disabled) {
  background: #000000;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.optv-stitch .submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.optv-stitch .submit-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
}

.optv-stitch .status {
  font-size: 14px;
  padding: 18px;
  border-left: 3px solid;
  border-radius: 0 3px 3px 0;
  width: 100%;
}

.optv-stitch .status.success {
  border-color: #2E7D62;
  background: #F1F8F5;
  color: #2E7D62;
}

.optv-stitch .status.error {
  border-color: #C84646;
  color: #C84646;
  background: #FFF5F5;
}

/* Footer */
.optv-stitch .footer {
  padding: 48px 0;
  border-top: 1px solid #E8E6E1;
  background: #F5F3F0;
}

.optv-stitch .footer-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  opacity: 0.5;
}

/* Modal */
.optv-stitch .modal {
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

.optv-stitch .modal-content {
  background: #FCFBF9;
  max-width: 560px;
  width: 100%;
  padding: 48px;
  position: relative;
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

.optv-stitch .modal-content h3 {
  font-family: 'Lora', Georgia, serif;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 24px;
  color: #1A1A1A;
}

.optv-stitch .modal-content p {
  font-size: 15px;
  line-height: 1.8;
  opacity: 0.7;
  margin-bottom: 32px;
}

.optv-stitch .modal-content button {
  background: #262626;
  color: #FAFAF8;
  border: none;
  padding: 14px 36px;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  border-radius: 4px;
  transition: all 0.2s;
}

.optv-stitch .modal-content button:hover {
  background: #000000;
}

/* Responsive */
@media (max-width: 768px) {
  .optv-stitch .hero {
    padding: 72px 0 60px;
  }

  .optv-stitch .hero-title {
    font-size: 36px;
  }

  .optv-stitch .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .optv-stitch .footer-inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .optv-stitch .hero-title {
    font-size: 32px;
  }

  .optv-stitch .hero-desc {
    font-size: 16px;
  }

  .optv-stitch .form-title {
    font-size: 28px;
  }

  .optv-stitch .os-options,
  .optv-stitch .api-options {
    gap: 10px;
  }

  .optv-stitch .os-label,
  .optv-stitch .api-label {
    padding: 12px 16px;
    width: 100%;
    text-align: center;
  }

  .optv-stitch .form-section {
    padding: 60px 0 80px;
  }

  .optv-stitch .features {
    padding: 50px 0;
  }

  .optv-stitch .feature-item {
    padding: 24px 0;
    gap: 20px;
  }

  .optv-stitch .modal-content {
    padding: 32px 24px;
  }
}
</style>