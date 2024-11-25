const SERVER_IP = "mc.androlia.fr";
const DISCORD_URL = "https://discord.gg/ton-invitation"; // Remplace par ton lien Discord
const DISCORD_GUILD_ID = "1278871070476337293"; // Remplace par l'ID de ton serveur Discord

const API_URL_MC = `https://api.mcsrvstat.us/2/${SERVER_IP}`;
const API_URL_DISCORD = `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`;

// Fonction pour copier l'adresse IP
function copyIP() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
    });
}

// Fonction pour mettre à jour le texte du bouton avec un délai pour simuler un chargement
function updateButtonText(buttonId, loadingText, newText) {
    const button = document.getElementById(buttonId);
    const buttonText = button.querySelector('.button-text');
    const hoverText = button.querySelector('.button-hover-text');

    // Affiche "chargement..." pendant la récupération des données
    buttonText.textContent = loadingText;
    hoverText.textContent = loadingText;

    // Cache le texte principal et active le texte secondaire
    buttonText.classList.add('button-text-hidden');
    hoverText.classList.add('button-hover-text-updating');

    // Une fois que le texte de chargement est bien affiché, attend un moment avant de changer
    setTimeout(() => {
        hoverText.textContent = newText;
        hoverText.classList.remove('button-hover-text-updating');
        hoverText.classList.add('button-hover-text-updated'); // Assurez-vous que l'animation reprend correctement

        // Après un délai pour permettre à l'animation de se terminer, réafficher le texte principal
        setTimeout(() => {
            buttonText.classList.remove('button-text-hidden'); // Réactive l'animation pour le texte principal
        }, 500); // Un délai de 500ms avant de réafficher le texte principal
    }, 500); // Délai de 500ms avant d'afficher le texte réel
}

// Récupération du nombre de joueurs Minecraft
// Récupération du nombre de joueurs Minecraft
function getMinecraftPlayers() {
    const minecraftIP = 'mc.androlia.fr';  // L'adresse IP de ton serveur Minecraft
    const url = `https://api.mcsrvstat.us/2/${minecraftIP}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const playerCount = data.players.online;  // Nombre de joueurs en ligne
            updateButtonText('copy-ip', 'JOUER', `mc.androlia.fr\n${playerCount} online`);
        })
        .catch(error => {
            console.error('Erreur de récupération du nombre de joueurs Minecraft:', error);
            updateButtonText('copy-ip', 'Erreur', 'Impossible de récupérer');
        });
}

// Récupération du nombre de membres Discord
function getDiscordMembers() {
    const discordWidgetURL = `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`;  // URL du widget Discord
    fetch(discordWidgetURL)
        .then(response => response.json())
        .then(data => {
            // Utilisation de la propriété 'presence_count' pour obtenir le nombre de membres en ligne
            const onlineMembers = data.presence_count;  // On récupère le 'presence_count'
            updateButtonText('discord-btn', 'DISCORD', `${onlineMembers} en ligne`);
        })
        .catch(error => {
            console.error('Erreur de récupération du nombre de membres Discord:', error);
            updateButtonText('discord-btn', 'Erreur', 'Impossible de récupérer');
        });
}

document.addEventListener('DOMContentLoaded', function () {
    getMinecraftPlayers();  // Récupère les joueurs Minecraft
    getDiscordMembers();    // Récupère les membres Discord
});

// Fonction pour connecter un joueur via son pseudo Minecraft
// Fonction pour récupérer le skin du joueur à partir de son pseudo
// Fonction pour créer un cookie avec expiration en jours
// Fonction pour créer un cookie
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 100}%`; // Position horizontale aléatoire
    snowflake.style.animationDuration = `${Math.random() * 8 + 5}s`; // Durée plus lente (5 à 13 secondes)
    snowflake.style.opacity = Math.random(); // Opacité aléatoire
    snowflake.style.fontSize = `${Math.random() * 15 + 5}px`; // Taille aléatoire des flocons
    document.getElementById('snow-container').appendChild(snowflake);

    // Supprime le flocon après son animation
    setTimeout(() => snowflake.remove(), 14000); // Plus long pour correspondre à l'animation
}

setInterval(createSnowflake, 200); // Crée un nouveau flocon toutes les 200ms
