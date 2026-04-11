const app = {
  shuffledQuestions: [],
  answers: {},
  previewMode: false
};

const screens = {
  intro: document.getElementById('intro'),
  test: document.getElementById('test'),
  result: document.getElementById('result'),
  about: document.getElementById('about'),
  dimensions: document.getElementById('dimensions'),
  faq: document.getElementById('faq')
};

const questionList = document.getElementById('questionList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const submitBtn = document.getElementById('submitBtn');
const testHint = document.getElementById('testHint');

const header = document.querySelector('.header');

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('active', key === name);
  });
  
  if (header) {
    if (name === 'result' || name === 'test') {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getVisibleQuestions() {
  const visible = [...app.shuffledQuestions];
  const gateIndex = visible.findIndex(q => q.id === 'drink_gate_q1');
  if (gateIndex !== -1 && app.answers['drink_gate_q1'] === 3) {
    visible.splice(gateIndex + 1, 0, specialQuestions[1]);
  }
  return visible;
}

function getQuestionMetaLabel(q) {
  if (q.special) return '补充题';
  return app.previewMode ? dimensionMeta[q.dim].name : '维度已隐藏';
}

function renderQuestions() {
  const visibleQuestions = getVisibleQuestions();
  questionList.innerHTML = '';
  visibleQuestions.forEach((q, index) => {
    const card = document.createElement('article');
    card.className = 'question';
    card.innerHTML = `
      <div class="question-meta">
        <div class="badge">第 ${index + 1} 题</div>
        <div>${getQuestionMetaLabel(q)}</div>
      </div>
      <div class="question-title">${q.text}</div>
      <div class="options">
        ${q.options.map((opt, i) => {
          const code = ['A', 'B', 'C', 'D'][i] || String(i + 1);
          const checked = app.answers[q.id] === opt.value ? 'checked' : '';
          return `
            <label class="option">
              <input type="radio" name="${q.id}" value="${opt.value}" ${checked} />
              <div class="option-code">${code}</div>
              <div>${opt.label}</div>
            </label>
          `;
        }).join('')}
      </div>
    `;
    questionList.appendChild(card);
  });

  questionList.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const { name, value } = e.target;
      app.answers[name] = Number(value);

      if (name === 'drink_gate_q1') {
        if (Number(value) !== 3) {
          delete app.answers['drink_gate_q2'];
        }
        renderQuestions();
        return;
      }

      updateProgress();
    });
  });

  updateProgress();
}

function updateProgress() {
  const visibleQuestions = getVisibleQuestions();
  const total = visibleQuestions.length;
  const done = visibleQuestions.filter(q => app.answers[q.id] !== undefined).length;
  const percent = total ? (done / total) * 100 : 0;
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${done} / ${total}`;
  const complete = done === total && total > 0;
  submitBtn.disabled = !complete;
  testHint.textContent = complete
    ? '都做完了。现在可以把你的电子魂魄交给结果页审判。'
    : '全选完才会放行。世界已经够乱了，起码把题做完整。';
}

function sumToLevel(score) {
  if (score <= 3) return 'L';
  if (score === 4) return 'M';
  return 'H';
}

function levelNum(level) {
  return { L: 1, M: 2, H: 3 }[level];
}

function parsePattern(pattern) {
  return pattern.replace(/-/g, '').split('');
}

function getDrunkTriggered() {
  return app.answers[DRUNK_TRIGGER_QUESTION_ID] === 2;
}

function computeResult() {
  const rawScores = {};
  const levels = {};
  Object.keys(dimensionMeta).forEach(dim => { rawScores[dim] = 0; });

  questions.forEach(q => {
    rawScores[q.dim] += Number(app.answers[q.id] || 0);
  });

  Object.entries(rawScores).forEach(([dim, score]) => {
    levels[dim] = sumToLevel(score);
  });

  const userVector = dimensionOrder.map(dim => levelNum(levels[dim]));
  const ranked = NORMAL_TYPES.map(type => {
    const vector = parsePattern(type.pattern).map(levelNum);
    let distance = 0;
    let exact = 0;
    for (let i = 0; i < vector.length; i++) {
      const diff = Math.abs(userVector[i] - vector[i]);
      distance += diff;
      if (diff === 0) exact += 1;
    }
    const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    return { ...type, ...TYPE_LIBRARY[type.code], distance, exact, similarity };
  }).sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  const bestNormal = ranked[0];
  const drunkTriggered = getDrunkTriggered();

  let finalType;
  let modeKicker = '你的主类型';
  let badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`;
  let sub = '维度命中度较高，当前结果可视为你的第一人格画像。';
  let special = false;
  let secondaryType = null;

  if (drunkTriggered) {
    finalType = TYPE_LIBRARY.DRUNK;
    secondaryType = bestNormal;
    modeKicker = '隐藏人格已激活';
    badge = '匹配度 100% · 酒精异常因子已接管';
    sub = '乙醇亲和性过强，系统已直接跳过常规人格审判。';
    special = true;
  } else if (bestNormal.similarity < 60) {
    finalType = TYPE_LIBRARY.HHHH;
    modeKicker = '系统强制兜底';
    badge = `标准人格库最高匹配仅 ${bestNormal.similarity}%`;
    sub = '标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。';
    special = true;
  } else {
    finalType = bestNormal;
  }

  return {
    rawScores,
    levels,
    ranked,
    bestNormal,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    secondaryType
  };
}

