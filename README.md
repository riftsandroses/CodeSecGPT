# CodeSecGPT (A Visual Studio Code Extension)

![coDESECGPT](https://github.com/riftsandroses/CodeSecGPT/assets/63180210/435444ad-c2fe-4f75-95e6-e04308ea741e)

**Secure your code with the power of Google's Gemini-Pro LLM!**

CodeSecGPT-Enterprise is a VSCode extension that leverages the advanced capabilities of Google's Gemini-Pro language model to help you identify and fix security vulnerabilities in your code. With its intuitive interface and seamless integration, CodeSecGPT-Enterprise empowers you to write more secure code and streamline your development workflow.

## Features

* **AI-powered vulnerability detection:** CodeSecGPT-Enterprise analyzes your code using Gemini-Pro, pinpointing potential security issues based on its vast knowledge of code patterns and common vulnerabilities.
  
* **Actionable suggestions:** CodeSecGPT-Enterprise doesn't just highlight vulnerabilities; it provides tailored suggestions for fixing them, guiding you towards more secure coding practices.
  
* **Seamless integration:** CodeSecGPT-Enterprise works directly within your VSCode environment, offering real-time feedback as you code.
  
* **Customization options:** You can fine-tune the extension's behavior to match your specific coding style and preferences.
  
* **Change logging:** All code modifications suggested by CodeSecGPT-Enterprise and applied by the user are automatically logged for traceability and audit purposes.

## Requirements

* **Visual Studio Code:** Ensure you have the latest version of VSCode installed.
* **Gemini API access:** You'll need an Gemini API key to enable communication with the Gemini-Pro model.

## Installation

**Prerequisites:**

* Node.js, npm, and TypeScript installed on your system.
* Change the Google Gemini API Keys to your own in the source code.
* Visual Studio Code or Visual Studio Code Insider on system.

**Steps:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/riftsandroses/CodeSecGPT
   ```

2. **Navigate to the project directory:**

   ```bash
   cd CodeSecGPT
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Build the VSIX package:**

   ```bash
   tsc -p . && vsce package
   ```

5. **Install the VSIX package:**

      - Open the VSCode Extensions view (**Ctrl+Shift+X** or **Cmd+Shift+X** on macOS).
      - Click the three dots (...) in the top right corner and select "Install from VSIX...".
      - Select the VSIX file you created in step 4.

## Usage

Step-1: Open your code file in VSCode.
   
   ![1](https://github.com/riftsandroses/CodeSecGPT-Enterprise/assets/63180210/cd825c57-94b1-4012-ae5c-e07c5e63bc07)
   
Step-2: Select the line(s) of code that you want to fix.

![2](https://github.com/riftsandroses/CodeSecGPT-Enterprise/assets/63180210/dfcb5e5d-ebc2-4b34-9bb4-6b2fbbdf3d66)

Step-3: Right click the selected line(s) of code. A menu with various options will appear.

![3](https://github.com/riftsandroses/CodeSecGPT-Enterprise/assets/63180210/10e343aa-ecab-4dd2-99fa-0223a9e93185)

Step-4: Click on the option that says "Fix using CodeSecGPT"

![4](https://github.com/riftsandroses/CodeSecGPT-Enterprise/assets/63180210/6a5a24f7-4130-4e9b-94bf-05b6f941c9f7)

Step-5: Review the suggested changes in the QuickPick Menu that appears.

![5](https://github.com/riftsandroses/CodeSecGPT-Enterprise/assets/63180210/8c9fa844-9027-4446-9546-41610efa97a0)

Step-6: Click on "Replace" Button to replace with the current suggestion or click on "Cancel".

![6](https://github.com/riftsandroses/CodeSecGPT-Enterprise/assets/63180210/0a29d8b2-fac0-463a-870e-4f1b2005f53a)


## Known Issues

 **Accuracy may vary:** While Gemini-Pro is highly advanced, it's still under development, and its accuracy in detecting vulnerabilities can vary depending on several factors, including:
- Code complexity: The model may struggle with highly complex or obfuscated code, potentially leading to missed vulnerabilities or false positives.
- Data availability: The model's training data plays a significant role in its performance. If the training data lacked specific vulnerabilities or coding styles, the model might be less effective in detecting them.
- Temperature setting: The temperature parameter in Gemini-Pro controls the randomness of its outputs. Higher temperatures can lead to more creative and diverse suggestions, but also potentially increase the risk of inaccurate or irrelevant recommendations. It's crucial to experiment and find the optimal temperature setting for your specific needs and codebase.

## Following Extension Guidelines

This extension adheres to the best practices outlined in the [VSCode extension guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

**Enjoy !**
