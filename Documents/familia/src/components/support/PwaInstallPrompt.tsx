 import { X, Download, Share } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Card } from "@/components/ui/card";
 import { usePwaInstall } from "@/hooks/use-pwa-install";
 import { useState } from "react";
 import { Link } from "react-router-dom";
 
 export function PwaInstallPrompt() {
   const { canInstall, isIOS, isAndroidOrDesktop, installPwa, isStandalone } = usePwaInstall();
   const [dismissed, setDismissed] = useState(false);
 
   if (!canInstall || dismissed || isStandalone) {
     return null;
   }
 
   return (
     <Card className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 shadow-lg z-40 border-primary/20">
       <button
         onClick={() => setDismissed(true)}
         className="absolute top-2 right-2 p-1 hover:bg-accent rounded-sm"
         aria-label="Cerrar"
       >
         <X className="h-4 w-4" />
       </button>
       
       <div className="flex items-start gap-3">
         <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
           <img 
             src="/pwa-icon.png" 
             alt="TuDespensa25" 
             className="w-10 h-10 object-contain"
           />
         </div>
         
         <div className="flex-1 min-w-0">
           <h3 className="font-semibold text-sm mb-1">
             Instala TuDespensa25
           </h3>
           <p className="text-xs text-muted-foreground mb-3">
             Accede más rápido y recibe notificaciones de ofertas
           </p>
           
           {isAndroidOrDesktop && (
             <Button 
               onClick={installPwa}
               size="sm" 
               className="w-full"
             >
               <Download className="h-4 w-4 mr-2" />
               Instalar ahora
             </Button>
           )}
           
           {isIOS && (
             <Button 
               asChild
               size="sm" 
               variant="outline"
               className="w-full"
             >
               <Link to="/instalar">
                 <Share className="h-4 w-4 mr-2" />
                 Ver instrucciones
               </Link>
             </Button>
           )}
         </div>
       </div>
     </Card>
   );
 }