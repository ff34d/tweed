import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import { promises as fs } from "node:fs"
import path from "node:path"
import dts from "rollup-plugin-dts"
import generatePackageJson from "rollup-plugin-generate-package-json"

/** @type {import("rollup").RollupOptions[]} */
const config = [
  /* === JavaScript config === */
  {
    input: "src/main.ts",
    plugins: [typescript(), terser()],
    output: [
      {
        file: "dist/lib/cjs/index.cjs.js",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/lib/esm/index.esm.js",
        format: "esm",
        sourcemap: true
      }
    ]
  },
  /* === DTS config === */
  {
    input: "src/main.ts",
    plugins: [
      dts(),
      /* Generate package json file */
      /* Used here, because DTS executed once */
      generatePackageJson({
        outputFolder: "dist",
        baseContents: (file) => {
          const content = file

          delete content.devDependencies
          delete content.scripts

          return content
        }
      }),
      /* Copy files to dist */
      /* Used here, because DTS executed once */
      copyPlugin({
        targets: [
          { src: "LICENSE", dest: "dist/LICENSE" },
          { src: "README.md", dest: "dist/README.md" }
        ]
      })
    ],
    output: {
      file: "dist/types/index.d.ts",
      format: "es",
      sourcemap: true
    }
  }
]

export default config

/*
 * ==========
 * Custom plugins for rollup
 * ==========
 */

/**
 * Copy files plugin.
 * @param {{targets: {src: string, dest: string}[]}} options - target.src is path for copy file, target.dest is destination path.
 */
function copyPlugin(options = {}) {
  const { targets = [] } = options

  return {
    name: "my-copy-plugin",

    async buildEnd() {
      for (const target of targets) {
        const { src, dest } = target

        try {
          const resolveSource = path.resolve(src)
          const resolvedDestination = path.resolve(dest)

          try {
            await fs.access(resolveSource)
          } catch {
            this.error(`Source file does not exist: ${src}`)
            continue
          }

          await fs.mkdir(path.dirname(resolvedDestination), { recursive: true })

          await fs.copyFile(resolveSource, resolvedDestination)
          this.info(`Copied ${src} to ${dest}`)
        } catch (error) {
          this.error(`Failed to copy ${src} to ${dest}: ${error.message}`)
        }
      }
    }
  }
}
