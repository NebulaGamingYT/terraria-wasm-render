async function downloadGameFiles() {
    const url = "https://github.com/NebulaGamingYT/terraria-wasm-render/releases/download/gamefiles/Terraria.Steam.Directory.zip";

    const response = await fetch(url);
    const blob = await response.blob();

    const zip = await JSZip.loadAsync(blob);

    for (const name in zip.files) {
        const file = zip.files[name];

        if (!file.dir) {
            const data = await file.async("arraybuffer");

            const path = "/terraria/" + name;
            const dir = path.substring(0, path.lastIndexOf("/"));

            FS.mkdirTree(dir);
            FS.writeFile(path, new Uint8Array(data));
        }
    }

    console.log("Game files ready");
}

downloadGameFiles();
