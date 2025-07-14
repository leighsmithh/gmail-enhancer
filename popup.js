// Default settings
const DEFAULT_LINE_COUNT = 4;
const MIN_LINES = 1;
const MAX_LINES = 6;

// DOM elements
let decreaseBtn, increaseBtn, lineCountDisplay, previewDemo, status;

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePopup);

async function initializePopup() {
  // Get DOM elements
  decreaseBtn = document.getElementById('decreaseBtn');
  increaseBtn = document.getElementById('increaseBtn');
  lineCountDisplay = document.getElementById('lineCount');
  previewDemo = document.getElementById('previewDemo');
  status = document.getElementById('status');

  // Add event listeners
  decreaseBtn.addEventListener('click', decreaseLines);
  increaseBtn.addEventListener('click', increaseLines);

  // Load current settings
  await loadCurrentSettings();
}

async function loadCurrentSettings() {
  try {
    const result = await chrome.storage.sync.get(['previewLines']);
    const currentLines = result.previewLines || DEFAULT_LINE_COUNT;
    updateUI(currentLines);
  } catch (error) {
    updateUI(DEFAULT_LINE_COUNT);
  }
}

async function saveSettings(lineCount) {
  try {
    // Save to storage first
    await chrome.storage.sync.set({ previewLines: lineCount });
    
    // Find Gmail tabs and send message to each
    const tabs = await chrome.tabs.query({ 
      url: '*://mail.google.com/*'
    });
    
    if (tabs.length > 0) {
      // Send message to all Gmail tabs
      for (const tab of tabs) {
        try {
          await chrome.tabs.sendMessage(tab.id, {
            action: 'updatePreviewLines',
            lineCount: lineCount
          });
        } catch (tabError) {
          // Continue with other tabs even if one fails
        }
      }
      showStatus('Settings updated!');
    } else {
      showStatus('No Gmail tabs found');
    }
    
  } catch (error) {
    showStatus('Error saving settings', true);
  }
}

function updateUI(lineCount) {
  lineCountDisplay.textContent = lineCount;
  updateButtons(lineCount);
  updatePreviewDemo(lineCount);
  updateMaxIndicator(lineCount);
}

function updateButtons(lineCount) {
  decreaseBtn.disabled = lineCount <= MIN_LINES;
  increaseBtn.disabled = lineCount >= MAX_LINES;
}

function updateMaxIndicator(lineCount) {
  const maxIndicator = document.getElementById('maxIndicator');
  if (lineCount >= MAX_LINES) {
    maxIndicator.style.display = 'inline';
  } else {
    maxIndicator.style.display = 'none';
  }
}

function updatePreviewDemo(lineCount) {
  const demoTexts = [
    'Single line preview.',
    'Two lines of email preview text for better readability.',
    'Three lines of email preview content showing more details about the message content.',
    'Four lines of email preview text allowing you to see much more of the email content without opening it fully for better productivity.',
    'Five lines of preview text giving you even more context about the email content and allowing for much better inbox scanning and email management.',
    'Six lines of preview content providing extensive detail about the email message, making it easier to prioritize and manage your inbox efficiently with Gmail\'s maximum supported preview length.'
  ];
  
  const demoText = demoTexts[lineCount - 1] || demoTexts[3];
  previewDemo.textContent = demoText;
  previewDemo.style.webkitLineClamp = lineCount;
  previewDemo.style.display = '-webkit-box';
  previewDemo.style.webkitBoxOrient = 'vertical';
  previewDemo.style.overflow = 'hidden';
}

async function decreaseLines() {
  const currentLines = parseInt(lineCountDisplay.textContent);
  if (currentLines > MIN_LINES) {
    const newLines = currentLines - 1;
    updateUI(newLines);
    await saveSettings(newLines);
  }
}

async function increaseLines() {
  const currentLines = parseInt(lineCountDisplay.textContent);
  if (currentLines < MAX_LINES) {
    const newLines = currentLines + 1;
    updateUI(newLines);
    await saveSettings(newLines);
  }
}

function showStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? '#d93025' : '#137333';
  status.classList.add('show');
  
  setTimeout(() => {
    status.classList.remove('show');
  }, 2000);
} 