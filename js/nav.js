// D3 script to dynamically insert the navigation div
document.addEventListener("DOMContentLoaded", function() {
    const navHtml = `
    <div class="nav-button-wrapper">
    <input id="checkbox" type="checkbox" />
    <label class="toggle" for="checkbox">
      <div id="bar1" class="bars"></div>
      <div id="bar2" class="bars"></div>
      <div id="bar3" class="bars"></div>
    </label>
    <div class="nav-content-wrapper container-fluid">
      <div class="color-toggle-wrapper">
        <span class="switch-title">dark&nbsp;mode</span>
        <label class="cswitch">
          <input type="checkbox" class="ctoggle" id="dm-switch" />
          <span class="cslider"></span>
          <span class="card-side"></span>
        </label>
      </div>
      <div class="nav-content">
        <div class="name-title menu-item" style="text-align: right">
          <a href="/#top">
            <h1>CALUM<br />BOONE</h1>
          </a>
        </div>
        <div class="d-flex flex-row-reverse">
          <div class="menu">
            <ul class="menu-list-group">
              <li class="menu-item text-right">
                <a href="/about/">about</a
                ><!-- resume here -->
              </li>
              <li class="menu-item text-right">
                <a href="/projects/">projects</a>
              </li>
              <li class="menu-item text-right">
                <a href="/photography/">photo</a>
              </li>
              <li class="menu-item text-right">
                <a href="/music/">music</a>
              </li>
            </ul>
          </div>
          <div class="social-wrapper">
            <div class="social-icon-wrapper menu-item" id="linkedin">
              <a
                href="https://www.linkedin.com/in/calum-boone/"
                target="_blank"
                class="fa fa-linkedin"
              ></a>
            </div>
            <div class="social-icon-wrapper menu-item" id="spotify">
              <a
                href="https://open.spotify.com/artist/6vexkAscGsLMnF12MjyIjK?si=Cv4MGb7RT2a-gFUlucfg2A"
                target="_blank"
                class="fa fa-spotify"
              ></a>
            </div>
            <div class="social-icon-wrapper menu-item" id="instagram">
              <a
                href="https://www.instagram.com/cal.bbbbbbbb/"
                target="_blank"
                class="fa fa-instagram"
              ></a>
            </div>
            <div class="social-icon-wrapper menu-item" id="twitter">
              <a
                href="https://twitter.com/CalumBoone"
                target="_blank"
                class="fa fa-twitter"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <span class="mobile-title">CAL B.</span>
    `;
  
    const navContainer = d3.select(".nav-wrapper");
    navContainer.html(navHtml);
  });
  