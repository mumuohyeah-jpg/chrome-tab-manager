// newtab.js - 标签页列表逻辑

const baseDomainDescriptions = {
  'google.com': 'Search',
  'github.com': 'Code',
  'youtube.com': 'Video',
  'x.com': 'Social',
  'twitter.com': 'Social',
  'notion.so': 'Doc',
  'slack.com': 'Team',
  'figma.com': 'Design',
  'linear.app': 'Project',
  'chatgpt.com': 'AI',
  'claude.ai': 'AI',
  'openai.com': 'AI',
  'medium.com': 'Article',
  'stackoverflow.com': 'Q&A',
  'docs.google.com': 'Doc',
  'drive.google.com': 'Cloud',
  'mail.google.com': 'Email',
  'weixin.qq.com': 'Social',
  'zhihu.com': 'Q&A',
  'bilibili.com': 'Video',
  'juejin.cn': 'Article',
  'feishu.cn': 'Team',
  'taobao.com': 'Shopping',
  'jd.com': 'Shopping',
  'amazon.com': 'Shopping',
  'wikipedia.org': 'Wiki',
};

const contentKeywords = {
  'code': 'Code', 'programming': 'Code', 'developer': 'Code', 'api': 'Code',
  'repo': 'Code', 'commit': 'Code', 'pr': 'Code', 'issue': 'Code',
  'chat': 'Chat', 'assistant': 'AI', 'prompt': 'AI', 'model': 'AI', 'llm': 'AI', 'gpt': 'AI',
  'doc': 'Doc', 'document': 'Doc', 'note': 'Doc', 'wiki': 'Doc', 'spec': 'Doc',
  'readme': 'Doc', 'guide': 'Doc', 'tutorial': 'Doc',
  'project': 'Project', 'task': 'Project', 'ticket': 'Project',
  'sprint': 'Project', 'board': 'Project', 'kanban': 'Project',
  'design': 'Design', 'figma': 'Design', 'sketch': 'Design', 'ui': 'Design', 'ux': 'Design',
  'video': 'Video', 'watch': 'Video', 'stream': 'Video',
  'twitter': 'Social', 'x.com': 'Social', 'facebook': 'Social', 'weibo': 'Social',
  'shop': 'Shopping', 'buy': 'Shopping', 'cart': 'Shopping', 'order': 'Shopping',
  'news': 'News', 'article': 'Article', 'blog': 'Article', 'post': 'Article',
  'email': 'Email', 'mail': 'Email', 'inbox': 'Email',
  'cloud': 'Cloud', 'drive': 'Cloud', 'storage': 'Cloud', 'aws': 'Cloud',
};

// 检测是白天还是黑夜
function isDaytime() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
}

// 根据时间设置主题
function setTheme(forceMode = null) {
  const body = document.body;
  let isDay;

  if (forceMode === 'light') {
    isDay = true;
  } else if (forceMode === 'dark') {
    isDay = false;
  } else {
    isDay = isDaytime();
  }

  if (isDay) {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
  }
}

function smartDetectContent(title, url) {
  const text = (title + ' ' + url).toLowerCase();
  for (const [keyword, category] of Object.entries(contentKeywords)) {
    if (text.includes(keyword)) return category;
  }
  return null;
}

function getDomainDescription(domain, tabs) {
  if (baseDomainDescriptions[domain]) return baseDomainDescriptions[domain];
  for (const [key, desc] of Object.entries(baseDomainDescriptions)) {
    if (domain.includes(key)) return desc;
  }
  const titleCounts = {};
  tabs.forEach(tab => {
    const detected = smartDetectContent(tab.title || '', tab.url || '');
    if (detected) titleCounts[detected] = (titleCounts[detected] || 0) + 1;
  });
  let maxCount = 0, detectedCategory = null;
  for (const [cat, count] of Object.entries(titleCounts)) {
    if (count > maxCount) { maxCount = count; detectedCategory = cat; }
  }
  return detectedCategory || 'Web';
}

// 根据时间获取问候语
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return 'now';
}

function getDomain(url) {
  try {
    if (!url) return 'other';
    return new URL(url).hostname.replace('www.', '');
  } catch { return 'other'; }
}

