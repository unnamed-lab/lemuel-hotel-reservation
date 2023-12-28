import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => null;
  }, [location]);

  return null;
}
