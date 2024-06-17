import ExcelJS from "exceljs";
import { fetchTeamsData } from "./fetchTeamsData";

const generateExcelFile = async () => {
  const teamsData = await fetchTeamsData();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Teams");

  // Set column widths and row heights
  worksheet.getColumn("C").width = 15;
  for (let i = 1; i <= 21; i++) {
    worksheet.getColumn(i).width = 15;
  }
  worksheet.eachRow((row: any) => {
    row.height = 19;
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

  // Add team data rows with alternating row colors starting from the second team
  teamsData.forEach((team: any, rowIndex: any) => {
    const row = worksheet.addRow([]);
    const cell = row.getCell(3); // Start from column C
    cell.value = team.teamName;
    cell.font = { name: "Calibri", size: 14, bold: true };
    cell.alignment = { vertical: "middle", horizontal: "left" };

    // Apply grey background to alternate rows starting from the second team
    const fill: ExcelJS.Fill =
      rowIndex % 2 === 1
        ? {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFCCCCCC" },
          }
        : { type: "pattern", pattern: "none" };

    for (let i = 3; i <= 23; i++) {
      const numCell = row.getCell(i);
      numCell.alignment = { vertical: "middle", horizontal: "center" };
      if (fill) {
        numCell.fill = fill;
      }
    }

    row.height = 19;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });

  return blob;
};

export default generateExcelFile;
