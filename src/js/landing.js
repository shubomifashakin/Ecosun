import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ duration: 5 });

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

class Page {
  scaleInElements = document.querySelectorAll(".scaleInAnim");
  fadeInElements = document.querySelectorAll(".fadeInAnim");

  navbar = document.querySelector("#navbar");
  heroSection = document.querySelector("#hero");

  missionArticle = document.querySelector("#mission");

  stats = document.querySelector("#stats");

  servicesSect = document.querySelector("#services");
  summaries = this.servicesSect.querySelector("#summaries");

  shopSect = document.querySelector("#shop");
  productCatalog = this.shopSect.querySelector("#product-catalog");
  catalogArrows = this.shopSect.querySelectorAll(".catalog-arrow");

  testimonialSect = document.querySelector("#testimonial");
  testimonialCustomers =
    this.testimonialSect.querySelector("#testimonial-info");
  testimonialInner = document.querySelector("#testimonial-inner");
  testimonialDots = this.testimonialSect.querySelectorAll(".dot");
  testimonialArrows =
    this.testimonialSect.querySelectorAll(".testimonial-arrow");
  currentTestimonialInView = 1;

  intervalId;

  constructor() {
    //scroll right every 3 seconds
    this.scrollTestimonialInterval();

    //when the mouse enters the inner testimonial
    //stop the automatic scrolling
    this.testimonialInner.addEventListener("mouseenter", () => {
      clearInterval(this.intervalId);
    });

    //when the mouse leaves
    //start auto scrolling again
    this.testimonialInner.addEventListener("mouseleave", () => {
      this.scrollTestimonialInterval();
    });

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

    this.testimonialArrows.forEach((c) => {
      c.addEventListener(
        "click",
        this.scrollTestimonial.bind(this, c.dataset.scroll),
      );
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

    this.catalogArrows.forEach((c) => {
      c.addEventListener(
        "click",
        this.scrollCatalog.bind(this, c.dataset.scroll),
      );
    });

    this.heroAnim();

    this.scaleInElements.forEach((c) => {
      this.scaleIn(c);
    });

    this.fadeInElements.forEach((c) => {
      this.fadeIn(c);
    });
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
    const width = this.testimonialCustomers.clientWidth;

    //if the user clicked right and we have not reached the end
    //go forward one div
    dir === "right" && this.currentTestimonialInView <= 5
      ? (this.currentTestimonialInView++,
        this.testimonialCustomers.scrollBy({
          left: width,
          behavior: "smooth",
        }))
      : null;

    //if the user clicked right and we have reached the end
    //go back to the beginning
    dir === "right" && this.currentTestimonialInView > 5
      ? ((this.currentTestimonialInView = 1),
        this.testimonialCustomers.scrollBy({
          left: -width * 5,
          behavior: "smooth",
        }))
      : null;

    //if the user clicked left and we have not reached the beginning
    //go back one div
    dir === "left" && this.currentTestimonialInView >= 1
      ? (this.currentTestimonialInView--,
        this.testimonialCustomers.scrollBy({
          left: -width,
          behavior: "smooth",
        }))
      : null;

    //if the user clicked left and we have reached the beginning
    //scroll to the end
    dir === "left" && this.currentTestimonialInView < 1
      ? ((this.currentTestimonialInView = 5),
        this.testimonialCustomers.scrollBy({
          left: width * 5,
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

  scrollTestimonialInterval() {
    this.intervalId = setInterval(
      this.scrollTestimonial.bind(this, "right"),
      2500,
    );
  }

  heroAnim() {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const timeline = gsap.timeline({ defaults: { duration: 1.5 } });

      timeline
        .from(this.navbar, { y: -50, opacity: 0 })
        .from([...this.heroSection.children], {
          opacity: 0,
          stagger: 1,
        });
    });
  }

  scaleIn(element) {
    gsap.from(element, {
      opacity: 0,
      scale: 0,
      duration: 2,
      ease: "power1.inOut",

      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 3,
      },
    });
  }

  fadeIn(element) {
    gsap.from(element, {
      opacity: 0,
      ease: "power1.inOut",

      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "center bottom",
        scrub: 5,
      },
    });
  }
}

export const LandingPage = new Page();
