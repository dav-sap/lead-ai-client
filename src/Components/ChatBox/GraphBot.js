import React from 'react';
var dataTree = require('data-tree');

const QUESTION = "question";
const ANSWER_INPUT = "answer_input";
const ANSWER_OPTION = "answer_option";
const ANSWER_RADIO_OPTIONS = "answer_radio_options";
const ANSWER_CALENDAR = "answer_calendar";
const ANSWER_PIC_OPTIONS = "answer_pic_options";
const NOT_YET_STR = "עוד לא";
const YES_STR = "כן!";
const IS_BUDGET = "האם יש תקציב?";
const BUDGET = "מה התקציב שלך?";
const YOUR_NUM_STR_AFTER_DATE = <span>תאריך חלום! 😍 שאלה אחרונה.<br/> מה מספר הטלפון שלך?</span>
const YOUR_NUM_STR_AFTER_NO_DATE = <span>אין לחץ 😉 שאלה אחרונה.<br/> מה מספר הטלפון שלך?</span>
const WHEN_WED_QUESTION = "קולולו!!! מתי מתחתנים?";
const GET_CONSULTANT = <span>המומחים הטובים ביותר בתחום <br/> צילום החתונות עומדים לרשותכם. <br/> בחרו את היועץ איתו תרצו להתכתב:</span>


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


let is_budget = {
    type: QUESTION,
    name: "",
    getName: true,
    get content() {
        let name = " " + this.name.split(" ")[0] + " ";
        return (
            <span> נעים מאוד
            <span>{name}</span>
            🚐
            <br/>
                {IS_BUDGET}
            </span>
        )
    }
}

let get_budget = {
	type: QUESTION,
	get content() {
		return (
			<span>
				{BUDGET}
            </span>
		)
	}
}

let budget_options = {
	type: ANSWER_RADIO_OPTIONS,
    options: ["60k-100k", "100k-120k", "120k-150k", "150k או יותר"],
	validateSubmit: function (value) {
		return value !== null
	}
};

let no_option = {
    type: ANSWER_OPTION,
    content:NOT_YET_STR,
    validateSubmit: function (value) {
        return true
    }
};

let yes_option = {
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
        let name = " " + this.name.split(" ")[0];
        return (
            <span>
            <span>מזל טוב </span>
            <span>{name}</span>
            !
            <br/>
            <span>{this.consultantName}</span>
            <span> איתך קשר בקרוב</span>
            </span>
        )
    },
    completed: true
};
function getMobileBot() {
    let mobileBot = dataTree.create();
    let get_name_node = mobileBot.insert(hello_get_name);
    // let get_consultant_options_node = mobileBot.insertToNode(get_consultant_node, get_consultant_options);
    // let hello_get_name_node_mobile = mobileBot.insertToNode(get_consultant_node, hello_get_name);
    let get_name_input_node_mobile = mobileBot.insertToNode(get_name_node, get_name_input);
    let is_budget_node_mobile = mobileBot.insertToNode(get_name_input_node_mobile, is_budget);

    let budget_node_mobile = mobileBot.insertToNode(is_budget_node_mobile, yes_option);
    let get_budget_node_mobile = mobileBot.insertToNode(budget_node_mobile, get_budget);
    let budget_options_node_mobile = mobileBot.insertToNode(get_budget_node_mobile, budget_options);

	let no_budget_node_mobile = mobileBot.insertToNode(is_budget_node_mobile, no_option);
    let get_cell_num_with_date_node_mobile = mobileBot.insertToNode(no_budget_node_mobile, get_cell_num_with_date);
    let get_cell_num_input_node_mobile_1 = mobileBot.insertToNode(get_cell_num_with_date_node_mobile, get_cell_num_input);
    mobileBot.insertToNode(get_cell_num_input_node_mobile_1, end );



    // let get_cell_num_no_date_node_mobile = mobileBot.insertToNode(is_wed_date_no_node_mobile, get_cell_num_no_date);
    // let get_cell_num_input_node_mobile_2 = mobileBot.insertToNode(get_cell_num_no_date_node_mobile, get_cell_num_input);
    // mobileBot.insertToNode(get_cell_num_input_node_mobile_2, end);
    return mobileBot
}

const MOBILE_BOT = getMobileBot();
export {QUESTION, ANSWER_OPTION, ANSWER_INPUT, ANSWER_CALENDAR, ANSWER_RADIO_OPTIONS,
    NOT_YET_STR,YES_STR, MOBILE_BOT, WHEN_WED_QUESTION, ANSWER_PIC_OPTIONS}

