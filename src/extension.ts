// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prompt = 'Fix syntax in this code: ';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codesecgpt.useCodeSecGPT', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			return;
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		const finalPrompt = prompt + selectedText;

		try {
			const apiKey = 'AIzaSyCfaImFDRU3zonTqh7cR1HKWBS9cowngeA';

			const genAI = new GoogleGenerativeAI(apiKey);
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });

			const result = await model.generateContent(finalPrompt);
			const response = await result.response;

			const formattedContent = response.text();

			await vscode.window.showInformationMessage(formattedContent);
		} catch (error: unknown) {
			await vscode.window.showErrorMessage('Error fetching Gemini response: ' + error);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
