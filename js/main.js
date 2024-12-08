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

    // GitHub Projects Integration
    // Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username
    async function fetchGitHubProjects() {
        try {
            const username = 'AurelianTactics';
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
            const projects = await response.json();
            
            const projectsContainer = document.getElementById('github-projects');
            projectsContainer.innerHTML = ''; // Clear loading state

            projects.slice(0, 6).forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project-card';
                projectElement.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description || 'No description available'}</p>
                    <div class="project-links">
                        <a href="${project.html_url}" target="_blank">View on GitHub</a>
                        ${project.homepage ? `<a href="${project.homepage}" target="_blank">Live Demo</a>` : ''}
                    </div>
                `;
                projectsContainer.appendChild(projectElement);
            });
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            document.getElementById('github-projects').innerHTML = 'Error loading projects';
        }
    }

    // Call the function to load GitHub projects
    fetchGitHubProjects();
});
