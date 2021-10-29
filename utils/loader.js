const { readdirSync } = require("fs");

const loadCommands = (bot, dir = "./commands/") => {
    readdirSync(dir).forEach((dirs) => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
            files.endsWith(".js")
        );

        if (commands.length <= 0) {
            console.log(`0 commandes trouvées dans ${dirs}.`);
            return;
        }

        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            bot.commands.set(getFileName.help.name, getFileName);
        }

        console.log(`${commands.length} commande(s) trouvé dans ${dirs}`);
    });
};

const loadEvents = (bot, dir = "./events/") => {
    readdirSync(dir).forEach((dirs) => {
        const events = readdirSync(`${dir}/${dirs}/`).filter((files) =>
            files.endsWith(".js")
        );

        if (events.length <= 0) {
            console.log(`0 event trouvé dans ${dirs}.`);
            return;
        }

        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            bot.on(evtName, evt.bind(null, bot));
        }

        console.log(`${events.length} event(s) trouvé dans ${dirs}`);
    });
};

module.exports = {
    loadCommands,
    loadEvents,
};
