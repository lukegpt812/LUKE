from PIL import Image
import numpy as np

def remove_green_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)

    # Define green range (adjust these values if needed)
    # Assuming standard chroma green: roughly R=0, G=255, B=0
    # We'll be a bit lenient
    red, green, blue, alpha = data.T

    # Green condition: Green is dominant and bright
    # G > R + 20 and G > B + 20 and G > 100
    green_areas = (green > red + 20) & (green > blue + 20) & (green > 80)

    data[..., 3][green_areas.T] = 0

    new_img = Image.fromarray(data)
    new_img.save(output_path)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    remove_green_bg("public/images/BASE.jpg", "public/images/BASE.png")
