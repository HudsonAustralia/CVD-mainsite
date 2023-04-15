function addWrapperDivsToTable() {
	// Get all the tables on the page
	const tables = document.querySelectorAll("table");

	// Loop through each table
	tables.forEach((table) => {
		// Check if the table already has a wrapper
		if (!table.parentNode.classList.contains("horizontal-scroll")) {
			// Create a new div wrapper element
			const wrapper = document.createElement("div");
			// Add a class name to the wrapper element
			wrapper.className = "horizontal-scroll";
			// Insert the wrapper before the table
			table.parentNode.insertBefore(wrapper, table);
			// Move the table inside the wrapper
			wrapper.appendChild(table);
		}
	});
}

addWrapperDivsToTable();

function addTOCtoMain() {
	const tocHeading = document.querySelector(".toc-heading");
	const main = document.querySelector(".cms-content");

	if (tocHeading) {
		main.classList.add("has-toc");
	} else {
		main.classList.remove("has-toc");
	}
}

addTOCtoMain();

function getActiveTocLink() {
  const scrollPos = window.scrollY;
  const sections = document.querySelectorAll(".cms-content .toc-content");
  const tocLinks = document.querySelectorAll(".table-of-contents li");
  
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSectionId = sectionId;
    }
  });

  tocLinks.forEach((link, index) => {
    const tocA = link.querySelector("a");

    if (tocA.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // Add default active class for the first li
    if (index === 0 && currentSectionId === "") {
      link.classList.add("active");
    }
  });
}


window.addEventListener("scroll", () => {
  getActiveTocLink();
});

getActiveTocLink();



