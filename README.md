# force-panel-pos

**force-panel-pos** is a Visual Studio Code extension that automatically moves the workbench panel (Terminal, Problems, Output, Debug Console) to your preferred position—right, bottom, or left—on startup and keeps it there, even if you move it manually.

---

## Features

- Automatically positions the VS Code workbench panel to your chosen side (right, bottom, or left) on startup.
- Monitors for manual moves and re-applies your preferred position every 10 seconds.
- Updates panel position immediately when you change the setting—no reload required.

---

## Requirements

- No special requirements.  
- Works with VS Code 1.89.0 and later.

---

## Extension Settings

This extension contributes the following setting:

| Setting                       | Description                                      | Default |
|-------------------------------|--------------------------------------------------|---------|
| `forcePanelPos.location`      | Where should the panel be forced to? (`right`, `bottom`, `left`) | `right`  |

**How to use:**
- Open VS Code Settings (`Ctrl+,`).
- Search for “Force Panel Pos”.
- Choose your preferred panel location.

---

## Known Issues

none

---

## Release Notes

- **v0.0.1**: Initial release with configurable panel position and auto-enforcement.

---

## Following extension guidelines

Ensure that you've read through the [VS Code extension guidelines](https://code.visualstudio.com/api/references/extension-guidelines) and follow best practices.

---

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

---

**Enjoy customizing your VS Code panel position!**
