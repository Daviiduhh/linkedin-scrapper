import esbuild from "esbuild"

esbuild.build({
    entryPoints: ["src/sw.js", "src/scripts/scrapper.js"],
    watch: true,
    bundle: true,
    outdir: "dist",
    minify: true,
    //target: "chrome"
})
.then(res => console.log(res))
.catch(e => console.log(e))