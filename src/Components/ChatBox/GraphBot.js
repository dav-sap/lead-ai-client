import React from 'react';
var dataTree = require('data-tree');

const QUESTION = "question";
const ANSWER_INPUT = "answer_input";
const ANSWER_OPTION = "answer_option";
const ANSWER_CALENDAR = "answer_calendar";
const ANSWER_PIC_OPTIONS = "answer_pic_options";
const FEMALE = "Female";
const MALE = "Male";
const NOT_YET_STR = "עוד לא";
const YES_STR = "כן!";
const END_STR = "מעולה! היועץ שלנו יצור איתך בקרוב.";
const YOUR_NUM_STR_AFTER_DATE = <span>תאריך חלום! 😍 שאלה אחרונה.<br/> מה מספר הטלפון שלך?</span>
const YOUR_NUM_STR_AFTER_NO_DATE = <span>אין לחץ 😉 שאלה אחרונה.<br/> מה מספר הטלפון שלך?</span>
const WHEN_WED_QUESTION = "קולולו!!! מתי מתחתנים?";
const GET_CONSULTANT = <span>המומחים הטובים ביותר בתחום <br/> צילום החתונות עומדים לרשותכם. <br/> בחרו את היועץ איתו תרצו להתכתב:</span>
const END_YOUR_NUMBER_STR = <span>שאלה אחרונה.<br/>מה מספר הטלפון שלך?</span>


let get_consultant = {
    type: QUESTION,
    content: GET_CONSULTANT
};
let get_consultant_options = {
    type: ANSWER_PIC_OPTIONS,
};
let hello_get_name = {
    type: QUESTION,
    gender: "",
    get content() {
        let today = new Date().getHours();
        let start = "";
        if (today >= 5 && today < 12) {
            start = "בוקר טוב!"
        } else if (today >= 12 && today < 18) {
            start = "צהריים טובים!"
        } else if (today >= 18 && today < 22) {
            start = "ערב טוב!"
        } else if (today >= 22 || today < 5) {
            start = "לילה טוב!"
        }
        let end = " איך קוראים לך?";
        return start + end;
    }
};

let get_name_input = {
    type: ANSWER_INPUT,
    createUser : true,
    placeholder: "שם מלא |",
    inputType: "text",
    changeString: function (oldInput, newInput) {
        let retInput = newInput;

        return retInput.replace(/[0-9./-]/g, "").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\n]/gi, '');
    },
    validator: function (value) {
        // let reg = /^([^0-9]*)$/;
        // return reg.test(value);
        return value.length <= 15;
    },
    validateSubmit: function (value) {
        return value.length >= 1
    }
};


let is_wed_date = {
    type: QUESTION,
    name: "",
    getName: true,
    get content() {
        // let start = "נעים מאוד ";
        let name = " " + this.name.split(" ")[0] + " ";
        // let end = ". יש כבר תאריך לחתונה?";
        
        return (
            <span> נעים מאוד
            <span>{name}</span>
            💐
            <br/>
            יש כבר תאריך לחתונה?
            </span>
        )
    }
}

let is_wed_date_no = {
    type: ANSWER_OPTION,
    content:NOT_YET_STR,
    validateSubmit: function (value) {
        return true
    }
};

let is_wed_date_yes = {
    type: ANSWER_OPTION,
    content: YES_STR,
    validateSubmit: function (value) {
        return true
    }
};


let get_wed_date = {
    type: QUESTION,
    content: WHEN_WED_QUESTION
}
let get_wed_date_input = {
    type: ANSWER_CALENDAR,

    get placeholder() {
        return "הכנס תאריך"
    },
    validateSubmit: function (value) {
        return true
    }

}

let get_cell_num_input = {
    type: ANSWER_INPUT,
    placeholder: "הכנס מספר נייד",
    dir:"ltr",
    inputType: "tel",
    changeString: function (oldInput, newInput) {
        let retInput = newInput;

        if (oldInput.length === 4 && newInput.length === 3) {
            retInput = newInput.slice(0, -1);
        }
        if (retInput.length >= 3) {
            retInput = retInput.replace("-","").replace(/[^0-9./-]/g, "");
            return retInput.slice(0, 3) + "-" + retInput.slice(3);
        }
        return retInput.replace(/[^0-9./-]/g, "");
    },
    validator: function (value) {
        return value !== undefined && value !== null && value.length <= 11;
    },
    validateSubmit: function (value) {
        return value && value.length === 11
    }
};
let get_cell_num_with_date =  {
    type: QUESTION,
    content: YOUR_NUM_STR_AFTER_DATE
};
let get_cell_num_no_date = {
    type: QUESTION,
    content: YOUR_NUM_STR_AFTER_NO_DATE,
    // dir:"ltr",
};

