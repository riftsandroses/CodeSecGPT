import * as vscode from 'vscode';
import * as fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prompt = 'Fix the security vulnerabilities in this code and only return the fixed code as output: ';

let apiKey: string | undefined;
async function ensureApiKey(): Promise<string> {
	if(!apiKey) {
		apiKey = await vscode.window.showInputBox({
			prompt: 'Enter your Gemini API Key: ',
			placeHolder: 'Enter your API Key here'
		});

		if(!apiKey) {
			throw new Error('API Key is required');
		}
	}
	return apiKey;
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('codesecgpt.useCodeSecGPT', async () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			return;
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		const finalPrompt = prompt + selectedText;
		
		const logFilePath = `${context.extensionPath}/extension.log`;
		const appendLog = (logMessage: string) => {
			fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${logMessage}\n`);
		};
		appendLog(`Selected text: ${selectedText}`);
		try {
			const apiKey = await ensureApiKey();
			
			const connectingMessage = "Connecting to CodeSecGPT........";
			vscode.window.showInformationMessage(connectingMessage);
			
			const genAI = new GoogleGenerativeAI(apiKey);
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
			const result = await model.generateContent(finalPrompt);
			const response = result.response;
			const formattedContent = response.text();

			const message = "Connection with CodeSecGPT Successful";
			vscode.window.showInformationMessage(message);
			
			const panel = vscode.window.createWebviewPanel(
				'Front-end',
				'CodeSecGPT',
				vscode.ViewColumn.Beside,
				{enableScripts: true}
			);

			panel.webview.html = getWebviewContent(finalPrompt, formattedContent);

			panel.webview.onDidReceiveMessage(
				message => {
					if (message.command === 'replace') {
						editor.edit(editBuilder => {
							editBuilder.replace(selection, message.content);
						}).then(success => {
							if (success) {
								vscode.window.showInformationMessage('Text replaced successfully.');
							} else {
								vscode.window.showErrorMessage('Failed to replace text.');
							}
						});
					}
				},
				undefined,
				context.subscriptions
			);
		} catch (error: unknown) {
			await vscode.window.showErrorMessage('Error fetching Gemini response: ' + error);

			appendLog(`Error: ${error}`);
		}
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(finalPrompt: string, formattedContent: string): string {
    const escapedFormattedContent = formattedContent
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Bubbles</title>
    <style>
        /* Styles for your chat bubbles */
        .bubble {
            margin: 10px;
            padding: 8px;
            background-color: #f1f1f1;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div id="chat">
        <div class="bubble">${finalPrompt}</div>
        <div class="bubble">${escapedFormattedContent} <button id="replaceBtn">Replace</button></div>
    </div>
    <script>
        const vscode = acquireVsCodeApi();
        const replaceBtn = document.getElementById('replaceBtn');
        replaceBtn.addEventListener('click', () => {
            vscode.postMessage({
                command: 'replace',
                content: \`${escapedFormattedContent}\`
            });
        });
    </script>
</body>
</html>`;
}

export function deactivate() {}