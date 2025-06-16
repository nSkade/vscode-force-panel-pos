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
    function applyPanelPosition() {
        const config = vscode.workspace.getConfiguration('forcePanelPos');
        const location = config.get<string>('location', 'right');
        const command = getPanelCommand(location);
        vscode.commands.executeCommand(command);
    }

    // Move panel to the configured location on activation
    applyPanelPosition();

    // Move panel to the configured location every 10 seconds
    const interval = setInterval(() => {
        applyPanelPosition();
    }, 10000);

    // Watch for configuration changes
    const configWatcher = vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('forcePanelPos.location')) {
            applyPanelPosition();
        }
    });

    context.subscriptions.push(
        { dispose: () => clearInterval(interval) },
        configWatcher
    );
}

export function deactivate() {}
