d3.json("/resources/projects.json").then((data) => {
  // Filter design projects

  const sortedProjects = data.sort((a, b) => b.year - a.year);

  const designProjects = data.filter((project) => project.type === "design");
  const sortedDesignProjects = designProjects
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);
  generateCards(sortedDesignProjects, "#featured-design", "design");

  // Filter code projects
  const codeProjects = data.filter((project) => project.type === "code");
  const sortedCodeProjects = codeProjects
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);
  generateCards(sortedCodeProjects, "#featured-code", "code");

  generateCards(sortedProjects.slice(0,6), "#all-projects", "all");
  console.log("cards generated.");
});

function generateCards(projects, containerSelector, filter = null) {
  // Select the parent container where the cards will be appended
  const container = d3.select(containerSelector);

  // Iterate through the projects and append the cards
  projects.forEach((project) => {
    // Create a link for the card
    const cardLink = container
      .append("a")
      .attr("href", `/projects/?p=${project.id}`)
      .attr("class", "design-card-link");

    // Create the card container
    const card = cardLink.append("div").attr("class", "design-card");

    // Append the preview image
    card
      .append("div")
      .attr("class", "card-preview")
      .append("img")
      .attr(
        "src",
        `projects/${project["project-link"]}/images/${project.file_name}`
      );

    // Append the card body
    const cardBody = card.append("div").attr("class", "card-body");

    // Append the title
    cardBody.append("h4").attr("class", "homepage-card-title").text(project.title);
    
    //Add the tag
    if (filter === "all") {
      cardBody.append("div")
      .attr("class", "tag")
      .attr("data-tag", project.type)
      .text(project.type);
    }

    // Append the description
    cardBody.append("p").attr("class", "body-text").text(project.description);
  
  });

  if (filter === "all") {
  } else {
        // Add the "See more" link separately
        container
        .append("div")
        .attr("class", "see-more-wrapper")
        .append("span")
        .attr("class", "see-more")
        .append("a")
        .attr("href", `/projects/?f=${filter}`)
        .html("See more &RightArrow;");
  }
}
