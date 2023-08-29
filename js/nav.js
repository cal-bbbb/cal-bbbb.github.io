const navLogo = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 27.7.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 300 100" style="enable-background:new 0 0 300 100;" xml:space="preserve">
<style type="text/css">
	.st0{fill:none;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;}
</style>
<path id="path1" class="st0" d="M30.6,38c1.8-1.2,3.1-2.9,4-4.9c1.8-3.8,3-7.7,4.1-11.7c0.8-2.8,1.7-5.7,1.6-8.7c-0.2-3.5-2.9-6-6.4-5.7
	c-1.2,0.1-2.4,0.6-3.5,1.2c-3.7,1.9-6.9,4.6-9.7,7.6C8.8,28.9,2.7,44.3,2.2,61.3c0,4.6,0.1,8.3,0.9,12c1,5,3.6,8.7,8.6,10.2
	c3.1,0.9,6.4,1.1,9.7,0.6c4.3-0.6,8.2-2,12.2-3.4c4.5-1.6,9-3.1,13.3-5.2c1.1-0.5,2.2-1.1,3.1-2"/>
<path id="path2" class="st0" d="M97.3,9.1C53.4,84.6,65.6,119.4,98.8,18c0.3-0.5,0.8-1.7,1.5-1.7c0.5-0.1,0.7,0.8,0.7,1.1
	c0.2,1.2,0.2,2.4,0.2,3.5c0,1.8-0.1,3.6-0.2,5.4c-0.1,2.3-0.3,4.5-0.5,6.8c-0.2,2.6-0.4,5.2-0.5,7.7c-0.2,2.7-0.3,5.4-0.4,8.2
	c-0.1,2.7-0.2,5.4-0.2,8.1c0,2.5,0.1,5,0.3,7.5c0.2,2.2,0.4,4.3,0.9,6.4c0.1,0.7,0.3,1.3,0.5,2c0.2,0.5,1.3,4.3,1.6,5
	c0.7,1.3,1.8,2.4,3,3.2c2.7,1.7,6,1.7,8.7,0.1c0.5-0.3,1-0.7,1.4-1c7.9-10.7-30.7-10.5-36.9-17.9"/>
<path id="path3" class="st0" d="M132,7.7c0,0-3.2,13.3-3.2,35.6c0,22.9,4.2,39.2,17.3,39.2c13.1,0,33.1-17.5,33.1-17.5"/>
<path id="path4" class="st0" d="M231.7,2.3c1.9,1.9,2.1,3.4,2.1,19.2c-0.1,30.5-0.1,50.4-4.1,61.9c-0.2,0.7-0.5,1.4-0.1,1.3
	c0.6-0.1,4.8-59.7,5.9-63.6s1.2-0.1,3-6.5c0.5-1.7,0.5-3.1,1-3.9c1.9-2.7,7.3-2.1,9.6-1.8c6,0.8,22.9,4.8,24.2,13.1
	c2.1,14-42.2,31.9-40.8,34.7c0.5,1,5.5-1.1,18-1.1c0.6,0,1.1,0,1.2,0c10.3,0.1,34.4,8.9,33.7,16.8c-0.8,9.7-39.2,12.3-41.8,12.4
	c-4,0.2-7.6-0.6-7.6-0.6c-1.7-0.4-3-0.9-3.7-1.2"/>
<path id="path5" class="st0" d="M296.1,84.2c-0.5,0.2-1.3,0.4-2.3,1c-1.9,1.1-1.1,1.5-2,1.5s-1.3-0.8-1.3-1.5c0-2,1.8-2.9,3.8-3.3
	c0.6-0.1,2.3,1.6,2.3,1.7C296.7,83.9,296.5,84,296.1,84.2"/>
</svg>
`;

// D3 script to dynamically insert the navigation div
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
          <a href="/">
            <span class="screen-title">${navLogo}</span>
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
                <a href="/music/">music</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mobile-title-wrapper">
    <span class="mobile-title">${navLogo}</span>
  </div>`;

let navContainer = d3.select(".nav-wrapper");

//clear it
navContainer.html();

navContainer.html(navHtml);
