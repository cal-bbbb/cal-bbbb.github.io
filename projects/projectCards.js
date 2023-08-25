// Fetch the JSON data using D3
const cardProjectsDataPromise = d3.json("/resources/projects.json");

cardProjectsDataPromise.then((allProjects) => {
    // Sort them by year to get the latest projects
    const sortedProjects = allProjects.sort((a, b) => b.year - a.year);

    // Populate the sections based on the type property
    const sortedCodeProjects = sortedProjects.filter(project => project.type === "code");
    const sortedDesignProjects = sortedProjects.filter(project => project.type === "design");
    populateProjectsSection(sortedCodeProjects, "code-projects");
    populateProjectsSection(sortedDesignProjects, "design-projects");

    // Get the top 3 latest projects for the featured section
    const featuredProjects = sortedProjects.slice(0, 4);
    populateProjectsSection(featuredProjects, "featured-projects", true);
});

function populateProjectsSection(data, sectionId, isFeatured = false) {
    const section = d3.select(`#${sectionId}`);

    data.forEach((project) => {
    // Create an anchor element for the project link
    const projectLink = section
      .append("a")
      .attr("class", "project-card-link")
      .attr("href",
      `/projects/${project["project-link"]}/`);

    const projectCard = projectLink
      .append("div")
      .attr("class", isFeatured ? "project-card featured" : "project-card");

    // Add project image on top (if exists)
    if (project.file_name) {
      projectCard
        .append("div")
        .attr("class", "project-card-preview")
        .append("img")
        .attr(
          "src",
          `/projects/${project["project-link"]}/images/${project.file_name}`
        );
    }
    // Card content container with the body-text class
    const cardContent = projectCard
      .append("div")
      .attr("class", "project-card-content");

    // Add project title and description on the bottom
      cardContent
      .append("h4")
      .attr("class", "project-card-title")
      .text(project.title);
      cardContent
      .append("p")
      .attr("class", "project-card-description body-text")
      .text(
        project.description.substring(0, 85) +
          (project.description.length > 85 ? "..." : "")
      );

    // Add tags (if exists)
    if (project.tags && project.tags.length) {
      const tagsDiv = cardContent
        .append("div")
        .attr("class", "tags-container");
      project.tags.forEach((tag) => {
        tagsDiv
          .append("div")
          .attr("class", "tag")
          .attr("data-tag", tag)
          .text(tag);
      });
    }
  });
}
