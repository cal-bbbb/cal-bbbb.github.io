// Fetch the JSON data using D3
const projectsDataPromise = d3.json("/resources/code-projects.json");

function getProjectByLink(data, projectLink) {
  return data.find(project => project["project-link"] === projectLink);
}

function displayProjectInfoWithD3(data, projectLink) {
  const projectInfo = getProjectByLink(data, projectLink);

  if (projectInfo) {
    // Select the parent container
    const container = d3.select("#project-info");

    // Clear any existing content
    container.html("");

    // Append tags
    container.append("span").text(projectInfo.tags.join(", "));

    // Append title
    container.append("h3").text(projectInfo.title);

    // Append content
    container.append("p").text(projectInfo.content || projectInfo.description); // Use content or fallback to description if content is empty

    // Update the year in the page-section-title
    d3.select('.page-section-title').text(projectInfo.year);
  } else {
    console.error("Project not found for link:", projectLink);
  }
}

// Usage:
projectsDataPromise.then(data => {
  displayProjectInfoWithD3(data, "sticky-note");
});
