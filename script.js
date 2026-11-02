/* EduBot — client-side admission assistant (demo). No API keys, no network calls.
   Built by AB Studio and Advertise. Edit the KB below to fit any coaching class. */
(function () {
  "use strict";

  var WA = "https://wa.me/919307643461";

  // ---------- Knowledge base: intents with keywords (EN + romanized + मराठी + हिंदी) and answers per language
  var KB = [
    { id: "greet", g: 1,
      k: ["hi","hello","hey","namaste","namaskar","hii","नमस्कार","नमस्ते","हाय","हॅलो","हेलो"],
      a: {
        en: "Hello! 👋 I'm EduBot, Pinnacle Academy's admission assistant. Ask me about courses, fees, timings, admission steps or the free demo lecture.",
        mr: "नमस्कार! 👋 मी EduBot, पिनॅकल अकॅडमीचा प्रवेश सहाय्यक. कोर्सेस, फी, वेळा, प्रवेश प्रक्रिया किंवा मोफत डेमो लेक्चरबद्दल विचारा.",
        hi: "नमस्ते! 👋 मैं EduBot हूँ, पिनैकल अकैडमी का एडमिशन असिस्टेंट। कोर्स, फीस, टाइमिंग, एडमिशन प्रोसेस या फ्री डेमो लेक्चर के बारे में पूछिए।" } },
    { id: "courses", g: 0.5,
      k: ["course","courses","batch","batches","class","jee","neet","cet","mht","foundation","ssc","cbse","hsc","11th","12th","10th","9th","8th","subject","कोर्स","बॅच","बैच","वर्ग","कक्षा","इयत्ता","विषय","जेईई","नीट","सीईटी","दहावी","बारावी"],
      a: {
        en: "We run 4 batches:\n• Foundation — Class 8–10 (SSC/CBSE)\n• Class 11–12 Science + MHT-CET (PCM / PCB)\n• JEE Main + Advanced\n• NEET-UG\nEvery batch has printed notes, a weekly test and a daily doubt hour. Which class is your child in?",
        mr: "आमच्याकडे ४ बॅचेस आहेत:\n• फाउंडेशन — इयत्ता ८ ते १० (SSC/CBSE)\n• ११वी–१२वी सायन्स + MHT-CET (PCM / PCB)\n• JEE Main + Advanced\n• NEET-UG\nप्रत्येक बॅचमध्ये छापील नोट्स, दर आठवड्याला टेस्ट आणि रोज डाउट तास. तुमचा पाल्य कोणत्या इयत्तेत आहे?",
        hi: "हमारे ४ बैच हैं:\n• फाउंडेशन — कक्षा ८ से १० (SSC/CBSE)\n• ११वीं–१२वीं साइंस + MHT-CET (PCM / PCB)\n• JEE Main + Advanced\n• NEET-UG\nहर बैच में प्रिंटेड नोट्स, हर हफ्ते टेस्ट और रोज़ डाउट क्लास। आपका बच्चा किस कक्षा में है?" } },
    { id: "fees",
      k: ["fee","fees","cost","price","charges","amount","installment","instalment","emi","kiti","kitna","paise","rupees","फी","फीस","शुल्क","किती","कितना","हप्ता","किस्त","पैसे","खर्च"],
      a: {
        en: "Fees depend on the batch and the scholarship test result, so we share the exact structure on enquiry. Instalments are available, plus sibling concession (as per the class's policy).\nTap “Fees enquiry” on the page or share your batch here and a counsellor will send the details.",
        mr: "फी बॅच आणि स्कॉलरशिप टेस्टच्या निकालानुसार ठरते, म्हणून नेमकी फी-रचना चौकशीनंतर सांगतो. हप्त्यांची सोय आहे, आणि भावंडांसाठी सवलत (क्लासच्या नियमानुसार).\nपेजवरील “Fees enquiry” फॉर्म भरा, काउन्सेलर लगेच माहिती पाठवतील.",
        hi: "फीस बैच और स्कॉलरशिप टेस्ट के रिज़ल्ट पर निर्भर करती है, इसलिए पूरा स्ट्रक्चर एन्क्वायरी पर बताते हैं। किस्तों की सुविधा है, और भाई-बहन के लिए छूट (क्लास की पॉलिसी के अनुसार)।\nपेज पर “Fees enquiry” फॉर्म भरिए, काउंसलर तुरंत डिटेल भेजेंगे।" } },
    { id: "timings",
      k: ["time","timing","timings","schedule","when","hours","morning","evening","vel","vela","samay","वेळ","वेळा","टाइम","टाइमिंग","समय","सकाळ","संध्याकाळ","सुबह","शाम","कधी","कब"],
      a: {
        en: "Batch timings (Mon–Sat):\n• Foundation 8–10: 4:00–7:00 PM\n• 11–12 Science + CET: 7:00–10:00 AM\n• JEE: 5:00–8:30 PM (+ Sunday tests)\n• NEET: 2:00–5:30 PM\nOffice: 9 AM – 8 PM, all days except public holidays.",
        mr: "बॅचच्या वेळा (सोम–शनि):\n• फाउंडेशन ८–१०: दुपारी ४:०० ते ७:००\n• ११–१२ सायन्स + CET: सकाळी ७:०० ते १०:००\n• JEE: संध्या. ५:०० ते ८:३० (+ रविवारी टेस्ट)\n• NEET: दुपारी २:०० ते ५:३०\nऑफिस: सकाळी ९ ते रात्री ८.",
        hi: "बैच टाइमिंग (सोम–शनि):\n• फाउंडेशन ८–१०: शाम ४:०० से ७:००\n• ११–१२ साइंस + CET: सुबह ७:०० से १०:००\n• JEE: शाम ५:०० से ८:३० (+ रविवार टेस्ट)\n• NEET: दोपहर २:०० से ५:३०\nऑफिस: सुबह ९ से रात ८ बजे तक।" } },
    { id: "admission",
      k: ["admission","admissions","join","enroll","enrol","register","registration","process","steps","apply","pravesh","dakhla","प्रवेश","ऍडमिशन","अ‍ॅडमिशन","एडमिशन","दाखला","नोंदणी","प्रक्रिया","कैसे","कसे","जॉइन"],
      a: {
        en: "Admission in 4 steps:\n1. Enquire (form, call, WhatsApp or here)\n2. Free 20-min counselling with a mentor\n3. Optional scholarship test\n4. Documents + fee instalment plan → join the batch\nMost students start within a week of enquiring.",
        mr: "प्रवेश ४ टप्प्यांत:\n१. चौकशी (फॉर्म, कॉल, WhatsApp किंवा इथे)\n२. मेंटॉरसोबत २० मिनिटांचे मोफत समुपदेशन\n३. ऐच्छिक स्कॉलरशिप टेस्ट\n४. कागदपत्रे + फी हप्ते → बॅच सुरू\nबहुतेक विद्यार्थी आठवड्याभरात सुरुवात करतात.",
        hi: "एडमिशन ४ स्टेप में:\n१. एन्क्वायरी (फॉर्म, कॉल, WhatsApp या यहीं)\n२. मेंटर के साथ २० मिनट की फ्री काउंसलिंग\n३. ऑप्शनल स्कॉलरशिप टेस्ट\n४. डॉक्यूमेंट + फीस किस्त → बैच शुरू\nज़्यादातर स्टूडेंट एक हफ्ते में शुरू कर देते हैं।" } },
    { id: "documents",
      k: ["document","documents","papers","certificate","marksheet","aadhaar","aadhar","photo","कागदपत्र","कागदपत्रे","डॉक्युमेंट","दस्तावेज","डॉक्यूमेंट","आधार","मार्कशीट"],
      a: {
        en: "Documents for admission: last exam marksheet, Aadhaar (student), 2 passport photos and parent's contact number. That's it.",
        mr: "प्रवेशासाठी कागदपत्रे: मागील परीक्षेची मार्कशीट, विद्यार्थ्याचे आधार, २ पासपोर्ट फोटो आणि पालकांचा मोबाईल नंबर. एवढेच.",
        hi: "एडमिशन के लिए डॉक्यूमेंट: पिछली परीक्षा की मार्कशीट, स्टूडेंट का आधार, २ पासपोर्ट फोटो और पैरेंट का मोबाइल नंबर। बस।" } },
    { id: "demo",
      k: ["demo","trial","free class","free lecture","sample class","try","डेमो","ट्रायल","मोफत","फ्री"],
      a: {
        en: "Yes — attend a free demo lecture before paying anything. Tell us the batch and a day that suits you (Mon–Sat) through the enquiry form.",
        mr: "हो — काहीही भरण्याआधी एक मोफत डेमो लेक्चर अटेंड करा. चौकशी फॉर्ममध्ये बॅच आणि सोयीचा दिवस (सोम–शनि) सांगा.",
        hi: "हाँ — कुछ भी भरने से पहले एक फ्री डेमो लेक्चर अटेंड कीजिए। एन्क्वायरी फॉर्म में बैच और सुविधा का दिन (सोम–शनि) बताइए।" } },
    { id: "scholarship",
      k: ["scholarship","discount","concession","offer","sibling","स्कॉलरशिप","शिष्यवृत्ती","सवलत","सूट","छूट","डिस्काउंट"],
      a: {
        en: "There's an optional scholarship test before joining; the concession depends on the score (set by the class each year). Sibling concession is also available.",
        mr: "प्रवेशाआधी ऐच्छिक स्कॉलरशिप टेस्ट असते; सवलत गुणांवर ठरते (दरवर्षी क्लास ठरवतो). भावंडांसाठीही सवलत आहे.",
        hi: "जॉइन करने से पहले ऑप्शनल स्कॉलरशिप टेस्ट होता है; छूट स्कोर पर निर्भर है (हर साल क्लास तय करता है)। भाई-बहन के लिए भी छूट है।" } },
    { id: "batchsize",
      k: ["batch size","students per batch","how many students","strength","crowd","किती विद्यार्थी","कितने बच्चे","कितने स्टूडेंट","संख्या"],
      a: {
        en: "Maximum 25 students per batch, so every student gets attention and doubts get solved the same day.",
        mr: "एका बॅचमध्ये जास्तीत जास्त २५ विद्यार्थी — त्यामुळे प्रत्येकाकडे लक्ष आणि डाउट त्याच दिवशी सुटतात.",
        hi: "एक बैच में ज़्यादा से ज़्यादा २५ स्टूडेंट — ताकि हर बच्चे पर ध्यान रहे और डाउट उसी दिन सॉल्व हों।" } },
    { id: "mode",
      k: ["online","offline","recorded","video","live class","ऑनलाइन","ऑफलाइन","रेकॉर्ड","रिकॉर्ड"],
      a: {
        en: "Classes are offline at the Pune centre. If a student misses a lecture, the recording is shared for revision.",
        mr: "क्लासेस पुणे सेंटरमध्ये ऑफलाइन होतात. लेक्चर चुकल्यास रेकॉर्डिंग रिव्हिजनसाठी दिले जाते.",
        hi: "क्लास पुणे सेंटर पर ऑफलाइन होती हैं। लेक्चर छूट जाए तो रिवीजन के लिए रिकॉर्डिंग मिलती है।" } },
    { id: "material",
      k: ["notes","material","books","study material","test series","mock","नोट्स","पुस्तक","किताब","मटेरियल","टेस्ट","सराव"],
      a: {
        en: "Every student gets printed chapter-wise notes, formula sheets, a weekly test and a parent progress report every month.",
        mr: "प्रत्येक विद्यार्थ्याला धड्यानुसार छापील नोट्स, फॉर्म्युला शीट्स, दर आठवड्याला टेस्ट आणि दर महिन्याला पालकांना प्रगती अहवाल.",
        hi: "हर स्टूडेंट को चैप्टर-वाइज़ प्रिंटेड नोट्स, फॉर्मूला शीट, हर हफ्ते टेस्ट और हर महीने पैरेंट को प्रोग्रेस रिपोर्ट मिलती है।" } },
    { id: "faculty",
      k: ["teacher","teachers","faculty","sir","madam","professor","शिक्षक","सर","मॅडम","टीचर","अध्यापक","प्राध्यापक"],
      a: {
        en: "Each subject has a dedicated senior teacher (Physics, Chemistry, Maths, Biology) plus a mentor who tracks your child's tests. See the Faculty section on this page.",
        mr: "प्रत्येक विषयाला स्वतंत्र अनुभवी शिक्षक (फिजिक्स, केमिस्ट्री, गणित, बायोलॉजी) आणि टेस्ट्सवर लक्ष ठेवणारा मेंटॉर. पेजवरील Faculty विभाग पाहा.",
        hi: "हर विषय के लिए अलग सीनियर टीचर (फिजिक्स, केमिस्ट्री, मैथ्स, बायोलॉजी) और एक मेंटर जो टेस्ट पर नज़र रखता है। पेज पर Faculty सेक्शन देखिए।" } },
    { id: "results", g: 0.3,
      k: ["result","results","topper","toppers","rank","marks","percentage","selection","निकाल","रिझल्ट","रिज़ल्ट","टॉपर","गुण","अंक"],
      a: {
        en: "Our toppers are on the Results section of this page. (Demo note: each class adds its own real results there.)",
        mr: "आमचे टॉपर्स पेजवरील Results विभागात आहेत. (डेमो: प्रत्येक क्लास तिथे स्वतःचे खरे निकाल टाकतो.)",
        hi: "हमारे टॉपर्स पेज के Results सेक्शन में हैं। (डेमो: हर क्लास वहाँ अपने असली रिज़ल्ट डालती है।)" } },
    { id: "location",
      k: ["where","address","location","map","centre","center","branch","kuthe","kahan","पत्ता","कुठे","कहाँ","पता","लोकेशन","शाखा"],
      a: {
        en: "Pinnacle Academy is a fictional demo institute, so there's no real address. On your site, EduBot shows your address with a Google Maps link here.",
        mr: "पिनॅकल अकॅडमी हे डेमोसाठीचे काल्पनिक नाव आहे, त्यामुळे खरा पत्ता नाही. तुमच्या वेबसाइटवर EduBot इथे तुमचा पत्ता आणि Google Maps लिंक दाखवेल.",
        hi: "पिनैकल अकैडमी डेमो के लिए काल्पनिक नाम है, इसलिए असली पता नहीं है। आपकी वेबसाइट पर EduBot यहाँ आपका पता और Google Maps लिंक दिखाएगा।" } },
    { id: "start",
      k: ["start","starting","begin","new batch","date","सुरू","सुरुवात","शुरू","तारीख","कधीपासून","कब से"],
      a: {
        en: "New batches: 11–12, JEE and NEET start in April 2027; Foundation (8–10) starts in June 2027. Seats are limited to 25 per batch.",
        mr: "नवीन बॅचेस: ११–१२, JEE आणि NEET एप्रिल २०२७ पासून; फाउंडेशन (८–१०) जून २०२७ पासून. प्रत्येक बॅचमध्ये फक्त २५ जागा.",
        hi: "नए बैच: ११–१२, JEE और NEET अप्रैल २०२७ से; फाउंडेशन (८–१०) जून २०२७ से। हर बैच में सिर्फ २५ सीटें।" } },
    { id: "contact",
      k: ["contact","call","phone","number","whatsapp","talk","counsellor","counselor","human","संपर्क","फोन","नंबर","कॉल","बोलायचे","बात"],
      a: {
        en: "A counsellor can call you back — just fill the Fees enquiry form with the parent's number. (Demo: on your site this connects to your own WhatsApp and CRM.)",
        mr: "काउन्सेलर तुम्हाला परत कॉल करतील — Fees enquiry फॉर्ममध्ये पालकांचा नंबर भरा. (डेमो: तुमच्या साइटवर हे तुमच्या WhatsApp आणि CRM ला जोडले जाते.)",
        hi: "काउंसलर आपको कॉल बैक करेंगे — Fees enquiry फॉर्म में पैरेंट का नंबर भरिए। (डेमो: आपकी साइट पर यह आपके WhatsApp और CRM से जुड़ता है।)" } },
    { id: "thanks", g: 1,
      k: ["thanks","thank you","thank","ok","okay","great","dhanyavad","धन्यवाद","आभार","शुक्रिया","ठीक"],
      a: {
        en: "Happy to help! 😊 Anything else — fees, timings, or the demo lecture?",
        mr: "आनंद झाला! 😊 अजून काही — फी, वेळा, की डेमो लेक्चर?",
        hi: "खुशी हुई! 😊 और कुछ — फीस, टाइमिंग या डेमो लेक्चर?" } },
    { id: "agency",
      k: ["who made","who built","ab studio","website","chatbot","bot for my class","get this","template","price of website","हा बॉट","ही वेबसाइट","वेबसाइट","चॅटबॉट","चैटबॉट"],
      a: {
        en: "This demo website + EduBot is built by AB Studio and Advertise (Akola · Pune). Want it for your coaching class, with your courses and toppers? WhatsApp +91 93076 43461.",
        mr: "ही डेमो वेबसाइट + EduBot AB Studio and Advertise (अकोला · पुणे) यांनी बनवली आहे. तुमच्या क्लाससाठी, तुमचे कोर्सेस आणि टॉपर्ससह हवी आहे? WhatsApp करा +91 93076 43461.",
        hi: "यह डेमो वेबसाइट + EduBot AB Studio and Advertise (अकोला · पुणे) ने बनाई है। अपनी कोचिंग क्लास के लिए चाहिए? WhatsApp कीजिए +91 93076 43461." } }
  ];

  var UI = {
    en: { ph: "Ask about fees, timings, admission…", fallback: "I didn't catch that. Try one of these, or ask about fees, timings, courses or admission.", chips: [["courses","Courses"],["fees","Fees"],["timings","Timings"],["admission","Admission steps"],["demo","Free demo lecture"],["documents","Documents"],["agency","Get this for my class"]] },
    mr: { ph: "फी, वेळा, प्रवेश याबद्दल विचारा…", fallback: "माफ करा, समजले नाही. खालीलपैकी एक निवडा, किंवा फी, वेळा, कोर्स, प्रवेश याबद्दल विचारा.", chips: [["courses","कोर्सेस"],["fees","फी"],["timings","वेळा"],["admission","प्रवेश प्रक्रिया"],["demo","मोफत डेमो"],["documents","कागदपत्रे"],["agency","माझ्या क्लाससाठी हवे"]] },
    hi: { ph: "फीस, टाइमिंग, एडमिशन के बारे में पूछिए…", fallback: "माफ़ कीजिए, समझ नहीं पाया। नीचे से कुछ चुनिए, या फीस, टाइमिंग, कोर्स, एडमिशन के बारे में पूछिए।", chips: [["courses","कोर्स"],["fees","फीस"],["timings","टाइमिंग"],["admission","एडमिशन प्रोसेस"],["demo","फ्री डेमो"],["documents","डॉक्यूमेंट"],["agency","मेरी क्लास के लिए चाहिए"]] }
  };

  // ---------- Matching
  function norm(s) { return (" " + String(s).toLowerCase().replace(/[?!.,;:()"'“”‘’।]/g, " ").replace(/\s+/g, " ") + " "); }
  function isAscii(w) { return /^[\x00-\x7f]+$/.test(w); }
  function score(text, intent) {
    var t = norm(text), s = 0;
    intent.k.forEach(function (kw) {
      var w = kw.toLowerCase();
      if (isAscii(w)) { if (t.indexOf(" " + w + " ") > -1 || (w.length > 4 && t.indexOf(w) > -1)) s += w.indexOf(" ") > -1 ? 3 : 2; }
      else if (t.indexOf(w) > -1) s += 2;
    });
    return s;
  }
  function detectLang(text) {
    if (!/[\u0900-\u097F]/.test(text)) return null;
    if (/(आहे|आहेत|काय|किती|कुठे|कधी|मला|माझ्या|तुमच्या|पाहिजे|हवे|आणि|का\s?\?|ला\b)/.test(text)) return "mr";
    if (/(है|हैं|क्या|कितना|कितनी|कहाँ|कब|मुझे|मेरा|मेरी|चाहिए|और|कैसे)/.test(text)) return "hi";
    return null;
  }
  function answer(text) {
    var best = null, bestS = 0;
    KB.forEach(function (it) { var s = score(text, it); if (s > 0) s -= (it.g || 0); if (s > bestS) { bestS = s; best = it; } });
    return bestS > 0 ? best : null;
  }

  // ---------- DOM
  var $ = function (id) { return document.getElementById(id); };
  var bot = $("bot"), fab = $("botFab"), log = $("botLog"), chips = $("botChips"), form = $("botForm"), input = $("botText");
  var lang = "en", greeted = false;
  try { var saved = localStorage.getItem("edubot-lang"); if (saved && UI[saved]) lang = saved; } catch (e) {}

  function add(text, who) {
    var d = document.createElement("div");
    d.className = "msg " + who;
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }
  function botSay(text, delay) {
    var t = document.createElement("div");
    t.className = "typing"; t.setAttribute("aria-label", "EduBot is typing");
    t.innerHTML = "<i></i><i></i><i></i>";
    log.appendChild(t); log.scrollTop = log.scrollHeight;
    setTimeout(function () { t.remove(); add(text, "b"); }, delay == null ? 520 : delay);
  }
  function renderChips() {
    chips.textContent = "";
    UI[lang].chips.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = c[1];
      b.addEventListener("click", function () { ask(c[1], c[0]); });
      chips.appendChild(b);
    });
    input.placeholder = UI[lang].ph;
  }
  function setLang(l, announce) {
    if (!UI[l]) return;
    lang = l;
    try { localStorage.setItem("edubot-lang", l); } catch (e) {}
    document.querySelectorAll(".langs button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === l)); });
    renderChips();
    if (announce) botSay(KB[0].a[l], 300);
  }
  function ask(text, forcedId) {
    if (!text || !text.trim()) return;
    add(text.trim(), "u");
    var it = forcedId ? KB.filter(function (x) { return x.id === forcedId; })[0] : answer(text);
    if (!forcedId) { var dl = detectLang(text); if (dl && dl !== lang) setLang(dl, false); }
    botSay(it ? it.a[lang] : UI[lang].fallback);
  }
  function open() {
    bot.hidden = false; fab.setAttribute("aria-expanded", "true");
    if (!greeted) { greeted = true; botSay(KB[0].a[lang], 350); }
    setTimeout(function () { if (window.matchMedia("(min-width: 761px)").matches) input.focus(); }, 60);
  }
  function close() { bot.hidden = true; fab.setAttribute("aria-expanded", "false"); fab.focus(); }

  fab.addEventListener("click", function () { bot.hidden ? open() : close(); });
  $("botClose").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !bot.hidden) close(); });
  document.querySelectorAll("[data-open-bot]").forEach(function (b) { b.addEventListener("click", open); });
  document.querySelectorAll(".langs button").forEach(function (b) { b.addEventListener("click", function () { if (b.dataset.lang !== lang) setLang(b.dataset.lang, true); }); });
  form.addEventListener("submit", function (e) { e.preventDefault(); var v = input.value; input.value = ""; ask(v); });
  renderChips();
  setLang(lang, false);

  // ---------- Mobile menu
  var mb = $("menuBtn"), nl = $("navLinks");
  mb.addEventListener("click", function () { var o = nl.classList.toggle("open"); mb.setAttribute("aria-expanded", String(o)); });
  nl.addEventListener("click", function (e) { if (e.target.tagName === "A") { nl.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); } });

  // ---------- Enquiry form (demo: validates, sends nothing)
  var ef = $("enquiry"), note = $("formNote");
  ef.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ["f-name", "f-phone", "f-course"].forEach(function (id) {
      var el = $(id), v = el.value.trim(), bad = !v || (id === "f-phone" && !/^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10)));
      el.setAttribute("aria-invalid", String(bad)); if (bad) ok = false;
    });
    if (!ok) { note.className = "form-note"; note.textContent = "Please fill the student name, a 10-digit mobile number and the batch."; return; }
    note.className = "form-note ok";
    note.textContent = "✓ Demo only — nothing was sent. On your site this enquiry reaches your WhatsApp + CRM instantly.";
    ef.reset();
  });

  // expose for tests / reuse
  window.EduBot = { answer: answer, KB: KB, open: open, setLang: setLang };
})();
