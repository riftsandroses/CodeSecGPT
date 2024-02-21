// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import OpenAI from "openai";

const prompt = 'ENTER_PRE-DETERMINED_PROMPT_HERE';

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

		
		vscode.window.showInformationMessage(finalPrompt);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
