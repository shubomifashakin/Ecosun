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
    this.catalogRightArrow.addEventListener(
      "click",
      this.scrollCatalog.bind(this, "right"),
    );

    this.catalogLeftArrow.addEventListener(
      "click",
      this.scrollCatalog.bind(this, "left"),
    );

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

    //when a dot is clicked, scroll the associated article into view
    this.testimonialDots.forEach((dot, i) => {
      dot.addEventListener("click", (e) => {
        this.testimonialCustomers
          .querySelector(`#article-${e.target.dataset.articleNo}`)
          .scrollIntoView({ behavior: "smooth" });

        //add the active class to the dot clicked
        dot.classList.add("bg-primaryBlue");

        //remove the classlist from the dot
        this.testimonialDots.forEach((dot2, i2) => {
          i !== i2 ? dot2.classList.remove("bg-primaryBlue") : null;
        });

        //change the currently selected dot value
        this.currentTestimonialInView = e.target.dataset.articleNo;
      });
    });

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
    dir === "right"
      ? this.currentTestimonialInView < 5
        ? this.currentTestimonialInView++
        : (this.currentTestimonialInView = 1)
      : this.currentTestimonialInView > 1
        ? this.currentTestimonialInView--
        : (this.currentTestimonialInView = 5);

    //scroll associated element into view
    this.testimonialCustomers
      .querySelector(`#article-${this.currentTestimonialInView}`)
      .scrollIntoView({ behavior: "smooth" });

    //color the associated dot
    this.testimonialDots.forEach((c, i) => {
      this.currentTestimonialInView === i + 1
        ? c.classList.add("bg-primaryBlue")
        : c.classList.remove("bg-primaryBlue");
    });
  }
}

export const LandingPage = new Page();
