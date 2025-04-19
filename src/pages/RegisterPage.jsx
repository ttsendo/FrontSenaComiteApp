import React, { useState } from "react";
import axios from "axios";
import Button from "../components/UI/Button";
import Select from "../components/UI/Select";
import departamentos from "../data/departamentos.json";
import municipios from "../data/municipios.json";
import "../components/styles/FormStyles.css"; 
import "../components/styles/Theme.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    rol: "",
    nombre_completo: "",
    correo_personal: "",
    correo_sena: "",
    tipo_documento: "",
    numero_documento: "",
    telefono: "",
    direccion: "",
    pais_residencia: "Colombia",
    departamento_residencia: "",
    municipio_residencia: "",
    contrasena: "",
    numero_ficha: "",
    programa: "",
    tipo_formacion: "",
    tipo_contratacion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { rol, ...usuarioData } = formData;
    let endpoint = "";

    // Validación de campos esenciales de usuario
    const camposUsuario = [
      "nombre_completo", "correo_personal", "correo_sena",
      "tipo_documento", "numero_documento", "telefono",
      "direccion", "pais_residencia", "departamento_residencia",
      "municipio_residencia", "contrasena"
    ];
    
    for (const campo of camposUsuario) {
      if (!usuarioData[campo]) {
        alert(`El campo ${campo} es obligatorio`);
        return;
      }
    }

    // Validaciones específicas por rol
    if (rol === "Aprendiz") {
      if (!usuarioData.numero_ficha || !usuarioData.programa) {
        alert("Número de ficha y Programa son obligatorios para Aprendiz");
        return;
      }
      endpoint = "http://localhost:5000/api/aprendices";
    } 
    else if (rol === "Instructor") {
      if (!usuarioData.tipo_formacion || !usuarioData.tipo_contratacion) {
        alert("Tipo de formación y Tipo de contratación son obligatorios para Instructor");
        return;
      }
      endpoint = "http://localhost:5000/api/instructores";
    } 
    else if (rol === "Coordinador") {
      endpoint = "http://localhost:5000/api/coordinadores";
    } 
    else {
      alert("Debe seleccionar un rol");
      return;
    }

    const requestData = {
      usuario: {
        nombre_completo: usuarioData.nombre_completo,
        correo_personal: usuarioData.correo_personal,
        correo_sena: usuarioData.correo_sena,
        tipo_documento: usuarioData.tipo_documento,
        numero_documento: usuarioData.numero_documento,
        telefono: usuarioData.telefono,
        direccion: usuarioData.direccion,
        pais_residencia: usuarioData.pais_residencia,
        departamento_residencia: usuarioData.departamento_residencia,
        municipio_residencia: usuarioData.municipio_residencia,
        contrasena: usuarioData.contrasena,
        rol: rol === "Aprendiz" ? 3 : rol === "Instructor" ? 2 : 1,
        activo: true,
      },
      aprendiz: rol === "Aprendiz"
        ? {
            numero_ficha: usuarioData.numero_ficha,
            programa: usuarioData.programa,
            fase_formativa: "Lectiva",
            fecha_inicio: new Date().toISOString(),
            fecha_fin: new Date().toISOString(),
            lider_ficha: "Pendiente",
            contrato_aprendizaje: "NO",
            empresa_contratante: null,
          }
        : undefined,
      instructor: rol === "Instructor"
        ? {
            tipo_formacion: usuarioData.tipo_formacion,
            tipo_contratacion: usuarioData.tipo_contratacion,
          }
        : undefined,
    };

    console.log("Enviando datos:", requestData);

    try {
      const response = await axios.post(endpoint, requestData);
      alert(response.data.message);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error en el registro:", error.response?.data);
      alert("Error en el registro: " + (error.response?.data?.message || "Inténtalo nuevamente."));
    }
  };

  return (
    <div className="registro-container">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <label>Selecciona tu rol:</label>
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Seleccione un rol</option>
          <option value="Aprendiz">Aprendiz</option>
          <option value="Instructor">Instructor</option>
          <option value="Coordinador">Coordinador</option>
        </select>

        {/* Datos de Usuario */}
        <label>Nombre Completo:</label>
        <input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required />

        <label>Teléfono:</label>
        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />

        <label>Dirección:</label>
        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />

        {/* Select de Departamento y Municipio */}
        <Select label="Departamento" name="departamento_residencia" options={Object.keys(municipios)} value={formData.departamento_residencia} onChange={handleChange} />
        <Select label="Municipio" name="municipio_residencia" options={formData.departamento_residencia ? municipios[formData.departamento_residencia] : []} value={formData.municipio_residencia} onChange={handleChange} />

        {/* Campos específicos por rol */}
        {formData.rol === "Aprendiz" && <><label>Número de Ficha:</label><input type="text" name="numero_ficha" value={formData.numero_ficha} onChange={handleChange} required /></>}
        {formData.rol === "Instructor" && <><label>Tipo de Formación:</label><select name="tipo_formacion" value={formData.tipo_formacion} onChange={handleChange} required><option value="">Seleccione</option><option value="Tecnico">Técnico</option><option value="Transversal">Transversal</option></select></>}

        <Button text="Registrarse" type="submit" />
      </form>
    </div>
  );
};

export default RegisterPage;
