// Dados simulados. Quando a API for definida, só este arquivo muda.
export const horarios = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export const estudios = ["PKZ", "One to One"];

export function obterVagas(data, estudio) {
  if (data.getDay() === 0) return 0;

  const diferencaEstudio = estudio === "PKZ" ? 0 : 4;
  const semente =
    (data.getDate() * 7 + data.getMonth() * 3 + diferencaEstudio) % 11;
  if (semente < 2) return 0;
  if (semente < 5) return 2;
  return 6;
}
