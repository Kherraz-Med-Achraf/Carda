import { useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";

import logoSmall from "../../assets/images/logo-small.svg";
import logoLarge from "../../assets/images/logo-large.svg";
import gsap from "gsap";


export function Header() {

  const switchId = useId();
  const [internalChecked, setInternalChecked] = useState(false);
  const switchRef = useRef<HTMLButtonElement | null>(null);
  const trackRef = useRef<HTMLSpanElement | null>(null);
  const checkedRef = useRef(internalChecked);
  checkedRef.current = internalChecked;
  const responsiveWidth : boolean = window.innerWidth < 768 ? true : false;

  const positionTrack = (checked: boolean, animate: boolean) => {
    const btn = switchRef.current;
    const track = trackRef.current;
    if (!btn || !track) return;

    // NOTE: valeurs en px à garder cohérentes avec `Header.module.scss`
    const inset = 4; // padding interne + offset left
    const leftWidth = responsiveWidth ? 121 : 129;
    const rightWidth = responsiveWidth ? 98 : 114;

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

  const toggle = () => {
    const next = !internalChecked;
    setInternalChecked(next);
  };

  useLayoutEffect(() => {
    // Positionnement initial (sans animation)
    positionTrack(checkedRef.current, false);

    const onResize = () => positionTrack(checkedRef.current, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    positionTrack(internalChecked, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalChecked]);

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
          aria-checked={internalChecked}
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


