# ClicClack

Ce projet est développé dans le cadre du master DMII 1ère année de Gobelins.

Version en ligne : https://clic-clack.herokuapp.com/

## Setup du projet

### Installer les dépendances
```
yarn install
```

### Compilation et lancement pour le développement
```
yarn serve
```

### Compilation et minify pour la production
```
yarn build
```

### Lints et fixes des fichiers
```
yarn lint
```

## Code rules

### Vue js
- Approche Single File Component

Les scripts suivent les règles **es6** et +.

### Styles
- Scoped par composant avec import de styles globaux
- `.scss` et nommage en `BEM`

### Linters
- [Husky](https://github.com/typicode/husky/tree/master) with hooks on commit message and pushed
- [Commitlint](https://github.com/conventional-changelog/commitlint) - configuration par défaut et commitizen
- [Eslint](https://eslint.org/https://eslint.org/) - Vue config, Prettier et Pretty
- [Stylelint](https://stylelint.io/) avec configuration stylelint-scss par défaut

## Workflow Branches

Créez votre branche à partir de main et la nommer de la manière suivante :
features/your-feature ou fixes/your-fix...

Une fois la feature terminée, merger la branche sur dev.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
