// Fetch the JSON data using D3
const projectsDataPromise = d3.json("/resources/code-projects.json");

function getProjectByLink(data, projectLink) {
  return data.find((project) => project["project-link"] === projectLink);
}

function displayProjectInfoWithD3(data, projectLink) {
  const projectInfo = getProjectByLink(data, projectLink);

  if (projectInfo) {
    const head = d3.select("head");

    // Add title
    head.append("title").text(projectInfo.title);

    // Select the parent container
    const container = d3.select("#project-info").attr("class", "row");

    // Clear any existing content
    container.html("");

    const rightContainer = container.append("div").attr("class", "col-lg-7 order-last");
    //Append image
    if (projectInfo.file_name) {
      const imagePreview = rightContainer
        .append("div")
        .attr("class", "proj-preview-frame")
        .append("img")
        .attr(
          "src",
          `/projects/${projectInfo["project-link"]}/images/${projectInfo.file_name_full}`
        )
        .attr("class", "proj-preview-image")

        .attr("style", "aspect-ratio: 1; width: 100%;");
    }

    const leftContainer = container.append("div").attr("class", "col-lg-5");

    // Append tags
    const tagsContainer = leftContainer
      .append("div")
      .attr("class", "tags-container");
    projectInfo.tags.forEach((tag) => {
      tagsContainer
        .append("div")
        .attr("class", "tag")
        .attr("data-tag", tag)
        .text(tag);
    });

    // Append title
    leftContainer.append("h3").text(projectInfo.title);

    // Append content
    if (projectInfo.content) {
      leftContainer.append("div").html(projectInfo.content);
    } else {
      leftContainer.append("p").text(projectInfo.description);
    }


    // Update the year in the page-section-title
    d3.select(".page-section-title").text(projectInfo.year);
  } else {
    const container = d3.select("#project-info");

    // Clear any existing content
    container.html("");
    console.error("Project not found for link:", projectLink);
  }
}

function externalProjectCall(requestedProject) {
  // Usage:
  projectsDataPromise.then((data) => {
    displayProjectInfoWithD3(data, requestedProject);
  });
}
