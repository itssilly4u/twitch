// --- MANAGE YOUR COMMANDS HERE ---
const myCommands = [
    // --- CHAT COMMANDS ---
    { name: "30k", desc: "Trigger the 30k message in chat.", type: "chat" },
    { name: "!7tv", desc: "Information about 7TV emotes for the channel.", type: "chat" },
    { name: "!bonk", desc: "Use this to bonk someone in chat!", type: "chat" },
    { name: "brb", desc: "Let chat know you're stepping away for a moment.", type: "chat" },
    { name: "Commands", desc: "Gives a link to this website.", type: "chat" },
    { name: "!dance", desc: "Show off your best chat dance moves.", type: "chat" },
    { name: "!first", desc: "Shows who claimed the first spot in chat.", type: "chat" },
    { name: "!fleet", desc: "Check out the current Star Citizen fleet.", type: "chat" },
    { name: "!hype", desc: "Bring the hype! Let's go!", type: "chat" },
    { name: "!love", desc: "Spread some love to the community.", type: "chat" },
    { name: "!lurk", desc: "Let me know you're hanging out in the shadows.", type: "chat" },
    { name: "o7", desc: "Salute the captain and chat. o7", type: "chat" },
    { name: "!prime", desc: "A quick reminder about free Amazon Prime subscriptions.", type: "chat" },
    { name: "!rigged", desc: "When the game is clearly out to get us.", type: "chat" },
    { name: "!referral", desc: "Grab my Star Citizen referral code here.", type: "chat" },
    { name: "!specs", desc: "Check out the current PC build and streaming setup.", type: "chat" },
    { name: "!sticks", desc: "Information about my flight sticks.", type: "chat" },
    { name: "!vc", desc: "Voice channel info uppies!", type: "chat" },
    { name: "!vibe", desc: "Time for a quick vibe check.", type: "chat" },

    // --- AUDIO COMMANDS ---
    { name: "!blimp", desc: "[Audio] Play the blimp sound effect.", type: "audio" },
    { name: "!bobr", desc: "[Audio] Bóbr kurwa! Play the beaver sound.", type: "audio" },
    { name: "!burp", desc: "[Audio] Excuse you! Play a burp sound effect.", type: "audio" },
    { name: "!gamebad", desc: "[Audio] For when the game is completely borked.", type: "audio" },
    { name: "!lurkfromwork", desc: "[Audio] The official anthem of working hard or hardly working.", type: "audio" },
    { name: "!masterchief", desc: "[Audio] They put da Master Chief in da soda.", type: "audio" },
    { name: "!yeeha", desc: "[Audio] Yeehaw chucklefucks.", type: "audio" }
];

// --- GRAB ALL OUR HTML ELEMENTS ---
const list = document.getElementById('command-list');
const toast = document.getElementById('copy-toast');
const menuChat = document.getElementById('menu-chat');
const menuAudio = document.getElementById('menu-audio');
const menuHelp = document.getElementById('menu-help');

let toastTimer; // Keeps track of the popup timer so it doesn't glitch

// SHOW POPUP NOTIFICATION
function showPopup(message, duration) {
    toast.innerHTML = message;
    toast.style.display = 'block';
    
    clearTimeout(toastTimer);
    
    toastTimer = setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}

// --- LOAD COMMANDS LOGIC ---
function load(type) {
    list.innerHTML = ''; // Clear the grid
    
    // Filter by 'chat' or 'audio'
    const filteredCommands = myCommands.filter(cmd => cmd.type === type);

    filteredCommands.forEach(cmd => {
        const row = document.createElement('div');
        row.className = 'command-row';

        const left = document.createElement('div');
        left.className = 'cmd-trigger';
        left.innerText = cmd.name;
        
        // COPY ON CLICK
        left.onclick = () => {
            const originalText = left.innerText;
            navigator.clipboard.writeText(cmd.name).then(() => {
                left.innerText = "COPIED!";
                left.classList.add('copied');
                showPopup(`<span style="font-size: 30px;">📎</span>${cmd.name} copied to clipboard`, 2000);
                setTimeout(() => {
                    left.innerText = originalText;
                    left.classList.remove('copied');
                }, 2000);
            });
        };

        const right = document.createElement('div');
        right.className = 'cmd-desc';
        right.innerText = cmd.desc;

        row.appendChild(left);
        row.appendChild(right);
        list.appendChild(row);
    });
}

// --- MENU CLICK EVENTS ---
menuChat.onclick = () => {
    menuChat.classList.add('active');
    menuAudio.classList.remove('active');
    load('chat');
};

menuAudio.onclick = () => {
    menuAudio.classList.add('active');
    menuChat.classList.remove('active');
    load('audio');
};

// Help button logic!
menuHelp.onclick = () => {
    showPopup("💡 Need help with commands? Just ask in the Twitch chat!", 4000);
};

// Start the app by loading the Chat commands
load('chat');

// --- UPDATED FUN BUTTON LOGIC ---
const appWindow = document.getElementById('app-window');
const retroBg = document.getElementById('retro-bg');
const btnMin = document.getElementById('btn-min');
const btnMax = document.getElementById('btn-max');
const btnClose = document.getElementById('btn-close');

// Minimize: Toggles the "Window Shade" and makes sure we aren't maximized
btnMin.onclick = () => {
    appWindow.classList.remove('maximized'); // Clear full screen first
    appWindow.classList.toggle('minimized');
    
    // Show background elements when minimizing
    retroBg.classList.remove('hidden');
    
    // Reset max icon just in case
    btnMax.innerText = '□';
};

// Maximize: Toggles Full Screen and makes sure we aren't hidden
btnMax.onclick = () => {
    appWindow.classList.remove('minimized'); // Show content immediately
    appWindow.classList.toggle('maximized');
    
    // Hide background elements when maximized for performance
    if (appWindow.classList.contains('maximized')) {
        retroBg.classList.add('hidden');
        btnMax.innerText = '🗗'; 
    } else {
        retroBg.classList.remove('hidden');
        btnMax.innerText = '□';
    }
};

// Close: Keeps the same roast
btnClose.onclick = () => {
    showPopup("⚠️ ERROR: Skill issue detected. Cannot close window.", 4000);
};