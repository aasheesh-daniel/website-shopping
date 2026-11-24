// Shared-Element FLIP Hero Morph Page Transition
// Captures the clicked arched website window's exact screen coordinates,
// blurs out neighboring elements, smoothly enlarges & flies the clicked alcove to center-stage,
// then hands off seamlessly to the destination /services/:id interactive showcase page.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "./fx";
import { imgOf } from "./Parts";

const PortalCtx = createContext({ openWithMorph: () => {} });
export const usePortal = () => useContext(PortalCtx);

export const detailImgOf = (p) => (p?.id === "portfolio" ? "/img/portfolio-showcase.jpg" : imgOf(p));

export function PortalProvider({ children }) {
  const navigate = useNavigate();
  const [portal, setPortal] = useState(null);
  const layerRef = useRef(null);
  const bgRef = useRef(null);
  const cardRef = useRef(null);
  const busyRef = useRef(false);

  const openWithMorph = useCallback(
    (product, sourceEl) => {
      if (!product || busyRef.current) return;
      const targetUrl = "/services/" + product.id;
      const reduced =
        typeof matchMedia !== "undefined" &&
        matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced || !sourceEl) {
        navigate(targetUrl);
        return;
      }

      const rect = sourceEl.getBoundingClientRect();
      if (!rect || rect.width < 40 || rect.height < 40) {
        navigate(targetUrl);
        return;
      }

      busyRef.current = true;
      setPortal({
        product,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
      });
    },
    [navigate]
  );

  useEffect(() => {
    if (!portal || !cardRef.current || !bgRef.current) return;

    const { product, rect } = portal;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Destination center-stage alcove dimensions matching .sd-alcove on /services/:id
    const isDesktop = vw >= 1001;
    const destW = isDesktop ? Math.min(410, vw * 0.32) : Math.min(340, vw * 0.84);
    const destH = Math.min(destW * (4.2 / 3.4), vh * 0.56);
    const destLeft = (vw - destW) / 2;
    const destTop = isDesktop ? Math.max(138, (vh - destH) / 2 + 16) : Math.max(120, (vh - destH) / 2);

    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
        setPortal(null);
      },
    });

    // Step 1: Set exact starting position of clicked arched window
    gsap.set(bgRef.current, { opacity: 0 });
    gsap.set(cardRef.current, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      scale: 1,
      opacity: 1,
    });

    // Step 2: Softly defocus surrounding cards & enlarge/fly the clicked element into center spotlight
    tl.to(bgRef.current, { opacity: 1, duration: 0.34, ease: "power2.out" }, 0)
      .to(
        cardRef.current,
        {
          top: destTop,
          left: destLeft,
          width: destW,
          height: destH,
          duration: 0.56,
          ease: "power3.inOut",
        },
        0.04
      )
      // Step 3: Navigate seamlessly underneath right as the enlarged alcove lands in center focus
      .call(
        () => {
          navigate("/services/" + product.id, { state: { fromMorph: true } });
          window.scrollTo(0, 0);
        },
        null,
        0.52
      )
      // Step 4: Graceful cross-fade reveal of the live interactive destination page
      .to(layerRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0.62);

    return () => {
      tl.kill();
      busyRef.current = false;
    };
  }, [portal, navigate]);

  return (
    <PortalCtx.Provider value={{ openWithMorph }}>
      {children}
      {portal && (
        <div className="portal-layer" ref={layerRef} aria-hidden="true">
          <div className="portal-backdrop" ref={bgRef} />
          <div className="portal-card" ref={cardRef}>
            <div className="portal-spotlight" />
            <div className="portal-device">
              <div className="ng-device-bar">
                <i /><i /><i />
                <span>{portal.product.short}</span>
              </div>
              <img
                src={detailImgOf(portal.product)}
                alt=""
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = imgOf(portal.product);
                }}
              />
            </div>
            <div className="portal-pedestal" />
          </div>
        </div>
      )}
    </PortalCtx.Provider>
  );
}
