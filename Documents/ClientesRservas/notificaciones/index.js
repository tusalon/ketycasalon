// index.js - Script de recordatorios de turnos

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Faltan variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY');
    process.exit(1);
}

// ============================================
// FUNCIÓN PARA OBTENER FECHA DE MAÑANA
// ============================================
function getManianaFecha() {
    const maniana = new Date();
    maniana.setDate(maniana.getDate() + 1);
    
    const year = maniana.getFullYear();
    const month = String(maniana.getMonth() + 1).padStart(2, '0');
    const day = String(maniana.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// ============================================
// FUNCIÓN PARA CONSULTAR SUPABASE
// ============================================
async function consultarTurnos(fecha) {
    console.log(`🔍 Buscando turnos para: ${fecha}`);
    
    const url = `${SUPABASE_URL}/rest/v1/reservas?fecha=eq.${fecha}&estado=eq.Reservado&select=*&order=negocio_id,hora_inicio`;
    
    const response = await fetch(url, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`Error consultando turnos: ${response.status}`);
    }
    
    const turnos = await response.json();
    console.log(`📊 Total turnos encontrados: ${turnos.length}`);
    return turnos;
}

// ============================================
// FUNCIÓN PARA OBTENER DATOS DE NEGOCIOS
// ============================================
async function obtenerNegocios() {
    const url = `${SUPABASE_URL}/rest/v1/negocios?select=id,nombre,ntfy_topic`;
    
    const response = await fetch(url, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`Error consultando negocios: ${response.status}`);
    }
    
    return await response.json();
}

// ============================================
// FUNCIÓN PARA AGRUPAR TURNOS POR NEGOCIO
// ============================================
function agruparPorNegocio(turnos) {
    const grupos = {};
    
    turnos.forEach(turno => {
        const negocioId = turno.negocio_id;
        if (!grupos[negocioId]) {
            grupos[negocioId] = [];
        }
        grupos[negocioId].push(turno);
    });
    
    return grupos;
}

// ============================================
// FUNCIÓN PARA FORMATEAR HORA A 12H
// ============================================
function formatearHora(hora24) {
    const [horas, minutos] = hora24.split(':');
    const h = parseInt(horas);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutos} ${ampm}`;
}

// ============================================
// FUNCIÓN PARA FORMATEAR FECHA COMPLETA
// ============================================
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

// ============================================
// FUNCIÓN PARA ENVIAR NOTIFICACIÓN NTFY
// ============================================
async function enviarNotificacion(ntfyTopic, mensaje, negocioNombre) {
    console.log(`📤 Enviando a ${negocioNombre} (${ntfyTopic})...`);
    
    const response = await fetch(`https://ntfy.sh/${ntfyTopic}`, {
        method: 'POST',
        body: mensaje,
        headers: {
            'Title': `📅 Recordatorio de turnos - ${negocioNombre}`,
            'Priority': 'default',
            'Tags': 'calendar'
        }
    });
    
    if (!response.ok) {
        console.error(`❌ Error enviando a ${ntfyTopic}: ${response.status}`);
        return false;
    }
    
    console.log(`✅ Notificación enviada a ${ntfyTopic}`);
    return true;
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
async function main() {
    console.log('🚀 Iniciando sistema de recordatorios...');
    console.log('⏰ Hora actual:', new Date().toLocaleString());
    
    try {
        const fechaManiana = getManianaFecha();
        const fechaFormateada = formatearFecha(fechaManiana);
        
        console.log(`📅 Buscando turnos para mañana (${fechaFormateada})...`);
        
        // Consultar turnos
        const turnos = await consultarTurnos(fechaManiana);
        
        if (turnos.length === 0) {
            console.log('📭 No hay turnos para mañana');
            return;
        }
        
        // Obtener datos de negocios
        const negocios = await obtenerNegocios();
        
        // Crear mapa de negocios por ID
        const mapaNegocios = {};
        negocios.forEach(n => {
            mapaNegocios[n.id] = n;
        });
        
        // Agrupar turnos por negocio
        const turnosPorNegocio = agruparPorNegocio(turnos);
        
        console.log(`🏢 Negocios con turnos: ${Object.keys(turnosPorNegocio).length}`);
        
        // Procesar cada negocio
        for (const [negocioId, turnosNegocio] of Object.entries(turnosPorNegocio)) {
            const negocio = mapaNegocios[negocioId];
            
            if (!negocio) {
                console.warn(`⚠️ Negocio ${negocioId} no encontrado en la base de datos`);
                continue;
            }
            
            if (!negocio.ntfy_topic) {
                console.warn(`⚠️ ${negocio.nombre} no tiene ntfy_topic configurado`);
                continue;
            }
            
            console.log(`\n🏪 Procesando ${negocio.nombre} (${turnosNegocio.length} turnos)`);
            
            // Construir mensaje
            let mensaje = `📅 *RECORDATORIO DE TURNOS - ${negocio.nombre.toUpperCase()}*\n\n`;
            mensaje += `Mañana *${fechaFormateada}* tenés los siguientes turnos agendados:\n\n`;
            
            turnosNegocio.forEach(turno => {
                const hora = formatearHora(turno.hora_inicio);
                mensaje += `• ${hora} - *${turno.servicio}* (${turno.cliente_nombre})\n`;
            });
            
            mensaje += `\n📊 *Total:* ${turnosNegocio.length} turno(s) para mañana\n\n`;
            mensaje += `¡Que tengas un excelente día! ✨`;
            
            // Enviar notificación
            await enviarNotificacion(negocio.ntfy_topic, mensaje, negocio.nombre);
        }
        
        console.log('\n✅ Proceso completado exitosamente');
        
    } catch (error) {
        console.error('❌ Error en el proceso:', error);
        process.exit(1);
    }
}

// Ejecutar
main();