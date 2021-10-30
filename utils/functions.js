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
    bot.sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    bot.hasRole = (rolesCache, rolesId) => {
        if (typeof rolesId == "string") {
            for (let role of rolesCache) {
                if (role[0] == rolesId) {
                    return true;
                }
            }
        } else {
            for (let role of rolesCache) {
                for (let role2 of rolesId) {
                    if (role[0] == role2) {
                        return role[0];
                    }
                }
            }
        }
        return false;
    };
};
