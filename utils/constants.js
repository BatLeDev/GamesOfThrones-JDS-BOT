const MESSAGES = {
    COMMANDS: {
        EMBEDS: {
            RULEARGENT:  {
                name: "ruleargent",
                description: "Affiche les embeds",
            },
            RULEARMEE:  {
                name: "rulearmee",
                description: "Affiche les embeds",
            },
            RULECARTE:  {
                name: "rulecarte",
                description: "Affiche les embeds",
            },
            RULECOMBAT:  {
                name: "rulecombat",
                description: "Affiche les embeds",
            },
            RULEEVENTS:  {
                name: "ruleevents",
                description: "Affiche les embeds",
            },
            RULEMARCHE:  {
                name: "rulemarche",
                description: "Affiche les embeds",
            },
            RULEPHASE:  {
                name: "rulephase",
                description: "Affiche les embeds",
            },
            RULEROYAUMES:  {
                name: "ruleroyaume",
                description: "Affiche les embeds",
            },
        },
        JUSTDEV: {
            RESTART: {
                name: "restart",
                description: "Redemarre le bot",
            },
        },
        MODERATEUR: {
            CLEAR: {
                name: "clear",
                description: "Supprime plusieurs messages",
                options: [
                    {
                        type: 10,
                        name: "nombre",
                        description: "Le nombre de message a supprimer",
                        required: true,
                    },
                ],
            },
            PING: {
                name: "ping",
                description: "Pong!",
            },
            RESET: {
                name: "reset",
                description: "Remet à 0 les fichiers de la partie",
            },
            SAY: {
                name: "say",
                description: "Répète votre message",
                options: [
                    {
                        type: 3,
                        name: "message",
                        description: "Le message à répeter",
                        required: true,
                    },
                ],
            },
        },
        PARTIE: {
            CARTE: {
                name: "carte",
                description: "Affiche la carte",
            },
            ERASE: {
                name: "erase",
                description: "Permet de supprimer une armée",
                options: [
                    {
                        type: 3,
                        name: "armee",
                        description: "L'armée à supprimer",
                        required: true,
                    },                    
                    {
                        type: 3,
                        name: "royaume",
                        description: "Le royaume propriétaire de l'armée",
                        required: false,
                        choices: [
                            {name:"Arryn", value:"Arryn"},
                            {name:"Baratheon", value:"Baratheon"},
                            {name:"Greyjoy", value:"Greyjoy"},
                            {name:"Lannister", value:"Lannister"},
                            {name:"Martell", value:"Martell"},
                            {name:"Stark", value:"Stark"},
                            {name:"Targaryen", value:"Targaryen"},
                            {name:"Tyrell", value:"Tyrell"}
                        ]
                    },
                ],
            },
            NEXTPHASE: {
                name: "nextphase",
                description: "Passe a la phase suivante (si possible)",
            },
            SETDIV: {
                name: "setdiv",
                description: "Creer une division dans la zone choisie",
                options: [
                    {
                        type: 3,
                        name: "zone",
                        description: "Une zone de votre royaume",
                        required: true,
                    },
                ],
            },
            SETFLO: {
                name: "setflo",
                description: "Creer une flotte dans la zone choisie",
                options: [
                    {
                        type: 3,
                        name: "zone",
                        description: "Une zone de votre royaume",
                        required: true,
                    },
                ],
            },
            SETZONE: {
                name: "setzone",
                description: "Change la propriété d'une zone",
                options: [
                    {
                        type: 3,
                        name: "zone",
                        description: "Une zone quelconque",
                        required: true,
                    },                    
                    {
                        type: 3,
                        name: "royaume",
                        description: "Le futur royaume proprietaire de la zone",
                        required: true,
                        choices: [
                            {name:"Arryn", value:"Arryn"},
                            {name:"Baratheon", value:"Baratheon"},
                            {name:"Greyjoy", value:"Greyjoy"},
                            {name:"Lannister", value:"Lannister"},
                            {name:"Martell", value:"Martell"},
                            {name:"Stark", value:"Stark"},
                            {name:"Targaryen", value:"Targaryen"},
                            {name:"Tyrell", value:"Tyrell"}
                        ]
                    },
                ],
            },
            TAKE: {
                name: "take",
                description: "Pour prendre une zone",
                options: [
                    {
                        type: 3,
                        name: "zone",
                        description: "Un nom de zone",
                        required: true,
                    },
                ],
            },            
            UPDATESTATS: {
                name: "updatestats",
                description: "Actualise tous les stats",
            },
            UPGRADE: {
                name: "upgrade",
                description: "Pour amméliorer une armée",
                options: [
                    {
                        type: 3,
                        name: "namearmy",
                        description: "Le nom de l'armée",
                        required: true,
                    },                    
                    {
                        type: 3,
                        name: "specification",
                        description: "La spécification de votre armée",
                        required: false,
                        choices: [
                            {name:"A", value:"A"},
                            {name:"D", value:"D"},
                            {name:"E", value:"E"},
                        ]
                    },
                ],
            },
        },
        PREPARATIONS: {
            CAPITALE: {
                name: "capitale",
                description: "Définnit la captale du royaume",
                options: [
                    {
                        type: 3,
                        name: "zone",
                        description: "Le nom de la zone",
                        required: true,
                    },                    
                    {
                        type: 3,
                        name: "royaume",
                        description: "Le royaume où la capitale va être changer",
                        required: false,
                        choices: [
                            {name:"Arryn", value:"Arryn"},
                            {name:"Baratheon", value:"Baratheon"},
                            {name:"Greyjoy", value:"Greyjoy"},
                            {name:"Lannister", value:"Lannister"},
                            {name:"Martell", value:"Martell"},
                            {name:"Stark", value:"Stark"},
                            {name:"Targaryen", value:"Targaryen"},
                            {name:"Tyrell", value:"Tyrell"}
                        ]
                    },
                ],
            },
            CHEFDEGUERRE: {
                name: "chefdeguerre",
                description: "Définit le chef de guerre du royaume",
                options: [
                    {
                        type: 6,
                        name: "joueur",
                        description: "Le futur chef de guerre",
                        required: true,
                    },                    
                    {
                        type: 3,
                        name: "royaume",
                        description: "Le royaume où le chef de guerre va être changer",
                        required: false,
                        choices: [
                            {name:"Arryn", value:"Arryn"},
                            {name:"Baratheon", value:"Baratheon"},
                            {name:"Greyjoy", value:"Greyjoy"},
                            {name:"Lannister", value:"Lannister"},
                            {name:"Martell", value:"Martell"},
                            {name:"Stark", value:"Stark"},
                            {name:"Targaryen", value:"Targaryen"},
                            {name:"Tyrell", value:"Tyrell"}
                        ]
                    },
                ],
            },
            DIPLOMATE: {
                name: "diplomate",
                description: "Définit le diplomate du royaume",
                options: [
                    {
                        type: 6,
                        name: "joueur",
                        description: "Le futur diplomate",
                        required: true,
                    },                    
                    {
                        type: 3,
                        name: "royaume",
                        description: "Le royaume où le diplomate va être changer",
                        required: false,
                        choices: [
                            {name:"Arryn", value:"Arryn"},
                            {name:"Baratheon", value:"Baratheon"},
                            {name:"Greyjoy", value:"Greyjoy"},
                            {name:"Lannister", value:"Lannister"},
                            {name:"Martell", value:"Martell"},
                            {name:"Stark", value:"Stark"},
                            {name:"Targaryen", value:"Targaryen"},
                            {name:"Tyrell", value:"Tyrell"}
                        ]
                    },
                ],
            },
            JOIN: {
                name: "join",
                description: "Vous fait rentrer dans la partie",
                options: [
                    {
                        type: 3,
                        name: "royaume",
                        description: "Le royaume que vous voullez rejoindre",
                        required: true,
                        choices: [
                            {name:"Arryn", value:"Arryn"},
                            {name:"Baratheon", value:"Baratheon"},
                            {name:"Greyjoy", value:"Greyjoy"},
                            {name:"Lannister", value:"Lannister"},
                            {name:"Martell", value:"Martell"},
                            {name:"Stark", value:"Stark"},
                            {name:"Targaryen", value:"Targaryen"},
                            {name:"Tyrell", value:"Tyrell"}
                        ]
                    },
                    {
                        type: 6,
                        name: "joueur",
                        description: "Le joueur à rajouter dans la partie",
                        required: false,
                    },
                ],
            },            
            LEAVE: {
                name: "leave",
                description: "Vous fait quitter la partie",
                options: [
                    {
                        type: 6,
                        name: "joueur",
                        description: "Le joueur à rajouter dans la partie",
                        required: false,
                    },
                ],
            },
            START: {
                name: "start",
                description: "Permet de passer à la phase 1",
            },
            VOTEROI: {
                name: "voteroi",
                description: "Vous permet de voter un roi",
                options: [
                    {
                        type: 6,
                        name: "joueur",
                        description: "Le joueur que vous voulez voter",
                        required: true,
                    },
                    {
                        type: 5,
                        name: "force",
                        description: "Si le vote doit être forcé",
                        required: false,
                    },
                ],
            },
        }
    },
};

exports.MESSAGES = MESSAGES;