let end = {
    type: QUESTION,
    getName: true,
    name: "",
    getConsultantName: true,
    consultantName: "",
    get content() {
        let MAZAL_TOV = "מזל טוב ";
        let name = this.name.split(" ")[0];
        let EX = "! ";
        let consultant = this.consultantName;
        let END = " איתך קשר בקרוב";
        return (
            <span>
            <span>{MAZAL_TOV}</span>
            <span>{name}</span>
            !
            <br/>
            <span>{consultant}</span>
            <span>{END}</span>
            </span>
        )
    },
    completed: true
};
function getMobileBot() {
    let mobileBot = dataTree.create();
    let get_consultant_node = mobileBot.insert(get_consultant);
    let get_consultant_options_node = mobileBot.insertToNode(get_consultant_node, get_consultant_options);
    let hello_get_name_node_mobile = mobileBot.insertToNode(get_consultant_options_node, hello_get_name);
    let get_name_input_node_mobile = mobileBot.insertToNode(hello_get_name_node_mobile, get_name_input);
    let is_wed_date_node_mobile = mobileBot.insertToNode(get_name_input_node_mobile, is_wed_date);
    let is_wed_date_no_node_mobile = mobileBot.insertToNode(is_wed_date_node_mobile, is_wed_date_no);
    let is_wed_date_yes_node_mobile = mobileBot.insertToNode(is_wed_date_node_mobile, is_wed_date_yes);
    let get_wed_date_node_mobile = mobileBot.insertToNode(is_wed_date_yes_node_mobile, get_wed_date);
    let get_wed_date_input_node_mobile = mobileBot.insertToNode(get_wed_date_node_mobile, get_wed_date_input );
    let get_cell_num_with_date_node_mobile = mobileBot.insertToNode(get_wed_date_input_node_mobile, get_cell_num_with_date);
    let get_cell_num_input_node_mobile_1 = mobileBot.insertToNode(get_cell_num_with_date_node_mobile, get_cell_num_input);
    mobileBot.insertToNode(get_cell_num_input_node_mobile_1, end );



    let get_cell_num_no_date_node_mobile = mobileBot.insertToNode(is_wed_date_no_node_mobile, get_cell_num_no_date);
    let get_cell_num_input_node_mobile_2 = mobileBot.insertToNode(get_cell_num_no_date_node_mobile, get_cell_num_input);
    mobileBot.insertToNode(get_cell_num_input_node_mobile_2, end);
    return mobileBot
}
function getWebBot() {
    let webBot = dataTree.create();
    let hello_get_name_node_mobile = webBot.insert(hello_get_name);
    let get_name_input_node_mobile = webBot.insertToNode(hello_get_name_node_mobile, get_name_input);
    let is_wed_date_node_mobile = webBot.insertToNode(get_name_input_node_mobile, is_wed_date);
    let is_wed_date_no_node_mobile = webBot.insertToNode(is_wed_date_node_mobile, is_wed_date_no);
    let is_wed_date_yes_node_mobile = webBot.insertToNode(is_wed_date_node_mobile, is_wed_date_yes);
    let get_wed_date_node_mobile = webBot.insertToNode(is_wed_date_yes_node_mobile, get_wed_date);
    let get_wed_date_input_node_mobile = webBot.insertToNode(get_wed_date_node_mobile, get_wed_date_input );
    let get_cell_num_with_date_node_mobile = webBot.insertToNode(get_wed_date_input_node_mobile, get_cell_num_with_date);
    let get_cell_num_input_node_mobile_1 = webBot.insertToNode(get_cell_num_with_date_node_mobile, get_cell_num_input);
    webBot.insertToNode(get_cell_num_input_node_mobile_1, end );



    let get_cell_num_no_date_node_mobile = webBot.insertToNode(is_wed_date_no_node_mobile, get_cell_num_no_date);
    let get_cell_num_input_node_mobile_2 = webBot.insertToNode(get_cell_num_no_date_node_mobile, get_cell_num_input);
    webBot.insertToNode(get_cell_num_input_node_mobile_2, end);
    return webBot
}
const WEB_BOT = getWebBot();
const MOBILE_BOT = getMobileBot();
export {QUESTION, ANSWER_OPTION, ANSWER_INPUT, ANSWER_CALENDAR, MALE, NOT_YET_STR,YES_STR, MOBILE_BOT, WEB_BOT, WHEN_WED_QUESTION, ANSWER_PIC_OPTIONS}

