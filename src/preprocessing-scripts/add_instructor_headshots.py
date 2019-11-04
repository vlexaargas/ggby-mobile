# run from containing folder
# requires python 3.X

# Example usage: 
# python3 add_workshop_headers.py "/Users/danny-slacklineus/Downloads/GGBY Teacher Headshots/"

import shutil
import os
import sys

input_path = sys.argv[1]
workshop_images_output_path = "assets/images/instructor-headshots/"

print("input path: " + input_path)

def clean(image_file_name):
	image_file_name = image_file_name.replace('headshot', '')
	image_file_parts = image_file_name.split('.')
	image_file_parts = [x.strip().lower().replace(' ', '_') for x in image_file_parts]
	clean_image_file_name = '.'.join(image_file_parts)
	return clean_image_file_name



headshot_image_file_names = os.listdir(input_path)
print("Found images: ")
print(headshot_image_file_names)

clean_names = [clean(x) for x in headshot_image_file_names]
print("generated cleaned file names:")
print(clean_names)

# copy files with cleaned file names
for file_name in zip(headshot_image_file_names, clean_names):
	shutil.copy(input_path + file_name[0], output_path + file_name[1])



