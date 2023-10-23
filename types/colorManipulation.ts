export interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export type ColorManipulationRequest = {
  type: 'request:manipulate-colors';
  imageData: ImageData;
} & RGBA;

export type ColorManipulationResponse = {
  type: 'response:manipulate-colors';
  imageData: ImageData;
};
