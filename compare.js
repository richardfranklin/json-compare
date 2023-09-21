const fs = require("fs");

const getFileJson = (fileName) => {
  return JSON.parse(
    fs.readFileSync(fileName, {
      encoding: "utf8",
    })
  );
};

// LOOP THROUGH ALL FILES IN ORIGINAL JSON LOCIZE DIRECTORY
fs.readdir(`json/original`, (err, files) => {
  originalFilesFiltered = files.filter((file) => {
    return file !== ".DS_Store";
  });

  originalFilesFiltered.forEach((file) => {
    const language = file.substring(0, file.indexOf("_")); // get the language
    const originalLangJson = getFileJson(`json/original/${file}`);

    // Scan through the EN namespace file to match any
    fs.readdir(`json/locize/en-us`, (err, namespaceFiles) => {
      namespaceFiles.forEach((namespaceFile) => {
        const namespace = namespaceFile.substring(
          0,
          namespaceFile.indexOf(".")
        ); // get the namespace

        const namespaceEnJson = getFileJson(
          `json/locize/en-us/${namespaceFile}`
        );

        for (key in namespaceEnJson) {
          if (originalLangJson[key]) {
            namespaceEnJson[key] = originalLangJson[key];
          } else {
            delete namespaceEnJson[key];
          }
        }

        fs.writeFileSync(
          `json/final/${language}/final_${language}_${namespace}.json`,
          JSON.stringify(namespaceEnJson, null, 4)
        );
      });
    });
  });
});
