🧩 Code-to-Image Generator

This script converts an entire source code directory (like src/) into one single giant PNG image.
It’s a practical trick used to bypass AI context limits — instead of sending 10,000+ lines of code as text, you can send one compact image that contains everything.

🚀 Features

Recursively reads all files from a given folder (e.g. src/)

Includes each file name as a header before its contents

Renders the full code as monospaced text on a white background

Produces a single giant PNG image (src_code_full.png)

Optionally crops if the image height exceeds memory limits (~40,000 px)

🧠 Why

Large language models (LLMs) have a context window limit, meaning they can’t process very long codebases at once.
By turning code into an image, you can still share or visualize huge projects in a single artifact, or let an AI “see” it via image input.

📦 Installation

npm install canvas
or
yarn add canvas 

⚙️ Usage
node code_to_image.js
