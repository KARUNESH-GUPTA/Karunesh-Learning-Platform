# Create the file structure for virtual lab website
import os

# Create directory structure
directories = [
    "virtual-lab-website",
    "virtual-lab-website/css",
    "virtual-lab-website/js",
    "virtual-lab-website/images",
    "virtual-lab-website/components"
]

for directory in directories:
    os.makedirs(directory, exist_ok=True)
    print(f"Created directory: {directory}")

print("\nVirtual Lab Website directory structure created successfully!")