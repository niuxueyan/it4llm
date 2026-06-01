// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const navbarHeight = document.querySelector('.navbar').offsetHeight;

                window.scrollTo({
                    top: offsetTop - navbarHeight, // Account for fixed header dynamically
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle direct hash navigation (when page loads with hash in URL)
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const navbarHeight = document.querySelector('.navbar').offsetHeight;

                window.scrollTo({
                    top: offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// === Invited Talk abstract modal ===
(function() {
    var talks = {
        chi: {
            speaker: 'Prof. Yuejie Chi (Yale University)',
            title: 'How RLVR Elicits Long-horizon Reasoning: A Learning Dynamics Perspective',
            abstract: 'Reinforcement learning with verifiable rewards (RLVR) has been a main driver of recent breakthroughs in large reasoning models. Yet it remains a mystery how rewards based solely on final outcomes can help overcome the long-horizon barrier to extended reasoning. To understand this, we develop a theory of the training dynamics of RLVR for transformers on compositional reasoning tasks. Our theory shows that mixed-difficulty training naturally follows an implicit curriculum: without any explicit schedule, easier problems become learnable first and shape the frontier for harder ones, creating a learning progression from easy to hard during optimization. The effectiveness of this curriculum is governed by the smoothness of the difficulty spectrum. When the spectrum is smooth, training dynamics enters a well-behaved relay regime, in which persistent gradient signals on easier problems make slightly harder ones tractable and keep training at the edge of competence. When the spectrum contains abrupt discontinuities, training undergoes grokking-type phase transitions with prolonged plateaus before progress recurs. As a technical contribution, our analysis develops and adapts techniques from Fourier analysis on finite groups to our setting.'
        },
        liang: {
            speaker: 'Prof. Yingbin Liang (The Ohio State University)',
            title: 'Accelerating and Aligning Diffusion Models: Breaking Sampling Barriers and Optimizing Fine-Tuning',
            abstract: 'Diffusion models have become a central paradigm in modern generative AI, with growing impact across domains such as images, videos, language, code, and molecular design. Yet their practical deployment is limited by two fundamental challenges: first, sampling often requires many denoising steps, leading to high inference-time computation and energy cost; second, adapting pretrained diffusion models to downstream rewards and preferences has been widely successful in practice but remains poorly understood theoretically. In this talk, I will present our recent progress toward a foundational understanding of efficient and controllable diffusion models. I will first introduce our analytical framework for characterizing the sampling complexity of discrete diffusion models. This framework sharpens existing bounds and reveals the fundamental scaling laws governing discrete diffusion sampling. Building on these insights, we propose a Gibbs-based accelerated sampler that breaks the polynomial dependence on target accuracy and achieves a poly-logarithmic rate for uniform-rate discrete diffusion, substantially reducing inference cost. I will then turn to reward-driven fine-tuning of diffusion models, focusing on PPO-style fine-tuning, a widely used reinforcement-learning approach for adapting diffusion samplers to downstream objectives. We establish convergence guarantees that explicitly characterize how sampler stochasticity affects the convergence rate and how it can be optimized to balance exploration and stability. I will conclude with open directions on test-time design, sampler acceleration, and principled post-training of diffusion models for constrained and reward-aligned generation.'
        },
        rowan: {
            speaker: 'Joseph Rowan (University of Toronto)',
            title: 'Multiple Importance Sampling for Guided Speculative Inference',
            abstract: 'We study an extension of the Guided Speculative Inference algorithm for test-time scaling of large language models (LLMs) to a novel setting where an ensemble of smaller LLMs proposes draft reasoning steps which are later verified by a larger base model and a process reward model. Using the established framework of multiple importance sampling (MIS), we introduce weighting schemes to aggregate samples from a diverse collection of proposal distributions. Compared to GSI with a single well-tuned drafter, combining several diverse LLMs while retaining the same total number of samples maintains competitive pass-at-N downstream performance while being mathematically robust to situations where the support of a single draft model does not cover that of the target.'
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.invited-talk-row').forEach(function(row) {
            row.addEventListener('click', function() {
                var talk = talks[this.dataset.talk];
                if (!talk) return;
                document.getElementById('modalTitle').textContent = talk.title;
                document.getElementById('modalSpeaker').textContent = talk.speaker;
                document.getElementById('modalAbstract').textContent = talk.abstract;
                document.getElementById('talkModal').classList.add('active');
            });
        });
    });
})();

function closeTalkModal() {
    document.getElementById('talkModal').classList.remove('active');
}

window.addEventListener('click', function(e) {
    if (e.target.id === 'talkModal') closeTalkModal();
});

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeTalkModal();
});
