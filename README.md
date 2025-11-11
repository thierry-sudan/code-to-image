🧩 Code-to-Image Generator

This script converts an entire source code directory (like src/) into one single giant PNG image. It’s a practical trick used to bypass AI context limits — instead of sending 10,000+ lines of code as text, you can send one compact image that contains everything.

🚀 Features

Recursively reads all files from a given folder (e.g., src/)

Includes each file name as a header before its contents

Renders the full code as monospaced text on a white background

Produces a single giant PNG image (src_code_full.png)

Optionally crops if the image height exceeds memory limits (~40,000 px)

🧠 Why

Large language models (LLMs) have a context window limit, meaning they can’t process very long codebases at once. By turning code into an image, you can still share or visualize huge projects in a single artifact, or let an AI “see” it via image input.

🔒 Security & Privacy Considerations

Code confidentiality – Converting code to an image does not make it safe to share publicly. Treat any sensitive or proprietary code carefully.

LLM privacy – Before feeding the image into any LLM, ensure the model or service respects data privacy and doesn’t retain your code.

Internal use recommended – For sensitive projects, use this tool locally rather than sending images to third-party APIs.

Optional encryption – Consider encrypting or obfuscating code if you must share images externally.

📦 Installation
npm install canvas
# or
yarn add canvas

⚙️ Usage
node code_to_image.js


This tool is perfect for visualizing huge projects, doing massive code reviews, or preparing codebases for LLMs with image input — just remember to keep security in mind.
