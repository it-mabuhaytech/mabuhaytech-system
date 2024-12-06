import { WorkSheet } from "xlsx";

export function changeFormatToCellsExemptTitle(
    ws: WorkSheet,
    format: string,
    columnLetter: string[]
) {
    const wsArray = Array.from(Object.entries(ws));

    columnLetter.map((letter) => {
        wsArray
            .filter(([key]) => key.includes(letter) && key !== `${letter}1`)
            .map(([keyName, value]) => {
                ws[keyName] = {
                    ...value,
                    z: format,
                };
            });
    });
}
