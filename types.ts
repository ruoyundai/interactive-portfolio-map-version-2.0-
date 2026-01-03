
export interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // percentage width
  height: number; // percentage height
  color: string; // reference color from mask
}
