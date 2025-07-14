# Gmail Enhancer Chrome Extension

A lightweight Chrome extension that enhances your Gmail experience by expanding email preview text for better inbox visibility with customizable line count control.

## ✨ Features

- **📧 Customizable Email Previews**: Adjust email preview snippets from 1 to 6 lines (works best in Split pane view)
- **🎛️ Easy Controls**: Simple popup interface to increase/decrease preview lines
- **💾 Persistent Settings**: Your preferences are saved and synced across devices
- **📖 Improved Readability**: Enhanced line-height and formatting for easier scanning
- **⚡ Dynamic Updates**: Works seamlessly with Gmail's dynamic loading and navigation
- **🔄 Auto-Refresh**: Maintains expanded previews when Gmail updates content

## 🚀 Installation

### Install from Chrome Web Store
*Coming Soon - Extension pending review*

### Manual Installation (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/gmail-enhancer.git
   ```
   Or download as ZIP and extract

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Or go to Chrome Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `gmail-enhancer` folder
   - The extension will appear in your extensions list

5. **Verify Installation**
   - Look for the Gmail Enhancer in your extensions
   - Ensure it's enabled (toggle should be blue)
   - Pin the extension to see it in your toolbar

## 💡 Usage

### Basic Setup
1. **Open Gmail** in Chrome (`mail.google.com`)
2. **Navigate to your Inbox** or any email list view
3. **Notice the expanded previews** - Email snippets now show more lines of text
4. **Enjoy better email scanning** with more visible content at a glance

### Adjusting Preview Lines
1. **Click the extension icon** in your Chrome toolbar
2. **Use the +/- buttons** to increase or decrease preview lines (1-6 range)
3. **See live preview** in the popup showing how many lines will be displayed
4. **Settings auto-save** and apply immediately to Gmail

### Before vs After

**Before (Default Gmail):**
```
John Doe
Meeting tomorrow - Hi there, I wanted to confirm our meeting...
```

**After (Gmail Enhancer - 4 lines):**
```
John Doe
Meeting tomorrow - Hi there, I wanted to confirm our meeting
for tomorrow at 2 PM. I've prepared the agenda and will send
it over shortly. Please let me know if you need to reschedule
or if you have any specific topics to discuss.
```

**After (Gmail Enhancer - 6 lines):**
```
John Doe
Meeting tomorrow - Hi there, I wanted to confirm our meeting
for tomorrow at 2 PM. I've prepared the agenda and will send
it over shortly. Please let me know if you need to reschedule
or if you have any specific topics to discuss. Also, I wanted
to mention that we might need to cover the quarterly reports.
```

## 🔧 Technical Details

### Files Structure
```
gmail-enhancer/
├── manifest.json      # Extension configuration
├── content.js         # Main functionality
├── style.css         # Preview styling
├── popup.html        # Settings interface
├── popup.js          # Popup functionality
└── README.md         # Documentation
```

### Browser Compatibility
- ✅ Chrome (Manifest V3)
- ✅ Chromium-based browsers (Edge, Brave, etc.)

### Permissions
- `scripting`: Required to modify Gmail's preview text display
- `storage`: Required to save your preview line preferences
- `mail.google.com`: Extension only runs on Gmail

## 🎯 How It Works

The extension uses CSS modifications and JavaScript to:

1. **Target Gmail's preview elements** (`.y2` class)
2. **Override line-clamp restrictions** dynamically based on user settings
3. **Apply consistent styling** with improved line-height for readability
4. **Monitor DOM changes** to maintain functionality during Gmail's dynamic updates
5. **Save preferences** using Chrome's sync storage across devices

## 🔒 Privacy & Security

- **No data collection**: Extension doesn't collect, store, or transmit any personal data
- **Local operation only**: All functionality runs locally in your browser
- **Gmail-only access**: Extension only operates on `mail.google.com`
- **No external requests**: No communication with external servers
- **Settings sync**: Only your line count preference is synced via Chrome's built-in storage

## 🐛 Troubleshooting

### Extension Not Working?
1. Refresh Gmail page (`Ctrl+F5` or `Cmd+Shift+R`)
2. Check if extension is enabled in `chrome://extensions/`
3. Try disabling and re-enabling the extension
4. Clear Chrome cache and cookies for Gmail

### Previews Not Expanding?
1. Ensure you're viewing the inbox list (not conversation view)
2. Wait a few seconds for Gmail to fully load
3. Try adjusting the line count in the extension popup
4. Try navigating between folders (Inbox → Sent → Inbox)

### Settings Not Saving?
1. Make sure Chrome sync is enabled for extensions
2. Check that the extension has storage permissions
3. Try clicking the +/- buttons in the popup again

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup
1. Clone the repository
2. Make your changes
3. Load the extension in developer mode
4. Test thoroughly with Gmail
5. Submit a pull request

## 📝 Changelog

### v1.0.0
- Initial release
- Dynamic preview line control (1-6 lines)
- Popup settings interface with max indicator
- Persistent settings with Chrome sync
- Dynamic Gmail compatibility
- Improved readability styling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Support

If you find this extension helpful, please:
- ⭐ Star this repository
- 🐛 Report any issues
- 💡 Suggest new features
- 📢 Share with others who might benefit

## 🔗 Links

- [Report Issues](https://github.com/yourusername/gmail-enhancer/issues)
- [Feature Requests](https://github.com/yourusername/gmail-enhancer/issues/new)
- [Chrome Web Store](https://chrome.google.com/webstore) *(Coming Soon)*

