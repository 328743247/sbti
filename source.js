const copyButtons = document.querySelectorAll('[data-copy]');
const feedback = document.getElementById('copyFeedback');

async function copyText(text) {
  await navigator.clipboard.writeText(text);
}

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const selector = button.getAttribute('data-copy');
    const target = selector ? document.querySelector(selector) : null;
    if (!target) {
      return;
    }

    try {
      await copyText(target.textContent.trim());
      if (feedback) {
        feedback.textContent = '链接已复制，建议立即转存到自己的网盘。';
      }
    } catch (error) {
      if (feedback) {
        feedback.textContent = '复制失败，请手动长按或选中文本复制链接。';
      }
    }
  });
});
