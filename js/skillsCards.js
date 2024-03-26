d3.json("/resources/skills.json").then((skills) => {
  Object.keys(skills).forEach((group) => {
    console.log("begin", group, skills[group]);

    const container = d3.select("#skills-wrapper");
    const groupSkills = skills[group];

    // Add class name based on the group
    let className;
    switch (group) {
      case "code":
        className = "red";
        break;
      case "analytics":
        className = "green";
        break;
      case "management":
        className = "pink";
        break;
      case "design":
        className = "blue";
        break;
      default:
        className = "grey";
        break;
    }

    // Append skills with appropriate class name
    groupSkills.forEach((skill) => {
      container
        .append("div")
        .attr("class", `code-badge ${className}`)
        .text(skill);
    });


    //create teh box (ABOUT PAGE)
    const container2 = d3.select("#about-page-skills");
    const box = container2.append("p").attr("class", "body-text");

    //create the title
    box.append("strong").text(group);
    box.append("br");

    // box
    //   .data(groupSkills)
    //   .enter()
    //   .append("span")
    //   .text((d, i) => {i < groupSkills.length ? `${d} \u2022` : d})

    groupSkills.forEach((skill) => {
      if (groupSkills.indexOf(skill) === groupSkills.length-1) {
        box.append("text").text(skill);
      } else {
        box.append("text").text(`${skill} \u2022 `);
      }
    });

    box.append("br");
    box.append("br");

    // let skillsList = [];
    // groupSkills.forEach((skill) => {
    //   skillsList = [...skillsList, skill];
    // });

    // container2.append("text").html(skillsList);
  });
});
