import {colorArray} from "../helpers";
import type {Errors} from "@/entities/calendar";
const colors = colorArray;

type data = {title: string; color: string};

type result = {valid: boolean; errors: Errors};

export const validate = (data: data): result => {
  const title = data.title.trim();
  const color = data.color;

  const errors: Errors = {title: "", color: ""};

  if (!title) {
    errors.title = "Required";
  } else if (title.length > 15) {
    errors.title = "Max 15 characters";
  } else if (!/^[a-zA-Z0-9\s]+$/.test(title)) {
    errors.title = "Only letters and numbers";
  }
  if (!color) {
    errors.color = "Required";
  } else if (!colors.includes(color)) {
    errors.color = "Choose another color";
  }

  return {valid: !errors.title && !errors.color, errors};
};
