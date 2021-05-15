export interface ReportType {
  fileName: string;
}
export class Constants {
  static _OUTPUT_TechnologiesOverTime: ReportType = {
    fileName: "./output/technologies-over-time.json",
  };
  static _OUTPUT_TechnologiesUnique: ReportType = {
    fileName: "./output/technologies-unique.json",
  };
  static _OUTPUT_TechnologiesLastUsed: ReportType = {
    fileName: "./output/technologies-last-used.json",
  };
}
