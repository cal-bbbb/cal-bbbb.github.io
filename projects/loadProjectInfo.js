// Fetch the JSON data using D3
const projectsDataPromise = d3.json("/resources/projects.json");

function displayProjectLandingPage() {
  const container = d3.select("#project-info");

  // Use the existing structure of your index.html
  let content = `
    <div class="container-fluid">
      <div class="page-section" id="projects">
        <div class="page-section-title-wrapper container-fluid">
          <h2 class="page-section-title">projects</h2>
        </div>
        <div class="container-fluid">
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
      </div>
    </div>
  `;

  container.html(content);

  // Fetch the JSON data using D3
  d3.json("/resources/projects.json").then((allProjects) => {
    // Sort them by year to get the latest projects
    const sortedProjects = allProjects.sort((a, b) => b.year - a.year);

    // Populate the sections based on the type property
    const sortedCodeProjects = sortedProjects.filter(
      (project) => project.type === "code"
    );
    const sortedDesignProjects = sortedProjects.filter(
      (project) => project.type === "design"
    );
    populateProjectsSection(sortedCodeProjects, "code-projects");
    populateProjectsSection(sortedDesignProjects, "design-projects");

    // Get the top 4 latest projects for the featured section
    const featuredProjects = sortedProjects.slice(0, 4);
    populateProjectsSection(featuredProjects, "featured-projects", true);
  });
}

function displayProjectFilteredPage(filter) {
  const container = d3.select("#project-info");

  // Use the existing structure of your index.html
  let content = `
    <div class="container-fluid">
      <div class="page-section" id="projects">
        <div class="page-section-title-wrapper container-fluid">
          <h2 class="page-section-title">projects</h2>
        </div>
        <div class="container-fluid">
          <div class="row fproject-section-wrapper">
            <a class="filter-title-link" href="/projects">  
              <div class="filter-title-wrapper">
                <div class="filter-title-tag tag" data-tag="${filter}">
                  <h3>
                    ${filter}
                    <i class="fa-solid fa-xmark" style="padding-left: 5px;"></i>
                  </h3>
                </div>
              </div>
            </a>
            <div class="project-section" id="filter-projects">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.html(content);

  // Fetch the JSON data using D3
  d3.json("/resources/projects.json").then((allProjects) => {
    // Sort them by year to get the latest projects
    const sortedProjects = allProjects.sort((a, b) => b.year - a.year);

    // Populate the sections based on the type property
    const filteredProjects = sortedProjects.filter(
      (project) => project.type === filter
    );

    // Populate the sections based on the tags property
    const filteredTagProjects = sortedProjects.filter((project) =>
      project.tags.includes(filter)
    );

    // Get the top 4 latest projects for the featured section
    const featuredProjects = sortedProjects.slice(0, 3);

    if (filter === "all") {
      populateProjectsSection(sortedProjects, "filter-projects");
    } else if (filter === "latest") {
      populateProjectsSection(featuredProjects, "filter-projects");
    } else if (filter === "code" || filter === "design") {
      populateProjectsSection(filteredProjects, "filter-projects");
    } else {
      populateProjectsSection(filteredTagProjects, "filter-projects");
    }
  });
}

function populateProjectsSection(data, sectionId) {
  const section = d3.select(`#${sectionId}`);

  data.forEach((project) => {
    // Create an anchor element for the project link
    const projectLink = section
      .append("a")
      .attr("class", "project-card-link")
      .attr("href", `/projects/?p=${project.id}`); // Updated link format

    const projectCard = projectLink.append("div").attr("class", "project-card");

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
      .append("div")
      .attr("class", "project-card-description")
      .append("p")
      .attr("class", "body-text")
      .text(
        project.description.substring(0, 85) +
          (project.description.length > 85 ? "..." : "")
      );

    const tagsDiv = cardContent.append("div").attr("class", "tags-container");

    // Prepend the project type as the first tag
    tagsDiv
      .append("div")
      .attr("class", "tag card-tag")
      .attr("data-tag", project.type)
      .text(project.type);

    const tagsLength = project.tags.length;

    // Add tags (if exists)
    if (project.tags && project.tags.length) {
      // Placeholder tag
      tagsDiv
        .append("div")
        .attr("class", "tag card-tag placeholder")
        .attr("data-tag", "placeholder")
        .text(`+${tagsLength} more`);
    }
  });
}

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
      .attr("class", "col-12 mx-auto");

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
        .attr("class", "proj-preview-image");
    }

    // Append tags
    const tagsContainer = descriptionContainer
      .append("div")
      .attr("class", "tags-container");

    // Prepend the project type as the first tag
    tagsContainer
      .append("a")
      .attr("style", "text-decoration: none;")
      .attr("href", `/projects/?f=${projectInfo.type}`)
      .append("div")
      .attr("class", "tag")
      .attr("data-tag", projectInfo.type)
      .text(projectInfo.type);

    projectInfo.tags.forEach((tag) => {
      tagsContainer
        .append("a")
        .attr("style", "text-decoration: none;")
        .attr("href", `/projects/?f=${tag}`)
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
      descriptionContainer
        .append("p")
        .attr("style", "font-size: 14pt; line-height: 1.4;")
        .text(projectInfo.description);
    }

    //Add content
    if (projectInfo.page_content) {
      projectContainer.html(projectInfo.page_content);
    } else {
      //load default content
    }

    // Update the year in the page-section-title
    d3.select("#project-year").text(projectInfo.year);

    //add next/prev project button here
    appendNavigationButtons(projectInfo.id, data, contentContainer);

    setupImageModal();
  } else {
    const container = d3.select("#project-info");

    // Clear any existing content
    container.html("");
    console.error("Project not found for link:", projectLink);
  }

  window.addEventListener("keydown", function (event) {
    // Check if the pressed key is an arrow key
    if (
      ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)
    ) {
      // Prevent the default behavior (scrolling)
      event.preventDefault();
    }
  });
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

