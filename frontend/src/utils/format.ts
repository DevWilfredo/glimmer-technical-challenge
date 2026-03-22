export const formatDate = (dateValue: string) => {
  const parsedDate = new Date(dateValue)
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Fecha no disponible'
  }

  return parsedDate.toLocaleDateString()
}