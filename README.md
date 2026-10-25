<h1 align="center">Windows 11 Pro Debloat Guide</h1>

<p align="center">
  A documented, personal Windows 11 Pro setup: installation steps, service decisions,
  scheduled tasks, network observations and the tradeoffs behind each choice.
</p>

<p align="center">
  <a href="https://xodo2fast4u.github.io/windows-11-pro-debloat/">Visit the live website</a>
  ·
  <a href="https://github.com/xodo2fast4u/windows-11-pro-debloat">View the GitHub repository</a>
</p>

## About

This repository contains a static website documenting one Windows 11 Pro installation (build 10.0.26100.1742) on a specific older PC. It is a reference, not a debloating application, automated script or universal configuration. The hardware, software needs and choices described may not fit another computer.

The site includes an interactive service inventory, a step-by-step installation timeline, scheduled-task notes, network-address observations and cautions about the effects of the changes.

## Important Safety Notice

The documented setup disables Windows Update and blocks some Microsoft delivery addresses. This can prevent security patches and Microsoft Defender definition updates from arriving, leaving the computer more exposed to security threats. The address observations may also become outdated and disabling services or tasks can break features other PCs rely on.

Do not apply these settings blindly. Review the risks and verify every change against your own hardware and requirements. Back up important data and create a recovery point before making system changes. For a regularly connected PC, keeping Windows and Defender up to date is strongly recommended.

The guide describes using third-party tools, including [Chris Titus Tech's WinUtil](https://github.com/ChrisTitusTech/winutil) and [Raphi's Win11Debloat](https://github.com/Raphire/Win11Debloat). Review each tool's current documentation and options before running it; this site does not distribute or maintain those tools.

## Run Locally

No build step, package manager or dependency installation is required. Open `index.html` in a browser or serve the project directory locally:

```bash
git clone https://github.com/xodo2fast4u/windows-11-pro-debloat.git
cd windows-11-pro-debloat
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

The service search, verdict filter, theme selector and copy-address buttons use the included JavaScript files. The site can also be published to a static web host by serving the repository's files from its document root.

The published site is hosted with GitHub Pages at <https://xodo2fast4u.github.io/windows-11-pro-debloat/>.

## Project Files

| File                                                                          | Purpose                                                             |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`index.html`](index.html)                                                    | Page content, navigation, metadata and interactive controls' markup |
| [`styles.css`](styles.css)                                                    | Responsive layout, visual styling and light/dark theme rules        |
| [`script.js`](script.js)                                                      | Theme selection, service filtering and copy-address interactions    |
| [`services.js`](services.js)                                                  | Service inventory data displayed by the page                        |
| [`site.webmanifest`](site.webmanifest)                                        | Web app name, display preferences and icon references               |
| `favicon*.png`, `favicon.ico`, `apple-touch-icon.png`, `android-chrome-*.png` | Browser and device icons                                            |
| [`about.txt`](about.txt)                                                      | Attribution and license details for the favicon artwork             |
| [`LICENSE`](LICENSE)                                                          | MIT License for this project                                        |

## Updating the Guide

- Edit the page's sections and labels in `index.html`.
- Update service names, states, startup types, decisions and explanations in `services.js`.
- Keep the service filtering fields in `script.js` aligned with the inventory structure if that structure changes.
- Update the favicon attribution in `about.txt` if the icon artwork changes.
- Recheck claims about Windows services, scheduled tasks and network addresses after Windows updates; these details can change across builds and over time.

## License

This project is licensed under the [MIT License](LICENSE). The favicon artwork has its own attribution and license; see [`about.txt`](about.txt).
