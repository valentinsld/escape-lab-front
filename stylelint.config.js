module.exports = {
  extends: ['stylelint-config-good-scss', 'stylelint-config-prettier'],
  rules: {
    'no-descending-specificity': null,
    'no-empty-source': null,
    'function-calc-no-unspaced-operator': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ]
  }
}
