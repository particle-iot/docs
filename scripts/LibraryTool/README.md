# LibraryTool

Particle library tester and data generating tool for docs

## Usage

- Create a config.json in the top of the LibraryTool directory with your access token:

```json
{
    "accessToken":"xxx"
}
```

- Install dependencies and run

```
npm install
node app.js --fetch-library-list --download-libraries --test-builds --generate
```

Options:

- `--fetch-library-list` Downloads the library list from the API instead of using data/libraryList.json

- `--download-libraries` Downloads any missing libraries to data/libraries

- `--test-builds` Tests any libraries that have not been built. Build status is stored in data/libraryData.json

- `--generate` Generates data files in the docs repository

Note that data/libraries and data/libraryList.json are not committed to github, as they are huge and
can be regenerated if needed. The build status in data/libraryData.json is stored.


