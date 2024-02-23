import * as vscode from 'vscode';
import * as fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prompt = 'ENTER_THE_PRE-DETERMINED_PROMPT_HERE';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('codesecgpt.useCodeSecGPT', async () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			return;
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		const message = "Connecting to CodeSecGPT........";
		vscode.window.showInformationMessage(message);
		const finalPrompt = prompt + selectedText;
		
		const logFilePath = `${context.extensionPath}/extension.log`;
		const appendLog = (logMessage: string) => {
			fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${logMessage}\n`);
		};
		appendLog(`Selected text: ${selectedText}`);
		try {
			const apiKey = 'ENTER_GEMINI_API_KEY_HERE';
			const genAI = new GoogleGenerativeAI(apiKey);
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
			const result = await model.generateContent(finalPrompt);
			const response = result.response;
			const formattedContent = response.text();

			const message = "Connection with CodeSecGPT Successful";
			vscode.window.showInformationMessage(message);
			const displayText = "Do you want to replace '" + selectedText + "' with '" + formattedContent + "' ?";
			const replaceLineButton: vscode.QuickPickItem = { label: 'Replace Line'};
			const cancelButton: vscode.QuickPickItem = { label: 'Cancel'};
			const answer = await vscode.window.showQuickPick([replaceLineButton, cancelButton], {
			title: `${displayText}`,
			});
			if (answer === replaceLineButton) {
				editor.edit((editBuilder) => {
					editBuilder.replace(selection, formattedContent);
					vscode.window.showInformationMessage('Code replaced successfully');

					appendLog(`Generated content: ${formattedContent}`);

				}).then(() => {
					editor.selection = new vscode.Selection(selection.start.with(selection.start.line + 1, 0), selection.start.with(selection.start.line + 1, 0));
				});
			}
		} catch (error: unknown) {
			await vscode.window.showErrorMessage('Error fetching Gemini response: ' + error);

			appendLog(`Error: ${error}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}