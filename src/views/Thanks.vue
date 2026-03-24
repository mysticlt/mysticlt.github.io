<!-- src/views/Thanks.vue -->
<template>
  <div class="thanks">
    <div class="card">
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h1>提交成功</h1>
      <p>感谢您的申请，我们会尽快审核并联系您。</p>
      <button @click="$router.push('/')">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.thanks {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 24px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 48px 40px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1);
}

.icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background: #e8f5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #34a853;
}

.icon svg {
  width: 32px;
  height: 32px;
}

h1 {
  font-size: 24px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

p {
  font-size: 14px;
  color: #5f6368;
  line-height: 1.5;
  margin: 0 0 32px;
}

button {
  background: #1a73e8;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #1557b0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
</style>