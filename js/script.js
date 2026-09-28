document.addEventListener('DOMContentLoaded', () => {

    /*
        ==================================================
        GUIDE PAGE
        ==================================================
    */

    const avatar = document.querySelector('#avatar');
    const topicButtons = document.querySelectorAll('.guide-button');

    const progressText = document.querySelector('#progress-text');
    const progressFill = document.querySelector('#progress-fill');

    const nextChallenge = document.querySelector('#next-challenge');

    const guideTitle = document.querySelector('#guide-title');
    const guideText = document.querySelector('#guide-text');


    const topics = {

        what: {
            title: 'What is ICTAZ?',
            text: 'ICTAZ is the Information and Communication Technology Association of Zambia. It connects the ICT profession and supports professional development within Zambia’s technology sector.'
        },

        cbu: {
            title: 'What is ICTAZ CBU?',
            text: 'ICTAZ CBU is a student technology community at CBU Lusaka Campus. It creates opportunities for students to learn, build, connect, contribute and develop professionally.'
        },

        learn: {
            title: 'What can I learn?',
            text: 'ICTAZ CBU aims to create practical learning opportunities through workshops, peer learning, technology sessions, projects and exposure to different areas of ICT.'
        },

        participate: {
            title: 'What can I participate in?',
            text: 'You can take part in practical sessions, student projects, technology challenges, professional development activities and other initiatives organised by the community.'
        },

        contribute: {
            title: 'How can I contribute?',
            text: 'You can contribute by participating in activities, sharing what you know, helping with projects, supporting other students and bringing useful ideas into the community.'
        }

    };


    /*
        ==================================================
        AVATAR FLIP
        ==================================================
    */

    if (avatar) {

        avatar.addEventListener('click', () => {

            avatar.classList.toggle('flip');

        });

    }


    /*
        ==================================================
        GUIDE TOPICS
        ==================================================
    */

    topicButtons.forEach((button) => {

        button.addEventListener('click', () => {

            const topic = topics[button.dataset.topic];


            /*
                Display selected topic
            */

            if (topic && guideTitle && guideText) {

                guideTitle.textContent = topic.title;
                guideText.textContent = topic.text;

            }


            /*
                Mark topic as completed

                Once a topic has been explored,
                clicking it again does not remove
                its completion status.
            */

            if (!button.classList.contains('completed')) {

                button.classList.add('completed');

                button.setAttribute(
                    'aria-pressed',
                    'true'
                );

            }


            /*
                Calculate progress
            */

            const completedCount =
                document.querySelectorAll(
                    '.guide-button.completed'
                ).length;


            const progress =
                topicButtons.length > 0
                    ? Math.round(
                        (completedCount / topicButtons.length) * 100
                    )
                    : 0;


            /*
                Update progress text
            */

            if (progressText) {

                progressText.textContent =
                    `${progress}%`;

            }


            /*
                Update progress bar
            */

            if (progressFill) {

                progressFill.style.width =
                    `${progress}%`;

            }


            /*
                Guide completed
            */

            if (nextChallenge) {

                nextChallenge.classList.toggle(
                    'show',
                    progress === 100
                );

            }


            /*
                Flip avatar when guide
                reaches 100%
            */

            if (avatar && progress === 100) {

                avatar.classList.add('flip');

            }

        });

    });



    /*
        ==================================================
        EVENT REGISTRATION
        ==================================================
    */

    const registrationForm =
        document.querySelector(
            '#eventRegistrationForm'
        );


    const successMessage =
        document.querySelector(
            '#registrationSuccess'
        );


    /*
        Only run this code if we are
        currently on register.html
    */

    if (registrationForm && successMessage) {

        registrationForm.addEventListener(
            'submit',
            () => {

                const submitButton =
                    registrationForm.querySelector(
                        '.registration-submit'
                    );


                /*
                    Change button while registration
                    is being submitted
                */

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        'Registering...';

                }


                /*
                    The HTML form itself submits
                    the registration to Google Forms.

                    Because register.html uses:

                    target="hidden_iframe"

                    Google Forms opens inside the
                    invisible iframe instead of
                    taking the student away from
                    the ICTAZ website.
                */

                setTimeout(() => {


                    /*
                        Hide registration form
                    */

                    registrationForm.style.display =
                        'none';


                    /*
                        Show success message
                    */

                    successMessage.hidden = false;

                    successMessage.classList.add(
                        'show'
                    );


                    /*
                        Scroll student to confirmation
                    */

                    successMessage.scrollIntoView({

                        behavior: 'smooth',

                        block: 'center'

                    });


                    /*
                        Google Analytics event

                        This lets us later see how
                        many registrations happened
                        through the website.
                    */

                    if (typeof gtag === 'function') {

                        gtag(
                            'event',
                            'event_registration',
                            {

                                event_category:
                                    'ICTAZ Events',

                                event_label:
                                    'Chapter 01 - Build Your First Portfolio'

                            }
                        );

                    }

                }, 1200);

            }
        );

    }

});