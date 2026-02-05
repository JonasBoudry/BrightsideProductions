import { BaseComponent } from "./base/basecomponent";

export class FactsAndFigures extends BaseComponent {
    private readonly NUMBER__SELELCTOR = ".js-number-value";
    
    protected factsAndFigures: HTMLElement;
	protected numberValues: NodeListOf<HTMLElement>;

    constructor(element: HTMLElement) {
        super(element);

        if (!this.element) return;
        this.init();
    }

    init(): void {
        this.factsAndFigures = this.element;
        this.numberValues = this.factsAndFigures.querySelectorAll(this.NUMBER__SELELCTOR);

        this.initializeEvents();
    }

    private initializeEvents(): void {
        this.initiateCounter();
    }

    private initiateCounter() {
        if (!this.numberValues.length) return;

        const animateNumber = (el) => {
            const styles = getComputedStyle(el);

            const target = parseInt(styles.getPropertyValue("--number"), 10);
            const steps = parseInt(styles.getPropertyValue("--steps"), 1) || 60;

            if (isNaN(target)) return;

            let current = 0;
            const increment = target / steps;
            const duration = 1200; // total animation time in ms
            const intervalTime = duration / steps;

            const interval = setInterval(() => {
                current += increment;

                if (current >= target) {
                    el.textContent = `${target}`;
                    clearInterval(interval);
                } else {
                    el.textContent = `${Math.floor(current)}`;
                }
            }, intervalTime);
        };

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateNumber(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        this.numberValues.forEach((number) => {
            observer.observe(number);
        });
    }
}

