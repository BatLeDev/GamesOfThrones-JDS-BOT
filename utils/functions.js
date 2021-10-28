const mongoose = require("mongoose");
const { User } = require("../models/index")

module.exports = bot => {
    bot.createUser = async user => { //Pour ajouter un utilisateur a la base de donnée
        const createUser = new User(user);
        await createUser.save();
    };

    bot.getUser = async id => { //Pour récuperer un utilisateur dans la base de donnée
        const data = await User.findOne({ userId: id });
        if (data) return data;
    };

    bot.updateUser = async (user, usersettings) => { //Pour modifier une valeur d'un utilisateur dans la base de donnée
        return await User.findOneAndUpdate(user, usersettings);
    };

    bot.randomize = tab => { //C'est pour mélanger un tableau
        for (let pas = 0; pas < 5; pas++) {
            var i, j, tmp;
            for (i = tab.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = tab[i];
                tab[i] = tab[j];
                tab[j] = tmp;
            }
        };
        return tab;
    };
};