 import { Card } from "@/components/ui/card";
 import { Share, MoreVertical, Plus } from "lucide-react";
 import { usePwaInstall } from "@/hooks/use-pwa-install";
 import { Button } from "@/components/ui/button";
 
 export default function Install() {
   const { isIOS, isAndroidOrDesktop, installPwa } = usePwaInstall();
 
   return (
     <div className="container max-w-2xl mx-auto px-4 py-8">
       <div className="mb-8 text-center">
         <img 
           src="/pwa-icon.png" 
           alt="TuDespensa25" 
           className="w-24 h-24 mx-auto mb-4 rounded-2xl shadow-lg"
         />
         <h1 className="text-3xl font-bold mb-2">Instala TuDespensa25</h1>
         <p className="text-muted-foreground">
           Accede más rápido y disfruta de una experiencia optimizada
         </p>
       </div>
 
       {isAndroidOrDesktop && (
         <Card className="p-6 mb-6">
           <h2 className="text-xl font-semibold mb-4">Android / Chrome</h2>
           <Button onClick={installPwa} className="w-full mb-4">
             Instalar ahora
           </Button>
           <div className="space-y-4 text-sm text-muted-foreground">
             <p>O sigue estos pasos:</p>
             <ol className="list-decimal list-inside space-y-2 ml-2">
               <li>Toca el menú <MoreVertical className="inline h-4 w-4" /> en tu navegador</li>
               <li>Selecciona "Agregar a pantalla de inicio"</li>
               <li>Confirma tocando "Agregar"</li>
             </ol>
           </div>
         </Card>
       )}
 
       {isIOS && (
         <Card className="p-6">
           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
             <Share className="h-5 w-5" />
             iOS / Safari
           </h2>
           <div className="space-y-4 text-sm">
             <ol className="list-decimal list-inside space-y-3 ml-2">
               <li>
                 Abre esta página en <strong>Safari</strong>
               </li>
               <li className="flex items-start gap-2">
                 <span>2.</span>
                 <span className="flex-1">
                   Toca el botón compartir <Share className="inline h-4 w-4" /> en la barra inferior
                 </span>
               </li>
               <li className="flex items-start gap-2">
                 <span>3.</span>
                 <span className="flex-1">
                   Desplázate y toca <Plus className="inline h-4 w-4" /> "Agregar a pantalla de inicio"
                 </span>
               </li>
               <li>
                 Confirma tocando "Agregar"
               </li>
             </ol>
             
             <div className="bg-muted p-4 rounded-lg mt-6">
               <p className="text-xs text-muted-foreground">
                 <strong>Nota:</strong> Esta función solo está disponible en Safari. 
                 Si estás usando otro navegador, copia la URL y ábrela en Safari.
               </p>
             </div>
           </div>
         </Card>
       )}
 
       <div className="mt-8 text-center">
         <h3 className="font-semibold mb-2">Beneficios de instalar</h3>
         <ul className="text-sm text-muted-foreground space-y-1">
           <li>✓ Acceso directo desde tu pantalla de inicio</li>
           <li>✓ Funciona sin conexión</li>
           <li>✓ Experiencia más rápida y fluida</li>
           <li>✓ Notificaciones de ofertas especiales</li>
         </ul>
       </div>
     </div>
   );
 }