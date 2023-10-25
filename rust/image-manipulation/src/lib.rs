extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

fn calculate_color(original_value: u8, adjustment_value: u8, initial_value: u8) -> u8 {
    let diff = adjustment_value as i16 - initial_value as i16;
    let result = (original_value as i16 + diff).max(0).min(255);
    result as u8
}

#[wasm_bindgen]
pub fn adjust_color_channel(
    modified_image_data: &mut [u8],
    image_data: &[u8],
    color_channel: &str,
    adjustment_value: u8,
) {
    let channel_index = match color_channel {
        "red" => 0,
        "green" => 1,
        "blue" => 2,
        "alpha" => 3,
        _ => panic!("Invalid color channel"),
    };

    let pixel_count = image_data.len() / 4;

    for i in 0..pixel_count {
        let index = i * 4;
        let original_value = image_data[index + channel_index];

        let adjusted_channel_value = match color_channel {
            "alpha" => calculate_color(original_value, adjustment_value, 255),
            _ => calculate_color(original_value, adjustment_value, 127),
        };

        modified_image_data[index + channel_index] = adjusted_channel_value;
    }
}
