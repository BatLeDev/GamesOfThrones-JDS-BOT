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
            },
            SUGGESTION: {
                name: "suggestion",
                description: "Permet de faire une suggestion.",
                aliases: ["suggest"],
                category: "autre",

                usage: "<votre suggestion>",
                args: true,
            },
        },
        EMBEDS: {
            RULEARGENT: {
                name: "ruleArgent",
                description:
                    "Affiche les embeds Royaume",
                aliases: ["ruleargent"],
                category: "embeds",

                usage: "",
                args: false,
            },
            RULEARMEE: {
                name: "ruleArmée",
                description:
                    "Affiche les embeds Royaume",
                aliases: ["rulearmee","rulearmée","rulearmées"],
                category: "embeds",

                usage: "",
                args: false,
            },            
            RULEMARCHE: {
                name: "ruleMarché",
                description:
                    "Affiche les embeds marché d'Icar le Gar",
                aliases: ["rulemarche"],
                category: "embeds",

                usage: "",
                args: false,
            },
            RULEROYAUMES: {
                name: "ruleRoyaume",
                description:
                    "Affiche les embeds Royaume",
                aliases: ["ruleroyaumes","ruleroyaume"],
                category: "embeds",

                usage: "",
                args: false,
            },
            RULECARTE: {
                name: "ruleCarte",
                description:
                    "Affiche l'embed des regles carte",
                aliases: ["rulecarte", "rcarte"],
                category: "embeds",

                usage: "",
                args: false,
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
            },
            RESTART: {
                name: "restart",
                description: "Redémarre le bot.",
                aliases: ["reload"],
                category: "justdev",

                usage: "",
                args: false,
            },
            TEST: {
                name: "test",
                description: "Renvoi un code javascript testé",
                aliases: ["t"],
                category: "justdev",

                usage: "",
                args: false,
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
            },
            PING: {
                name: "ping",
                description: "Permet de voir le temps de latence du bot.",
                aliases: ["latence"],
                category: "moderateur",

                usage: "",
                args: false,
            },
            POLL: {
                name: "poll",
                description: "Créé un sondage.",
                aliases: ["sd"],
                category: "moderateur",

                usage: '<"question"> <"plusieurs options séparés par des virgules"> (temps)',
                args: true,
            },
            SAY: {
                name: "say",
                description: "Permet d'envoyer un message sous le nom du bot.",
                aliases: ["s"],
                category: "moderateur",

                usage: "<message>",
                args: true,
            },
            VOCMUTE: {
                name: "vocMute",
                description: "Rend muet tous les membres du salon vocal",
                aliases: ["vocemute", "vm"],
                category: "moderateur",

                usage: "",
                args: false,
            },
            VOCUNMUTE: {
                name: "vocUnmute",
                description: "Rend la parole à tous les membres du salon vocal",
                aliases: ["vocunmute", "vum"],
                category: "moderateur",

                usage: "",
                args: false,
            },
            YESORNO: {
                name: "yesorno",
                description:
                    "Créé un sondage avec comme possibilité de réponse **Oui** et **Non**.",
                aliases: ["yn", "vote"],
                category: "moderateur",

                usage: '<"question"> (temps)',
                args: true,
            },
        },
        PARTIE: {
            CARTE: {
                name: "carte",
                description: "Permet d'afficher la carte",
                aliases: ["carte"],
                category: "partie",

                usage: "",
                args: false,
            },
            NEXTPHASE: {
                name: "nextphase",
                description: "Afficher le message de la phase suivante",
                aliases: ["np","phase"],
                category: "partie",

                usage: "",
                args: false,
            },
<<<<<<< HEAD
            SETDIV: {
                name: "setdiv",
                description: "achète et installe une division de base dans la zone choisie",
                aliases: ["setdiv"],
                category: "partie",

                usage: "<zone>",
                args: true,
            },
            SETFLO: {
                name: "setflo",
                description: "achète et installe une flotte de base dans la zone choisie",
                aliases: ["setflo"],
                category: "partie",

                usage: "<zone>",
                args: true,
            },
=======
>>>>>>> main
            SETZONE: {
                name: "setZone",
                description: "Définie une zone à un royaume",
                aliases: ["setzone","sz"],
                category: "partie",

                usage: "<zone> < @Royaume ou Nom du royaume >",
                args: true,
            },
<<<<<<< HEAD
            TAKE: {
                name: "take",
                description: "permet à un royaume de prendre une zone, à condition qu’elle soit occupée par personne, ou alors qu’elle n’ai plus de pR. Pour rappel, la commande coûte **200 Gallions**.",
                aliases: ["take"],
                category: "partie",

                usage: "<zone>",
                args: true,
            },
            UPGRADE: {
                name: "upgrade",
                description: "Permet d'améliorer une armée",
                aliases: ["upgrade"],
                category: "partie",

                usage: "<Nom de l'armée> (A,D,ou E)",
                args: true,
            },

=======
>>>>>>> main
        },
        PREPARATIONS: {
            CAPITALE: {
                name: "capitale",
                description: "Permet à un roi de choisir sa capitale.",
                aliases: ["capitale","setcapitale"],
                category: "preparations",

                usage: "<zone> (royaume)",
                args: true,
            },
            CHEFDEGUERRE: {
                name: "ChefDeGuerre",
                description: "Permet à un roi de choisir son chef de guerre",
                aliases: ["chefdeguerre","cdg"],
                category: "preparations",

                usage: "<@joueur> (royaume)",
                args: true,
            },
            DIPLOMATE: {
                name: "diplomate",
                description: "Permet à un roi de choisir son diplomate",
                aliases: ["diplomate"],
                category: "preparations",

                usage: "<@joueur> (royaume)",
                args: true,
            },
            JOIN: {
                name: "join",
                description: "Permet à un joueur de rejoindre la partie.",
                aliases: ["join"],
                category: "preparations",

                usage: "<Arryn, Baratheon, Greyjoy, Lannister, Martell, Stark, Targaryen, Tyrell> (joueur)",
                args: true,
            },
            LEAVE: {
                name: "leave",
                description: "Permet à un joueur de quiter la partie",
                aliases: ["leave"],
                category: "preparations",

                usage: "(joueur)",
                args: false,
            },
            START: {
                name: "start",
                description: "Permet à un maitre du jeu de démarer la partie",
                aliases: ["start"],
                category: "preparations",

                usage: "",
                args: false,
            },
            VOTEROI: {
                name: "voteRoi",
                description: "Permet au joueur de voter son roi",
                aliases: ["voteroi"],
                category: "preparations",

                usage: "<@Joueur> (Royaume)",
                args: true,
            },
        },
    },
};

exports.MESSAGES = MESSAGES;
