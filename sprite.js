const fs = require('fs');
const svgSprite = require('svg-sprite');
const spriteConfig = require('./sprite.config.js');

const iconFolder = 'public/icons';

const spriter = new svgSprite(spriteConfig);
const files = fs.readdirSync(iconFolder);
files.forEach((file) => {
  spriter.add(
    file,
    null,
    fs.readFileSync(iconFolder + '/' + file, { encoding: 'utf-8' })
  );
});

spriter.compile((err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.writeFileSync('public/sprite.svg', result.symbol.sprite.contents);
  console.log('Sprite generated!');
});
