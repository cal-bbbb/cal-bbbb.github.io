// Fetch the JSON data using D3
const codeProjectsDataPromise = d3.json("/resources/code-projects.json");
const designProjectsDataPromise = d3.json("/resources/design-projects.json");

Promise.all([codeProjectsDataPromise, designProjectsDataPromise]).then(([codeProjects, designProjects]) => {
    // Combine the projects
    const allProjects = [...codeProjects, ...designProjects];

    // Sort them by year to get the latest projects
    const sortedProjects = allProjects.sort((a, b) => b.year - a.year);

    // Populate the sections
    populateProjectsSection(sortedProjects, "code-projects");
    populateProjectsSection(sortedProjects, "design-projects");

    // Get the top 3 latest projects for the featured section
    const featuredProjects = sortedProjects.slice(0, 3);
    populateProjectsSection(featuredProjects, "featured-projects", true);
});

function populateProjectsSection(data, sectionId, isFeatured = false) {
    const section = d3.select(`#${sectionId}`);

    data.forEach((project) => {
        const projectCard = section.append("div").attr("class", isFeatured ? "project-card featured" : "project-card");
        
        // Create an anchor element for the project link
        const projectLink = projectCard.append("a").attr("href", project["project-link"]);

        // Card content container with the body-text class
        const cardContent = projectLink.append("div").attr("class", "project-card-content body-text");

        // Add project title and description on the left
        const textContainer = cardContent.append("div").attr("class", "project-text-container");
        textContainer.append("h4").attr("class", "project-card-title").text(project.title);
        textContainer.append("p").attr("class", "project-card-description").text(project.description);

        // Add project image on the right (if exists)
        if (project.file_name) {
            projectLink.append("div")
                .attr("class", "project-card-preview")
                .append("img")
                .attr("src", `/projects/${project["project-link"]}/images/${project.file_name}`);
        }

        // Add tags (if exists)
        if (project.tags && project.tags.length) {
            const tagsDiv = textContainer.append("div").attr("class", "tags-container");
            project.tags.forEach((tag) => {
                tagsDiv.append("div")
                    .attr("class", "tag")
                    .attr("data-tag", tag)
                    .text(tag);
            });
        }
    });
}
