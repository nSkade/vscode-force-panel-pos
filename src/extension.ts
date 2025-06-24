import * as vscode from 'vscode';

function getPanelCommand(location: string): string {
    switch (location) {
        case 'left':
            return 'workbench.action.positionPanelLeft';
        case 'bottom':
            return 'workbench.action.positionPanelBottom';
        case 'right':
        default:
            return 'workbench.action.positionPanelRight';
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Internal state: track if the panel is open (true) or closed (false)
    let panelOpen = false;

    // Helper to open the panel and set position
    async function openPanel() {
        await vscode.commands.executeCommand('workbench.action.togglePanel'); // Opens if closed, closes if open
        // But since we don't know the state, we always set it to open
        panelOpen = true;
        // Set position (optional)
        const config = vscode.workspace.getConfiguration('forcePanelPos');
        const location = config.get<string>('location', 'right');
        const command = getPanelCommand(location);
        await vscode.commands.executeCommand(command);
    }

    // Helper to close the panel
    async function closePanel() {
        await vscode.commands.executeCommand('workbench.action.closePanel');
        panelOpen = false;
    }

    // Toggle logic
    async function togglePanel() {
        if (panelOpen) {
            await closePanel();
        } else {
            await openPanel();
        }
        updateStatusBar();
    }

    // Status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'forcePanelPos.togglePanel';
    context.subscriptions.push(statusBarItem);

    // Update status bar text based on panel state
    function updateStatusBar() {
        statusBarItem.text = panelOpen ? '$(panel) Hide Panel' : '$(panel) Show Panel';
        statusBarItem.tooltip = panelOpen ? 'Hide Workspace Panel' : 'Show Workspace Panel';
        statusBarItem.show();
    }

    // Register command
    const disposableToggle = vscode.commands.registerCommand('forcePanelPos.togglePanel', togglePanel);
    context.subscriptions.push(disposableToggle);

    // Optionally, set initial panel position (does open it)
    //const config = vscode.workspace.getConfiguration('forcePanelPos');
    //const location = config.get<string>('location', 'right');
    //const command = getPanelCommand(location);
    //vscode.commands.executeCommand(command);

    // Watch for configuration changes
    const configWatcher = vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('forcePanelPos.location')) {
            const config = vscode.workspace.getConfiguration('forcePanelPos');
            const location = config.get<string>('location', 'right');
            const command = getPanelCommand(location);
            vscode.commands.executeCommand(command);
        }
    });
    context.subscriptions.push(configWatcher);

    // Initialize status bar
    updateStatusBar();
}

export function deactivate() {}
