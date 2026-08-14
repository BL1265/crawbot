const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


/*
    Mobile navigation
*/

if (
    menuToggle &&
    navLinks
) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "open"
            );

        }
    );

}


document.querySelectorAll(
    ".nav-links a"
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                if (navLinks) {

                    navLinks.classList.remove(
                        "open"
                    );

                }

            }
        );

    }
);


/*
    Demo confidence bar
*/

const confidenceBar =
    document.querySelector(
        ".confidence-line div"
    );

if (confidenceBar) {

    let value = 0;

    const confidenceTimer =
        setInterval(
            () => {

                value += 1;

                if (value >= 82) {

                    value = 82;

                    clearInterval(
                        confidenceTimer
                    );

                }

                confidenceBar.style.width =
                    `${value}%`;

            },
            20
        );

}


/*
    Footer year
*/

const year =
    document.getElementById(
        "year"
    );

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/*
    Page fade-in
*/

document.body.classList.add(
    "page-loaded"
);


/*
    Simple card reveal
*/

const revealElements =
    document.querySelectorAll(
        ".glass-card, " +
        ".small-feature, " +
        ".workflow-large-card, " +
        ".about-page-card, " +
        ".item-card, " +
        ".developer-card"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

        observer.observe(
            element
        );

    }
);


/*
    Header background on scroll
*/

const header =
    document.querySelector(
        ".site-header"
    );

window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }

        if (
            window.scrollY > 35
        ) {

            header.style.background =
                "rgba(2,18,13,.97)";

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.18)";

        } else {

            header.style.background =
                "rgba(2,18,13,.92)";

            header.style.boxShadow =
                "none";

        }

    }
);


console.log(
    "CrawBot site loaded."
);