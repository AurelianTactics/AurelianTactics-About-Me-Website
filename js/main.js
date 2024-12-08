// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Featured projects to display
    const featuredProjects = [
        'Hands-On-Reinforcement-Learning-with-TensorFlow-TRFL',
        'dqfd-with-keras',
        'FoundationModelMapGenerator',
        'RL-Competition-VGC-AI-2024-Submission',
        'contra_3_rl'
    ];

    // GitHub Projects Integration
    async function fetchGitHubProjects() {
        try {
            const username = 'AurelianTactics';
            let projects;

            if (featuredProjects.length > 0) {
                // Fetch specific featured projects
                projects = await Promise.all(
                    featuredProjects.map(async repo => {
                        const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
                        return response.json();
                    })
                );
            } else {
                // Fetch most recent projects if no featured projects specified
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
                projects = await response.json();
                projects = projects.slice(0, 5); // Limit to 5 projects if not using featured list
            }
            
            const projectsContainer = document.getElementById('github-projects');
            projectsContainer.innerHTML = ''; // Clear loading state

            projects.forEach(project => {
                if (project.name) {  // Check if project exists
                    const projectElement = document.createElement('div');
                    projectElement.className = 'project-card';
                    
                    // Special descriptions for specific projects
                    let description = project.description || 'No description available';
                    let language = project.language;
                    
                    if (project.name === 'RL-Competition-VGC-AI-2024-Submission') {
                        description = ' 3rd Place - VGC AI Competition 2024. ' + description;
                        language = 'Python';  // Override language for this project
                    } else if (project.name === 'FoundationModelMapGenerator') {
                        description = 'Unity project that leverages Foundation Model APIs to transform user text instructions into real-time Unity environment changes. ' + description;
                    }
                    
                    projectElement.innerHTML = `
                        <h3>${project.name.replace(/-/g, ' ')}</h3>
                        <p>${description}</p>
                        <div class="project-meta">
                            ${language ? `<span class="language">${language}</span>` : ''}
                            ${project.stargazers_count ? `<span class="stars"> ${project.stargazers_count}</span>` : ''}
                        </div>
                        <div class="project-links">
                            <a href="${project.html_url}" target="_blank">View on GitHub</a>
                            ${project.homepage ? `<a href="${project.homepage}" target="_blank">Live Demo</a>` : ''}
                        </div>
                    `;
                    projectsContainer.appendChild(projectElement);
                }
            });
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            document.getElementById('github-projects').innerHTML = 'Error loading projects';
        }
    }

    // Call the function to load GitHub projects
    fetchGitHubProjects();
});
