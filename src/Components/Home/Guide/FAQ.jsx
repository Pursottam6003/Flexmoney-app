// FAQQuestion.js
/*
import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    const faqData = [
        { question: 'What is Moksh Yog Foundations', answer: 'The Moksh Yog Foundations are full funded Non-Government Organisations supported by FlexMoney Pvt Ltd.' },
        { question: 'Why do we need yoga', answer: 'Yoga is a practice that includes a wide range of contemplative and self-disciplinary practices, such as meditation, chanting, mantra, prayer, breath work, ritual, and even more it Improves flexibility, Helps with stress relief, Improves mental health, May reduce inflammation' },
        { question: 'Is there is any miniumum age or maximum age to join', answer: 'Yes, Only people within the age limit of 18-65 can enroll for the Yoga Classes' },
        { question: 'What is the duration of the course', answer: 'The duration of the course is 3 months although it depends upon your intrest' },
        { question: 'What is the fees of the course', answer: 'The course is Rs 500 per person but you can pay the fees anytime within the month' },
        { question: 'What is the mode of payment', answer: 'The mode of payment is online only' },
        { question: 'How many Batches are there', answer: 'There are 3 batches in a day, 6-7AM, 7-8AM, 8-9AM and 5-6PM.' },
        { question: 'Can I change my batch', answer: 'Yes,participants can shift from one batch to another in different months but in the same month they need to be in the same batch.e' },

    ];

    return (
        <div id={id}>
            <h3>Frequently Asked Questions (FAQs)</h3>
            {faqData.map((item, index) => (
                <Accordion key={index} expanded={expanded} onChange={handleAccordionChange}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                    >
                        <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FAQ;

*/
// FAQQuestion.js

import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const [expandedItems, setExpandedItems] = useState({});

    const handleAccordionChange = (index) => {
        setExpandedItems((prevExpandedItems) => ({
            ...prevExpandedItems,
            [index]: !prevExpandedItems[index],
        }));
    };

    const faqData = [
        { question: 'What is Moksh Yog Foundations', answer: 'The Moksh Yog Foundations are fully funded Non-Government Organisations supported by FlexMoney Pvt Ltd.' },
        { question: 'Why do we need yoga', answer: 'Yoga is a practice that includes a wide range of contemplative and self-disciplinary practices, such as meditation, chanting, mantra, prayer, breath work, ritual, and even more. It improves flexibility, helps with stress relief, improves mental health, and may reduce inflammation.' },
        { question: 'Is there any minimum age or maximum age to join', answer: 'Yes, only people within the age limit of 18-65 can enroll for the Yoga Classes.' },
        { question: 'What is the duration of the course', answer: 'The duration of the course is 3 months, although it depends on your interest.' },
        { question: 'What is the fees of the course', answer: 'The course fee is Rs 500 per person, but you can pay the fees anytime within the month.' },
        { question: 'What is the mode of payment', answer: 'The mode of payment is online only.' },
        { question: 'How many Batches are there', answer: 'There are 3 batches in a day, 6-7 AM, 7-8 AM, 8-9 AM, and 5-6 PM.' },
        { question: 'Can I change my batch', answer: 'Yes, participants can shift from one batch to another in different months, but in the same month, they need to be in the same batch.' },
    ];

    return (
        <div>
            <h3 id="faq">Frequently Asked Questions (FAQs)</h3>
            {faqData.map((item, index) => (
                <Accordion key={index} expanded={expandedItems[index]} onChange={() => handleAccordionChange(index)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                    >
                        <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FAQ;
