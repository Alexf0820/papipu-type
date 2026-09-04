import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { createRequire } from "node:module";

import ts from "typescript";

const EXTENSIONS = [".ts", ".tsx", ".js", ".mjs"];

function resolveModulePath(candidate) {
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;

  if (!extname(candidate)) {
    for (const extension of EXTENSIONS) {
      if (existsSync(`${candidate}${extension}`)) return `${candidate}${extension}`;
    }

    for (const extension of EXTENSIONS) {
      const indexPath = resolve(candidate, `index${extension}`);
      if (existsSync(indexPath)) return indexPath;
    }
  }

  throw new Error(`Cannot resolve TypeScript module: ${candidate}`);
}

/**
 * Load the repository's small TypeScript data/engine modules from Node-only
 * development tooling. It intentionally does not participate in the app's
 * runtime or build output.
 */
export function createTypeScriptModuleLoader(projectRoot) {
  const cache = new Map();
  const nodeRequire = createRequire(resolve(projectRoot, "package.json"));

  function load(filePath) {
    const resolvedPath = resolveModulePath(filePath);
    if (cache.has(resolvedPath)) return cache.get(resolvedPath).exports;

    const loadedModule = { exports: {} };
    cache.set(resolvedPath, loadedModule);

    const source = readFileSync(resolvedPath, "utf8");
    const output = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: resolvedPath,
    }).outputText;

    const localRequire = (specifier) => {
      if (specifier.startsWith("@/")) {
        return load(resolve(projectRoot, "src", specifier.slice(2)));
      }
      if (specifier.startsWith(".")) {
        return load(resolve(dirname(resolvedPath), specifier));
      }
      return nodeRequire(specifier);
    };

    const execute = new Function(
      "require",
      "module",
      "exports",
      "__filename",
      "__dirname",
      output,
    );
    execute(
      localRequire,
      loadedModule,
      loadedModule.exports,
      resolvedPath,
      dirname(resolvedPath),
    );
    return loadedModule.exports;
  }

  return { load };
}
