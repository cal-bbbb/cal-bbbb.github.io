//DESIGN SECTION
d3.json("/resources/design-projects.json").then((data) => {
  // Select the parent container where the cards will be appended
  const container = d3.select("#featured-design");

  // Iterate through the data and append the cards
  data.slice(0, 3).forEach((project) => {
    // Create a link for the card
    const cardLink = container
      .append("a")
      .attr("href", `/projects/${project["project-link"]}`)
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

  // You can add the "See more" link separately
  d3.select("#featured-design")
    .append("span")
    .attr("class", "see-more")
    .append("a")
    .attr("href", "/projects")
    .html("See more &RightArrow;");
});

// CODE SECTION
d3.json("/resources/code-projects.json").then((data) => {
  // Select the parent container where the cards will be appended
  const container = d3.select("#featured-code");

  // Iterate through the data and append the cards
  data.slice(0, 3).forEach((project) => {
    // Create a link for the card
    const cardLink = container
      .append("a")
      .attr("href", `/projects/${project["project-link"]}`)
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

  // You can add the "See more" link separately
  d3.select("#featured-code")
    .append("span")
    .attr("class", "see-more")
    .append("a")
    .attr("href", "/projects")
    .html("See more &RightArrow;");
});
