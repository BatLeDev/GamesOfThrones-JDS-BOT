const { MESSAGES } = require("../../utils/constants");
const {  } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    royaumesList = [
        "Arryn",
        "Baratheon",
        "Greyjoy",
        "Lannister",
        "Martell",
        "Stark",
        "Targaryen",
        "Tyrell",
    ];
    rolesId = [
        "702823145668739142",
        "702823256578719846",
        "702838713775816734",
        "702822919511867411",
        "702823114320642128",
        "702822841443155988",
        "702822871491149844",
        "702823220331675648",
    ];
    const rules = {
        "Div": {
            A:"200|Gallions+400|Fer",
            D:"200|Gallions+400|Bois",
            E:"200|Gallions+200|Cuir+200|Fer",
            AA:"300|Gallions+450|Fer+450|Cuir",
            DD:"300|Gallions+600|Fer",
            EE:"300|Gallions+600|Cuir"
        },
        "Flo": {
            A:"200|Gallions+200|Bois+200|Fer",
            D:"200|Gallions+400|Bois",
            E:"200|Gallions+200|Cuir+200|Fer",
            AA:"300|Gallions+450|Bois+450|Pierre",
            DD:"300|Gallions+600|Pierre",
            EE:"300|Gallions+600|Bois"
        }
    }

    var role = bot.hasRole(message.member.roles.cache, rolesId); // Récupère l'id du role du royaume
    var Royaume = royaumesList[rolesId.indexOf(role)]; // Récupère le nom du royaume

    var indice = false
    for (let i in fichier[Royaume].Armies) { // Cherche si l'armée apppartien au royaume, et récupère sa position si c'est le cas
        if (fichier[Royaume].Armies[i].name==args[0]) {
            indice=i
        }
    }
    if (indice===false) { // Si l'armée n'existe pas
        return await message.reply("Vous devez choisir une armée de votre royaume !")
    }
    
    let armee = fichier[Royaume].Armies[indice].name.split("|")
    let type=armee[0]
    let lvl=armee.length==4?armee.length:0 // Récupère le niveau de l'armée => 0 ou 1 ou 2

    if (lvl==0&&args.length==1) { // Si c'est une armée de niveau 0
        return message.reply("Vous devez choisir une spécialisation A, D ou E pour votre armée")
    }
    if (lvl==2) { // Si c'est une armée de niveau 2
        return message.reply("Votre armée est déja au noveau max !")
    }
    
    let cout=""
    let speci=""
    if (lvl==0) {
        cout=rules[type][args[1]]
        speci=args[1]
    } else {
        cout=rules[type][`${armee[1]}${armee[1]}`]
        speci=`${armee[1]}${armee[1]}`
    }

    // Test si assez de ressources
    const ressources=cout.split("+")
    for (let res of ressources) {
        res=res.split("|")
        if (fichier[Royaume][res[1]]<res[0]) {
            console.log(fichier[Royaume][res[1]],res[0])
            return await message.reply("Vous n'avez pas assez de ressources")
        }
    }
    // Retire les ressources
    for (let res of ressources) {
        res=res.split("|")
        fichier[Royaume][res[1]]-=res[0]
    }
    // Améliore l'armée
    const name=`${type}|${speci}|${armee[armee.length-2]}|${armee[armee.length-1]}`
    fichier[Royaume].Armies[indice].name=name
    await message.reply(`Vote armée ${name} viens d'être améliorée !`)

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.UPGRADE;
