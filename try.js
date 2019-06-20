const yargs = require('yargs');

const args = yargs
  .options({
    'n': {
      alias: 'nasa',
      describe: 'Choose NASA photo',
      type: 'boolean'
    },
    'g': {
      alias: 'ng',
      describe: 'Choose National Geographic photo',
      type: 'boolean'
    },
    'l': {
      alias: 'locale',
      describe: 'Bing locale option',
      type: 'string',
      default: 'en-US',
      choices: ['ar-XA', 'bg-BG', 'cs-CZ', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-ID', 'en-IE', 'en-IN', 'en-MY', 'en-NZ', 'en-PH', 'en-SG', 'en-US', 'en-XA', 'en-ZA', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'es-US', 'es-XL', 'et-EE', 'fi-FI', 'fr-BE', 'fr-CA', 'fr-CH', 'fr-FR', 'he-IL', 'hr-HR', 'hu-HU', 'it-IT', 'ja-JP', 'ko-KR', 'lt-LT', 'lv-LV', 'nb-NO', 'nl-BE', 'nl-NL', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sk-SK', 'sl-SL', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'zh-CN', 'zh-HK', 'zh-TW']
    },
    'r': {
      alias: 'resolution',
      describe: 'Bing resolution option',
      type: 'string',
      default: '1920x1080',
      choices: ['800x600', '1024x768', '1280x720', '1280x768', '1366x768', '1920x1080', '1920x1200']
    },
    'k': {
      alias: 'key',
      describe: 'NASA API key',
      type: 'string',
      default: 'DEMO_KEY'
    },
    'd': {
      alias: 'date',
      describe: 'NASA date option (YYYY-mm-dd)',
      type: 'string',
      default: new Date().toISOString().slice(0, 10)
    },
    'o': {
      alias: 'option',
      describe: 'Linux background display option',
      type: 'string',
      default: 'zoom',
      choices: ['none', 'wallpaper', 'centered', 'scaled', 'stretched', 'zoom', 'spanned']
    }
  })
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .argv;
  
  // if no command then show help
if (!args._[0]) {
  yargs.showHelp();
}