# nodetake

A minimal CLI tool for taking notes directly from your terminal, organized as markdown files.

---

## Features

- Quickly add timestamped notes  
- Search notes by keyword  
- View today’s notes  
- Save quick ideas separately  
- Notes saved as Markdown (`.md`)  
- Organized by date and category  
- Perfect for developers and terminal-lovers

---

## Installation

```bash
npm install -g nodetake
```

Make sure you have [Node.js](https://nodejs.org/) installed.

---

## Usage

### Add a note

```bash
nodetake add "Fixed login bug for admin route"
```

### Find a note

```bash
nodetake find login
```

### View today’s notes

```bash
nodetake today
```

### Save a quick idea

```bash
nodetake idea "Auto-generate form UI from JSON schema"
```

### List all saved notes

```bash
nodetake list
```

---

## Notes Storage

All notes are stored in a hidden `.nodetake/` folder inside your current working directory.

Example structure:

```
.nodetake/
  ├── 2025-07-10.md
  ├── 2025-07-11.md
  ├── ideas.md
```

You can version-control this folder or back it up to your cloud!

---

## Why notecli?

> Because sometimes, opening Notion or VSCode to jot down a line is just... too much.

- Stay in your coding flow  
- Capture thoughts instantly  
- Markdown format = easily portable and readable  
- Works well with Git, VSCode, and any Markdown viewer

---

## 🛠 Future Plans

- Cloud sync (Dropbox, Google Drive)  
- Weekly summary view  
- Password-protected notes  
- Calendar-based view  
- Git commit hook integration

---

## Contributing

PRs are welcome! Feel free to submit ideas, bugs, or improvements.

To contribute:

```bash
git clone https://github.com/shax26/notecli.git
cd notecli
npm install
```

---

## License

MIT License — do whatever you want with it!

---

## Author

Made with ❤️ by [Shahadat Jaman](https://shax26.vercel.app/)  
For feedback or ideas: `open an issue` or DM me on GitHub.

---

## Links

- [NPM Package](https://www.npmjs.com/package/nodetake)  
- [GitHub Repo](https://github.com/shax26/notecli)  

