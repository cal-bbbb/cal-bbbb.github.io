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
        // Updated line with the conditional class
        const projectCard = section.append("div").attr("class", isFeatured ? "Card body-text featured" : "Card body-text");

        // Card content container
        const cardContent = projectCard.append("div").attr("class", "Card-content");

        // Add project title and description on the left
        const textContainer = cardContent.append("div").attr("class", "text-container");
        textContainer.append("h4").attr("class", "Card-title").text(project.title);
        textContainer.append("p").attr("class", "Card-description").text(project.description);

        // Add project image on the right (if exists)
        if (project.file_name) {
            projectCard.append("div")
                .attr("class", "card-preview")
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
