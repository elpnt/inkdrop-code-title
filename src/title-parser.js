import visit from "unist-util-visit";

const { fontFamily: defaultFontFamily } = inkdrop.config.defaultSettings.editor;
const { fontFamily: customFontFamily } = inkdrop.config.settings.editor;
const fontFamily = customFontFamily || defaultFontFamily;

function escapeHtml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// unist-util-visit fucntion parses the below code
//
//   ```js:This is a hello function
//   fucntion hello() {
//     console.log('hello');
//   }
//   ```
//
// then yields a Node object like below
//
//   {
//     lang: "js:This",
//     meta: "is a hello function",
//     value: "function hello() {\n  console.log('hello');\n}",
//     type: "code",
//     position: ...
//   }

export default function parseTitle() {
	return (tree) => {
		visit(
			tree,
			(node) => node.type === "code" && !node.hasCodeTitle,
			(node, index, parent) => {
				const lang = node.lang;
				const meta = node.meta || "";
				let title = node.data.hProperties.title;

				// preserve mdast-node info in data field
				node.data = node.data || {};
				node.data.hProperties = node.data.hProperties || {};

				if (title || title === "") {
					node.hasCodeTitle = true;
					if (meta) title += " " + meta; // Allow white space in titles
					title = escapeHtml(title);
					if (title === "") title = capitaRize(lang); // If title is empty, fallback to lang

					const titleNode = {
						type: "html",
						value: fontFamily
							? `<div class="code-title" style="font-family: ${fontFamily};">${title}</div>`
							: `<div class="code-title">${title}</div>`,
					};

					parent.children.splice(index, 0, titleNode);
				}
			},
		);
	};
}
