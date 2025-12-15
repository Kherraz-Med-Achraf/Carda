import { useId, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

import logoSmall from "../../assets/images/logo-small.svg";
import logoLarge from "../../assets/images/logo-large.svg";
import gsap from "gsap";



export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAllCards = location.pathname === "/all-cards";

  const toggle = () => {
    if (isAllCards) {
      navigate("/");
    } else {
      navigate("/all-cards");
    }
  };

  const switchId = useId();
  const switchRef = useRef<HTMLButtonElement | null>(null);
  const trackRef = useRef<HTMLSpanElement | null>(null);

  // Animation du track du switch
  const positionTrack = (checked: boolean, animate: boolean) => {
    const btn = switchRef.current;
    const track = trackRef.current;
    if (!btn || !track) return;

    // Calculer le breakpoint responsive au moment de l'exécution
    const isMobile = window.innerWidth < 768;

    // NOTE: valeurs en px à garder cohérentes avec `Header.module.scss`
    const inset = 4; // padding interne + offset left
    const leftWidth = isMobile ? 121 : 129;
    const rightWidth = isMobile ? 98 : 114;

    const width = checked ? rightWidth : leftWidth;
    const x = checked ? Math.max(0, btn.clientWidth - width - inset * 2) : 0;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const duration = animate && !prefersReducedMotion ? 0.28 : 0;

    gsap.to(track, {
      x,
      width,
      duration,
      ease: "power2.out",
      overwrite: true,
    });
  };

  useLayoutEffect(() => {
    // Observer les changements de taille du bouton
    const btn = switchRef.current;
    if (!btn) return;

    const observer = new ResizeObserver(() => {
      // Pour éviter les problèmes de stale closure sans recréer l'observer,
      // on lit l'état directement depuis l'attribut aria-checked du DOM.
      const isChecked = btn.getAttribute("aria-checked") === "true";
      
      // Recalcule la position quand la taille change (sans animation)
      positionTrack(isChecked, false);
    });

    observer.observe(btn);

    // Nettoyage
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    // Animation lors du changement d'état (clic)
    positionTrack(isAllCards, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllCards]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <picture>
          <source media="(min-width: 768px)" srcSet={logoLarge} />
          <img className={styles.logo} src={logoSmall} alt="Carda" />
        </picture>
      </div>

      <div className={styles.right}>
        <button
          id={switchId}
          type="button"
          className={styles.switch}
          ref={switchRef}
          role="switch"
          aria-checked={isAllCards}
          aria-label="Basculer entre Study Mode et All Cards"
          onClick={toggle}
        >
          <span
            ref={trackRef}
            className={styles.switchTrack}
            aria-hidden="true"
          />
          <span className={styles.switchText}>Study Mode</span>
          <span className={styles.switchText}>All Cards</span>
        </button>
      </div>
    </header>
  );
}


