// Default settings
const DEFAULT_LINE_COUNT = 4;

// Current line count
let currentLineCount = DEFAULT_LINE_COUNT;

// Initialize extension
initializeExtension();

async function initializeExtension() {
  // Load saved settings
  await loadSettings();
  
  // Apply initial preview expansion
  expandPreviews();
  
  // Set up monitoring for Gmail changes
  setupGmailMonitoring();
}

async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['previewLines']);
    currentLineCount = result.previewLines || DEFAULT_LINE_COUNT;
  } catch (error) {
    currentLineCount = DEFAULT_LINE_COUNT;
  }
}

function expandPreviews() {
  const previews = document.querySelectorAll('.y2');
  
  previews.forEach((preview) => {
    // Store original styles if not already stored
    if (!preview.hasAttribute('data-original-clamp')) {
      preview.setAttribute('data-original-clamp', preview.style.webkitLineClamp || 'auto');
    }
    
    // Apply our styling
    preview.style.display = 'block';
    preview.style.overflow = 'visible';
    preview.style.webkitLineClamp = currentLineCount.toString();
    preview.style.whiteSpace = 'normal';
    preview.style.lineHeight = '1.4';
    
    // Force a repaint
    preview.offsetHeight;
  });
  
  // Also apply to any preview elements that might use different classes
  const additionalPreviews = document.querySelectorAll('.bog, .y6');
  additionalPreviews.forEach(preview => {
    if (!preview.classList.contains('y2')) { // Don't double-process
      preview.style.webkitLineClamp = currentLineCount.toString();
      preview.style.overflow = 'visible';
      preview.style.whiteSpace = 'normal';
    }
  });
}

function setupGmailMonitoring() {
  // Monitor DOM changes to Gmail interface
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any added nodes contain preview elements
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const hasPreview = node.querySelector && (
              node.querySelector('.y2') || 
              node.classList?.contains('y2')
            );
            if (hasPreview) {
              shouldUpdate = true;
            }
          }
        });
      }
    });
    
    if (shouldUpdate) {
      expandPreviews();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initial runs with delays to catch Gmail's loading
  setTimeout(() => {
    expandPreviews();
  }, 1000);

  setTimeout(() => {
    expandPreviews();
  }, 3000);

  setTimeout(() => {
    expandPreviews();
  }, 5000);

  // Handle navigation changes
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      expandPreviews();
    }, 1000);
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updatePreviewLines') {
    const newLineCount = request.lineCount;
    currentLineCount = newLineCount;
    expandPreviews();
    
    sendResponse({ 
      success: true, 
      appliedToElements: document.querySelectorAll('.y2').length,
      lineCount: currentLineCount 
    });
  } else {
    sendResponse({ success: false, error: 'Unknown action' });
  }
  
  return true; // Keep message channel open for async response
});

// Listen for storage changes (in case settings are changed from another tab)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.previewLines) {
    const newValue = changes.previewLines.newValue || DEFAULT_LINE_COUNT;
    currentLineCount = newValue;
    expandPreviews();
  }
});


  