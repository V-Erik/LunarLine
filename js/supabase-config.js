// js/supabase-config.js

// ⚠️ PEGA AQUÍ TUS CLAVES EXACTAS DE SUPABASE
const supabaseUrl = 'https://klfvgmecphrimsthugfv.supabase.co'; 
const supabaseKey = 'sb_publishable_NiDPEgkjwSKNdueTWvmbSw_uHWnlRHk'; // Tu clave anon public

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Función para subir imagen al Storage
async function subirImagen(file) {
    // Limpiar nombre de archivo
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const fileName = `${Date.now()}_${cleanName}`;
    
    const { data, error } = await _supabase.storage
        .from('obras')
        .upload(fileName, file);

    if (error) {
        alert('Error subiendo imagen: ' + error.message);
        return null;
    }

    const { data: publicData } = _supabase.storage
        .from('obras')
        .getPublicUrl(fileName);

    return publicData.publicUrl;
}

// Función para guardar en BD (AHORA CON PRECIO Y CONTACTO)
async function guardarObraBD(titulo, categoria, url, precio, contacto) {
    const { error } = await _supabase
        .from('obras')
        .insert({ 
            titulo: titulo, 
            categoria: categoria, 
            url_imagen: url,
            precio: precio,      // Nuevo
            contacto: contacto   // Nuevo
        });

    if (error) {
        alert('Error guardando datos: ' + error.message);
        return false;
    }
    return true;
}