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

    head.select("title").remove();

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
      .attr("class", "page-section-title")
      .attr("id", "project-year");

    const contentContainer = container
      .append("div")
      .attr("class", "container-fluid main-content");

    const briefContainer = contentContainer
      .append("div")
      .attr("class", "row body-text")
      .attr("id", "project-brief");

    const imageContainer = briefContainer
      .append("div")
      .attr("class", "col-lg-7");

    const descriptionContainer = briefContainer
      .append("div")
      .attr("class", "col-lg-5 order-lg-first");

    const projectContainer = contentContainer
      .append("div")
      .attr("class", "row body-text")
      .attr("id", "project-content")
      .append("div")
      .attr("class", "col-xl-10 col-lg-12 mx-auto");

    // Append image
    if (projectInfo.file_name) {
      const imagePreview = imageContainer
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
    const tagsContainer = descriptionContainer
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
    descriptionContainer.append("h3").text(projectInfo.title);

    // Append descriptions
    if (projectInfo.content) {
      descriptionContainer.append("div").html(projectInfo.content);
    } else {
      descriptionContainer.append("p").text(projectInfo.description);
    }

    //Add content
    if (projectInfo.page_content) {
      projectContainer.html(projectInfo.page_content);
    } else {
    }

    // Update the year in the page-section-title
    d3.select("#project-year").text(projectInfo.year);
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

  // Load the default homepage
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
