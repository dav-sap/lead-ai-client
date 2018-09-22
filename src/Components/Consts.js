import React from 'react';

const TITLES = {
    TOP:<div> בוחרים יועץ רכב ומקבלים <br/>ליווי חינם בוואטסאפ.</div>,
    MIDDLE:<div>כל הסודות שחשוב שתדעו לפני שבוחרים רכב חדש.</div>,
    CONSULTANT_TITLE: <div>בחר מומחה וקבל ייעוץ בחינם</div>,
    MOBIE_MIDDLE:<div>כל הסודות שחשוב שתדעו לפני  <br/>שבוחרים רכב חדש.</div>,
    FREE_OF_CHARGE:<div>השירות ניתן ללא עלות.</div>,
};

const ANSWER_TYPES = {
	INPUT: "input",
	OPTIONS: "options",
	RADIO_OPTIONS: "radio_options",
	COMPLETED: "completed",
	MULTIPLE_OPTIONS: "multiple_options",
	NONE: "none",
	NEXT_QUESTION: "next_question"
}

const ERROR = "אופס.. תקלה. נסו שוב בבקשה";
export {TITLES, ERROR, ANSWER_TYPES}