function renderDimList(result) {
  const dimList = document.getElementById('dimList');
  dimList.innerHTML = dimensionOrder.map(dim => {
    const level = result.levels[dim];
    const explanation = DIM_EXPLANATIONS[dim][level];
    return `
      <div class="dim-item">
        <div class="dim-item-top">
          <div class="dim-item-name">${dimensionMeta[dim].name}</div>
          <div class="dim-item-score">${level} / ${result.rawScores[dim]}分</div>
        </div>
        <p>${explanation}</p>
      </div>
    `;
  }).join('');
}

function renderResult() {
  const result = computeResult();
  const type = result.finalType;

  document.getElementById('resultModeKicker').textContent = result.modeKicker;
  document.getElementById('resultTypeName').textContent = `${type.code}（${type.cn}）`;
  document.getElementById('matchBadge').textContent = result.badge;
  document.getElementById('resultTypeSub').textContent = result.sub;
  document.getElementById('resultDesc').textContent = type.desc;
  document.getElementById('posterCaption').textContent = type.intro;
  document.getElementById('funNote').textContent = result.special
    ? '本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。'
    : '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。';

  const posterBox = document.getElementById('posterBox');
  const posterImage = document.getElementById('posterImage');
  const imageSrc = TYPE_IMAGES[type.code];
  if (imageSrc) {
    posterImage.src = imageSrc;
    posterImage.alt = `${type.code}（${type.cn}）`;
    posterBox.classList.remove('no-image');
  } else {
    posterImage.removeAttribute('src');
    posterImage.alt = '';
    posterBox.classList.add('no-image');
  }

  renderDimList(result);
  showScreen('result');
}

function startTest(preview = false) {
  app.previewMode = preview;
  app.answers = {};
  const shuffledRegular = shuffle(questions);
  const insertIndex = Math.floor(Math.random() * shuffledRegular.length) + 1;
  app.shuffledQuestions = [
    ...shuffledRegular.slice(0, insertIndex),
    specialQuestions[0],
    ...shuffledRegular.slice(insertIndex)
  ];
  renderQuestions();
  showScreen('test');
}

document.getElementById('startBtn').addEventListener('click', () => startTest(false));
document.getElementById('backIntroBtn').addEventListener('click', () => showScreen('intro'));
document.getElementById('submitBtn').addEventListener('click', renderResult);
document.getElementById('restartBtn').addEventListener('click', () => startTest(false));
document.getElementById('toTopBtn').addEventListener('click', () => showScreen('intro'));

const logo = document.getElementById('logo');
if (logo) {
  logo.addEventListener('click', () => {
    showScreen('intro');
    updateNavActive('#intro');
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    showScreen(targetId);
    updateNavActive(link.getAttribute('href'));
  });
});

function updateNavActive(href) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelector(`.nav-link[href="${href}"]`)?.classList.add('active');
}