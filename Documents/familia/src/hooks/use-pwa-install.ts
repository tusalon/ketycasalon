 import { useState, useEffect } from "react";
 
 interface BeforeInstallPromptEvent extends Event {
   prompt(): Promise<void>;
   userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
 }
 
 export function usePwaInstall() {
   const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
   const [isIOS, setIsIOS] = useState(false);
   const [isStandalone, setIsStandalone] = useState(false);
 
   useEffect(() => {
     // Detectar iOS
     const userAgent = window.navigator.userAgent.toLowerCase();
     const ios = /iphone|ipad|ipod/.test(userAgent);
     setIsIOS(ios);
 
     // Detectar si ya está instalada
     const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
     setIsStandalone(standalone);
 
     // Capturar evento beforeinstallprompt (Android/Desktop)
     const handleBeforeInstall = (e: Event) => {
       e.preventDefault();
       setDeferredPrompt(e as BeforeInstallPromptEvent);
     };
 
     window.addEventListener("beforeinstallprompt", handleBeforeInstall);
 
     return () => {
       window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
     };
   }, []);
 
   const installPwa = async () => {
     if (!deferredPrompt) return;
 
     deferredPrompt.prompt();
     const { outcome } = await deferredPrompt.userChoice;
     
     if (outcome === "accepted") {
       setDeferredPrompt(null);
     }
   };
 
   return {
     canInstall: !isStandalone && (!!deferredPrompt || isIOS),
     isIOS,
     isAndroidOrDesktop: !isIOS && !!deferredPrompt,
     installPwa,
     isStandalone,
   };
 }