function appendNavigationButtons(projectId, data, contentContainer) {
  const currentIndex = data.findIndex((project) => project.id === projectId);

  const navigationContainer = contentContainer
    .append("div")
    .attr("class", "row navigation-buttons");

  if (currentIndex > 0) {
    const prevProjectId = data[currentIndex - 1].id;
    const prevProjectName = data[currentIndex - 1].title;
    navigationContainer
      .append("a")
      .attr("href", `/projects/?p=${prevProjectId}`)
      .html(`&LeftArrow;&nbsp;&nbsp;${prevProjectName}`)
      .attr("class", "prev-button");
  }

  if (currentIndex < data.length - 1) {
    const nextProjectId = data[currentIndex + 1].id;
    const nextProjectName = data[currentIndex + 1].title;

    navigationContainer
      .append("a")
      .attr("href", `/projects/?p=${nextProjectId}`)
      .html(`${nextProjectName}&nbsp;&nbsp;&RightArrow;`)
      .attr("class", "next-button");
  }
}

function setupImageModal() {
  const modal = d3.select("#myModal");
  const modalImg = d3.select("#img01");
  const captionText = d3.select("#caption");
  const close = d3.select(".close");

  d3.selectAll(".project-page-image").on("click", function () {
    const img = d3.select(this);
    modal.style("display", "block");
    modalImg.attr("src", img.attr("src"));
    captionText.text(img.attr("alt"));
  });

  d3.selectAll(".proj-preview-image").on("click", function () {
    const img = d3.select(this);
    modal.style("display", "block");
    modalImg.attr("src", img.attr("src"));
    captionText.text(img.attr("alt"));
  });

  close.on("click", function () {
    modal.style("display", "none");
  });
}

function externalProjectCall(requestedProject) {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("p");
  const filter = urlParams.get("f");

  projectsDataPromise.then((data) => {
    if (projectId) {
      displayProjectInfoById(data, projectId);
    } else if (filter) {
      displayProjectFilteredPage(filter);
    } else if (requestedProject) {
      displayProjectInfoWithD3(data, requestedProject);
    } else {
      displayProjectLandingPage();
    }
  });
}

// Call the function on page load
externalProjectCall();
