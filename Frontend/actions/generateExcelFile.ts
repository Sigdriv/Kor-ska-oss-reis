import ExcelJS from "exceljs";

import { fetchTeamsData } from "./fetchTeamsData";

const generateExcelFile = async () => {
  const teamsData = await fetchTeamsData();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Teams");

  // Set column widths and row heights
  worksheet.getColumn("C").width = 66;
  for (let i = 1; i <= 21; i++) {
    worksheet.getColumn(i).width = 66;
  }
  worksheet.eachRow((row) => {
    row.height = 26;
  });

  // Define header row and apply styles
  const header = [
    "Lagnavn",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ];

  const headerRow = worksheet.addRow([]);
  header.forEach((text, index) => {
    const cell = headerRow.getCell(index + 3); // Start from column C
    cell.value = text;
    cell.font = { name: "Calibri", size: 14, bold: index === 0 };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  // Add team data rows
  teamsData.forEach((team: any, rowIndex: any) => {
    const row = worksheet.addRow([]);
    const cell = row.getCell(3); // Start from column C
    cell.value = team.teamName;
    cell.font = { name: "Calibri", size: 14, bold: true };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    for (let i = 4; i <= 23; i++) {
      // Cells D to W (1 to 20 columns after team name)
      const numCell = row.getCell(i);
      numCell.alignment = { vertical: "middle", horizontal: "center" };
    }
    row.height = 26;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });

  return blob;
};

export default generateExcelFile;
