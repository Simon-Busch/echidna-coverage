export interface LineData {
  functionName: string;
  touched: boolean;
  reverted: boolean;
  isFullyCovered: boolean;
  untouchedLines: number;
}

export interface FileData {
  path: string;
  data: LineData[];
}

export interface CoverageStats {
  totalFunctions: number;
  coveredLines: number;
  revertedLines: number;
  untouchedLines: number;
  coveragePercentage: number;
  fullyCoveredFunctions: number;
}

export interface FileDataWithCoverage extends FileData {
  coverage: CoverageStats;
}

export interface FunctionBlock {
  name: string;
  lines: string[];
  isCovered: boolean;
  isReverted: boolean;
  coveredLines: number;
  untouchedLines: number;
  revertedLines: number;
  isTotallyCovered: boolean;
}

export interface ProgramOptions {
  verbose: boolean;
  filePath: string;
  outputFormat: "table" | "json";
  threshold: number;
  help: boolean;
  contract?: string;
}
