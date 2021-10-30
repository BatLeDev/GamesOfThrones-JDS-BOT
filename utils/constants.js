const MESSAGES = {
    COMMANDS: {
        AUTRE: {
            HELP: {
                name: "help",
                description:
                    "Affiche la liste des commandes, ou des informations sur une seule.",
                aliases: ["h"],
                category: "autre",

                usage: "(command_name)",
                args: false,

                channelRequire: true,
            },
            SUGGESTION: {
                name: "suggestion",
                description: "Permet de faire une suggestion.",
                aliases: ["suggest"],
                category: "autre",

                usage: "<votre suggestion>",
                args: true,

                channelRequire: true,
            },
        },
        JUSTDEV: {
            EVAL: {
                name: "eval",
                description: "Renvoi un code javascript testé",
                aliases: ["eval"],
                category: "justdev",

                usage: "<code_to_test>",
                args: true,

                channelRequire: false,
            },
            RESTART: {
                name: "restart",
                description: "Redémarre le bot.",
                aliases: ["reload"],
                category: "justdev",

                usage: "",
                args: false,

                channelRequire: false,
            },
            TEST: {
                name: "test",
                description: "Renvoi un code javascript testé",
                aliases: ["t"],
                category: "justdev",

                usage: "",
                args: false,

                channelRequire: false,
            },
        },
        MODERATEUR: {
            CLEAR: {
                name: "clear",
                description:
                    "Permet de supprimé des messages en grande quantité.",
                aliases: ["suppr"],
                category: "moderateur",

                usage: "<nombre de messages>",
                args: true,

                channelRequire: false,
            },
            PING: {
                name: "ping",
                description: "Permet de voir le temps de latence du bot.",
                aliases: ["latence"],
                category: "moderateur",

                usage: "",
                args: false,

                channelRequire: true,
            },
            POLL: {
                name: "poll",
                description: "Créé un sondage.",
                aliases: ["sd"],
                category: "moderateur",

                usage: '<"question"> <"plusieurs options séparés par des virgules"> (temps)',
                args: true,

                channelRequire: false,
            },
            SAY: {
                name: "say",
                description: "Permet d'envoyer un message sous le nom du bot.",
                aliases: ["s"],
                category: "moderateur",

                usage: "<message>",
                args: true,

                channelRequire: false,
            },
            VOCMUTE: {
                name: "vocMute",
                description: "Rend muet tous les membres du salon vocal",
                aliases: ["vocemute", "vm"],
                category: "moderateur",

                usage: "",
                args: false,

                channelRequire: false,
            },
            VOCUNMUTE: {
                name: "vocUnmute",
                description: "Rend la parole à tous les membres du salon vocal",
                aliases: ["vocunmute", "vum"],
                category: "moderateur",

                usage: "",
                args: false,

                channelRequire: false,
            },
            YESORNO: {
                name: "yesorno",
                description:
                    "Créé un sondage avec comme possibilité de réponse **Oui** et **Non**.",
                aliases: ["yn", "vote"],
                category: "moderateur",

                usage: '<"question"> (temps)',
                args: true,

                channelRequire: false,
            },
        },
        PARTIE: {
            CARTE: {
                name: "carte",
                description: "Permet d'afficher la carte",
                aliases: ["carte"],
                category: "partie",

                usage: "<royaume> (joueur)",
                args: true,

                channelRequire: true,
            },
        },
        PREPARATIONS: {
            JOIN: {
                name: "join",
                description: "Permet à un joueur de rejoindre la partie. Liste des royaumes: Arryn, `Baratheon, Greyjoy, Lannister, Martell, Stark, Targaryen, Tyrell`",
                aliases: ["join"],
                category: "preparations",

                usage: "<royaume> (joueur)",
                args: true,

                channelRequire: true,
            },
            LEAVE: {
                name: "leave",
                description: "Permet à un joueur de quiter la partie",
                aliases: ["leave"],
                category: "preparations",

                usage: "(joueur)",
                args: false,

                channelRequire: true,
            },
            START: {
                name: "start",
                description: "Permet à un maitre du jeu de démarer la partie",
                aliases: ["start"],
                category: "preparations",

                usage: "",
                args: false,

                channelRequire: false,
            },
            VOTECAPITALE: {
                name: "voteCapitale",
                description: "Permet au joueur de voter pour sa capitale",
                aliases: ["votecapitale"],
                category: "preparations",

                usage: "",
                args: false,

                channelRequire: false,
            },
            VOTEROI: {
                name: "voteRoi",
                description: "Permet au joueur de voter son roi",
                aliases: ["voteroi"],
                category: "preparations",

                usage: "",
                args: false,

                channelRequire: false,
            },
        },
    },
};

exports.MESSAGES = MESSAGES;
