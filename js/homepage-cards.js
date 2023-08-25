d3.json("/resources/projects.json").then((data) => {
  // Filter design projects
  const designProjects = data.filter(project => project.type === "design").slice(0, 3);
  const sortedDesignProjects = designProjects.sort((a, b) => b.year - a.year);
  generateCards(sortedDesignProjects, "#featured-design");

  // Filter code projects
  const codeProjects = data.filter(project => project.type === "code").slice(0, 3);
  const sortedCodeProjects = codeProjects.sort((a, b) => b.year - a.year);
  generateCards(sortedCodeProjects, "#featured-code");

  console.log("cards generated.");
});

function generateCards(projects, containerSelector) {
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
    const card = cardLink
      .append("div")
      .attr("class", "design-card");

    // Append the preview image
    card
      .append("div")
      .attr("class", "card-preview")
      .append("img")
      .attr("src", `projects/${project["project-link"]}/images/${project.file_name}`);

    // Append the card body
    const cardBody = card.append("div").attr("class", "card-body");

    // Append the title
    cardBody.append("h4").text(project.title);

    // Append the description
    cardBody.append("p").attr("class", "body-text").text(project.description);
  });

  // Add the "See more" link separately
  container
    .append("span")
    .attr("class", "see-more")
    .append("a")
    .attr("href", "/projects")
    .html("See more &RightArrow;");
}
