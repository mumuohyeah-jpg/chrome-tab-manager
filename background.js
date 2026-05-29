// background.js - 追踪标签页打开时间

// 存储每个标签页的创建时间和激活时间
const tabTimes = {};

// 监听标签页创建
chrome.tabs.onCreated.addListener((tab) => {
  tabTimes[tab.id] = {
    created: Date.now(),
    lastActive: Date.now()
  };
});

// 监听标签页关闭
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabTimes[tabId];
});

// 监听标签页激活
chrome.tabs.onActivated.addListener((activeInfo) => {
  if (tabTimes[activeInfo.tabId]) {
    tabTimes[activeInfo.tabId].lastActive = Date.now();
  }
});

// 监听窗口焦点变化
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;

  chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
    if (tabs[0] && tabTimes[tabs[0].id]) {
      tabTimes[tabs[0].id].lastActive = Date.now();
    }
  });
});

// 处理来自 newtab 的消息请求
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getTabs') {
    chrome.tabs.query({}, (tabs) => {
      const tabsWithTimes = tabs.map(tab => {
        const times = tabTimes[tab.id] || { created: Date.now(), lastActive: Date.now() };
        return {
          id: tab.id,
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl,
          active: tab.active,
          created: times.created,
          lastActive: times.lastActive
        };
      });
      sendResponse({ tabs: tabsWithTimes });
    });
    return true; // 异步响应
  }
});

console.log('Tab Manager background service worker started');