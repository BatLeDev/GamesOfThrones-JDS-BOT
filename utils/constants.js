const MESSAGES = {
    COMMANDS : {
        ADMIN: {
            GUILDCONFIG: {
                name: "guildconfig",
                description: "Modifier les paramères de la guild dans la base de donnée",
                aliases: ['gconfig','gc'],
                category: 'admin',
            
                usage: '<parametre> <valeur> *Mettez aucuns arguments pour voir la liste des parametres*',
                args: false,
            
                channelRequire: false,
            },
        },
        AUTRE: {
            HELP : {
                name: "help",
                description: "Affiche la liste des commandes, ou des informations sur une seule.",
                aliases: ['h'],
                category: 'autre',
            
                usage: '(command_name)',
                args: false,

                channelRequire: true,
            },
            SUGGESTION : {
                name: "suggestion",
                description: "Permet de faire une suggestion.",
                aliases: ['suggest'],
                category: 'autre',
            
                usage: '<votre suggestion>',
                args: true,

                channelRequire: true,
            },
        },
        JUSTDEV : {
            EVAL: {
                name: "eval",
                description: "Renvoi un code javascript testé",
                aliases: ['eval'],
                category: 'justdev',
            
                usage: '<code_to_test>',
                args: true,

                channelRequire: false,
            },            
            RESTART : {
                name: "restart",
                description: "Redémarre le bot.",
                aliases: ['reload'],
                category: 'justdev',
              
                usage:'',
                args: false, 

                channelRequire: false,
            },
            TEST: {
                name: "test",
                description: "Renvoi un code javascript testé",
                aliases: ['t'],
                category: 'justdev',
            
                usage: '',
                args: false,

                channelRequire: false,
            },
        },
        MODERATEUR : {
            CLEAR:{
                name: "clear",
                description: "Permet de supprimé des messages en grande quantité.",
                aliases: ['suppr'],
                category: 'moderateur',

                usage:'<nombre de messages>',
                args: true, 

                channelRequire: false,
            },
            PING : {
                name: "ping",
                description: "Permet de voir le temps de latence du bot.",
                aliases: ['latence'],
                category: 'moderateur',
            
                usage: '',
                args: false,

                channelRequire: true,                
            },
            POLL : {
                name: "poll",
                description: "Créé un sondage.",
                aliases: ['sd'],
                category: 'moderateur',
            
                usage: '<\"question\"> <\"plusieurs options séparés par des virgules\"> (temps)',
                args: true,

                channelRequire: false,
            },
            SAY: {
                name: "say",
                description: "Permet d'envoyer un message sous le nom du bot.",
                aliases: ['s'],
                category: 'moderateur',
            
                usage:'<message>',
                args: true, 

                channelRequire: false,
            },
            VOCMUTE:{
                name: "vocmute",
                description: "Rend muet tous les membres du salon vocal",
                aliases: ['vm'],
                category: 'moderateur',

                usage:'',
                args: false, 

                channelRequire: false,
            },
            VOCUNMUTE:{
                name: "vocunmute",
                description: "Rend la parole à tous les membres du salon vocal",
                aliases: ['vum'],
                category: 'moderateur',

                usage:'',
                args: false, 

                channelRequire: false,
            },
            YESORNO : {
                name: "yesorno",
                description: "Créé un sondage avec comme possibilité de réponse **Oui** et **Non**.",
                aliases: ['yn', 'vote'],
                category: 'moderateur',
            
                usage: '<\"question\"> (temps)',
                args: true,

                channelRequire: false,
            },
        }
    }
}

exports.MESSAGES = MESSAGES;