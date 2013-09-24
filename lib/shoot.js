var Game = {};

Game.size = 15;

Game.items = {
    ship: '✈',
    wep: '↣',
    sep: '·',
    explode1: '✦',
    explode2: '✺',
    lup1: '✪'
};
Game.keys = _.keys(Game.items);

Game.generate = function() {
    var i = this.size * 10;
    var seq = [], ident, l = this.keys.length;
    while (i--) {
        if (_.random(0,7) === 1) {
            ident = this.keys[_.random(1, l - 1)];
        } else {
            ident = 'sep';
        }
        seq.push(ident);
    }
    return seq;
}.bind(Game);

Game.map = Game.generate();
console.log(Game.map);

Game.frame = ['ship'];

// Take an array of items and display it
Game.display = function(seq) {
    seq.unshift('ship');
    var str = seq.map(function(seq) {
        return Game.items[seq] || Game.items.sep;
    }).join(' ');
    window.history.replaceState(null, '', '#'+str);
}.bind(Game);

Game.ticker = function(e) {
    if (this.map.length < this.size + 2) {
        this.map = this.map.concat(this.generate());
    }
    this.display(this.frame = _.first(this.map, this.size));
    this.map.shift();
}.bind(Game);

var last = 0;
function animate(timestamp) {
    if (timestamp - last > 150) {
        Game.ticker();
        last = timestamp;
    }
    requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
