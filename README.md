# HB Sailing Companion

A browser extension that enhances the [Humber Bay Sailing Centre website](https://www.hbsailing.com/) with additional weather information and user experience improvements.

## Features

- Weather data visualization
- Real-time wind conditions

## Installation

### Chrome

1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) and search for "HB Sailing Companion"
2. Click "Add to Chrome"
3. Confirm the installation when prompted

### Firefox

1. Visit the [Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/) and search for "HB Sailing Companion"
2. Click "Add to Firefox"
3. Confirm the installation when prompted

### Manual Installation

For development or testing:

1. Download the latest release from the [releases page](https://github.com/tuliof/hb-sailing-companion/releases)
2. For Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist_chrome` folder
3. For Firefox:
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select any file in the `dist_firefox` folder

## Usage

After installation, navigate to the [Humber Bay Sailing Centre website](https://www.hbsailing.com/). The extension will automatically enhance the page with additional weather information and features.

Click on the extension icon in your browser toolbar to access settings and customization options.

## Development

### Prerequisites

**I strongly suggest [Bun](https://www.bun.sh)** over all other runtime and package managers

or

- Node.js (v14 or later)
- npm or yarn

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/tuliof/hb-sailing-companion
   cd hb-sailing-companion
   ```

2. Install dependencies:

   ```bash
   bun i
   ```

### Build

- Build for development:

   ```bash
   bun dev
   ```

- Build for production:

   ```bash
   bun run build
   ```

- Build for specific browsers:

   ```bash
   bun build:chrome
   bun build:firefox
   ```

### Code Style

This project uses [Biome](https://biomejs.dev/) for formatting and linting. To check your code:

```bash
bun lint
```

To automatically fix formatting issues:

```bash
bun format
```

## Technologies

This extension is built with:

- [React](https://reactjs.org/) - Frontend UI library
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/) - For Chrome integration
- [Firefox WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) - For Firefox integration
- [Open-Meteo API](https://open-meteo.com/en/docs) - Weather data provider
- [Biome](https://biomejs.dev/) - Linter and code formatter, a better alternative to eslint and prettier

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Future integration planned with Environment Canada data sources
