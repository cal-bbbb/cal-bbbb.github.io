// Fetch the JSON data using D3
const projectsDataPromise = d3.json("/resources/projects.json");

function getProjectByLink(data, projectLink) {
  return data.find((project) => project["project-link"] === projectLink);
}

function getProjectById(data, projectId) {
  return data.find((project) => project.id === projectId);
}

function displayProjectInfoWithD3(data, projectLink) {
  const projectInfo = getProjectByLink(data, projectLink);

  if (projectInfo) {
    const head = d3.select("head");

    // Add title
    head.append("title").text(projectInfo.title);

    // Select the parent container
    const container = d3.select("#project-info");

    // Clear any existing content
    container.html("");

    const yearBox = container
      .append("div")
      .attr("class", "page-section-title-wrapper container-fluid")
      .append("h2")
      .attr("class", "page-section-title");

    const descriptionContainer = container.append("div").attr("class", "row");
    const leftContainer = descriptionContainer
      .append("div")
      .attr("class", "col-lg-5");
    const rightContainer = descriptionContainer
      .append("div")
      .attr("class", "col-lg-7 order-lg-first");

    const projectContainer = container.append("div").attr("class", "row");
    // Append image
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

function displayProjectInfoById(data, projectId) {
  const projectInfo = getProjectById(data, projectId);

  if (projectInfo) {
    displayProjectInfoWithD3(data, projectInfo["project-link"]);
  } else {
    const container = d3.select("#project-info");

    // Clear any existing content
    container.html("");
    console.error("Project not found for ID:", projectId);
  }
}

function displayProjectLandingPage() {
  const container = d3.select("#project-info");

  // Use the existing structure of your index.html
  let content = `
        <div class="page-section-title-wrapper container-fluid">
          <h2 class="page-section-title">projects</h2>
        </div>
        <div class="container-fluid main-content">
          <div class="row project-section-wrapper">
            <h3>latest</h3>
            <div class="project-section" id="featured-projects">
            </div>
          </div>
          <div class="row project-section-wrapper">
            <h3>code</h3>
            <div class="project-section" id="code-projects">
            </div>
            <h3>design</h3>
            <div class="project-section" id="design-projects">
            </div>
          </div>
        </div>
  `;

  container.html(content);
}

function externalProjectCall(requestedProject) {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("p");

  projectsDataPromise.then((data) => {
    if (projectId) {
      displayProjectInfoById(data, projectId);
    } else if (requestedProject) {
      displayProjectInfoWithD3(data, requestedProject);
    } else {
      displayProjectLandingPage();
    }
  });
}

// Call the function on page load
externalProjectCall();