function getFavicon(domain) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32&fid=${encodeURIComponent(domain)}`;
}

function getPath(url) {
  try {
    if (!url) return '';
    return new URL(url).pathname || '/';
  } catch { return ''; }
}

function groupByDomain(tabs) {
  const groups = {};
  tabs.forEach(tab => {
    const domain = getDomain(tab.url);
    if (!groups[domain]) groups[domain] = { domain, tabs: [] };
    groups[domain].tabs.push(tab);
  });
  for (const domain in groups) {
    groups[domain].description = getDomainDescription(domain, groups[domain].tabs);
  }
  return Object.values(groups).sort((a, b) => b.tabs.length - a.tabs.length);
}

function closeDomainTabs(domain, tabs) {
  const tabIds = tabs.filter(tab => getDomain(tab.url) === domain).map(tab => tab.id);
  chrome.tabs.remove(tabIds, () => loadTabs());
}

function renderTabs(tabs, searchTerm = '') {
  const tabList = document.getElementById('tabList');
  if (!tabList) return;

  const tabCountEl = document.getElementById('tabCount');
  const activeTimeEl = document.getElementById('activeTime');
  const greetingEl = document.getElementById('greeting');
  const greetingSubEl = document.getElementById('greetingSub');

  let filteredTabs = tabs;
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredTabs = tabs.filter(tab =>
      (tab.title || '').toLowerCase().includes(term) ||
      (tab.url || '').toLowerCase().includes(term)
    );
  }

  if (greetingEl) greetingEl.textContent = getGreeting();
  if (greetingSubEl) greetingSubEl.textContent = `${tabs.length} tabs open`;
  if (tabCountEl) tabCountEl.textContent = tabs.length;
  if (activeTimeEl) activeTimeEl.textContent = tabs.length;

  if (filteredTabs.length === 0) {
    tabList.innerHTML = '<div class="empty">No tabs found</div>';
    return;
  }

  filteredTabs.sort((a, b) => b.lastActive - a.lastActive);
  const groups = groupByDomain(filteredTabs);

  tabList.innerHTML = groups.map((group, idx) => {
    const domainFavicon = getFavicon(group.domain);

    return `
      <div class="domain-card" style="animation-delay: ${idx * 0.03}s">
        <div class="domain-header">
          <img class="domain-favicon" src="${domainFavicon}" onerror="this.style.opacity='0.3'">
          <div class="domain-info">
            <div class="domain-name">${group.domain}</div>
            <div class="domain-desc">${group.description}</div>
          </div>
          <div class="domain-actions">
            <span class="domain-count">${group.tabs.length}</span>
            <button class="close-all-btn" data-domain="${group.domain}">Close</button>
          </div>
        </div>
        <div class="domain-body">
          <div class="tab-list">
            ${group.tabs.map(tab => {
              const duration = Date.now() - (tab.created || Date.now());
              const tabDomain = getDomain(tab.url);

              return `
                <div class="tab-item" data-id="${tab.id}">
                  <img class="tab-favicon" src="${getFavicon(tabDomain)}" onerror="this.style.opacity='0.3'">
                  <div class="tab-info">
                    <div class="tab-title">${tab.title || 'Untitled'}</div>
                    <div class="tab-url">${getPath(tab.url)}</div>
                  </div>
                  <div class="tab-meta">
                    <span class="tab-duration">${formatDuration(duration)}</span>
                    <button class="tab-close" data-id="${tab.id}">×</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 绑定事件
  document.querySelectorAll('.tab-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-close')) {
        e.stopPropagation();
        const tabId = parseInt(e.target.dataset.id);
        chrome.tabs.remove(tabId, () => loadTabs());
      } else {
        const tabId = parseInt(item.dataset.id);
        chrome.tabs.update(tabId, { active: true });
        chrome.windows.getCurrent((win) => {
          chrome.windows.update(win.id, { focused: true });
        });
      }
    });
  });

  const groupsRef = groupByDomain(filteredTabs);
  document.querySelectorAll('.close-all-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const domain = btn.dataset.domain;
      const count = groupsRef.find(g => g.domain === domain)?.tabs.length || 0;
      if (confirm(`Close ${count} tabs from ${domain}?`)) {
        closeDomainTabs(domain, filteredTabs);
      }
    });
  });
}

function loadTabs() {
  try {
    chrome.runtime.sendMessage({ type: 'getTabs' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Runtime error:', chrome.runtime.lastError);
        return;
      }
      if (response && response.tabs) {
        renderTabs(response.tabs, document.getElementById('searchInput')?.value || '');
      }
    });
  } catch (err) {
    console.error('Load tabs error:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme();
  setInterval(() => setTheme(), 60000);

  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      const overlay = document.getElementById('transitionOverlay');

      if (overlay) {
        overlay.classList.remove('to-dark', 'to-light');
        overlay.classList.add(isLight ? 'to-dark' : 'to-light', 'active');

        setTimeout(() => {
          setTheme(isLight ? 'dark' : 'light');
          setTimeout(() => {
            overlay.classList.remove('active');
          }, 300);
        }, 400);
      } else {
        setTheme(isLight ? 'dark' : 'light');
      }
    });
  }

  loadTabs();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        chrome.runtime.sendMessage({ type: 'getTabs' }, (response) => {
          if (response && response.tabs) {
            renderTabs(response.tabs, e.target.value);
          }
        });
      }, 150);
    });
  }

  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadTabs);
  }

  setInterval(loadTabs, 30000);
});