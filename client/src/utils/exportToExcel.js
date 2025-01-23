import ExcelJS from "exceljs"

export const exportToExcel = async (data, fileName) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("Sheet1")

  // Add headers
  const headers = Object.keys(data[0])
  worksheet.addRow(headers)

  // Add data
  data.forEach((item) => {
    worksheet.addRow(Object.values(item))
  })

  // Generate file
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${fileName}.xlsx`
  link.click()
  window.URL.revokeObjectURL(url)
}
