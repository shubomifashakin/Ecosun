import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({ duration: 4 });

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

class Page {
  servicesSect = document.querySelector("#services");
  summaries = this.servicesSect.querySelector("#summaries");

  testimonialSect = document.querySelector("#testimonial");
  testimonialCustomers =
    this.testimonialSect.querySelector("#testimonial-info");
  testimonialDots = this.testimonialSect.querySelectorAll(".dot");
  testimonialLeftArrow = this.testimonialSect.querySelector(".l-arrow");
  testimonialRightArrow = this.testimonialSect.querySelector(".r-arrow");
  currentTestimonialInView = 1;

  shopSect = document.querySelector("#shop");
  productCatalog = this.shopSect.querySelector("#product-catalog");
  catalogLeftArrow = this.shopSect.querySelector("#scroll-left-btn");
  catalogRightArrow = this.shopSect.querySelector("#scroll-right-btn");

  constructor() {
    //scroll right every 3 seconds
    this.intervalId = setInterval(
      this.scrollTestimonial.bind(this, "right"),
      3500,
    );

    //when a dot is clicked, scroll the associated article into view
    this.testimonialDots.forEach((dot, i) => {
      dot.addEventListener("click", (e) => {
        const articleNo = e.target.dataset.articleNo;

        //if the dot clicked is greater than the one currently selected,
        //scroll the section by the distance between the currently selected dot and the newly selected one
        this.testimonialCustomers.scrollBy({
          left:
            articleNo > this.currentTestimonialInView
              ? this.testimonialCustomers.clientWidth *
                (articleNo - this.currentTestimonialInView)
              : -this.testimonialCustomers.clientWidth *
                (this.currentTestimonialInView - articleNo),
          behavior: "smooth",
        });

        //add the active class to the dot clicked
        dot.classList.add("bg-primaryBlue");

        //remove the active background color from the previously selected dot
        this.testimonialDots.forEach((dot2, i2) => {
          i !== i2 ? dot2.classList.remove("bg-primaryBlue") : null;
        });

        //change the currently selected testimonial value
        this.currentTestimonialInView = articleNo;
      });
    });

    //if anywhere on services is clicked
    //close all the open details except the one that was clicked

    //if the part that was clicked was not a detail
    //close all open details
    this.servicesSect.addEventListener("click", (e) => {
      [...this.summaries.children].forEach((c) => {
        if (c.closest("details").open && c !== e.target.closest("details")) {
          c.closest("details").removeAttribute("open");
        }
      });
    });

    this.catalogRightArrow.addEventListener(
      "click",
      this.scrollCatalog.bind(this, "right"),
    );

    this.catalogLeftArrow.addEventListener(
      "click",
      this.scrollCatalog.bind(this, "left"),
    );

    this.testimonialRightArrow.addEventListener(
      "click",
      this.scrollTestimonial.bind(this, "right"),
    );

    this.testimonialLeftArrow.addEventListener(
      "click",
      this.scrollTestimonial.bind(this, "left"),
    );
  }

  scrollCatalog(dir) {
    const catalogScrollWidth =
      this.productCatalog.scrollWidth - this.productCatalog.clientWidth;

    dir === "right"
      ? this.productCatalog.scrollBy({
          left:
            this.productCatalog.scrollLeft !== catalogScrollWidth
              ? this.productCatalog.firstElementChild.clientWidth + 32
              : -catalogScrollWidth,
          behavior: "smooth",
        })
      : this.productCatalog.scrollBy({
          left: this.productCatalog.scrollLeft
            ? -(this.productCatalog.firstElementChild.clientWidth + 32)
            : catalogScrollWidth,
          behavior: "smooth",
        });
  }

  scrollTestimonial(dir) {
    //if the user clicked right and we have not reached the end
    //go forward one div
    dir === "right" && this.currentTestimonialInView <= 5
      ? (this.currentTestimonialInView++,
        this.testimonialCustomers.scrollBy({
          left: this.testimonialCustomers.clientWidth,
          behavior: "smooth",
        }))
      : null;

    //if the user clicked right and we have reached the end
    //go back to the beginning
    dir === "right" && this.currentTestimonialInView > 5
      ? ((this.currentTestimonialInView = 1),
        this.testimonialCustomers.scrollBy({
          left: -this.testimonialCustomers.clientWidth * 5,
          behavior: "smooth",
        }))
      : null;

    //if the user clicked left and we have not reached the beginning
    //go back one div
    dir === "left" && this.currentTestimonialInView >= 1
      ? (this.currentTestimonialInView--,
        this.testimonialCustomers.scrollBy({
          left: -this.testimonialCustomers.clientWidth,
          behavior: "smooth",
        }))
      : null;

    //if the user clicked left and we have reached the beginning
    //scroll to the end
    dir === "left" && this.currentTestimonialInView < 1
      ? ((this.currentTestimonialInView = 5),
        this.testimonialCustomers.scrollBy({
          left: this.testimonialCustomers.clientWidth * 5,
          behavior: "smooth",
        }))
      : null;

    //color the associated dot
    this.testimonialDots.forEach((c, i) => {
      this.currentTestimonialInView === i + 1
        ? c.classList.add("bg-primaryBlue")
        : c.classList.remove("bg-primaryBlue");
    });
  }
}

export const LandingPage = new Page();
