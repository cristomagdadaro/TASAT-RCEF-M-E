export interface LanguageOption {
    code: string;
    name: string;
    region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
    { code: 'en', name: 'English', region: 'Default' },
    { code: 'fil', name: 'Tagalog (Filipino)', region: 'National / Central & Southern Luzon' },
    { code: 'ilo', name: 'Ilokano (Ilocano)', region: 'Northern Luzon / Region 1, 2, CAR' },
    { code: 'ceb', name: 'Cebuano (Bisaya)', region: 'Central Visayas & Mindanao' },
    { code: 'hil', name: 'Hiligaynon (Ilonggo)', region: 'Western Visayas & SOCCSKSARGEN' },
    { code: 'war', name: 'Waray-Waray', region: 'Eastern Visayas / Samar, Leyte' },
    { code: 'bik', name: 'Bikol', region: 'Bicol Region / Region 5' },
    { code: 'pam', name: 'Kapampangan', region: 'Central Luzon / Pampanga, Tarlac' },
    { code: 'pag', name: 'Pangasinan', region: 'Pangasinan / Central & Northern Luzon' },
];

export interface TranslationDictionary {
    title: string;
    subtitle: string;
    backButton: string;
    cancelButton: string;
    saveButton: string;
    savingButton: string;
    errorHeader: string;
    languageLabel: string;
    block1_title: string;
    block1_instructions: string;
    b1q1_label: string;
    b1q1_placeholder: string;
    b1q2_label: string;
    b1q3_label: string;
    b1q3_placeholder: string;
    b1q4_label: string;
    b1q5_label: string;
    b1q5_placeholder: string;
    b1q6_label: string;
    block2_title: string;
    block2_instructions: string;
    b2q1_label: string;
    b2q1_placeholder: string;
    b2q2_label: string;
    b2q3_label: string;
    b2q4_label: string;
    b2q5_label: string;
    b2q5_placeholder: string;
    b2q6_label: string;
    b2q7_label: string;
    b2q7_placeholder: string;
    block2_hidden_notice: string;
    options: Record<string, string>;
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
    en: {
        title: 'Field Questionnaire',
        subtitle: 'Appendix A: Sample Field Questionnaire \u2022 Offline Entry',
        backButton: '\u2190 Back to Records',
        cancelButton: 'Cancel',
        saveButton: 'Save Interview to SQLite',
        savingButton: 'Saving to SQLite...',
        errorHeader: 'Please correct the following before saving:',
        languageLabel: 'Language / Wika:',
        block1_title: 'Farmer Information',
        block1_instructions: 'Fill-in the required information',
        b1q1_label: "Farmer's Full Name",
        b1q1_placeholder: "Enter farmer's full name",
        b1q2_label: 'Sex',
        b1q3_label: 'Age',
        b1q3_placeholder: 'e.g. 45',
        b1q4_label: 'Province',
        b1q5_label: 'Municipality/City',
        b1q5_placeholder: 'Enter municipality or city',
        b1q6_label: 'Is the farmer currently engaged in rice farming?',
        block2_title: 'Rice Farming Information',
        block2_instructions: 'Fill-in the required information',
        b2q1_label: 'Total rice farm area (hectares)',
        b2q1_placeholder: 'e.g. 1.75',
        b2q2_label: 'Primary rice ecosystem',
        b2q3_label: 'Rice establishment method',
        b2q4_label: 'Does the farmer use certified rice seeds?',
        b2q5_label: 'If yes, what seed variety does the farmer primarily use?',
        b2q5_placeholder: 'e.g. NSIC Rc 222, Rc 480',
        b2q6_label: "What are the farmer's main rice production challenges?",
        b2q7_label: 'If Others is selected, please specify',
        b2q7_placeholder: 'Specify other production challenge details...',
        block2_hidden_notice:
            'Notice: Block 2 (Rice Farming Information) is hidden because the respondent answered No to Q6 (Not currently engaged in rice farming). You may proceed to save Block 1.',
        options: {
            Male: 'Male',
            Female: 'Female',
            Yes: 'Yes',
            No: 'No',
            Irrigated: 'Irrigated',
            'Rainfed Lowland': 'Rainfed Lowland',
            Upland: 'Upland',
            'Direct Seeding': 'Direct Seeding',
            Transplanting: 'Transplanting',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'High cost of inputs (fertilizer, seeds, pesticides)',
            'Low price of palay / low farmgate price':
                'Low price of palay / low farmgate price',
            'Lack of irrigation / water supply':
                'Lack of irrigation / water supply',
            'Pests and diseases': 'Pests and diseases',
            'Calamities / typhoons / flooding / drought':
                'Calamities / typhoons / flooding / drought',
            'Lack of machinery / equipment': 'Lack of machinery / equipment',
            'Lack of capital / credit access':
                'Lack of capital / credit access',
            'Labor shortage / high labor cost':
                'Labor shortage / high labor cost',
            Others: 'Others',
        },
    },

