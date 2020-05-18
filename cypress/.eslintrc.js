module.exports = {
  root: true, // in this case, don't want conflict in rules that would otherwise be imported from root directory. Ends root here.
  plugins: ['eslint-plugin-cypress'],
  extends: ['plugin:cypress/recommended'], // cypress recommended rules should be enabled?
  env: { 'cypress/globals': true }, //globals come from eslint plugin we installed
};
