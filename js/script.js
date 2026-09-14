document.addEventListener('DOMContentLoaded', () => {
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
            text: 'ICTAZ is a professional technology community that connects students, educators and ICT practitioners.'
        },
        help: {
            title: 'How can it help me?',
            text: 'ICTAZ CBU helps you develop practical skills, learn from others and discover opportunities beyond the classroom.'
        },
        join: {
            title: 'Why should I join?',
            text: 'Joining gives you a community for collaboration, mentorship, networking and building useful projects.'
        },
        activities: {
            title: 'What can I participate in?',
            text: 'Take part in workshops, projects, challenges, mentorship sessions and other activities organised by the community.'
        }
    };

    if (avatar) {
        avatar.addEventListener('click', () => avatar.classList.toggle('flip'));
    }

    topicButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const topic = topics[button.dataset.topic];

            if (topic && guideTitle && guideText) {
                guideTitle.textContent = topic.title;
                guideText.textContent = topic.text;
            }

            const isCompleted = button.classList.toggle('completed');
            button.setAttribute('aria-pressed', String(isCompleted));

            const completedCount = document.querySelectorAll('.guide-button.completed').length;
            const progress = Math.round((completedCount / topicButtons.length) * 100);

            if (progressText) progressText.textContent = `${progress}%`;
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (nextChallenge) nextChallenge.classList.toggle('show', progress === 100);
        });
    });
});