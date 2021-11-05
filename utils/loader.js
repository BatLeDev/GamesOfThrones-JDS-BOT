const { readdirSync } = require("fs");

const loadCommands = (bot, dir = "./commands/") => {
    const commandList = [];
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
            commandList.push(getFileName.help);
            bot.commands.set(getFileName.help.name, getFileName);
        }

        console.log(`${commands.length} commande(s) trouvé dans ${dirs}`);
    });
    bot.commandList = commandList
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

        for (const file of events) {
            const event = require(`../${dir}/${dirs}/${file}`);
            const evtName = file.split(".")[0];
            bot.on(evtName, (...args) => event.execute(bot, ...args));
        }

        console.log(`${events.length} event(s) trouvé dans ${dirs}`);
    });
};

module.exports = {
    loadCommands,
    loadEvents,
};
