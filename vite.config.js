import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { defineConfig, loadEnv } from "vite";
import rehypePrettyCode from "rehype-pretty-code";

const configHorizonsViteErrorHandler = `
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			if (
				addedNode.nodeType === Node.ELEMENT_NODE &&
				(
					addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
					addedNode.classList?.contains('backdrop')
				)
			) {
				handleViteOverlay(addedNode);
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true
});

function handleViteOverlay(node) {
	if (!node.shadowRoot) {
		return;
	}

	const backdrop = node.shadowRoot.querySelector('.backdrop');

	if (backdrop) {
		const overlayHtml = backdrop.outerHTML;
		const parser = new DOMParser();
		const doc = parser.parseFromString(overlayHtml, 'text/html');
		const messageBodyElement = doc.querySelector('.message-body');
		const fileElement = doc.querySelector('.file');
		const messageText = messageBodyElement ? messageBodyElement.textContent.trim() : '';
		const fileText = fileElement ? fileElement.textContent.trim() : '';
		const error = messageText + (fileText ? ' File:' + fileText : '');

		window.parent.postMessage({
			type: 'horizons-vite-error',
			error,
		}, '*');
	}
}
`;

const configHorizonsRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
	const errorDetails = errorObj ? JSON.stringify({
		name: errorObj.name,
		message: errorObj.message,
		stack: errorObj.stack,
		source,
		lineno,
		colno,
	}) : null;
	
	window.parent.postMessage({
		type: 'horizons-runtime-error',
		message,
		error: errorDetails
	}, '*');
};
`;

const configHorizonsConsoleErrroHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
	originalConsoleError.apply(console, args);

	let errorString = '';

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg instanceof Error) {
			errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
			break;
		}
	}

	if (!errorString) {
		errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
	}

	window.parent.postMessage({
		type: 'horizons-console-error',
		error: errorString
	}, '*');
};
`;

const configWindowFetchMonkeyPatch = `
const originalFetch = window.fetch;

window.fetch = function(...args) {
	const url = args[0] instanceof Request ? args[0].url : args[0];

	// Skip WebSocket URLs
	if (url.startsWith('ws:') || url.startsWith('wss:')) {
		return originalFetch.apply(this, args);
	}

	return originalFetch.apply(this, args)
		.then(async response => {
			const contentType = response.headers.get('Content-Type') || '';

			// Exclude HTML document responses
			const isDocumentResponse =
				contentType.includes('text/html') ||
				contentType.includes('application/xhtml+xml');

			if (!response.ok && !isDocumentResponse) {
					const responseClone = response.clone();
					const errorFromRes = await responseClone.text();
					const requestUrl = response.url;
					console.error(\`Fetch error from \${requestUrl}: \${errorFromRes}\`);
			}

			return response;
		})
		.catch(error => {
			if (!url.match(/\.html?$/i)) {
				console.error(error);
			}

			throw error;
		});
};
`;

const addTransformIndexHtml = {
  name: "add-transform-index-html",
  transformIndexHtml(html) {
    return {
      html,
      tags: [
        {
          tag: "script",
          attrs: { type: "module" },
          children: configHorizonsRuntimeErrorHandler,
          injectTo: "head",
        },
        {
          tag: "script",
          attrs: { type: "module" },
          children: configHorizonsViteErrorHandler,
          injectTo: "head",
        },
        {
          tag: "script",
          attrs: { type: "module" },
          children: configHorizonsConsoleErrroHandler,
          injectTo: "head",
        },
        {
          tag: "script",
          attrs: { type: "module" },
          children: configWindowFetchMonkeyPatch,
          injectTo: "head",
        },
      ],
    };
  },
};

export default defineConfig(({ mode }) => {
  // Load env file based on mode with VITE_ prefix
  const env = loadEnv(mode, process.cwd(), "VITE_");

  console.log(`\n🔧 Vite running in "${mode}" mode`);
  console.log(`📁 Loading env files for mode: ${mode}`);
  console.log(`🔥 Firebase Project ID: ${env.VITE_FIREBASE_PROJECT_ID}`);

  return {
    plugins: [
      {
        enforce: "pre",
        ...mdx({
          providerImportSource: "@mdx-js/react",
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: "one-dark-pro",
                  light: "github-light",
                },
                keepBackground: false,
              },
            ],
          ],
        }),
      },
      react(),
      addTransformIndexHtml,
    ],
    // Explicitly pass env variables to the app
    define: {
      "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(
        env.VITE_FIREBASE_API_KEY,
      ),
      "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
        env.VITE_FIREBASE_AUTH_DOMAIN,
      ),
      "import.meta.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(
        env.VITE_FIREBASE_PROJECT_ID,
      ),
      "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
        env.VITE_FIREBASE_STORAGE_BUCKET,
      ),
      "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
        env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      ),
      "import.meta.env.VITE_FIREBASE_APP_ID": JSON.stringify(
        env.VITE_FIREBASE_APP_ID,
      ),
    },
    server: {
      cors: true,
      headers: {
        "Cross-Origin-Embedder-Policy": "credentialless",
      },
      allowedHosts: true,
    },
    resolve: {
      extensions: [".jsx", ".js", ".tsx", ".ts", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Enable minification
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
        },
      },
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for React and related libraries
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            // UI component libraries
            "ui-vendor": [
              "@radix-ui/react-toast",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-slot",
            ],
            // Animation libraries
            "animation-vendor": ["framer-motion", "gsap", "lenis"],
            // i18n libraries
            "i18n-vendor": [
              "i18next",
              "react-i18next",
              "i18next-browser-languagedetector",
              "i18next-http-backend",
            ],
            // Syntax highlighting
            "syntax-vendor": ["react-syntax-highlighter", "react-markdown"],
          },
        },
      },
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 1000,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize assets
      assetsInlineLimit: 4096, // Inline assets smaller than 4kb
      // Source maps for production debugging (set to false for smaller bundle)
      sourcemap: false,
    },
    // Performance optimizations
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "framer-motion",
        "gsap",
        "gsap/ScrollTrigger",
        "gsap/SplitText",
        "lenis",
        "i18next",
        "react-i18next",
      ],
    },
  };
});