    fil: {
        title: 'Kwestyoner sa Bukid',
        subtitle: 'Apendiks A: Halimbawang Kwestyoner sa Bukid \u2022 Offline Entry',
        backButton: '\u2190 Bumalik sa Talaan',
        cancelButton: 'Kanselahin',
        saveButton: 'I-save ang Panayam sa SQLite',
        savingButton: 'Kasalukuyang Sine-save sa SQLite...',
        errorHeader: 'Pakitama ang mga sumusunod bago i-save:',
        languageLabel: 'Wika ng Kwestyoner:',
        block1_title: 'Impormasyon ng Magsasaka',
        block1_instructions: 'Punan ang mga kinakailangang impormasyon',
        b1q1_label: 'Buong Pangalan ng Magsasaka',
        b1q1_placeholder: 'Ilagay ang buong pangalan',
        b1q2_label: 'Kasarian',
        b1q3_label: 'Edad',
        b1q3_placeholder: 'hal. 45',
        b1q4_label: 'Lalawigan / Probinsya',
        b1q5_label: 'Bayan / Lungsod',
        b1q5_placeholder: 'Ilagay ang bayan o lungsod',
        b1q6_label: 'Kasalukuyan bang nagsasaka ng palay ang magsasaka?',
        block2_title: 'Impormasyon sa Pagsasaka ng Palay',
        block2_instructions: 'Punan ang mga kinakailangang impormasyon',
        b2q1_label: 'Kabuuang sukat ng sakahan ng palay (ektarya)',
        b2q1_placeholder: 'hal. 1.75',
        b2q2_label: 'Pangunahing ekosistema ng sakahan',
        b2q3_label: 'Paraan ng pagtatanim ng palay',
        b2q4_label: 'Gumagamit ba ang magsasaka ng sertipikadong binhi?',
        b2q5_label: 'Kung oo, anong barayti ng binhi ang pangunahing ginagamit?',
        b2q5_placeholder: 'hal. NSIC Rc 222, Rc 480',
        b2q6_label: 'Ano ang mga pangunahing hamon sa produksyon ng palay?',
        b2q7_label: 'Kung Iba pa ang napili, mangyaring tukuyin',
        b2q7_placeholder: 'Tukuyin ang iba pang hamon...',
        block2_hidden_notice:
            'Paunawa: Nakatago ang Block 2 (Impormasyon sa Pagsasaka) dahil sumagot ng Hindi sa Q6 (Hindi kasalukuyang nagsasaka ng palay). Maaari nang i-save ang Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Babae',
            Yes: 'Oo',
            No: 'Hindi',
            Irrigated: 'May Patubig (Irrigated)',
            'Rainfed Lowland': 'Sahod-Ulan (Rainfed Lowland)',
            Upland: 'Mataas na Lupa (Upland)',
            'Direct Seeding': 'Sabog-Tanim (Direct Seeding)',
            Transplanting: 'Lipat-Tanim (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Mataas na presyo ng abono, binhi, at lason',
            'Low price of palay / low farmgate price':
                'Mababang presyo ng palay / farmgate price',
            'Lack of irrigation / water supply':
                'Kakulangan sa patubig / suplay ng tubig',
            'Pests and diseases': 'Mga peste at sakit sa pananim',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyo, baha, tagtuyot)',
            'Lack of machinery / equipment': 'Kakulangan sa makinarya at kagamitan',
            'Lack of capital / credit access':
                'Kakulangan sa puhunan o pautang',
            'Labor shortage / high labor cost':
                'Kakulangan sa manggagawa o mataas na upa',
            Others: 'Iba pa',
        },
    },

    ilo: {
        title: 'Kuestioner iti Talon',
        subtitle: 'Apendiks A: Wagas ti Panagsurbey iti Mannalon \u2022 Offline Entry',
        backButton: '\u2190 Agsubli iti Listaan',
        cancelButton: 'Ibabawi',
        saveButton: 'Idulin ti Interbio iti SQLite',
        savingButton: 'Madama nga Iduldulin iti SQLite...',
        errorHeader: 'Pakisursurat ti umno sakbay nga idulin:',
        languageLabel: 'Pagsasao ti Kuestioner:',
        block1_title: 'Impormasion ti Mannalon',
        block1_instructions: 'Isurat dagiti kasapulan nga impormasion',
        b1q1_label: 'Nagan ti Mannalon',
        b1q1_placeholder: 'Isurat ti kompleto a nagan',
        b1q2_label: 'Karkaro / Kasarian',
        b1q3_label: 'Tawen',
        b1q3_placeholder: 'kas pangarigan 45',
        b1q4_label: 'Probinsia',
        b1q5_label: 'Munisipio / Siudad',
        b1q5_placeholder: 'Isurat ti munisipio wenno siudad',
        b1q6_label: 'Agmulmula kadi ita iti pagay ti mannalon?',
        block2_title: 'Impormasion ti Panagtalon iti Pagay',
        block2_instructions: 'Isurat dagiti kasapulan nga impormasion',
        b2q1_label: 'Dagup a kalawa ti talon ti pagay (ektaria)',
        b2q1_placeholder: 'kas pangarigan 1.75',
        b2q2_label: 'Kangrunaan nga ekosistema ti talon',
        b2q3_label: 'Wagas ti panagmula iti pagay',
        b2q4_label: 'Agus-usar kadi ti mannalon iti sertipikado a bin-i?',
        b2q5_label: 'No wen, ania a kita wenno barayti ti bin-i ti kangrunaan a maus-usar?',
        b2q5_placeholder: 'kas pangarigan NSIC Rc 222, Rc 480',
        b2q6_label: 'Ania dagiti kangrunaan a pakarigatan iti panagtalon iti pagay?',
        b2q7_label: 'No sabali ti napili, pakitukoy',
        b2q7_placeholder: 'Itukoy dagiti sabali a pakarigatan...',
        block2_hidden_notice:
            'Pakaammo: Nakalemmeng ti Block 2 ta Saan ti sungbat iti Q6 (Saan nga agmulmula iti pagay). Mabalin mon nga idulin ti Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Babai',
            Yes: 'Wen',
            No: 'Saan',
            Irrigated: 'Masibugan (Irrigated)',
            'Rainfed Lowland': 'Pasayak (Rainfed Lowland)',
            Upland: 'Bantay / Bakras (Upland)',
            'Direct Seeding': 'Sabog-Mula (Direct Seeding)',
            Transplanting: 'Raep (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Nangina a pataba, bin-i, ken agas',
            'Low price of palay / low farmgate price':
                'Nababa a presio ti pagay',
            'Lack of irrigation / water supply':
                'Kinaawan ti danum wenno patubig',
            'Pests and diseases': 'Dungdungo, igges ken sakit ti pagay',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyo, layus, giddang)',
            'Lack of machinery / equipment': 'Kinaawan ti makinarya ken ramit',
            'Lack of capital / credit access':
                'Kinaawan ti puonan wenno pautang',
            'Labor shortage / high labor cost':
                'Kinaawan ti trabahador wenno nangina a tangdan',
            Others: 'Sabali pay',
        },
    },

    ceb: {
        title: 'Kwestyoner sa Umahan',
        subtitle: 'Apendiks A: Sumbanan sa Kwestyoner sa Uma \u2022 Offline Entry',
        backButton: '\u2190 Balik sa Listahan',
        cancelButton: 'Kanselahon',
        saveButton: 'I-save ang Interbyu sa SQLite',
        savingButton: 'Gisave sa SQLite...',
        errorHeader: 'Palihug tarunga kining mosunod sa dili pa i-save:',
        languageLabel: 'Pinulongan sa Kwestyoner:',
        block1_title: 'Impormasyon sa Mag-uuma',
        block1_instructions: 'Sulati ang gikinahanglan nga mga impormasyon',
        b1q1_label: 'Tibuok Ngalan sa Mag-uuma',
        b1q1_placeholder: 'Isulat ang tibuok ngalan',
        b1q2_label: 'Sekso',
        b1q3_label: 'Pangidaron',
        b1q3_placeholder: 'pananglit 45',
        b1q4_label: 'Lalawigan / Probinsya',
        b1q5_label: 'Munisipyo / Dakbayan',
        b1q5_placeholder: 'Isulat ang munisipyo o dakbayan',
        b1q6_label: 'Karon ba aktibo nga nag-uma og humay ang mag-uuma?',
        block2_title: 'Impormasyon sa Pag-uma og Humay',
        block2_instructions: 'Sulati ang gikinahanglan nga mga impormasyon',
        b2q1_label: 'Kinatibuk-ang sukod sa humayan (ektarya)',
        b2q1_placeholder: 'pananglit 1.75',
        b2q2_label: 'Pangulong ekosistema sa humayan',
        b2q3_label: 'Pamaagi sa pagtanom og humay',
        b2q4_label: 'Naggamit ba ang mag-uuma og sertipikadong binhi?',
        b2q5_label: 'Kung oo, unsa nga matang o barayti sa binhi ang pangunang gigamit?',
        b2q5_placeholder: 'pananglit NSIC Rc 222, Rc 480',
        b2q6_label: 'Unsa ang mga nag-unang hagit sa produksyon sa humay?',
        b2q7_label: 'Kung Uban ang napili, palihug detalyeha',
        b2q7_placeholder: 'Isulat ang uban pang mga hagit...',
        block2_hidden_notice:
            'Pahibalo: Gitago ang Block 2 tungod kay Dili ang tubag sa Q6 (Dili karon nag-uma og humay). Mahimo na nimong i-save ang Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Babaye',
            Yes: 'Oo',
            No: 'Dili',
            Irrigated: 'Patubig (Irrigated)',
            'Rainfed Lowland': 'Salod-Ulan (Rainfed Lowland)',
            Upland: 'Bungtod (Upland)',
            'Direct Seeding': 'Sabwag (Direct Seeding)',
            Transplanting: 'Tanom / Salod (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Kamahal sa abono, binhi, ug pestisidyo',
            'Low price of palay / low farmgate price':
                'Kabarato sa presyo sa humay / farmgate price',
            'Lack of irrigation / water supply':
                'Kakuwang sa patubig / suplay sa tubig',
            'Pests and diseases': 'Mga peste ug sakit sa humay',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyo, baha, hulaw)',
            'Lack of machinery / equipment': 'Kakuwang sa makinarya ug ekipo',
            'Lack of capital / credit access':
                'Kakuwang sa puhonan o pautang',
            'Labor shortage / high labor cost':
                'Kakuwang sa mamumuo o mahal nga suhol',
            Others: 'Uban pa',
        },
    },

    hil: {
        title: 'Kwestyoner sang Uma',
        subtitle: 'Apendiks A: Ehemplo sang Kwestyoner sa Uma \u2022 Offline Entry',
        backButton: '\u2190 Balik sa Listahan',
        cancelButton: 'Kanselahon',
        saveButton: 'I-save ang Interbyu sa SQLite',
        savingButton: 'Ginasave sa SQLite...',
        errorHeader: 'Palihog tadlunga ang mga masunod antes i-save:',
        languageLabel: 'Hambal sang Kwestyoner:',
        block1_title: 'Impormasyon sang Mangunguma',
        block1_instructions: 'Ibutang ang ginapangayo nga mga impormasyon',
        b1q1_label: 'Bug-os nga Ngalan sang Mangunguma',
        b1q1_placeholder: 'Ibutang ang bug-os nga ngalan',
        b1q2_label: 'Sekso',
        b1q3_label: 'Edad',
        b1q3_placeholder: 'halimbawa 45',
        b1q4_label: 'Probinsya',
        b1q5_label: 'Banwa / Dakbanwa',
        b1q5_placeholder: 'Ibutang ang banwa ukon dakbanwa',
        b1q6_label: 'Subong bala nagapanguma sang humay ang mangunguma?',
        block2_title: 'Impormasyon sa Pagpanguma sang Humay',
        block2_instructions: 'Ibutang ang ginapangayo nga mga impormasyon',
        b2q1_label: 'Kabilugan nga kalapad sang humayan (ektarya)',
        b2q1_placeholder: 'halimbawa 1.75',
        b2q2_label: 'Panguna nga ekosistema sang humayan',
        b2q3_label: 'Pamaagi sang pagtanom sang humay',
        b2q4_label: 'Nagagamit bala ang mangunguma sang sertipikado nga binhi?',
        b2q5_label: 'Kon huo, ano nga barayti sang binhi ang panguna nga ginagamit?',
        b2q5_placeholder: 'halimbawa NSIC Rc 222, Rc 480',
        b2q6_label: 'Ano ang mga panguna nga kabudlayan sa produksyon sang humay?',
        b2q7_label: 'Kon Iban ang napili, palihog isaysay',
        b2q7_placeholder: 'Isaysay ang iban pa nga kabudlayan...',
        block2_hidden_notice:
            'Pahibalo: Nakatago ang Block 2 kay Indi ang sabat sa Q6 (Wala subong nagapanguma sang humay). Pwede mo na ma-save ang Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Babayi',
            Yes: 'Huo',
            No: 'Indi',
            Irrigated: 'May Patubig (Irrigated)',
            'Rainfed Lowland': 'Sahod-Ulan (Rainfed Lowland)',
            Upland: 'Bukid (Upland)',
            'Direct Seeding': 'Sab-og (Direct Seeding)',
            Transplanting: 'Panggas / Tanom (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Kamahal sang abono, binhi, kag bulong',
            'Low price of palay / low farmgate price':
                'Kabarato sang presyo sang humay',
            'Lack of irrigation / water supply':
                'Kakulangan sa patubig / suplay sang tubig',
            'Pests and diseases': 'Mga peste kag balatian sang humay',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyo, baha, tig-ilinit)',
            'Lack of machinery / equipment': 'Kakulangan sa makinarya kag kagamitan',
            'Lack of capital / credit access':
                'Kakulangan sa puhunan ukon pautang',
            'Labor shortage / high labor cost':
                'Kakulangan sa mamumugon ukon mataas nga suhol',
            Others: 'Iban pa',
        },
    },

    war: {
        title: 'Kwestyoner han Humayan',
        subtitle: 'Apendiks A: Sumbanan han Kwestyoner ha Uma \u2022 Offline Entry',
        backButton: '\u2190 Balik ha Listahan',
        cancelButton: 'Kanselahon',
        saveButton: 'I-save an Interbyu ha SQLite',
        savingButton: 'Ginsasave ha SQLite...',
        errorHeader: 'Alayon tadonga an mga masunod san-o i-save:',
        languageLabel: 'Yinaknan han Kwestyoner:',
        block1_title: 'Impormasyon han Parag-uma',
        block1_instructions: 'Isurat an ginkikinahanglan nga mga impormasyon',
        b1q1_label: 'Bug-os nga Ngaran han Parag-uma',
        b1q1_placeholder: 'Isurat an bug-os nga ngaran',
        b1q2_label: 'Kasarian',
        b1q3_label: 'Pangidaron',
        b1q3_placeholder: 'sugad 45',
        b1q4_label: 'Probinsya',
        b1q5_label: 'Bungto / Syudad',
        b1q5_placeholder: 'Isurat an bungto o syudad',
        b1q6_label: 'Yana ba nag-uuma hin humay an parag-uma?',
        block2_title: 'Impormasyon han Pag-uma hin Humay',
        block2_instructions: 'Isurat an ginkikinahanglan nga mga impormasyon',
        b2q1_label: 'Bug-os nga kahaluag han humayan (ektarya)',
        b2q1_placeholder: 'sugad 1.75',
        b2q2_label: 'Panguna nga ekosistema han humayan',
        b2q3_label: 'Pamaagi han pagtanom hin humay',
        b2q4_label: 'Nagamit ba an parag-uma hin sertipikado nga liso?',
        b2q5_label: 'Kun oo, ano nga barayti hin liso an panguna nga gin-gagamit?',
        b2q5_placeholder: 'sugad NSIC Rc 222, Rc 480',
        b2q6_label: 'Ano an mga panguna nga kakuri-an ha produksyon hin humay?',
        b2q7_label: 'Kun Iba an napili, alayon isaysay',
        b2q7_placeholder: 'Isaysay an iba pa nga mga kakuri-an...',
        block2_hidden_notice:
            'Pahibalo: Nakatago an Block 2 kay Diri an baton ha Q6 (Diri yana nag-uuma hin humay). Pwede na nimo i-save an Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Babaye',
            Yes: 'Oo',
            No: 'Diri',
            Irrigated: 'May Patubig (Irrigated)',
            'Rainfed Lowland': 'Sahod-Uran (Rainfed Lowland)',
            Upland: 'Bukid (Upland)',
            'Direct Seeding': 'Sabwag (Direct Seeding)',
            Transplanting: 'Tanom (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Kahitas-on han presyo han abono, binhi, ngan tambal',
            'Low price of palay / low farmgate price':
                'Kahamubo han presyo han humay',
            'Lack of irrigation / water supply':
                'Kulang an patubig / suplay han tubig',
            'Pests and diseases': 'Mga peste ngan sakit han humay',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyo, baha, huwaw)',
            'Lack of machinery / equipment': 'Kulang hin makinarya ngan kagamitan',
            'Lack of capital / credit access':
                'Kulang hin puhunan o pautang',
            'Labor shortage / high labor cost':
                'Kulang hin magtatrabaho o hitaas nga suhol',
            Others: 'Iba pa',
        },
    },

    bik: {
        title: 'Kwestyoner kan Paraoma',
        subtitle: 'Apendiks A: Halimbawa nin Kwestyoner sa Uma \u2022 Offline Entry',
        backButton: '\u2190 Magbalik sa Listahan',
        cancelButton: 'Kanselahon',
        saveButton: 'I-save an Interbyu sa SQLite',
        savingButton: 'Pigsasave sa SQLite...',
        errorHeader: 'Pakitama an mga minasunod bago i-save:',
        languageLabel: 'Taramon kan Kwestyoner:',
        block1_title: 'Impormasyon kan Paraoma',
        block1_instructions: 'Ikaag an mga kinakaipuhan na impormasyon',
        b1q1_label: 'Bilog na Pangaran kan Paraoma',
        b1q1_placeholder: 'Ikaag an bilog na pangaran',
        b1q2_label: 'Kasarian',
        b1q3_label: 'Edad',
        b1q3_placeholder: 'halimbawa 45',
        b1q4_label: 'Probinsya',
        b1q5_label: 'Banwaan / Syudad',
        b1q5_placeholder: 'Ikaag an banwaan o syudad',
        b1q6_label: 'Sa presente daw nag-ooma nin paroy an paraoma?',
        block2_title: 'Impormasyon sa Pag-oma nin Paroy',
        block2_instructions: 'Ikaag an mga kinakaipuhan na impormasyon',
        b2q1_label: 'Kabilugan na hiwas kan oma nin paroy (ektarya)',
        b2q1_placeholder: 'halimbawa 1.75',
        b2q2_label: 'Panginot na ekosistema kan oma',
        b2q3_label: 'Paagi nin pagtanom nin paroy',
        b2q4_label: 'Naggagamit daw an paraoma nin sertipikadong banhi?',
        b2q5_label: 'Kun iyo, anong barayti nin banhi an panginot na ginagamit?',
        b2q5_placeholder: 'halimbawa NSIC Rc 222, Rc 480',
        b2q6_label: 'Ano an mga pangenot na kadipisilan sa produksyon nin paroy?',
        b2q7_label: 'Kun Iba pa an napili, pakisabi',
        b2q7_placeholder: 'Isabi an iba pang mga kadipisilan...',
        block2_hidden_notice:
            'Paisi: Nakatago an Block 2 ta Dai an simbag sa Q6 (Bako sa presente nag-ooma nin paroy). Pwede mo nang i-save an Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Babayi',
            Yes: 'Iyo',
            No: 'Dai',
            Irrigated: 'May Patubig (Irrigated)',
            'Rainfed Lowland': 'Sahod-Uran (Rainfed Lowland)',
            Upland: 'Bukid (Upland)',
            'Direct Seeding': 'Sabog (Direct Seeding)',
            Transplanting: 'Tanom (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Kahalanokan kan abono, binhi, asin bulong',
            'Low price of palay / low farmgate price':
                'Kabarato kan presyo kan paroy',
            'Lack of irrigation / water supply':
                'Kakulangan sa patubig / suplay kan tubig',
            'Pests and diseases': 'Mga peste asin helang kan pananom',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyo, baha, tag-init)',
            'Lack of machinery / equipment': 'Kakulangan sa makinarya asin gamit',
            'Lack of capital / credit access':
                'Kakulangan sa puhonan o pautang',
            'Labor shortage / high labor cost':
                'Kakulangan sa trabahador o mahal an suhol',
            Others: 'Iba pa',
        },
    },

    pam: {
        title: 'Kwestyunaryu king Asikan',
        subtitle: 'Apendiks A: Alimbawa ning Kwestyunaryu \u2022 Offline Entry',
        backButton: '\u2190 Mibalik king Talaan',
        cancelButton: 'Ibawi',
        saveButton: 'I-save ing Panayam king SQLite',
        savingButton: 'Kasalungsungang Isisave king SQLite...',
        errorHeader: 'Pakitulid la ring makatuki bayu i-save:',
        languageLabel: 'Amanung Gagamitan king Form:',
        block1_title: 'Impormasyun ning Kasamak',
        block1_instructions: 'Ibie la ring kailangang impormasyun',
        b1q1_label: 'Kabilugang Lagyu ning Kasamak',
        b1q1_placeholder: 'Ipalub ya ing kabilugang lagyu',
        b1q2_label: 'Kasarian',
        b1q3_label: 'Edad',
        b1q3_placeholder: 'alimbawa 45',
        b1q4_label: 'Lalawigan / Probinsya',
        b1q5_label: 'Balen / Syudad',
        b1q5_placeholder: 'Ipalub ya ing balen o syudad',
        b1q6_label: 'Kasalungsungan ya waring sasaup o tatalan pale ing kasamak?',
        block2_title: 'Impormasyun king Pamamale',
        block2_instructions: 'Ibie la ring kailangang impormasyun',
        b2q1_label: 'Kabilugang dagul ning asikan pale (ektarya)',
        b2q1_placeholder: 'alimbawa 1.75',
        b2q2_label: 'Pang-apun a ekosistema ning asikan',
        b2q3_label: 'Paralan ning pamamutan pale',
        b2q4_label: 'Gagamit ya wari sertipikadung bini ing kasamak?',
        b2q5_label: 'Nung wa, nanung bini o barayti ing panimunang gagamitan?',
        b2q5_placeholder: 'alimbawa NSIC Rc 222, Rc 480',
        b2q6_label: 'Nanu la ring manimunang kasakitan king pamamale?',
        b2q7_label: 'Nung Aliwa ing mepili, pakisulat',
        b2q7_placeholder: 'Isulat la ring aliwang kasakitan...',
        block2_hidden_notice:
            'Pabalu: Makasalikut ya ing Block 2 uling Ali ya ing pakibat king Q6 (E kasalungsungang mamale). Maliari meng i-save ing Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Babai',
            Yes: 'Wa',
            No: 'Ali',
            Irrigated: 'May Patubig (Irrigated)',
            'Rainfed Lowland': 'Sahud-Uran (Rainfed Lowland)',
            Upland: 'Bunduk (Upland)',
            'Direct Seeding': 'Sabug (Direct Seeding)',
            Transplanting: 'Lipat-Tanam (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Katas ning alaga ning pataba, bini, at panulu',
            'Low price of palay / low farmgate price':
                'Kababan ning presyu ning pale',
            'Lack of irrigation / water supply':
                'Kakulangan king patubig o suplay ning danum',
            'Pests and diseases': 'Salun at peste karing tanaman',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyu, albug, kauran)',
            'Lack of machinery / equipment': 'Kakulangan king makinarya at kasangkapan',
            'Lack of capital / credit access':
                'Kakulangan king puhunan o pamautang',
            'Labor shortage / high labor cost':
                'Kakulangan king magobra o matas a upa',
            Others: 'Aliwa pa',
        },
    },

    pag: {
        title: 'Kwestyunaryo ed Panagdalon',
        subtitle: 'Apendiks A: Alimbawa na Kwestyunaryo \u2022 Offline Entry',
        backButton: '\u2190 Pawil ed Listaan',
        cancelButton: 'Iatras',
        saveButton: 'I-save so Interbyu ed SQLite',
        savingButton: 'Isasave la ed SQLite...',
        errorHeader: 'Ipustem irayan onsublay antis ya i-save:',
        languageLabel: 'Salita na Kwestyunaryo:',
        block1_title: 'Impormasyon na Manag-dalon',
        block1_instructions: 'Isulat iray nakaukolan ya impormasyon',
        b1q1_label: 'Tnap ya Ngaran na Manag-dalon',
        b1q1_placeholder: 'Isulat so interon ngaran',
        b1q2_label: 'Kasarian',
        b1q3_label: 'Taon / Edad',
        b1q3_placeholder: 'singa 45',
        b1q4_label: 'Probinsya',
        b1q5_label: 'Baley / Siyudad',
        b1q5_placeholder: 'Isulat so baley o siyudad',
        b1q6_label: 'Kassumpal odino natan kasalungsungan ya mandadalon na pagey?',
        block2_title: 'Impormasyon ed Panagdalon na Pagey',
        block2_instructions: 'Isulat iray nakaukolan ya impormasyon',
        b2q1_label: 'Kabalegan na dalon na pagey (ektarya)',
        b2q1_placeholder: 'singa 1.75',
        b2q2_label: 'Pangruna ya ekosistema na dalon',
        b2q3_label: 'Paraan na panag-tanem na pagey',
        b2q4_label: 'Manguusar kasi so manag-dalon na sertipikadon bini?',
        b2q5_label: 'No on, anton barayti na bini so manunan uusaren?',
        b2q5_placeholder: 'singa NSIC Rc 222, Rc 480',
        b2q6_label: 'Antoray manunan kairapan ed panag-ani na pagey?',
        b2q7_label: 'No Arum so napili, ipaliwawa',
        b2q7_placeholder: 'Isulat iray arum ya kairapan...',
        block2_hidden_notice:
            'Pakabat: Nakalemeng so Block 2 ta Andi so ebat ed Q6 (Aga natan mandadalon na pagey). Sarag mo lay mang-save ed Block 1.',
        options: {
            Male: 'Lalaki',
            Female: 'Bii',
            Yes: 'On',
            No: 'Andi',
            Irrigated: 'Nabaybayan (Irrigated)',
            'Rainfed Lowland': 'Salor-Uran (Rainfed Lowland)',
            Upland: 'Palandey (Upland)',
            'Direct Seeding': 'Sabog (Direct Seeding)',
            Transplanting: 'Tanem (Transplanting)',
            'High cost of inputs (fertilizer, seeds, pesticides)':
                'Pangina na abono, bini, tan tambal',
            'Low price of palay / low farmgate price':
                'Kababawan na presyo na pagey',
            'Lack of irrigation / water supply':
                'Kulang so danum o patubig',
            'Pests and diseases': 'Igges tan sakit na pananem',
            'Calamities / typhoons / flooding / drought':
                'Kalamidad (bagyo, layos, tikag)',
            'Lack of machinery / equipment': 'Kulang so makinarya tan kagawaan',
            'Lack of capital / credit access':
                'Kulang so puhunan odino pautang',
            'Labor shortage / high labor cost':
                'Kulang so manggagaway trabaho o atagay a bayar',
            Others: 'Arum ni',
        },
    },
};

export const getTranslation = (langCode: string): TranslationDictionary => {
    return TRANSLATIONS[langCode] || TRANSLATIONS.en;
};
