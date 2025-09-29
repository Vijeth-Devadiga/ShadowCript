const Trinity_Code = {
    "a":"#", "b":"8", "c":"Z", "d":"%", "e":"x", "f":"(", "g":"M", "h":"1", "i":"q", "j":"@",
    "k":"R", "l":"^", "m":"0", "n":"P", "o":"&", "p":"B", "q":"=", "r":"k", "s":"W", "t":"{",
    "u":"3", "v":"J", "w":"$", "x":"n", "y":"}", "z":"Y",

    "A":"t", "B":"V", "C":"[", "D":"c", "E":"O", "F":")", "G":"?", "H":"Q", "I":"5", "J":"m",
    "K":"*", "L":">", "M":"2", "N":";", "O":"z", "P":"g", "Q":"<", "R":"s", "S":"U", "T":"`",
    "U":"D", "V":"|", "W":"X", "X":"f", "Y":"+", "Z":"T",

    "0":"h", "1":"p", "2":"L", "3":"a", "4":"u", "5":"/", "6":"~", "7":"F", "8":"C", "9":":",

    " ":"_", "!":"o", "@":"r", "#":"H", "$":"E", "%":"y", "^":"A", "&":"9", "*":"e", "(": "j",
    ")":"v", "-":"d", "_":"N", "+":"K", "=":"I", "{":"w", "}":"G", "[":"l", "]":"b", "|":"i",
    ":":"4", ";":".", "'":"6", "\"":"7", "<":"′", ">":"λ", ",":"η", ".":"Ω", "?":"β",
    "/":"Φ", "~":"Σ", "`":"Ψ", "\\":"Δ"
};

const Reverse_Code = {};
for (const [char, code] of Object.entries(Trinity_Code)) {
    if (Reverse_Code[code]) {
        console.warn(`Duplicate Code Detected: '${code}' For '${Reverse_Code[code]}' and '${char}'`);
    }
    Reverse_Code[code] = char;
}

const Input_Text  = document.getElementById('inputText');
const Output_Text = document.getElementById('outputText');

function Encode_Text() {
    const text = Input_Text.value || '';
    if (!text) {
        Output_Text.value = '';
        return;
    }

    let encoded = '';
    for (const ch of text) {
        encoded += Trinity_Code[ch] || '?'; // its for unknown chars
    }

    Output_Text.value = encoded;
}


function Decode_Text() {
    const raw = Input_Text.value || '';
    if (!raw) {
        Output_Text.value = '';
        return;
    }

    let decoded = '';
    for (const ch of raw) {
        decoded += Reverse_Code[ch] || '?';
    }

    Output_Text.value = decoded;
}

function clearText() {
    Input_Text.value = '';
    Output_Text.value = '';
    Input_Text.focus();
}

async function copyText() {
    const text = Output_Text.value || '';
    if (!text) {
        alert('You are GAY 😒 ');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        // Fallback for older browsers
        const tmp = document.createElement('textarea');
        tmp.value = text;
        document.body.appendChild(tmp);
        tmp.select();
        try {
        document.execCommand('copy');
        } catch (e) {
        alert(`Copy failed: ${e?.message || err}`);
        }
        tmp.remove();
    }
}
