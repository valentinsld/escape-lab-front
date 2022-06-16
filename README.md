# ClicClack

ClicClack est un projet réalisé par une équipe d’étudiants en Master Design et Management de l’Innovation Interactive à Gobelins, l’école de l’Image, pour leur jury de fin d’année.

Version en ligne : https://clic-clack.herokuapp.com/

Design : [Axel Crouilbois](https://www.behance.net/axelcrb) et [Lisa Levavasseur](http://lisalevavasseur.fr/)
Développement : [Timothée Blanchard](https://www.timblanchard.com/), [Valentin Slaud](https://www.valentinsld.fr/) et [Robin Verona](https://github.com/anorev)
Remerciement : [Adrien Melchior](https://adrienmelchior.fr/)

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
