module.exports = (bot) => {
    bot.randomize = (tab) => {
        //C'est pour mélanger un tableau
        for (let pas = 0; pas < 5; pas++) {
            var i, j, tmp;
            for (i = tab.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = tab[i];
                tab[i] = tab[j];
                tab[j] = tmp;
            }
        }
        return tab;
    };
};
