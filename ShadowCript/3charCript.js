
const customMap = {
    "a":"xy1","b":"qp9","c":"zr2","d":"lm4","e":"tt7","f":"ok8","g":"mn3","h":"rs5","i":"uv6","j":"wx0",
    "k":"aa2","l":"bb9","m":"cc4","n":"dd7","o":"ee3","p":"ff8","q":"gg1","r":"hh6","s":"ii5","t":"jj2",
    "u":"kk9","v":"v18","w":"mm7","x":"mp4","y":"oo8","z":"pp5",

    "A":"XY1","B":"QP9","C":"ZR2","D":"LM4","E":"TT7","F":"OK8","G":"MN3","H":"RS5","I":"UV6","J":"WX0",
    "K":"AA2","L":"BB9","M":"CC4","N":"DD7","O":"EE3","P":"FF8","Q":"GG1","R":"HH6","S":"II5","T":"JJ2",
    "U":"KK9","V":"V18","W":"MM7","X":"MP4","Y":"OO8","Z":"PP5",

    "0":"d0g","1":"@Vi","2":"b2d","3":"a3x","4":"@Ro","5":"hit","6":"r6t","7":"msd","8":"rat","9":"k9h",

    " ":"vk5","!":"ex1","@":"at2","#":"hs3","$":"dl4","%":"pc5","^":"cr6","&":"am7","*":"st8",
    "(":"lp9",")":"rp0","-":"mn1","_":"us2","+":"pl3","=":"eq4","{":"lb5","}":"rb6","[":"ls7","]":"rs8",
    "|":"pi9",":":"cl0",";":"sc1","'":"qt2","\"":"dq3","<":"lt4",">":"gt5",",":"cm6",".":"pd7","?":"qm8",
    "/":"sl9","~":"tl0","`":"gr1","\\":"bs2"
};

const reverseMap = {};
(function buildReverseMap() {
    for (const [ch, code] of Object.entries(customMap)) {
        if (reverseMap[code]) {
            console.warn('Duplicate code found for', code, '->', reverseMap[code], 'and', ch);
        }
        reverseMap[code] = ch;
    }
})();

const inputEl  = document.getElementById('inputText');
const outputEl = document.getElementById('outputText');

function encodeText() {
    const text = inputEl.value || '';
    if (text.length === 0) {
        outputEl.value = '';
        return;
    }

    const tokens = [];
    for (const ch of text) {
        if (Object.prototype.hasOwnProperty.call(customMap, ch)) {
            tokens.push(customMap[ch]);
        } else {
            tokens.push('unk');
        }
    }

    outputEl.value = tokens.join(' ');
}

function decodeText() {
    const raw = (inputEl.value || '').trim();
    if (raw.length === 0) {
        outputEl.value = '';
        return;
    }

    const parts = raw.split(/\s+/); 
    const chars = parts.map(part => {
    if (reverseMap[part]) return reverseMap[part];
    if (part === 'unk') return '?';
    return '?';
    });

    outputEl.value = chars.join('');
}

function clearText() {
    inputEl.value = '';
    outputEl.value = '';
    inputEl.focus();
}

async function copyText() {
    const text = outputEl.value || '';
    if (!text) {
        alert('You are GAY 😒 ');
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        // alert('Copied to clipboard!');
    } catch (err) {
        const tmp = document.createElement('textarea');
        tmp.value = text;
        document.body.appendChild(tmp);
        tmp.select();
        try {
            document.execCommand('copy');
            alert('Copied (fallback)!');
        } catch (e) {
            alert('Copy failed: ' + (e && e.message ? e.message : err));
        }
        tmp.remove();
    }
}
