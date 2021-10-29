const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
    // /!\ Cette commande permet d'executer du code javascript directement sur discord
    function clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
    }

    const code = args.join(" ");
    const evaled = eval(code);
    const cleanCode = await clean(evaled);
    message.channel.send(cleanCode, { code: "js" });
    console.log(`Tu as fait la commande Eval`);
};

module.exports.help = MESSAGES.COMMANDS.JUSTDEV.EVAL;
